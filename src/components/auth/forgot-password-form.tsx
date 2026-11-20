import { useState, useEffect, useRef } from "react";
import {
  Loader2,
  Mail,
  CheckCircle2,
  AlertCircle,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MobileBrandHeader } from "./mobile-brand-header";
import { AtomOrbitalGraphic } from "./atom-orbital-graphic";
import { isAllowedEmailDomain } from "@/lib/security/email-validator";
import type { AuthCopy } from "./types";

interface ForgotPasswordFormProps {
  copy: AuthCopy;
  isKhmer?: boolean;
  onSendOtp: (email: string) => Promise<boolean>;
  onVerifyOtpOnly: (data: { email: string; code: string }) => Promise<boolean>;
  onVerifyOtpAndReset: (data: { email: string; code: string; newPassword: string }) => Promise<boolean>;
  onSwitchToSignIn: () => void;
  submitting: boolean;
  serverError: string | null;
  onClearServerError: () => void;
}

/**
 * Mask email to format: ra**********@gmail.com
 */
function maskEmail(val: string): string {
  const at = val.indexOf("@");
  if (at === -1) return val;
  const user = val.slice(0, at);
  const domain = val.slice(at);
  if (user.length <= 2) return `${user[0]}*${domain}`;
  const visible = user.slice(0, 2);
  const starCount = Math.max(8, user.length - 2);
  const stars = "*".repeat(Math.min(starCount, 10));
  return `${visible}${stars}${domain}`;
}

