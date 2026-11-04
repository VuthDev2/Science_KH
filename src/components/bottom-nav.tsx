import { Link, useRouterState } from "@tanstack/react-router";
import { Home, BookOpen, Sparkles, UserRound, Shield } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const { user } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const { data: roles } = useQuery({
    queryKey: ["roles", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user!.id);
      return (data ?? []).map((r) => r.role);
    },
  });

  const isStaff = roles?.includes("admin") || roles?.includes("editor");

  const items = [
    { to: "/home", label: "Home", icon: Home },
    { to: "/lessons", label: "Lessons", icon: BookOpen },
    { to: "/tutor", label: "Tutor", icon: Sparkles },
    ...(isStaff ? [{ to: "/admin", label: "Admin", icon: Shield }] : []),
    { to: "/profile", label: "Profile", icon: UserRound },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <ul className="mx-auto flex w-full max-w-md items-stretch justify-around px-2">
        {items.map((item) => {
          const active =
            item.to === "/home"
              ? pathname === "/home"
              : pathname === item.to || pathname.startsWith(item.to + "/");
          const Icon = item.icon;
          return (
            <li key={item.to} className="flex-1">
              <Link
                to={item.to}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className={cn("h-5 w-5", active && "stroke-[2.4]")} />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
