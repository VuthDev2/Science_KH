import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
const resolvedAppCss = import.meta.env.DEV ? "/src/styles.css?direct" : appCss;
import { reportAppError } from "../lib/error-reporting";
import { AuthProvider } from "../lib/auth-context";
import { SuperProvider } from "../lib/super-context";
import { SuperPaywallModal } from "../components/super/super-paywall-modal";
import { MistakeReviewDrawer } from "../components/super/mistake-review-drawer";
import { Toaster } from "../components/ui/sonner";
import { initNativeMobile } from "../lib/native-mobile";

import { SITE_CONFIG } from "../lib/seo/constants";
import { generateOrganizationSchema } from "../lib/seo/schema-generator";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportAppError(error instanceof Error ? error : new Error(String(error)), {
      boundary: "tanstack_root_error_component",
    });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        {Boolean(error) && (
          <details className="mt-4 text-left p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300">
            <summary className="font-semibold cursor-pointer">View error details</summary>
            <pre className="mt-2 overflow-auto max-h-40 whitespace-pre-wrap font-mono text-[10px]">
              {error instanceof Error ? error.stack || error.message : String(error)}
            </pre>
          </details>
        )}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: SITE_CONFIG.themeColor },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "mobile-web-app-capable", content: "yes" },
      { title: `${SITE_CONFIG.name} — ${SITE_CONFIG.taglineKm}` },
      {
        name: "description",
        content: SITE_CONFIG.descriptionKm,
      },
      // OpenGraph SEO
      { property: "og:site_name", content: SITE_CONFIG.name },
      { property: "og:title", content: `${SITE_CONFIG.name} — ${SITE_CONFIG.taglineKm}` },
      { property: "og:description", content: SITE_CONFIG.descriptionKm },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_CONFIG.siteUrl },
      { property: "og:image", content: SITE_CONFIG.defaultOgImage },
      { property: "og:locale", content: SITE_CONFIG.localeKm },
      { property: "og:locale:alternate", content: SITE_CONFIG.localeEn },
      // Twitter Cards
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: SITE_CONFIG.twitterHandle },
      { name: "twitter:title", content: `${SITE_CONFIG.name} — ${SITE_CONFIG.taglineKm}` },
      { name: "twitter:description", content: SITE_CONFIG.descriptionKm },
      { name: "twitter:image", content: SITE_CONFIG.defaultOgImage },
    ],
    links: [
      { rel: "manifest", href: "/manifest.json" },
      { rel: "stylesheet", href: resolvedAppCss },
      { rel: "canonical", href: SITE_CONFIG.siteUrl },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
      {
        rel: "stylesheet",
        href: "/katex.min.css",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Kantumruy+Pro:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Preahvihear&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const orgSchema = generateOrganizationSchema();

  return (
    <html lang="km">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(orgSchema),
          }}
        />
      </head>
      <body className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    initNativeMobile();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SuperProvider>
          <Outlet />
          <SuperPaywallModal />
          <MistakeReviewDrawer />
          <Toaster />
        </SuperProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
