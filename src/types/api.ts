export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: Record<string, unknown>;
  timestamp?: string;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  details?: unknown;
}

