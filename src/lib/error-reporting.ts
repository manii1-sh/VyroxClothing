type ErrorOptions = {
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
  handled?: boolean;
  severity?: "error" | "warning" | "info";
};

/**
 * Reports an error to the configured error tracking service.
 * Wire up your own provider (Sentry, Datadog, etc.) here.
 */
export function reportError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  // Log to console in all environments for visibility.
  console.error("[Error Reporting]", error, context);

  // TODO: plug in your error tracking SDK, e.g.:
  // Sentry.captureException(error, { extra: context });
}
