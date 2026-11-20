import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signInAsGuest: (customUser?: Partial<User>) => void;
};

export const GUEST_USER: User = {
  id: "guest-student-001",
  app_metadata: { provider: "guest" },
  user_metadata: {
    full_name: "សិស្សគំរូ (Student)",
    display_name: "Saravuth",
    grade: 12,
    language: "km",
  },
  aud: "authenticated",
  created_at: new Date().toISOString(),
  email: "student@sciencekh.edu.kh",
  phone: "",
  role: "authenticated",
  updated_at: new Date().toISOString(),
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [guestUser, setGuestUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // Check for active guest student session
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("sciencekh_guest_user");
        if (saved) {
          setGuestUser(JSON.parse(saved));
        }
      } catch {
        // ignore storage access errors
      }
    }

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (isMounted) {
        setSession(newSession);
        if (newSession?.user) {
          // If real session acquired, clear guest user
          try {
            localStorage.removeItem("sciencekh_guest_user");
          } catch {}
          setGuestUser(null);
        }
      }
    });

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (isMounted) {
          setSession(data.session);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setSession(null);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const signInAsGuest = (customUser?: Partial<User>) => {
    const userToSet = { ...GUEST_USER, ...customUser };
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("sciencekh_guest_user", JSON.stringify(userToSet));
      } catch {}
    }
    setGuestUser(userToSet);
  };

  const signOut = async () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("sciencekh_guest_user");
        localStorage.removeItem("sciencekh_demo_user");
        sessionStorage.removeItem("sciencekh_session_only");
      } catch {
        // ignore storage access errors
      }
    }
    setGuestUser(null);
    setSession(null);
    await supabase.auth.signOut().catch(() => {});
  };

  const activeUser = session?.user ?? guestUser ?? null;

  return (
    <AuthContext.Provider
      value={{
        session,
        user: activeUser,
        loading,
        signOut,
        signInAsGuest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
