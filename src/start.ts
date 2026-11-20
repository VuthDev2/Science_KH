import { createStart, createMiddleware, createCsrfMiddleware } from "@tanstack/react-start";
import { isRedirect } from "@tanstack/router-core";

import { renderErrorPage } from "./lib/error-page";
import { attachSupabaseAuth } from "@/integrations/supabase/auth-attacher";

const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    // 1. Pass through HTTP redirects and responses (< 500) untouched
    if (isRedirect(error)) {
      throw error;
    }
    if (error instanceof Response) {
      if (error.status < 500) {
        return error;
      }
      throw error;
    }
    if (error != null && typeof error === "object") {
      if ("statusCode" in error || "status" in error || "options" in error) {
        throw error;
      }
    }

    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

export const startInstance = createStart(() => ({
  functionMiddleware: [attachSupabaseAuth],
  requestMiddleware: [csrfMiddleware, errorMiddleware],
}));
