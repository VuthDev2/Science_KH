// ==============================================================================
// ScienceKH Server — Parameterized Query & Anti-SQL-Injection Utilities
// Protects server endpoints from injection by requiring positional parameters ($1, $2, ...)
// ==============================================================================

export interface ParameterizedStatement {
  readonly text: string;
  readonly values: readonly unknown[];
}

const SQL_INJECTION_SIGNATURES = [
  /(\b(UNION(\s+ALL)?)\b.*?\bSELECT\b)/i,
  /(\bOR\b\s+['"\d\w]+(\s*=\s*['"\d\w]+|\s+IS\s+NOT\s+NULL))/i,
  /(\bAND\b\s+['"\d\w]+(\s*=\s*['"\d\w]+))/i,
  /(;\s*(DROP|DELETE|TRUNCATE|ALTER|CREATE|UPDATE|INSERT)\b)/i,
  /(--|\/\*|\*\/)/,
  /(\bEXEC(\s|\()+)/i,
  /(\bPG_SLEEP\b)/i,
];

export function detectSqlInjectionPattern(value: unknown): boolean {
  if (typeof value !== "string") return false;
  return SQL_INJECTION_SIGNATURES.some((regex) => regex.test(value.trim()));
}

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
      text += `$${paramCounter++}`;
      if (typeof val === "string" && detectSqlInjectionPattern(val)) {
        console.warn(`[Security Alert] Suspicious SQL injection pattern in parameter: "${val}"`);
      }
      collectedValues.push(val);
    }
  }

  return {
    text: text.trim(),
    values: Object.freeze(collectedValues),
  };
}
