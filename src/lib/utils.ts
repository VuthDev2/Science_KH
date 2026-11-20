import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Transforms raw LaTeX tokens in display titles into clean, elegant mathematical Unicode.
 * e.g., "រូបមន្តខួបប៉ោលទោល (T = 2\pi \sqrt{l / g})" -> "រូបមន្តខួបប៉ោលទោល (T = 2π √(l/g))"
 */
export function cleanLatexDisplayTitle(title: string | undefined | null): string {
  if (!title) return "";
  return title
    .replace(/\\pi\b/g, "π")
    .replace(/\\sqrt\{([^}]+)\}/g, "√($1)")
    .replace(/\\sqrt\b/g, "√")
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, "$1/$2")
    .replace(/\\cdot/g, "·")
    .replace(/\\times/g, "×")
    .replace(/\\Delta\b/g, "Δ")
    .replace(/\\Omega\b/g, "Ω")
    .replace(/\\alpha\b/g, "α")
    .replace(/\\beta\b/g, "β")
    .replace(/\\gamma\b/g, "γ")
    .replace(/\\lambda\b/g, "λ")
    .replace(/\\rho\b/g, "ρ")
    .replace(/\\theta\b/g, "θ")
    .replace(/\\mu\b/g, "μ")
    .replace(/\\sigma\b/g, "σ")
    .replace(/\\omega\b/g, "ω")
    .replace(/\\pm\b/g, "±")
    .replace(/\\leq\b/g, "≤")
    .replace(/\\geq\b/g, "≥")
    .replace(/\\neq\b/g, "≠")
    .replace(/\\approx\b/g, "≈")
    .replace(/\\implies\b/g, "⇒")
    .replace(/\\text\{([^}]+)\}/g, "$1")
    .replace(/\\left|\\right/g, "")
    .replace(/\\quad|\\,/g, " ")
    .replace(/\\([a-zA-Z]+)/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/**
 * Sanitizes LaTeX math strings, restoring missing backslashes or tokens for KaTeX.
 */
export function cleanLatexMathString(raw: string | undefined | null): string {
  if (!raw) return "";
  let s = raw.trim();
  if (s.startsWith("$") && s.endsWith("$")) {
    s = s.slice(1, -1).trim();
  }
  return s
    .replace(/(^|[^\\])mathbb\{/g, "$1\\mathbb{")
    .replace(/(^|[^\\])frac\{/g, "$1\\frac{")
    .replace(/(^|[^\\])sqrt\{/g, "$1\\sqrt{")
    .replace(/(^|[^\\])pm\b/g, "$1\\pm")
    .replace(/(^|[^\\])times\b/g, "$1\\times")
    .replace(/(^|[^\\])cdot\b/g, "$1\\cdot")
    .replace(/(^|[^\\])neq\b/g, "$1\\neq")
    .replace(/(^|[^\\])leq\b/g, "$1\\leq")
    .replace(/(^|[^\\])geq\b/g, "$1\\geq")
    .replace(/(^|[^\\])approx\b/g, "$1\\approx")
    .replace(/(^|[^\\])implies\b/g, "$1\\implies")
    .replace(/(^|[^\\])alpha\b/g, "$1\\alpha")
    .replace(/(^|[^\\])beta\b/g, "$1\\beta")
    .replace(/(^|[^\\])pi\b/g, "$1\\pi")
    .replace(/(^|[^\\])rho\b/g, "$1\\rho")
    .replace(/(^|[^\\])theta\b/g, "$1\\theta")
    .replace(/(^|[^\\])omega\b/g, "$1\\omega")
    .replace(/(^|[^\\])Delta\b/g, "$1\\Delta")
    .replace(/(^|[^\\])Omega\b/g, "$1\\Omega")
    .replace(/(^|[^\\])Sigma\b/g, "$1\\Sigma")
    .replace(/(^|[^\\])parallel\b/g, "$1\\parallel")
    .replace(/(^|[^\\])perp\b/g, "$1\\perp")
    .replace(/(^|[^\\])dots\b/g, "$1\\dots")
    .replace(/(^|[^\\])in\b/g, "$1\\in")
    .replace(/(^|[^\\])infty\b/g, "$1\\infty");
}
