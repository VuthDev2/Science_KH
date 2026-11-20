import type { SupportedLanguage } from "@/components/landing/types";

export interface AuthValidationCopy {
  emailRequired: string;
  emailInvalid: string;
  emailDomainRestricted: string;
  emailDomainHint: string;
  passwordRequired: string;
  passwordMin: string;
  confirmPasswordRequired: string;
  passwordMismatch: string;
  nameRequired: string;
  capsLockOn: string;
  genericLoginError: string;
  termsRequired: string;
}

export interface AuthCopy {
  meta: {
    signInTitle: string;
    signUpTitle: string;
    forgotTitle: string;
    resetTitle: string;
    description: string;
  };
  header: {
    backHome: string;
    brandTagline: string;
    languageToggleAria: string;
  };
  signIn: {
    title: string;
    subtitle: string;
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    rememberMe: string;
    forgotPassword: string;
    submitButton: string;
    submitting: string;
    noAccountPrompt: string;
    signUpLink: string;
    successToast: string;
  };
  signUp: {
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    passwordHint: string;
    confirmPasswordLabel: string;
    confirmPasswordPlaceholder: string;
    termsAgreementPrefix: string;
    termsLink: string;
    termsAgreementAnd: string;
    privacyLink: string;
    submitButton: string;
    submitting: string;
    hasAccountPrompt: string;
    signInLink: string;
    successToast: string;
  };
  forgotPassword: {
    title: string;
    subtitle: string;
    emailLabel: string;
    emailPlaceholder: string;
    submitButton: string;
    submitting: string;
    backToSignIn: string;
    successHeading: string;
    successMessage: string;
    tryAnotherEmail: string;
    otpLabel?: string;
    otpPlaceholder?: string;
    newPasswordLabel?: string;
    newPasswordPlaceholder?: string;
    confirmPasswordLabel?: string;
    confirmPasswordPlaceholder?: string;
    submitButtonReset?: string;
    resendCode?: string;
    codeSentNotice?: string;
  };
  resetPassword: {
    title: string;
    subtitle: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    confirmPasswordLabel: string;
    confirmPasswordPlaceholder: string;
    submitButton: string;
    submitting: string;
    successToast: string;
    backToSignIn: string;
  };
  oauth: {
    continueGoogle: string;
    signUpGoogle: string;
    continueApple: string;
    signUpApple: string;
    orDivider: string;
  };
  demoHelper: {
    button: string;
  };
  trustBadge: {
    secureNotice: string;
  };
  validation: AuthValidationCopy;
  showcase: {
    stemLabel: string;
    headlineLine1: string;
    headlineLine2: string;
    subheadline: string;
    tutorPreview: {
      tutorName: string;
      tutorRole: string;
      studentQuery: string;
      tutorReply: string;
      studentLabel?: string;
      tutorLabel?: string;
    };
    curriculumTrust: {
      title: string;
      subtitle: string;
    };
  };
}
