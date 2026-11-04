import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export function PageShell({
  children,
  title,
  back,
  action,
}: {
  children: ReactNode;
  title?: string;
  back?: string;
  action?: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background pb-24">
      {(title || back || action) && (
        <header className="mx-auto flex w-full max-w-md items-center justify-between gap-3 px-6 pt-6">
          {back ? (
            <Link
              to={back}
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground hover:bg-muted"
              aria-label="Back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
          ) : (
            <div className="w-10" />
          )}
          {title && (
            <h1 className="truncate font-display text-lg font-semibold tracking-tight">{title}</h1>
          )}
          <div className="flex w-10 justify-end">{action}</div>
        </header>
      )}
      {children}
    </main>
  );
}
