import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // Proactively clear any legacy demo user from storage
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("sciencekh_demo_user");
        sessionStorage.removeItem("sciencekh_demo_user");
      } catch {
        // ignore
      }
    }

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (isMounted) {
        setSession(newSession);
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

  const signOut = async () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("sciencekh_demo_user");
        sessionStorage.removeItem("sciencekh_session_only");
      } catch {
        // ignore storage access errors
      }
    }
    setSession(null);
    await supabase.auth.signOut().catch(() => {});
  };

  const activeUser = session?.user ?? null;

  return (
    <AuthContext.Provider
      value={{
        session,
        user: activeUser,
        loading,
        signOut,
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
