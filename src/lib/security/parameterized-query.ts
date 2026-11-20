// ==============================================================================
// ScienceKH — Enterprise Parameterized Query & Anti-SQL-Injection Framework
// Protects database layers by strictly enforcing parameterized prepared statements ($1, $2, ...)
// and validating all dynamic parameters before execution.
// Reference: OWASP Top 10 - A03:2021 Injection Prevention
// ==============================================================================

/**
 * Standard Parameterized Statement representation.
 * Separates SQL structure ($1, $2...) from user-supplied values.
 */
export interface ParameterizedStatement {
  readonly text: string;
  readonly values: readonly unknown[];
}

/**
 * Common SQL injection signatures detected during active runtime audits
 */
const SQL_INJECTION_SIGNATURES = [
  /(\b(UNION(\s+ALL)?)\b.*?\bSELECT\b)/i,
  /(\bOR\b\s+['"\d\w]+(\s*=\s*['"\d\w]+|\s+IS\s+NOT\s+NULL))/i,
  /(\bAND\b\s+['"\d\w]+(\s*=\s*['"\d\w]+))/i,
  /(;\s*(DROP|DELETE|TRUNCATE|ALTER|CREATE|UPDATE|INSERT)\b)/i,
  /(--|\/\*|\*\/)/,
  /(\bEXEC(\s|\()+)/i,
  /(\bPG_SLEEP\b)/i,
  /(\bWAITFOR\s+DELAY\b)/i,
  /(\bBENCHMARK\s*\()/i,
];

/**
 * Detects whether a string value matches known SQL injection signatures.
 */
export function detectSqlInjectionPattern(value: unknown): boolean {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  return SQL_INJECTION_SIGNATURES.some((regex) => regex.test(trimmed));
}

/**
 * Asserts that a value is a valid UUID v4 (common for IDs in PostgreSQL).
 * Throws an error if invalid, preventing any SQL manipulation.
 */
export function assertValidUuid(value: unknown, paramName = "id"): string {
  if (typeof value !== "string") {
    throw new Error(`Security validation failed: "${paramName}" must be a string UUID.`);
  }
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(value.trim())) {
    throw new Error(`Security validation failed: "${paramName}" is not a valid UUID.`);
  }
  return value.trim();
}

/**
 * Asserts that a value is an integer within safe bounds.
 */
export function assertValidInteger(
  value: unknown,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  paramName = "value",
): number {
  const num = typeof value === "number" ? value : Number(value);
  if (!Number.isInteger(num) || Number.isNaN(num)) {
    throw new Error(`Security validation failed: "${paramName}" must be an integer.`);
  }
  if (num < min || num > max) {
    throw new Error(`Security validation failed: "${paramName}" must be between ${min} and ${max}.`);
  }
  return num;
}

/**
 * Asserts that a string is a safe alphanumeric slug (e.g. subject slugs like "mathematics", "physics").
 */
export function assertValidSlug(value: unknown, paramName = "slug"): string {
  if (typeof value !== "string") {
    throw new Error(`Security validation failed: "${paramName}" must be a string slug.`);
  }
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  const trimmed = value.trim().toLowerCase();
  if (!slugRegex.test(trimmed)) {
    throw new Error(`Security validation failed: "${paramName}" contains illegal characters.`);
  }
  return trimmed;
}

/**
 * Safe SQL tagged template literal builder.
 *
 * Replaces all embedded expressions with positional `$1, $2, ...` placeholders
 * and collects values into a separate parameters array. Never concatenates raw strings into SQL!
 *
 * Example:
 * ```ts
 * const query = sql`SELECT * FROM lessons WHERE grade = ${grade} AND subject_id = ${subjectId}`;
 * // Output:
 * // query.text = "SELECT * FROM lessons WHERE grade = $1 AND subject_id = $2"
 * // query.values = [grade, subjectId]
 * ```
 */
export function sql(
  strings: TemplateStringsArray,
  ...values: unknown[]
): ParameterizedStatement {
  let text = "";
  const collectedValues: unknown[] = [];
  let paramCounter = 1;

  for (let i = 0; i < strings.length; i++) {
    text += strings[i];

    if (i < values.length) {
      const val = values[i];

      // Support composable nested ParameterizedStatements
      if (
        val &&
        typeof val === "object" &&
        "text" in val &&
        "values" in val &&
        Array.isArray((val as ParameterizedStatement).values)
      ) {
        const nested = val as ParameterizedStatement;
        // Re-index nested placeholders from their internal $1..$n to current paramCounter
        let nestedText = nested.text;
        nested.values.forEach((nestedVal) => {
          nestedText = nestedText.replace(/\$\d+/, `$${paramCounter++}`);
          collectedValues.push(nestedVal);
        });
        text += nestedText;
      } else {
        // Enforce parameterization: Replace literal with $N placeholder
        text += `$${paramCounter++}`;
        // Verify value does not contain obvious injection attempts if it's a string
        if (typeof val === "string" && detectSqlInjectionPattern(val)) {
          console.warn(`[Security Alert] Suspicious SQL injection pattern detected in bound parameter: "${val}"`);
        }
        collectedValues.push(val);
      }
    }
  }

  return {
    text: text.trim(),
    values: Object.freeze(collectedValues),
  };
}

/**
 * Parameterized Batch Insert Builder.
 * Produces positional parameters for multi-row inserts without string interpolation.
 *
 * Example:
 * ```ts
 * const stmt = buildParameterizedInsert(
 *   "lesson_progress",
 *   ["user_id", "lesson_id", "status"],
 *   [
 *     ["u1", "l1", "completed"],
 *     ["u1", "l2", "in_progress"],
 *   ]
 * );
 * // Result:
 * // stmt.text = "INSERT INTO lesson_progress (user_id, lesson_id, status) VALUES ($1, $2, $3), ($4, $5, $6)"
 * // stmt.values = ["u1", "l1", "completed", "u1", "l2", "in_progress"]
 * ```
 */
export function buildParameterizedInsert(
  tableName: string,
  columns: readonly string[],
  rows: readonly (readonly unknown[])[],
): ParameterizedStatement {
  // Validate table and column identifiers (only lowercase alphanumeric + underscore)
  const identifierRegex = /^[a-z_][a-z0-9_]*$/;
  if (!identifierRegex.test(tableName)) {
    throw new Error(`Invalid table name identifier: "${tableName}"`);
  }
  for (const col of columns) {
    if (!identifierRegex.test(col)) {
      throw new Error(`Invalid column identifier: "${col}"`);
    }
  }

  if (rows.length === 0) {
    throw new Error("Cannot build parameterized insert with empty rows array.");
  }

  const values: unknown[] = [];
  const rowPlaceholders: string[] = [];
  let paramIdx = 1;

  for (const row of rows) {
    if (row.length !== columns.length) {
      throw new Error(`Row length (${row.length}) does not match columns count (${columns.length}).`);
    }
    const placeholders: string[] = [];
    for (const val of row) {
      placeholders.push(`$${paramIdx++}`);
      values.push(val);
    }
    rowPlaceholders.push(`(${placeholders.join(", ")})`);
  }

  const text = `INSERT INTO ${tableName} (${columns.join(", ")}) VALUES ${rowPlaceholders.join(", ")}`;

  return {
    text,
    values: Object.freeze(values),
  };
}

/**
 * Parameterized Update Builder.
 * Constructs "UPDATE <table> SET col1 = $1, col2 = $2 WHERE <whereCol> = $3".
 */
export function buildParameterizedUpdate(
  tableName: string,
  updates: Record<string, unknown>,
  whereColumn: string,
  whereValue: unknown,
): ParameterizedStatement {
  const identifierRegex = /^[a-z_][a-z0-9_]*$/;
  if (!identifierRegex.test(tableName)) {
    throw new Error(`Invalid table identifier: "${tableName}"`);
  }
  if (!identifierRegex.test(whereColumn)) {
    throw new Error(`Invalid where column identifier: "${whereColumn}"`);
  }

  const keys = Object.keys(updates);
  if (keys.length === 0) {
    throw new Error("No fields provided for parameterized update.");
  }

  for (const k of keys) {
    if (!identifierRegex.test(k)) {
      throw new Error(`Invalid update column identifier: "${k}"`);
    }
  }

  const values: unknown[] = [];
  let paramIdx = 1;

  const setClauses = keys.map((key) => {
    values.push(updates[key]);
    return `${key} = $${paramIdx++}`;
  });

  values.push(whereValue);
  const wherePlaceholder = `$${paramIdx++}`;

  const text = `UPDATE ${tableName} SET ${setClauses.join(", ")} WHERE ${whereColumn} = ${wherePlaceholder}`;

  return {
    text,
    values: Object.freeze(values),
  };
}
