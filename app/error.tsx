"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <div className="max-w-lg rounded-lg border border-border bg-card p-8 text-center shadow-lg">
        <h1 className="mb-3 text-2xl font-semibold">Something went wrong</h1>
        <p className="mb-6">
          The error has been reported. You can retry this page now.
        </p>
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-[color:var(--button-primary)] px-5 py-2.5 font-medium text-white transition-colors hover:bg-[color:var(--button-primary-hover)]"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
