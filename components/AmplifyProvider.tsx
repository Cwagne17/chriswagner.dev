"use client";

import outputs from "@/amplify_outputs.json";
import { validateAuthConfig } from "@/lib/auth-config";
import { Amplify } from "aws-amplify";

interface AmplifyProviderProps {
  readonly children: React.ReactNode;
}

// Configure Amplify immediately when the module loads
// This ensures Amplify is configured before any components try to use it
if (typeof window !== 'undefined') {
  // Validate configuration before configuring
  if (!validateAuthConfig()) {
    console.error("❌ Auth configuration validation failed");
  } else {
    try {
      Amplify.configure(outputs, { ssr: true });
      console.log("✅ Amplify configured successfully");
    } catch (error) {
      console.error("❌ Failed to configure Amplify:", error);
    }
  }
}

export default function AmplifyProvider({ children }: AmplifyProviderProps) {
  return <>{children}</>;
}
