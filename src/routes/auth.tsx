import { createFileRoute, useNavigate, getRouteApi } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { AuthApiService } from "@/services";
import { useAuth } from "@/lib/auth-context";
import {
  isAllowedEmailDomain,
  EMAIL_DOMAIN_ERROR_KM,
  EMAIL_DOMAIN_ERROR_EN,
} from "@/lib/security/email-validator";
import { authI18n } from "@/components/auth/i18n";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthHeader } from "@/components/auth/auth-header";
import { SignInForm } from "@/components/auth/sign-in-form";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { HeroPanel } from "@/components/auth/hero-panel";
import type { SupportedLanguage } from "@/components/landing/types";

const searchSchema = z.object({
  mode: z.enum(["signin", "signup", "forgot", "reset"]).catch("signin"),
  lang: z.enum(["km", "en"]).catch("km"),
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/auth")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { name: "robots", content: "noindex, nofollow" },
      { title: "Authentication — ScienceKH" },
      {
        name: "description",
        content: "Sign in or create your student account for ScienceKH Grades 7–12 STEM learning platform.",
      },
    ],
  }),
  component: AuthPage,
});

const routeApi = getRouteApi("/auth");

function AuthPage() {
  const search = routeApi.useSearch();
  const mode = search.mode;
  const searchLang = search.lang;
  const targetRedirect = search.redirect || "/home";
  const navigate = useNavigate();
  const { user, loading: authLoading, signInAsGuest } = useAuth();

  // Language state initialized from search param or localStorage
  const [lang, setLang] = useState<SupportedLanguage>(() => {
    if (searchLang === "km" || searchLang === "en") return searchLang;
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("sciencekh_lang");
        if (saved === "km" || saved === "en") return saved as SupportedLanguage;
      }
    } catch {}
    return "km";
  });
  const copy = authI18n[lang];
  const isKhmer = lang === "km";

  // Dynamic browser title synchronization
  useEffect(() => {
    let pageTitle = copy.meta.signInTitle;
    if (mode === "signup") pageTitle = copy.meta.signUpTitle;
    else if (mode === "forgot") pageTitle = copy.meta.forgotTitle;
    else if (mode === "reset") pageTitle = copy.meta.resetTitle;
    if (typeof document !== "undefined") {
      document.title = pageTitle;
    }
  }, [mode, copy]);

  // Sync state if URL query param changes
  useEffect(() => {
    if (searchLang && (searchLang === "km" || searchLang === "en") && searchLang !== lang) {
      setLang(searchLang);
    }
  }, [searchLang, lang]);

  // Handle explicit language toggling with immediate state, storage & URL sync
  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setLang(newLang);
    try {
      localStorage.setItem("sciencekh_lang", newLang);
    } catch {}
    navigate({
      to: "/auth",
      search: (prev) => ({ ...prev, lang: newLang }),
      replace: true,
    });
  };

  // Request & server states
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Listen for Supabase password recovery event from email link
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        navigate({
          to: "/auth",
          search: (prev) => ({ ...prev, mode: "reset" }),
          replace: true,
        });
      }
    });

    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  // If already authenticated and not resetting password, redirect to destination
  useEffect(() => {
    if (!authLoading && user && mode !== "reset") {
      navigate({ to: targetRedirect, replace: true });
    }
  }, [authLoading, user, mode, targetRedirect, navigate]);

  const switchMode = (newMode: "signin" | "signup" | "forgot" | "reset") => {
    setServerError(null);
    navigate({
      to: "/auth",
      search: { mode: newMode, lang, redirect: search.redirect },
      replace: true,
    });
  };

  // Real Supabase Sign In with friendly Khmer/English error translations
  const handleSignIn = async (emailVal: string, passwordVal: string, rememberMe = true) => {
    setSubmitting(true);
    setServerError(null);

    // Enforce email domain whitelist: only @gmail.com and .edu.kh
    if (!isAllowedEmailDomain(emailVal)) {
      setServerError(isKhmer ? EMAIL_DOMAIN_ERROR_KM : EMAIL_DOMAIN_ERROR_EN);
      setSubmitting(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailVal,
        password: passwordVal,
      });

      if (error) {
        const errorMsg = error.message.toLowerCase();
        if (errorMsg.includes("invalid login credentials") || errorMsg.includes("invalid_credentials")) {
          setServerError(
            isKhmer
              ? "អ៊ីមែល ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវទេ។ សូមពិនិត្យឡើងវិញ។"
              : "Invalid email or password. Please try again."
          );
        } else if (errorMsg.includes("email not confirmed")) {
          setServerError(
            isKhmer
              ? "សូមបញ្ជាក់អ៊ីមែលរបស់អ្នកជាមុនសិនតាមរយៈសារដែលយើងបានផ្ញើជូន។"
              : "Please confirm your email address before signing in."
          );
        } else {
          setServerError(error.message);
        }
        return;
      }

      if (data?.session) {
        // Remember me choice can be persisted
        try {
          if (!rememberMe) {
            sessionStorage.setItem("sciencekh_session_only", "true");
          } else {
            sessionStorage.removeItem("sciencekh_session_only");
          }
        } catch {}

        toast.success(copy.signIn.successToast);
        navigate({ to: targetRedirect, replace: true });
      }
    } catch {
      setServerError(copy.validation.genericLoginError);
    } finally {
      setSubmitting(false);
    }
  };

  // Real Supabase Sign Up with grade level attachment & profile initialization
  const handleSignUp = async (nameVal: string, emailVal: string, passwordVal: string, gradeVal: number) => {
    setSubmitting(true);
    setServerError(null);

    // Enforce email domain whitelist: only @gmail.com and .edu.kh
    if (!isAllowedEmailDomain(emailVal)) {
      setServerError(isKhmer ? EMAIL_DOMAIN_ERROR_KM : EMAIL_DOMAIN_ERROR_EN);
      setSubmitting(false);
      return;
    }

    try {
      const redirectTo = search.redirect
        ? `${window.location.origin}${search.redirect}`
        : `${window.location.origin}/home`;

      const { data, error } = await supabase.auth.signUp({
        email: emailVal,
        password: passwordVal,
        options: {
          emailRedirectTo: redirectTo,
          data: {
            full_name: nameVal,
            display_name: nameVal,
            grade: gradeVal,
            language: lang,
          },
        },
      });

      if (error) {
        const errorMsg = error.message.toLowerCase();
        if (errorMsg.includes("already registered") || errorMsg.includes("already in use")) {
          setServerError(
            isKhmer
              ? "អ៊ីមែលនេះមានគណនីរួចហើយ។ សូមជ្រើសរើស 'ចូលគណនី'។"
              : "An account with this email already exists. Please sign in."
          );
        } else {
          setServerError(error.message);
        }
        return;
      }

      // Initialize profile row in PostgreSQL
      if (data?.user) {
        try {
          await supabase.from("profiles").upsert({
            id: data.user.id,
            full_name: nameVal,
            display_name: nameVal,
            grade: gradeVal,
            language: lang,
            xp: 0,
            coins: 50,
            streak_days: 1,
          });

          await supabase.from("user_roles").upsert({
            user_id: data.user.id,
            role: "student",
          });
        } catch {
          // non-fatal if table trigger handles it
        }
      }

      toast.success(
        isKhmer
          ? "បង្កើតគណនីជោគជ័យ! សូមពិនិត្យអ៊ីមែល ឬចូលប្រើប្រាស់។"
          : "Account created successfully!"
      );

      // If session exists immediately, navigate to destination
      if (data?.session) {
        navigate({ to: targetRedirect, replace: true });
      } else {
        // Switch to signin mode
        switchMode("signin");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Registration failed";
      setServerError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  // Nodemailer 6-digit OTP Pre-Verification (validates code before new password input)
  const handleVerifyOtpOnly = async (data: { email: string; code: string }): Promise<boolean> => {
    setSubmitting(true);
    setServerError(null);
    try {
      await AuthApiService.verifyOtpOnly(data.email, data.code);
      toast.success(
        isKhmer ? "លេខកូដផ្ទៀងផ្ទាត់ត្រឹមត្រូវ!" : "Verification code confirmed!"
      );
      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to verify code";
      setServerError(msg);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  // Nodemailer 6-digit OTP Password Reset Request
  const handleSendResetOtp = async (emailVal: string): Promise<boolean> => {
    setSubmitting(true);
    setServerError(null);

    // Enforce email domain whitelist: only @gmail.com and .edu.kh
    if (!isAllowedEmailDomain(emailVal)) {
      setServerError(isKhmer ? EMAIL_DOMAIN_ERROR_KM : EMAIL_DOMAIN_ERROR_EN);
      setSubmitting(false);
      return false;
    }

    try {
      await AuthApiService.requestResetOtp(emailVal);
      toast.success(
        isKhmer
          ? "លេខកូដផ្ទៀងផ្ទាត់ ៦ ខ្ទង់ត្រូវបានផ្ញើតាម Nodemailer ទៅកាន់អ៊ីមែលរបស់អ្នកហើយ!"
          : "6-digit OTP verification code sent via Nodemailer to your email!"
      );
      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to send verification code";
      setServerError(msg);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  // Nodemailer 6-digit OTP Verification & Password Update
  const handleVerifyResetOtp = async (data: {
    email: string;
    code: string;
    newPassword: string;
  }): Promise<boolean> => {
    setSubmitting(true);
    setServerError(null);

    // Enforce email domain whitelist: only @gmail.com and .edu.kh
    if (!isAllowedEmailDomain(data.email)) {
      setServerError(isKhmer ? EMAIL_DOMAIN_ERROR_KM : EMAIL_DOMAIN_ERROR_EN);
      setSubmitting(false);
      return false;
    }

    try {
      await AuthApiService.verifyResetOtpAndSetPassword(data.email, data.code, data.newPassword);
      toast.success(
        isKhmer
          ? "ពាក្យសម្ងាត់ត្រូវបានផ្លាស់ប្តូរជោគជ័យ!"
          : "Password updated successfully!"
      );
      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to reset password";
      setServerError(msg);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  // Real Password Update (when arriving from recovery email fallback)
  const handleResetPassword = async (newPasswordVal: string): Promise<boolean> => {
    setSubmitting(true);
    setServerError(null);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPasswordVal,
      });

      if (error) {
        setServerError(error.message);
        return false;
      }

      toast.success(copy.resetPassword.successToast);
      navigate({ to: targetRedirect, replace: true });
      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to reset password";
      setServerError(msg);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  // Google OAuth via Supabase
  const handleGoogle = async () => {
    setGoogleLoading(true);
    setServerError(null);
    try {
      const redirectTo = search.redirect
        ? `${window.location.origin}${search.redirect}`
        : `${window.location.origin}/home`;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
      if (error) throw error;
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      setServerError(
        errMsg ||
          (isKhmer
            ? "ការចូលតាម Google មិនទាន់ដំណើរការនៅក្នុង browser នេះទេ។ សូមប្រើប្រាស់អ៊ីមែល។"
            : "Google sign-in is not available in this environment. Please use email.")
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGuestSignIn = () => {
    signInAsGuest();
    toast.success(isKhmer ? "ចូលរៀនជាសិស្សគំរូជោគជ័យ!" : "Signed in as Guest Student!");
    navigate({ to: targetRedirect, replace: true });
  };

  return (
    <AuthLayout
      currentLang={lang}
      brandingContent={<HeroPanel copy={copy.showcase} isKhmer={isKhmer} mode={mode} />}
      formContent={
        <div className="w-full max-w-[480px] mx-auto flex flex-col justify-between flex-1 min-h-full">
          {/* Top Bar with Home Link & Language Toggle */}
          <AuthHeader
            currentLang={lang}
            onLanguageChange={handleLanguageChange}
            backHomeLabel={copy.header.backHome}
            languageToggleAria={copy.header.languageToggleAria}
          />

          {/* Centered Authentication Form per Mode */}
          <div className="w-full my-auto py-2.5 sm:py-3">
            {mode === "signin" && (
              <SignInForm
                copy={copy}
                onSubmit={handleSignIn}
                onGoogleSignIn={handleGoogle}
                onGuestSignIn={handleGuestSignIn}
                onForgotPasswordClick={() => switchMode("forgot")}
                onSwitchToSignUp={() => switchMode("signup")}
                submitting={submitting}
                googleLoading={googleLoading}
                serverError={serverError}
                onClearServerError={() => setServerError(null)}
              />
            )}

            {mode === "signup" && (
              <SignUpForm
                copy={copy}
                onSubmit={handleSignUp}
                onGoogleSignUp={handleGoogle}
                onSwitchToSignIn={() => switchMode("signin")}
                submitting={submitting}
                googleLoading={googleLoading}
                serverError={serverError}
                onClearServerError={() => setServerError(null)}
              />
            )}

            {mode === "forgot" && (
              <ForgotPasswordForm
                copy={copy}
                isKhmer={isKhmer}
                onSendOtp={handleSendResetOtp}
                onVerifyOtpOnly={handleVerifyOtpOnly}
                onVerifyOtpAndReset={handleVerifyResetOtp}
                onSwitchToSignIn={() => switchMode("signin")}
                submitting={submitting}
                serverError={serverError}
                onClearServerError={() => setServerError(null)}
              />
            )}

            {mode === "reset" && (
              <ResetPasswordForm
                copy={copy}
                onSubmit={handleResetPassword}
                onSwitchToSignIn={() => switchMode("signin")}
                submitting={submitting}
                serverError={serverError}
                onClearServerError={() => setServerError(null)}
              />
            )}
          </div>

          {/* Bottom Security Trust Notice */}
          <div className="pt-3 pb-1 border-t border-[#E5EAF0] max-w-[480px] mx-auto w-full flex items-center justify-center gap-1.5 text-xs text-[#94A3B8] text-center mt-auto">
            <ShieldCheck className="w-3.5 h-3.5 text-[#059669] shrink-0" />
            <span>{copy.trustBadge.secureNotice}</span>
          </div>
        </div>
      }
    />
  );
}
