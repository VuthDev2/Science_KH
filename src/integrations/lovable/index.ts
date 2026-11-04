type SignInOptions = {
  redirect_uri?: string;
  extraParams?: Record<string, string>;
};

export const lovable = {
  auth: {
    signInWithOAuth: async (_provider: "google" | "apple" | "microsoft" | "lovable", _opts?: SignInOptions) => {
      return {
        redirected: false,
        error: new Error("Google sign-in is unavailable in this local build. Please use email and password instead."),
      };
    },
  },
};