export function ForgotPasswordForm({
  copy,
  isKhmer = false,
  onSendOtp,
  onVerifyOtpOnly,
  onVerifyOtpAndReset,
  onSwitchToSignIn,
  submitting,
  serverError,
  onClearServerError,
}: ForgotPasswordFormProps) {
  // Steps: "email" | "otp" | "new-password" | "success"
  const [step, setStep] = useState<"email" | "otp" | "new-password" | "success">("email");

  const [email, setEmail] = useState("");
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation errors
  const [emailError, setEmailError] = useState<string | null>(null);
  const [codeError, setCodeError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);

  // 60-second Resend cooldown timer
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Focus first digit box when moving to OTP step
  useEffect(() => {
    if (step === "otp") {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [step]);

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

  // Step 1: Send OTP via Nodemailer
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    onClearServerError();

    if (!validateEmail(email)) return;

    const ok = await onSendOtp(email.trim());
    if (ok) {
      setStep("otp");
      setDigits(["", "", "", "", "", ""]);
      setCodeError(null);
      setResendCooldown(60);
    }
  };

  // Resend OTP with 60s cooldown reset
  const handleResend = async () => {
    if (resendCooldown > 0 || submitting) return;
    onClearServerError();
    const ok = await onSendOtp(email.trim());
    if (ok) {
      setResendCooldown(60);
      setDigits(["", "", "", "", "", ""]);
      setCodeError(null);
      inputRefs.current[0]?.focus();
    }
  };

  // Handle individual digit typing with auto-advancing
  const handleDigitChange = (index: number, value: string) => {
    const char = value.replace(/\D/g, "").slice(-1);
    const newDigits = [...digits];
    newDigits[index] = char;
    setDigits(newDigits);
    setCodeError(null);

    // If entered a digit and not the last box, advance focus
    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace navigation and arrow keys
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        // Current empty, focus and clear previous box
        const newDigits = [...digits];
        newDigits[index - 1] = "";
        setDigits(newDigits);
        inputRefs.current[index - 1]?.focus();
      } else {
        const newDigits = [...digits];
        newDigits[index] = "";
        setDigits(newDigits);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle paste of 6-digit code
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;

    const newDigits = [...digits];
    for (let i = 0; i < 6; i++) {
      newDigits[i] = pasted[i] || "";
    }
    setDigits(newDigits);
    setCodeError(null);

    // Focus last filled box
    const nextIdx = Math.min(pasted.length, 5);
    inputRefs.current[nextIdx]?.focus();
  };

  // Step 2: Verify the 6-digit code
  const handleVerifyCode = async () => {
    onClearServerError();
    const fullCode = digits.join("");
    if (fullCode.length !== 6) {
      setCodeError(
        isKhmer
          ? "សូមបញ្ចូលលេខកូដ ៦ ខ្ទង់ឱ្យបានគ្រប់គ្រាន់"
          : "Please enter all 6 digits of the code"
      );
      return;
    }

    const ok = await onVerifyOtpOnly({
      email: email.trim(),
      code: fullCode,
    });

    if (ok) {
      setStep("new-password");
    }
  };

  // Step 3: Set New Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    onClearServerError();

    const isPasswordValid = validatePassword(password);
    const isConfirmValid = validateConfirmPassword(confirmPassword, password);

    if (!isPasswordValid || !isConfirmValid) return;

    const ok = await onVerifyOtpAndReset({
      email: email.trim(),
      code: digits.join(""),
      newPassword: password,
    });

    if (ok) {
      setStep("success");
    }
  };

  return (
    <div className="w-full max-w-[480px] mx-auto">
      {/* High-Craft Auth Card */}
      <div className="bg-white/95 backdrop-blur-md rounded-[24px] border border-slate-200/90 p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04),0_1px_3px_rgb(0,0,0,0.02)] relative overflow-hidden">
        {/* Mobile: Centered Atom Orbital Graphic in background */}
        <div className="lg:hidden absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none z-0">
          <div className="relative w-[380px] h-[380px] opacity-[0.24] pointer-events-none">
            <div className="absolute inset-10 rounded-full bg-[#059669]/20 blur-2xl pointer-events-none" />
            <AtomOrbitalGraphic isDark={false} />
          </div>
        </div>

        {/* Card Content */}
        <div className="relative z-10">
          {/* Mobile: Brand Logo & Name */}
          <MobileBrandHeader
            subtitle={
              copy.header.brandTagline === "Grades 7–12"
                ? "Cambodian STEM Platform"
                : "វេទិកាអប់រំ STEM កម្ពុជា"
            }
          />

          {/* ================================================================= */}
          {/* STEP 4: SUCCESS STATE */}
          {/* ================================================================= */}
          {step === "success" && (
            <div className="space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#059669] flex items-center justify-center border border-emerald-100 shadow-xs mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-[26px] font-bold text-[#111827] tracking-tight">
                  {copy.resetPassword.successToast || "Password reset successful!"}
                </h2>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  {isKhmer
                    ? "ពាក្យសម្ងាត់របស់អ្នកត្រូវបានផ្លាស់ប្តូរដោយជោគជ័យ។ សូមចូលប្រើប្រាស់គណនីរបស់អ្នកជាមួយពាក្យសម្ងាត់ថ្មី។"
                    : "Your password has been successfully updated. You can now sign in with your new credentials."}
                </p>
              </div>

              <div className="pt-2">
                <Button
                  type="button"
                  onClick={onSwitchToSignIn}
                  className="w-full h-[50px] rounded-[14px] bg-[#059669] hover:bg-[#047857] text-white font-semibold text-sm shadow-[0_4px_16px_rgba(5,150,105,0.22)] transition-all cursor-pointer"
                >
                  {copy.forgotPassword.backToSignIn}
                </Button>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* STEP 1: ENTER EMAIL TO RECEIVE OTP CODE */}
          {/* ================================================================= */}
          {step === "email" && (
            <>
              <div className="space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h2 className="text-2xl sm:text-[26px] font-bold text-[#111827] tracking-tight">
                  {copy.forgotPassword.title}
                </h2>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  {copy.forgotPassword.subtitle}
                </p>
              </div>

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

              <form onSubmit={handleSendCode} className="space-y-4" noValidate>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="forgot-email"
                    className="text-xs font-semibold uppercase tracking-wider text-[#111827] block"
                  >
                    {copy.forgotPassword.emailLabel}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                    <Input
                      id="forgot-email"
                      type="email"
                      autoComplete="email"
                      required
                      aria-invalid={!!emailError}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) validateEmail(e.target.value);
                      }}
                      onBlur={() => validateEmail(email)}
                      placeholder={copy.forgotPassword.emailPlaceholder}
                      className={`h-[50px] pl-11 rounded-[14px] text-sm text-[#111827] placeholder:text-[#94A3B8] transition-all bg-slate-50/60 hover:bg-white focus:bg-white border ${
                        emailError
                          ? "border-rose-400 focus:ring-4 focus:ring-rose-500/10 bg-rose-50/20"
                          : "border-slate-200 hover:border-slate-300 focus:border-[#059669] focus:ring-4 focus:ring-[#059669]/10"
                      }`}
                    />
                  </div>
                  {emailError ? (
                    <p className="text-xs text-rose-600 font-medium">{emailError}</p>
                  ) : (
                    <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3 text-emerald-600 shrink-0" />
                      <span>{copy.validation.emailDomainHint}</span>
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-[50px] rounded-[14px] bg-[#059669] hover:bg-[#047857] text-white font-semibold text-sm shadow-[0_4px_16px_rgba(5,150,105,0.22)] hover:shadow-[0_6px_20px_rgba(5,150,105,0.28)] active:scale-[0.99] transition-all mt-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#059669]"
                >
                  {submitting ? (
                    <span className="inline-flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>{copy.forgotPassword.submitting}</span>
                    </span>
                  ) : (
                    <span>{copy.forgotPassword.submitButton}</span>
                  )}
                </Button>
              </form>

              <div className="mt-6 pt-5 border-t border-slate-100 text-center text-sm">
                <button
                  type="button"
                  onClick={onSwitchToSignIn}
                  className="font-semibold text-[#059669] hover:text-[#047857] hover:underline focus-visible:outline-none rounded cursor-pointer"
                >
                  {copy.forgotPassword.backToSignIn}
                </button>
              </div>
            </>
          )}

          {/* ================================================================= */}
          {/* STEP 2: CHECK YOUR EMAIL (EXACT UI FROM USER SCREENSHOT) */}
          {/* ================================================================= */}
          {step === "otp" && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              {/* Green Shield Icon Badge */}
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#059669] flex items-center justify-center mx-auto border border-emerald-100 shadow-2xs mb-4">
                <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
              </div>

              {/* Title & Subtitle with Masked Email */}
              <div className="text-center space-y-1.5">
                <h2 className="text-2xl sm:text-[26px] font-bold text-[#111827] tracking-tight">
                  {isKhmer ? "ពិនិត្យមើលអ៊ីមែលរបស់អ្នក" : "Check your email"}
                </h2>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  {isKhmer ? "យើងបានផ្ញើលេខកូដ ៦ ខ្ទង់ទៅកាន់" : "We sent a 6-digit code to"}{" "}
                  <strong className="text-[#111827] font-semibold">{maskEmail(email)}</strong>.
                </p>
              </div>

              {/* Server or Code Error Alert */}
              {(serverError || codeError) && (
                <div
                  role="alert"
                  aria-live="polite"
                  className="mt-4 p-3 rounded-[14px] bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5"
                >
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-medium">{serverError || codeError}</span>
                </div>
              )}

              {/* 6 Individual Square OTP Input Boxes */}
              <div
                className="flex items-center justify-center gap-2 sm:gap-3 py-6"
                onPaste={handlePaste}
              >
                {digits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      inputRefs.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleDigitChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className={`w-11 h-12 sm:w-12 sm:h-14 rounded-xl border text-center font-mono text-xl sm:text-2xl font-bold transition-all outline-none ${
                      digit
                        ? "border-[#059669] bg-white text-slate-900 ring-2 ring-[#059669]/15 shadow-2xs"
                        : "border-slate-200 bg-slate-50/60 text-[#111827] hover:border-slate-300 focus:border-[#059669] focus:bg-white focus:ring-4 focus:ring-[#059669]/10"
                    }`}
                  />
                ))}
              </div>

              {/* Action Row: Resend Code with 60s Timer & Use a Different Email */}
              <div className="flex items-center justify-between text-xs sm:text-[13px] px-1 text-[#64748B]">
                {resendCooldown > 0 ? (
                  <span className="text-slate-400 font-medium">
                    {isKhmer
                      ? `ផ្ញើលេខកូដម្តងទៀតក្នុង ${resendCooldown}s`
                      : `Resend code in ${resendCooldown}s`}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={submitting}
                    className="font-semibold text-[#059669] hover:text-[#047857] hover:underline transition cursor-pointer"
                  >
                    {isKhmer ? "ផ្ញើលេខកូដឡើងវិញឥឡូវនេះ" : "Resend code now"}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setStep("email");
                    onClearServerError();
                  }}
                  className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-medium transition cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{isKhmer ? "ប្រើអ៊ីមែលផ្សេង" : "Use a different email"}</span>
                </button>
              </div>

              {/* Verify Code Button */}
              <div className="pt-6">
                <Button
                  type="button"
                  onClick={handleVerifyCode}
                  disabled={submitting || digits.join("").length < 6}
                  className={`w-full h-[50px] rounded-[14px] font-semibold text-sm transition-all cursor-pointer ${
                    digits.join("").length === 6 && !submitting
                      ? "bg-[#059669] hover:bg-[#047857] text-white shadow-[0_4px_16px_rgba(5,150,105,0.22)] active:scale-[0.99]"
                      : "bg-[#a7d7c5] text-white font-medium cursor-not-allowed hover:bg-[#a7d7c5]"
                  }`}
                >
                  {submitting ? (
                    <span className="inline-flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>{isKhmer ? "កំពុងផ្ទៀងផ្ទាត់..." : "Verifying code..."}</span>
                    </span>
                  ) : (
                    <span>{isKhmer ? "ផ្ទៀងផ្ទាត់លេខកូដ" : "Verify code"}</span>
                  )}
                </Button>
              </div>

              {/* Back to sign in link */}
              <div className="mt-6 text-center text-sm">
                <button
                  type="button"
                  onClick={onSwitchToSignIn}
                  className="inline-flex items-center gap-1.5 font-semibold text-slate-600 hover:text-slate-900 transition cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 text-slate-400" />
                  <span>{isKhmer ? "ត្រឡប់ទៅចូលគណនី" : "Back to sign in"}</span>
                </button>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* STEP 3: CREATE NEW PASSWORD */}
          {/* ================================================================= */}
          {step === "new-password" && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#059669] flex items-center justify-center mx-auto border border-emerald-100 shadow-2xs mb-4">
                <Lock className="w-6 h-6 stroke-[2.2]" />
              </div>

              <div className="text-center space-y-1.5">
                <h2 className="text-2xl sm:text-[26px] font-bold text-[#111827] tracking-tight">
                  {isKhmer ? "កំណត់ពាក្យសម្ងាត់ថ្មី" : "Create new password"}
                </h2>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  {isKhmer ? "បញ្ចូលពាក្យសម្ងាត់ថ្មីសម្រាប់" : "Enter a secure new password for"}{" "}
                  <strong className="text-[#111827] font-semibold">{maskEmail(email)}</strong>.
                </p>
              </div>

              <div className="h-px bg-slate-100 my-4" />

              {/* Server Error Alert */}
              {serverError && (
                <div
                  role="alert"
                  aria-live="polite"
                  className="mb-4 p-3 rounded-[14px] bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5"
                >
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-medium">{serverError}</span>
                </div>
              )}

              <form onSubmit={handleResetPassword} className="space-y-4" noValidate>
                {/* New Password */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="new-pwd"
                    className="text-xs font-semibold uppercase tracking-wider text-[#111827] block"
                  >
                    {isKhmer ? "ពាក្យសម្ងាត់ថ្មី" : "New password"}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                    <Input
                      id="new-pwd"
                      type={showPassword ? "text" : "password"}
                      required
                      autoFocus
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (passwordError) validatePassword(e.target.value);
                      }}
                      onBlur={() => validatePassword(password)}
                      placeholder={isKhmer ? "យ៉ាងតិច ៦ តួអក្សរ" : "At least 6 characters"}
                      className="h-[50px] pl-11 pr-11 rounded-[14px] text-sm text-[#111827] bg-slate-50/60 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#059669] focus:ring-4 focus:ring-[#059669]/10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#111827] cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {passwordError && (
                    <p className="text-xs text-rose-600 font-medium">{passwordError}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="confirm-pwd"
                    className="text-xs font-semibold uppercase tracking-wider text-[#111827] block"
                  >
                    {isKhmer ? "បញ្ជាក់ពាក្យសម្ងាត់ថ្មី" : "Confirm new password"}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                    <Input
                      id="confirm-pwd"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (confirmError) validateConfirmPassword(e.target.value, password);
                      }}
                      onBlur={() => validateConfirmPassword(confirmPassword, password)}
                      placeholder={isKhmer ? "វាយពាក្យសម្ងាត់ម្តងទៀត" : "Re-enter new password"}
                      className="h-[50px] pl-11 pr-11 rounded-[14px] text-sm text-[#111827] bg-slate-50/60 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#059669] focus:ring-4 focus:ring-[#059669]/10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#111827] cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {confirmError && (
                    <p className="text-xs text-rose-600 font-medium">{confirmError}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-[50px] rounded-[14px] bg-[#059669] hover:bg-[#047857] text-white font-semibold text-sm shadow-[0_4px_16px_rgba(5,150,105,0.22)] hover:shadow-[0_6px_20px_rgba(5,150,105,0.28)] active:scale-[0.99] transition-all mt-4 cursor-pointer"
                >
                  {submitting ? (
                    <span className="inline-flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>{isKhmer ? "កំពុងផ្លាស់ប្តូរ..." : "Resetting..."}</span>
                    </span>
                  ) : (
                    <span>{isKhmer ? "ផ្លាស់ប្តូរពាក្យសម្ងាត់" : "Reset password"}</span>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <button
                  type="button"
                  onClick={onSwitchToSignIn}
                  className="inline-flex items-center gap-1.5 font-semibold text-slate-600 hover:text-slate-900 transition cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 text-slate-400" />
                  <span>{isKhmer ? "ត្រឡប់ទៅចូលគណនី" : "Back to sign in"}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
