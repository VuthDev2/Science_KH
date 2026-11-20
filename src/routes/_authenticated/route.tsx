import { createFileRoute, Outlet, redirect, useNavigate, useLocation } from "@tanstack/react-router";
import { isRedirect } from "@tanstack/router-core";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { useIdleTimeout } from "@/hooks/use-idle-timeout";
import { IdleTimeoutModal } from "@/components/security/idle-timeout-modal";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async ({ location }) => {
    if (typeof window === "undefined") return;

    // Purge any lingering legacy demo cache
    try {
      localStorage.removeItem("sciencekh_demo_user");
    } catch {
      // ignore
    }

    // If returning from OAuth redirect with a code or access_token in the URL, allow Supabase to finish token exchange
    if (
      typeof window !== "undefined" &&
      (window.location.search.includes("code=") || window.location.hash.includes("access_token="))
    ) {
      await new Promise((resolve) => setTimeout(resolve, 350));
    }

    // Require genuine Supabase authenticated session
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data?.session?.user) {
        const redirectTarget = location.pathname + (location.searchStr || "");
        throw redirect({
          to: "/auth",
          search: {
            mode: "signin",
            redirect: redirectTarget,
          },
          replace: true,
        });
      }

      return { user: data.session.user };
    } catch (err) {
      // Re-throw redirect if it's already a TanStack redirect object
      if (isRedirect(err) || (err && typeof err === "object" && ("to" in err || "options" in err))) {
        throw err;
      }
      const redirectTarget = location.pathname + (location.searchStr || "");
      throw redirect({
        to: "/auth",
        search: {
          mode: "signin",
          redirect: redirectTarget,
        },
        replace: true,
      });
    }
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Shared School Computer Lab Security: 14m Idle detector + 60s warning modal
  const { showWarning, remainingSeconds, resetTimer, logout } = useIdleTimeout({
    idleTimeMs: 14 * 60 * 1000,
    warningTimeMs: 60 * 1000,
    enabled: Boolean(user),
  });

  useEffect(() => {
    if (!loading && !user) {
      const redirectPath = location.pathname + (location.searchStr ? location.searchStr : "");
      navigate({
        to: "/auth",
        search: { mode: "signin", redirect: redirectPath },
        replace: true,
      });
    }
  }, [loading, user, navigate, location]);

  if (loading || !user) {
    return (
      <div className="grid min-h-screen place-items-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <>
      <Outlet />
      <IdleTimeoutModal
        isOpen={showWarning}
        remainingSeconds={remainingSeconds}
        onStayLoggedIn={resetTimer}
        onSignOutNow={logout}
      />
    </>
  );
}
