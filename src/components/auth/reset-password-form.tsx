import { useState } from "react";
import { Loader2, Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MobileBrandHeader } from "./mobile-brand-header";
import { AtomOrbitalGraphic } from "./atom-orbital-graphic";
import type { AuthCopy } from "./types";

interface ResetPasswordFormProps {
  copy: AuthCopy;
  onSubmit: (newPassword: string) => Promise<boolean>;
  onSwitchToSignIn: () => void;
  submitting: boolean;
  serverError: string | null;
  onClearServerError: () => void;
}

export function ResetPasswordForm({
  copy,
  onSubmit,
  onSwitchToSignIn,
  submitting,
  serverError,
  onClearServerError,
}: ResetPasswordFormProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [capsLockActive, setCapsLockActive] = useState(false);
  const [success, setSuccess] = useState(false);

  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.getModifierState && e.getModifierState("CapsLock")) {
      setCapsLockActive(true);
    } else {
      setCapsLockActive(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onClearServerError();

    const isPasswordValid = validatePassword(password);
    const isConfirmValid = validateConfirmPassword(confirmPassword, password);

    if (!isPasswordValid || !isConfirmValid) return;

    const ok = await onSubmit(password);
    if (ok) {
      setSuccess(true);
    }
  };

  return (
    <div className="w-full max-w-[480px] mx-auto">
      {/* Expanded, High-Craft Auth Card */}
      <div className="bg-white/95 backdrop-blur-md rounded-[24px] border border-slate-200/90 p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04),0_1px_3px_rgb(0,0,0,0.02)] relative overflow-hidden">
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
        {success ? (
          /* Success Confirmation */
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="w-14 h-14 rounded-[16px] bg-emerald-50 text-[#059669] flex items-center justify-center border border-emerald-100 shadow-xs">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-[26px] font-bold text-[#111827] tracking-tight">
                {copy.resetPassword.title}
              </h2>
              <p className="text-sm text-[#64748B] leading-relaxed">
                {copy.resetPassword.successToast}
              </p>
            </div>

            <Button
              type="button"
              onClick={onSwitchToSignIn}
              className="w-full h-[50px] rounded-[14px] bg-[#059669] hover:bg-[#047857] text-white font-semibold text-sm shadow-[0_4px_16px_rgba(5,150,105,0.22)] transition-all cursor-pointer"
            >
              {copy.resetPassword.backToSignIn}
            </Button>
          </div>
        ) : (
          /* Password Update Form */
          <>
            {/* Mobile: Brand Logo & Name */}
            <MobileBrandHeader
              subtitle={
                copy.header.brandTagline === "Grades 7–12"
                  ? "Cambodian STEM Platform"
                  : "វេទិកាអប់រំ STEM កម្ពុជា"
              }
            />

            {/* Heading & Subtitle */}
            <div className="space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-2xl sm:text-[26px] font-bold text-[#111827] tracking-tight">
                {copy.resetPassword.title}
              </h2>
              <p className="text-sm text-[#64748B] leading-relaxed">
                {copy.resetPassword.subtitle}
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

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* New Password Field */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="reset-password"
                  className="text-xs font-semibold uppercase tracking-wider text-[#111827] block"
                >
                  {copy.resetPassword.passwordLabel}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                  <Input
                    id="reset-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    aria-invalid={!!passwordError}
                    aria-describedby={passwordError ? "reset-pwd-error" : undefined}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError) validatePassword(e.target.value);
                    }}
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyDown}
                    onBlur={() => validatePassword(password)}
                    placeholder={copy.resetPassword.passwordPlaceholder}
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
                {passwordError && (
                  <p id="reset-pwd-error" className="text-xs text-rose-600 font-medium">
                    {passwordError}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="reset-confirm"
                  className="text-xs font-semibold uppercase tracking-wider text-[#111827] block"
                >
                  {copy.resetPassword.confirmPasswordLabel}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                  <Input
                    id="reset-confirm"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    aria-invalid={!!confirmError}
                    aria-describedby={confirmError ? "reset-confirm-error" : undefined}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (confirmError) validateConfirmPassword(e.target.value, password);
                    }}
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyDown}
                    onBlur={() => validateConfirmPassword(confirmPassword, password)}
                    placeholder={copy.resetPassword.confirmPasswordPlaceholder}
                    className={`h-[50px] pl-11 pr-11 rounded-[14px] text-sm text-[#111827] placeholder:text-[#94A3B8] transition-all bg-slate-50/60 hover:bg-white focus:bg-white border ${
                      confirmError
                        ? "border-rose-400 focus:ring-4 focus:ring-rose-500/10 bg-rose-50/20"
                        : "border-slate-200 hover:border-slate-300 focus:border-[#059669] focus:ring-4 focus:ring-[#059669]/10"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#111827] p-1.5 rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#059669] transition-colors cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {confirmError && (
                  <p id="reset-confirm-error" className="text-xs text-rose-600 font-medium">
                    {confirmError}
                  </p>
                )}
              </div>

              {capsLockActive && (
                <p className="text-[11px] text-amber-700 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span>{copy.validation.capsLockOn}</span>
                </p>
              )}

              {/* Submit Button: 50px, 14px radius, #059669 */}
              <Button
                type="submit"
                disabled={submitting}
                className="w-full h-[50px] rounded-[14px] bg-[#059669] hover:bg-[#047857] text-white font-semibold text-sm shadow-[0_4px_16px_rgba(5,150,105,0.22)] hover:shadow-[0_6px_20px_rgba(5,150,105,0.28)] active:scale-[0.99] transition-all mt-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#059669]"
              >
                {submitting ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>{copy.resetPassword.submitting}</span>
                  </span>
                ) : (
                  <span>{copy.resetPassword.submitButton}</span>
                )}
              </Button>
            </form>

            {/* Back to Sign In Link */}
            <div className="mt-6 pt-5 border-t border-slate-100 text-center text-sm">
              <button
                type="button"
                onClick={onSwitchToSignIn}
                className="font-semibold text-[#059669] hover:text-[#047857] hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#059669] rounded cursor-pointer"
              >
                {copy.resetPassword.backToSignIn}
              </button>
            </div>
          </>
        )}
        </div>
      </div>
    </div>
  );
}
