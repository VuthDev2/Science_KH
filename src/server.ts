import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

// Enforce modern HTTP Security & Privacy Headers on all platform responses
function applySecurityHeaders(response: Response, isLocalhost = false): Response {
  const headers = new Headers(response.headers);
  if (!headers.has("X-Frame-Options")) {
    headers.set("X-Frame-Options", "DENY");
  }
  if (!headers.has("X-Content-Type-Options")) {
    headers.set("X-Content-Type-Options", "nosniff");
  }
  if (!headers.has("Referrer-Policy")) {
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  }
  if (!headers.has("Permissions-Policy")) {
    headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  }
  // Anti-SSL-Stripping: HSTS and upgrade-insecure-requests ONLY in production (not on localhost or local Capacitor shells)
  if (!isLocalhost) {
    if (!headers.has("Strict-Transport-Security")) {
      headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
    }
    if (!headers.has("Content-Security-Policy")) {
      headers.set("Content-Security-Policy", "upgrade-insecure-requests;");
    }
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const url = new URL(request.url);
    const proto = request.headers.get("x-forwarded-proto") || url.protocol.replace(":", "");
    const isHttp = proto === "http";
    const isLocalhost =
      process.env.NODE_ENV === "development" ||
      url.hostname === "localhost" ||
      url.hostname === "127.0.0.1" ||
      url.hostname === "10.0.2.2" ||
      url.hostname.startsWith("192.168.") ||
      url.hostname.startsWith("10.") ||
      url.hostname.endsWith(".local") ||
      url.hostname === "0.0.0.0";

    // 1. SSL Stripping Prevention: Permanent 301 Redirect to HTTPS with HSTS header
    if (isHttp && !isLocalhost) {
      url.protocol = "https:";
      return new Response(null, {
        status: 301,
        headers: {
          Location: url.toString(),
          "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
          "X-Content-Type-Options": "nosniff",
        },
      });
    }

    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);
      return applySecurityHeaders(normalized, isLocalhost);
    } catch (error) {
      if (error instanceof Response && error.status < 500) {
        return applySecurityHeaders(error, isLocalhost);
      }
      console.error(error);
      const errResponse = new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
      return applySecurityHeaders(errResponse, isLocalhost);
    }
  },
};
