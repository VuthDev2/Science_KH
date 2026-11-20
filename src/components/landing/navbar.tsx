import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Atom, Menu, X, Globe, ArrowRight } from "lucide-react";
import type { LandingCopy, SupportedLanguage } from "./types";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  copy: LandingCopy["nav"];
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

export function Navbar({ copy, currentLang, onLanguageChange }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: "#features", label: copy.features },
    { href: "#how-it-works", label: copy.howItWorks },
    { href: "#curriculum", label: copy.curriculum },
    { href: "#exam-prep", label: copy.examPrep },
    { href: "#pricing", label: copy.pricing },
    { href: "#faq", label: copy.faq },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1 -m-1"
            aria-label="ScienceKH Home"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200 shrink-0">
              <Atom className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-500 group-hover:rotate-180" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-xl tracking-tight text-slate-900 leading-tight">
                Science<span className="text-emerald-600">KH</span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 leading-none">
                {currentLang === "km" ? "វិទ្យាសាស្ត្រ ថ្នាក់ទី ៧-១២" : "STEM Grade 7–12"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Switcher */}
            <div
              className="inline-flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200"
              role="group"
              aria-label={copy.languageToggleAria}
            >
              <button
                type="button"
                onClick={() => onLanguageChange("km")}
                aria-pressed={currentLang === "km"}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  currentLang === "km"
                    ? "bg-white text-emerald-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                ខ្មែរ
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange("en")}
                aria-pressed={currentLang === "en"}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  currentLang === "en"
                    ? "bg-white text-emerald-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                EN
              </button>
            </div>

            {/* Auth Buttons */}
            <Link
              to="/auth"
              className="text-sm font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-md transition-colors"
            >
              {copy.signIn}
            </Link>

            <Link
              to="/auth"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 shadow-sm hover:shadow transition-all duration-150 active:scale-98"
            >
              <span>{copy.getStarted}</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </Link>
          </div>

          {/* Mobile Right Action Cluster: Language Toggle + Quick Start CTA + Menu Toggle */}
          <div className="flex sm:hidden items-center gap-1.5">
            <button
              type="button"
              onClick={() => onLanguageChange(currentLang === "km" ? "en" : "km")}
              className="px-2 py-1 text-xs font-bold rounded-lg border border-slate-200 bg-slate-50 text-slate-700 active:bg-slate-100"
              aria-label={copy.languageToggleAria}
            >
              {currentLang === "km" ? "EN" : "ខ្មែរ"}
            </button>

            <Link
              to="/auth"
              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-600 text-white shadow-2xs hover:bg-emerald-700 active:scale-95 transition-all"
            >
              {currentLang === "km" ? "ចាប់ផ្តើម" : "Start"}
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              aria-label={mobileMenuOpen ? copy.closeMenuAria : copy.menuToggleAria}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col gap-3">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                Language / ភាសា
              </span>
              <div className="inline-flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200">
                <button
                  type="button"
                  onClick={() => onLanguageChange("km")}
                  className={`px-3 py-1 text-xs font-semibold rounded-md ${
                    currentLang === "km" ? "bg-white text-emerald-700 shadow-xs" : "text-slate-600"
                  }`}
                >
                  ភាសាខ្មែរ
                </button>
                <button
                  type="button"
                  onClick={() => onLanguageChange("en")}
                  className={`px-3 py-1 text-xs font-semibold rounded-md ${
                    currentLang === "en" ? "bg-white text-emerald-700 shadow-xs" : "text-slate-600"
                  }`}
                >
                  English
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link
                to="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-sm font-semibold text-slate-700 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                {copy.signIn}
              </Link>
              <Link
                to="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-sm font-semibold bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
              >
                {copy.getStarted}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
