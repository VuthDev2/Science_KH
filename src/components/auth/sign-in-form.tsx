import { useState } from "react";
import { Loader2, Mail, Lock, Eye, EyeOff, AlertCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { MobileBrandHeader } from "./mobile-brand-header";
import { AtomOrbitalGraphic } from "./atom-orbital-graphic";
import { isAllowedEmailDomain } from "@/lib/security/email-validator";
import type { AuthCopy } from "./types";

interface SignInFormProps {
  copy: AuthCopy;
  onSubmit: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  onGoogleSignIn: () => Promise<void>;
  onGuestSignIn?: () => void;
  onForgotPasswordClick: () => void;
  onSwitchToSignUp: () => void;
  submitting: boolean;
  googleLoading: boolean;
  serverError: string | null;
  onClearServerError: () => void;
}

export function SignInForm({
  copy,
  onSubmit,
  onGoogleSignIn,
  onGuestSignIn,
  onForgotPasswordClick,
  onSwitchToSignUp,
  submitting,
  googleLoading,
  serverError,
  onClearServerError,
}: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [capsLockActive, setCapsLockActive] = useState(false);

  // Field validation on blur
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

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

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) return;

    await onSubmit(email.trim(), password, rememberMe);
  };

  return (
    <div className="w-full max-w-[480px] mx-auto">
      {/* Expanded, High-Craft Auth Card */}
      <div className="bg-white/95 backdrop-blur-md rounded-[24px] border border-slate-200/90 p-8 sm:p-9 shadow-[0_8px_30px_rgb(0,0,0,0.04),0_1px_3px_rgb(0,0,0,0.02)] relative overflow-hidden">
        {/* Mobile: Centered Atom Orbital Graphic in the background of the form */}
        <div className="lg:hidden absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none z-0">
          <div className="relative w-[380px] h-[380px] opacity-[0.24] pointer-events-none">
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
          <div className="hidden lg:grid grid-cols-2 p-1 bg-slate-100/90 rounded-[12px] border border-slate-200/60 mb-5">
            <button
              type="button"
              className="h-10 rounded-[9px] text-xs font-bold bg-white text-[#111827] shadow-xs cursor-default transition-all"
            >
              {copy.signIn.title}
            </button>
            <button
              type="button"
              onClick={onSwitchToSignUp}
              className="h-10 rounded-[9px] text-xs font-semibold text-[#64748B] hover:text-[#111827] transition-all cursor-pointer"
            >
              {copy.signUp.title}
            </button>
          </div>

        {/* Heading & Subtitle */}
        <div className="space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <h2 className="text-2xl sm:text-[26px] font-bold text-[#111827] tracking-tight">
            {copy.signIn.title}
          </h2>
          <p className="text-sm text-[#64748B] leading-relaxed">
            {copy.signIn.subtitle}
          </p>
        </div>

        {/* Subtle Divider */}
        <div className="h-px bg-slate-100 my-5" />

        {/* Server Error Alert */}
        {serverError && (
          <div
            role="alert"
            aria-live="polite"
            className="mb-5 p-3.5 rounded-[14px] bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-in fade-in duration-200"
          >
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span className="leading-relaxed font-medium">{serverError}</span>
          </div>
        )}

        {/* Form with spacious 50px inputs and comfortable field spacing */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4.5" noValidate>
          {/* Email Address Field */}
          <div className="space-y-1.5">
            <Label
              htmlFor="signin-email"
              className="text-xs font-semibold uppercase tracking-wider text-[#111827] block"
            >
              {copy.signIn.emailLabel}
            </Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <Input
                id="signin-email"
                type="email"
                autoComplete="email"
                required
                aria-invalid={!!emailError}
                aria-describedby={emailError ? "signin-email-error" : undefined}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) validateEmail(e.target.value);
                }}
                onBlur={() => validateEmail(email)}
                placeholder={copy.signIn.emailPlaceholder}
                className={`h-[50px] pl-11 rounded-[14px] text-sm text-[#111827] placeholder:text-[#94A3B8] transition-all bg-slate-50/60 hover:bg-white focus:bg-white border ${
                  emailError
                    ? "border-rose-400 focus:ring-4 focus:ring-rose-500/10 bg-rose-50/20"
                    : "border-slate-200 hover:border-slate-300 focus:border-[#059669] focus:ring-4 focus:ring-[#059669]/10"
                }`}
              />
            </div>
            {emailError ? (
              <p id="signin-email-error" className="text-xs text-rose-600 font-medium">
                {emailError}
              </p>
            ) : (
              <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-emerald-600 shrink-0" />
                <span>{copy.validation.emailDomainHint}</span>
              </p>
            )}
          </div>

          {/* Password Field with Forgot Link */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="signin-password"
                className="text-xs font-semibold uppercase tracking-wider text-[#111827] block"
              >
                {copy.signIn.passwordLabel}
              </Label>
              <button
                type="button"
                onClick={onForgotPasswordClick}
                className="text-xs font-semibold text-[#059669] hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#059669] rounded cursor-pointer"
              >
                {copy.signIn.forgotPassword}
              </button>
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <Input
                id="signin-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                aria-invalid={!!passwordError}
                aria-describedby={passwordError ? "signin-password-error" : undefined}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) validatePassword(e.target.value);
                }}
                onKeyDown={handlePasswordKeyDown}
                onKeyUp={handlePasswordKeyDown}
                onBlur={() => validatePassword(password)}
                placeholder={copy.signIn.passwordPlaceholder}
                className={`h-[50px] pl-11 pr-11 rounded-[14px] text-sm text-[#111827] placeholder:text-[#94A3B8] transition-all bg-slate-50/60 hover:bg-white focus:bg-white border ${
                  passwordError
                    ? "border-rose-400 focus:ring-4 focus:ring-rose-500/10 bg-rose-50/20"
                    : "border-slate-200 hover:border-slate-300 focus:border-[#059669] focus:ring-4 focus:ring-[#059669]/10"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#111827] p-1.5 rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#059669] transition-colors cursor-pointer"
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
              <p id="signin-password-error" className="text-xs text-rose-600 font-medium">
                {passwordError}
              </p>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center space-x-2.5 pt-0.5">
            <Checkbox
              id="signin-remember-me"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(Boolean(checked))}
              className="data-[state=checked]:bg-[#059669] data-[state=checked]:border-[#059669] rounded-[4px]"
            />
            <Label
              htmlFor="signin-remember-me"
              className="text-xs font-medium text-[#64748B] cursor-pointer select-none"
            >
              {copy.signIn.rememberMe}
            </Label>
          </div>

          {/* Primary Action Button: 50px height, 14px radius, #059669 with subtle elevation */}
          <Button
            type="submit"
            disabled={submitting}
            className="w-full h-[50px] rounded-[14px] bg-[#059669] hover:bg-[#047857] text-white font-semibold text-sm shadow-[0_4px_16px_rgba(5,150,105,0.22)] hover:shadow-[0_6px_20px_rgba(5,150,105,0.28)] active:scale-[0.99] transition-all mt-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#059669]"
          >
            {submitting ? (
              <span className="inline-flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>{copy.signIn.submitting}</span>
              </span>
            ) : (
              <span>{copy.signIn.submitButton}</span>
            )}
          </Button>

          {/* Divider */}
          <div className="relative my-4">
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
              onClick={onGoogleSignIn}
              disabled={googleLoading || submitting}
              className="w-full h-[50px] rounded-[14px] border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-[#111827] font-medium text-sm transition-all cursor-pointer flex items-center justify-center gap-3 shadow-none active:scale-[0.99]"
            >
              {googleLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-[#64748B]" />
              ) : (
                <GoogleMark />
              )}
              <span>{copy.oauth.continueGoogle}</span>
            </Button>
          </div>

          {/* Guest / Event Demo Access Button */}
          {onGuestSignIn && (
            <div className="pt-2">
              <button
                type="button"
                onClick={onGuestSignIn}
                className="w-full h-[48px] rounded-[14px] border-2 border-emerald-500/40 hover:border-emerald-500 bg-emerald-50/70 hover:bg-emerald-100/80 text-emerald-800 font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs active:scale-[0.99]"
              >
                <span>🎮</span>
                <span>
                  {copy.header.brandTagline === "Grades 7–12"
                    ? "Try Demo / Play as Guest"
                    : "សាកល្បងលេងជាភ្ញៀវ (Event Demo)"}
                </span>
              </button>
            </div>
          )}
        </form>

        {/* Footer: Sign Up Switch */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-center text-sm text-[#64748B]">
          <span>{copy.signIn.noAccountPrompt}</span>
          <button
            type="button"
            onClick={onSwitchToSignUp}
            className="font-semibold text-[#059669] hover:text-[#047857] hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#059669] rounded ml-1 cursor-pointer"
          >
            {copy.signIn.signUpLink}
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
