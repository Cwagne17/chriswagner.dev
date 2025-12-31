"use client";

import outputs from "@/amplify_outputs.json";
import { validateAuthConfig } from "@/lib/auth-config";
import { Amplify } from "aws-amplify";
import { useEffect } from "react";

interface AmplifyProviderProps {
  readonly children: React.ReactNode;
}

export default function AmplifyProvider({ children }: AmplifyProviderProps) {
  useEffect(() => {
    // Validate configuration before configuring
    if (!validateAuthConfig()) {
      console.error("❌ Auth configuration validation failed");
      return;
    }

    try {
      Amplify.configure(outputs);
    } catch (error) {
      console.error("❌ Failed to configure Amplify:", error);
    }
  }, []);

  return <>{children}</>;
}
