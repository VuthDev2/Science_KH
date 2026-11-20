// ==============================================================================
// ScienceKH Server — Official Email Domain Whitelist Security Policy
// System policy: ONLY '@gmail.com' and '.edu.kh' (Cambodian Education) are accepted.
// ==============================================================================

import { z } from "zod";

export const EMAIL_DOMAIN_ERROR_KM =
  "ប្រព័ន្ធទទួលយកតែអាសយដ្ឋានអ៊ីមែល @gmail.com ឬ @...edu.kh (គ្រឹះស្ថានអប់រំនៅកម្ពុជា) ប៉ុណ្ណោះ។";

export const EMAIL_DOMAIN_ERROR_EN =
  "Only @gmail.com and @...edu.kh (Cambodian Education) email addresses are accepted.";

export function isAllowedEmailDomain(email: unknown): boolean {
  if (typeof email !== "string") return false;
  const normalized = email.trim().toLowerCase();

  const atIndex = normalized.lastIndexOf("@");
  if (atIndex <= 0 || atIndex === normalized.length - 1) return false;

  const domain = normalized.slice(atIndex + 1);

  const isGmail = domain === "gmail.com" || domain.endsWith(".gmail.com");
  const isEduKh = domain === "edu.kh" || domain.endsWith(".edu.kh");

  return isGmail || isEduKh;
}

export function getEmailDomainErrorMessage(isKhmer = true): string {
  return isKhmer ? EMAIL_DOMAIN_ERROR_KM : EMAIL_DOMAIN_ERROR_EN;
}

export const allowedEmailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email("Invalid email format")
  .max(255, "Email too long")
  .refine(isAllowedEmailDomain, {
    message: `${EMAIL_DOMAIN_ERROR_KM} (${EMAIL_DOMAIN_ERROR_EN})`,
  });
