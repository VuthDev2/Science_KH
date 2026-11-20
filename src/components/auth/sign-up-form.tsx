import { useState } from "react";
import { Loader2, Mail, Lock, User, Eye, EyeOff, AlertCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { MobileBrandHeader } from "./mobile-brand-header";
import { AtomOrbitalGraphic } from "./atom-orbital-graphic";
import { isAllowedEmailDomain } from "@/lib/security/email-validator";
import type { AuthCopy } from "./types";

interface SignUpFormProps {
  copy: AuthCopy;
  onSubmit: (name: string, email: string, password: string, grade: number) => Promise<void>;
  onGoogleSignUp: () => Promise<void>;
  onSwitchToSignIn: () => void;
  submitting: boolean;
  googleLoading: boolean;
  serverError: string | null;
  onClearServerError: () => void;
}

export function SignUpForm({
  copy,
  onSubmit,
  onGoogleSignUp,
  onSwitchToSignIn,
  submitting,
  googleLoading,
  serverError,
  onClearServerError,
}: SignUpFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<number>(12);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(true);
  const [capsLockActive, setCapsLockActive] = useState(false);

  // Field errors
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [termsError, setTermsError] = useState<string | null>(null);

  const validateName = (val: string): boolean => {
    if (!val.trim()) {
      setNameError(copy.validation.nameRequired);
      return false;
    }
    setNameError(null);
    return true;
  };

  const validateEmail = (val: string): boolean => {
    const trimmed = val.trim();
    if (!trimmed) {
      setEmailError(copy.validation.emailRequired);
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setEmailError(copy.validation.emailInvalid);
      return false;
    }
    if (!isAllowedEmailDomain(trimmed)) {
      setEmailError(copy.validation.emailDomainRestricted);
      return false;
    }
    setEmailError(null);
    return true;
  };

  const validatePassword = (val: string): boolean => {
    if (!val) {
      setPasswordError(copy.validation.passwordRequired);
      return false;
    }
    if (val.length < 6) {
      setPasswordError(copy.validation.passwordMin);
      return false;
    }
    setPasswordError(null);
    return true;
  };

  const validateConfirmPassword = (val: string, pwd: string): boolean => {
    if (!val) {
      setConfirmError(copy.validation.confirmPasswordRequired);
      return false;
    }
    if (val !== pwd) {
      setConfirmError(copy.validation.passwordMismatch);
      return false;
    }
    setConfirmError(null);
    return true;
  };

  const handlePasswordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.getModifierState && e.getModifierState("CapsLock")) {
      setCapsLockActive(true);
    } else {
      setCapsLockActive(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onClearServerError();

    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmValid = validateConfirmPassword(confirmPassword, password);

    if (!termsAgreed) {
      setTermsError(copy.validation.termsRequired);
      return;
    } else {
      setTermsError(null);
    }

    if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmValid) return;

    await onSubmit(name.trim(), email.trim(), password, selectedGrade);
  };

  return (
    <div className="w-full max-w-[480px] mx-auto">
      {/* Expanded, High-Craft Auth Card */}
      <div className="bg-white/95 backdrop-blur-md rounded-[24px] border border-slate-200/90 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04),0_1px_3px_rgb(0,0,0,0.02)] relative overflow-hidden">
        {/* Mobile: Centered Atom Orbital Graphic in the background of the form */}
        <div className="lg:hidden absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none z-0">
          <div className="relative w-[400px] h-[400px] opacity-[0.24] pointer-events-none">
            {/* Ambient Emerald Core Glow */}
            <div className="absolute inset-10 rounded-full bg-[#059669]/20 blur-2xl pointer-events-none" />
            <AtomOrbitalGraphic isDark={false} />
          </div>
        </div>

        {/* Card Content with z-10 relative stacking */}
        <div className="relative z-10">
          {/* Mobile: Brand Logo & Name (Replaces switch on mobile where left hero panel is hidden) */}
          <MobileBrandHeader
            subtitle={
              copy.header.brandTagline === "Grades 7–12"
                ? "Cambodian STEM Platform"
                : "វេទិកាអប់រំ STEM កម្ពុជា"
            }
          />

          {/* Desktop Mode Switcher Tabs */}
          <div className="hidden lg:grid grid-cols-2 p-1 bg-slate-100/90 rounded-[12px] border border-slate-200/60 mb-4">
            <button
              type="button"
              onClick={onSwitchToSignIn}
              className="h-9 rounded-[9px] text-xs font-semibold text-[#64748B] hover:text-[#111827] transition-all cursor-pointer"
            >
              {copy.signIn.title}
            </button>
            <button
              type="button"
              className="h-9 rounded-[9px] text-xs font-bold bg-white text-[#111827] shadow-xs cursor-default transition-all"
            >
              {copy.signUp.title}
            </button>
          </div>

        {/* Heading & Subtitle */}
        <div className="space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <h2 className="text-2xl font-bold text-[#111827] tracking-tight">
            {copy.signUp.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
            {copy.signUp.subtitle}
          </p>
        </div>

        {/* Subtle Divider */}
        <div className="h-px bg-slate-100 my-4" />

        {/* Server Error Alert */}
        {serverError && (
          <div
            role="alert"
            aria-live="polite"
            className="mb-4 p-3 rounded-[12px] bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-in fade-in duration-200"
          >
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span className="leading-relaxed font-medium">{serverError}</span>
          </div>
        )}

        {/* Form with optimized field spacing */}
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5" noValidate>
          {/* Full Name Field */}
          <div className="space-y-1">
            <Label
              htmlFor="signup-name"
              className="text-xs font-semibold uppercase tracking-wider text-[#111827] block"
            >
              {copy.signUp.nameLabel}
            </Label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <Input
                id="signup-name"
                type="text"
                autoComplete="name"
                required
                aria-invalid={!!nameError}
                aria-describedby={nameError ? "signup-name-error" : undefined}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (nameError) validateName(e.target.value);
                }}
                onBlur={() => validateName(name)}
                placeholder={copy.signUp.namePlaceholder}
                className={`h-[46px] pl-10 rounded-[12px] text-sm text-[#111827] placeholder:text-[#94A3B8] transition-all bg-slate-50/60 hover:bg-white focus:bg-white border ${
                  nameError
                    ? "border-rose-400 focus:ring-4 focus:ring-rose-500/10 bg-rose-50/20"
                    : "border-slate-200 hover:border-slate-300 focus:border-[#059669] focus:ring-4 focus:ring-[#059669]/10"
                }`}
              />
            </div>
            {nameError && (
              <p id="signup-name-error" className="text-xs text-rose-600 font-medium">
                {nameError}
              </p>
            )}
          </div>

          {/* Grade Level Selector (6 Spacious Pills) */}
          <div className="space-y-1">
            <Label className="text-xs font-semibold uppercase tracking-wider text-[#111827] block">
              Grade Level • ថ្នាក់ទី
            </Label>
            <div className="grid grid-cols-6 gap-1.5">
              {[7, 8, 9, 10, 11, 12].map((g) => {
                const isSelected = selectedGrade === g;
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setSelectedGrade(g)}
                    className={`h-9 rounded-[10px] text-xs font-semibold transition-all cursor-pointer border ${
                      isSelected
                        ? "bg-[#059669] text-white border-[#059669] shadow-[0_2px_8px_rgba(5,150,105,0.25)]"
                        : "bg-slate-50/80 text-[#64748B] border-slate-200 hover:bg-slate-100 hover:text-[#111827]"
                    }`}
                  >
                    Gr. {g}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Email Address Field */}
          <div className="space-y-1">
            <Label
              htmlFor="signup-email"
              className="text-xs font-semibold uppercase tracking-wider text-[#111827] block"
            >
              {copy.signUp.emailLabel}
            </Label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <Input
                id="signup-email"
                type="email"
                autoComplete="email"
                required
                aria-invalid={!!emailError}
                aria-describedby={emailError ? "signup-email-error" : undefined}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) validateEmail(e.target.value);
                }}
                onBlur={() => validateEmail(email)}
                placeholder={copy.signUp.emailPlaceholder}
                className={`h-[46px] pl-10 rounded-[12px] text-sm text-[#111827] placeholder:text-[#94A3B8] transition-all bg-slate-50/60 hover:bg-white focus:bg-white border ${
                  emailError
                    ? "border-rose-400 focus:ring-4 focus:ring-rose-500/10 bg-rose-50/20"
                    : "border-slate-200 hover:border-slate-300 focus:border-[#059669] focus:ring-4 focus:ring-[#059669]/10"
                }`}
              />
            </div>
            {emailError ? (
              <p id="signup-email-error" className="text-xs text-rose-600 font-medium">
                {emailError}
              </p>
            ) : (
              <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-emerald-600 shrink-0" />
                <span>{copy.validation.emailDomainHint}</span>
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <Label
              htmlFor="signup-password"
              className="text-xs font-semibold uppercase tracking-wider text-[#111827] block"
            >
              {copy.signUp.passwordLabel}
            </Label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <Input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                aria-invalid={!!passwordError}
                aria-describedby={passwordError ? "signup-password-error" : undefined}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) validatePassword(e.target.value);
                  if (confirmPassword && confirmError) {
                    validateConfirmPassword(confirmPassword, e.target.value);
                  }
                }}
                onKeyDown={handlePasswordKeyDown}
                onKeyUp={handlePasswordKeyDown}
                onBlur={() => validatePassword(password)}
                placeholder={copy.signUp.passwordPlaceholder}
                className={`h-[46px] pl-10 pr-10 rounded-[12px] text-sm text-[#111827] placeholder:text-[#94A3B8] transition-all bg-slate-50/60 hover:bg-white focus:bg-white border ${
                  passwordError
                    ? "border-rose-400 focus:ring-4 focus:ring-rose-500/10 bg-rose-50/20"
                    : "border-slate-200 hover:border-slate-300 focus:border-[#059669] focus:ring-4 focus:ring-[#059669]/10"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#111827] p-1.5 rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#059669] transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {capsLockActive && (
              <p className="text-[11px] text-amber-700 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>{copy.validation.capsLockOn}</span>
              </p>
            )}

            {passwordError && (
              <p id="signup-password-error" className="text-xs text-rose-600 font-medium">
                {passwordError}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-1">
            <Label
              htmlFor="signup-confirm-password"
              className="text-xs font-semibold uppercase tracking-wider text-[#111827] block"
            >
              {copy.signUp.confirmPasswordLabel}
            </Label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <Input
                id="signup-confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                aria-invalid={!!confirmError}
                aria-describedby={confirmError ? "signup-confirm-error" : undefined}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (confirmError) validateConfirmPassword(e.target.value, password);
                }}
                onKeyDown={handlePasswordKeyDown}
                onKeyUp={handlePasswordKeyDown}
                onBlur={() => validateConfirmPassword(confirmPassword, password)}
                placeholder={copy.signUp.confirmPasswordPlaceholder}
                className={`h-[46px] pl-10 pr-10 rounded-[12px] text-sm text-[#111827] placeholder:text-[#94A3B8] transition-all bg-slate-50/60 hover:bg-white focus:bg-white border ${
                  confirmError
                    ? "border-rose-400 focus:ring-4 focus:ring-rose-500/10 bg-rose-50/20"
                    : "border-slate-200 hover:border-slate-300 focus:border-[#059669] focus:ring-4 focus:ring-[#059669]/10"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#111827] p-1.5 rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#059669] transition-colors cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {confirmError && (
              <p id="signup-confirm-error" className="text-xs text-rose-600 font-medium">
                {confirmError}
              </p>
            )}
          </div>

          {/* Terms & Conditions Checkbox */}
          <div className="space-y-1 pt-0.5">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="signup-terms"
                checked={termsAgreed}
                onCheckedChange={(checked) => {
                  setTermsAgreed(Boolean(checked));
                  if (checked) setTermsError(null);
                }}
                className="mt-0.5 data-[state=checked]:bg-[#059669] data-[state=checked]:border-[#059669] rounded-[4px]"
              />
              <Label
                htmlFor="signup-terms"
                className="text-xs text-[#64748B] leading-relaxed cursor-pointer select-none"
              >
                {copy.signUp.termsAgreementPrefix}{" "}
                <a
                  href="#terms"
                  className="font-medium text-[#111827] underline hover:text-[#059669]"
                >
                  {copy.signUp.termsLink}
                </a>{" "}
                {copy.signUp.termsAgreementAnd}{" "}
                <a
                  href="#privacy"
                  className="font-medium text-[#111827] underline hover:text-[#059669]"
                >
                  {copy.signUp.privacyLink}
                </a>
              </Label>
            </div>
            {termsError && (
              <p className="text-xs text-rose-600 font-medium">{termsError}</p>
            )}
          </div>

          {/* Primary Action Button: 48px height, 12px radius, #059669 */}
          <Button
            type="submit"
            disabled={submitting}
            className="w-full h-[48px] rounded-[12px] bg-[#059669] hover:bg-[#047857] text-white font-semibold text-sm shadow-[0_4px_16px_rgba(5,150,105,0.22)] hover:shadow-[0_6px_20px_rgba(5,150,105,0.28)] active:scale-[0.99] transition-all mt-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#059669]"
          >
            {submitting ? (
              <span className="inline-flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>{copy.signUp.submitting}</span>
              </span>
            ) : (
              <span>{copy.signUp.submitButton}</span>
            )}
          </Button>

          {/* Divider */}
          <div className="relative my-3">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-[#94A3B8] font-medium tracking-wider">
                {copy.oauth.orDivider}
              </span>
            </div>
          </div>

          {/* Social OAuth Button: Google */}
          <div>
            <Button
              type="button"
              variant="outline"
              onClick={onGoogleSignUp}
              disabled={googleLoading || submitting}
              className="w-full h-[46px] rounded-[12px] border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-[#111827] font-medium text-sm transition-all cursor-pointer flex items-center justify-center gap-2.5 shadow-none active:scale-[0.99]"
            >
              {googleLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-[#64748B]" />
              ) : (
                <GoogleMark />
              )}
              <span>{copy.oauth.signUpGoogle}</span>
            </Button>
          </div>
        </form>

        {/* Footer: Sign In Switch */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 text-center text-sm text-[#64748B]">
          <span>{copy.signUp.hasAccountPrompt}</span>
          <button
            type="button"
            onClick={onSwitchToSignIn}
            className="font-semibold text-[#059669] hover:text-[#047857] hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#059669] rounded ml-1 cursor-pointer"
          >
            {copy.signUp.signInLink}
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" className="h-4 w-4 shrink-0" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35.5 24 35.5c-6.4 0-11.5-5.1-11.5-11.5S17.6 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.9 6.5 29.2 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.4-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 16 19 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.9 6.5 29.2 4.5 24 4.5 16.4 4.5 9.8 8.7 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 43.5c5.1 0 9.7-1.9 13.2-5.1l-6.1-5c-2 1.4-4.5 2.2-7.1 2.2-5.3 0-9.7-3.1-11.3-7.4l-6.5 5C9.7 39.2 16.3 43.5 24 43.5z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.1 4.3-3.8 5.8l6.1 5C41.4 35.3 44 30.1 44 24c0-1.2-.1-2.4-.4-3.5z"
      />
    </svg>
  );
}
