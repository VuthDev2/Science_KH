import { supabase } from "@/integrations/supabase/client";
import type { ApiResponse } from "@/types/api";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:5001"
    : "");

export class ApiError extends Error {
  statusCode: number;
  details?: unknown;

  constructor(message: string, statusCode = 500, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.details = details;
  }
}

export class ApiClient {
  private static baseUrl = API_BASE_URL;

  private static async getHeaders(customHeaders?: HeadersInit): Promise<Headers> {
    const headers = new Headers(customHeaders);
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    try {
      const { data } = await supabase.auth.getSession();
      const token = data?.session?.access_token;
      if (token && !headers.has("Authorization")) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    } catch {
      // Ignore auth header if Supabase session is unavailable
    }

    return headers;
  }

  private static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = endpoint.startsWith("http")
      ? endpoint
      : `${this.baseUrl}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

    const headers = await this.getHeaders(options.headers);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const json = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new ApiError(
          json.error || json.message || `Request failed with status ${response.status}`,
          response.status,
          json.details
        );
      }

      return json as ApiResponse<T>;
    } catch (err: any) {
      if (err instanceof ApiError) {
        throw err;
      }
      throw new ApiError(err.message || "Network request failed", 0);
    }
  }

  static async get<T>(endpoint: string, params?: Record<string, string | number | undefined>): Promise<ApiResponse<T>> {
    let url = endpoint;
    if (params) {
      const query = Object.entries(params)
        .filter(([_, v]) => v !== undefined && v !== null && v !== "")
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
        .join("&");
      if (query) {
        url += (url.includes("?") ? "&" : "?") + query;
      }
    }
    return this.request<T>(url, { method: "GET" });
  }

  static async post<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  }

  static async put<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  }

  static async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

