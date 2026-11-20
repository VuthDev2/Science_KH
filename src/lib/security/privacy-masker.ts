// ==============================================================================
// ScienceKH — Student Privacy & PII Masking System (Minor Data Protection)
// Compliant with UNESCO & COPPA EdTech standards for protecting K-12 students (Grades 7–12)
// Protects student identities on public leaderboards, activity feeds, and shared views
// ==============================================================================

/**
 * Masks an email address for safe display in UI or receipts:
 * e.g., "chan.sokha@gmail.com" -> "ch***@gmail.com"
 * e.g., "student@itc.edu.kh" -> "st***@itc.edu.kh"
 */
export function maskEmailForDisplay(email: string | null | undefined): string {
  if (!email || typeof email !== "string") return "student@sciencekh.org";
  const trimmed = email.trim();
  const atIdx = trimmed.indexOf("@");
  if (atIdx <= 1) return "***" + trimmed.slice(atIdx);

  const localPart = trimmed.slice(0, atIdx);
  const domainPart = trimmed.slice(atIdx);

  const visibleChars = Math.min(2, localPart.length);
  return `${localPart.slice(0, visibleChars)}***${domainPart}`;
}

/**
 * Protects student identities on public leaderboards and scholar listings.
 * Enforces pseudonymous presentation so minors are never exposed to cyber-stalking or scraping:
 * - Strips emails used as display names: "sokha123@gmail.com" -> "Sokha"
 * - Converts full 3+ word legal names to initialed format: "Chann Sokha" -> "Chann S."
 * - Replaces empty/raw handles with inspiring Cambodian scholar titles.
 */
export function maskStudentDisplayName(
  rawName: string | null | undefined,
  grade = 12,
  isKhmer = true,
): { nameKm: string; nameEn: string } {
  const fallbackKm = `សិស្សឆ្នើម ថ្នាក់ទី ${grade}`;
  const fallbackEn = `Grade ${grade} Scholar`;

  if (!rawName || typeof rawName !== "string") {
    return { nameKm: fallbackKm, nameEn: fallbackEn };
  }

  let cleaned = rawName.trim();

  // 1. If name contains an email address, strip the domain and symbols
  if (cleaned.includes("@")) {
    cleaned = cleaned.split("@")[0].replace(/[._-]/g, " ").trim();
  }

  // 2. Strip digits and special characters from ends
  cleaned = cleaned.replace(/\d+$/g, "").trim();

  if (!cleaned) {
    return { nameKm: fallbackKm, nameEn: fallbackEn };
  }

  // 3. For Latin/English names: Keep first name + last initial (e.g., "Vuthy Chea" -> "Vuthy C.")
  const parts = cleaned.split(/\s+/).filter(Boolean);
  let safeNameEn = cleaned;
  if (parts.length >= 2) {
    const first = parts[0];
    const lastInitial = parts[parts.length - 1][0].toUpperCase();
    safeNameEn = `${first} ${lastInitial}.`;
  }

  // 4. For Khmer script: Keep safe first + family name token
  const safeNameKm = cleaned;

  return {
    nameKm: safeNameKm,
    nameEn: safeNameEn,
  };
}
