import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useRoles } from "@/lib/use-profile";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const { data: roles, isLoading } = useRoles();
  const navigate = useNavigate();
  const isStaff = roles?.includes("admin") || roles?.includes("editor");

  useEffect(() => {
    if (!isLoading && !isStaff) navigate({ to: "/home", replace: true });
  }, [isLoading, isStaff, navigate]);

  if (isLoading || !isStaff) {
    return (
      <div className="grid min-h-screen place-items-center">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }
  return <Outlet />;
}
