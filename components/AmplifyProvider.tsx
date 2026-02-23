"use client";

import outputs from "@/amplify_outputs.json";
import { validateAuthConfig } from "@/lib/auth-config";
import { Amplify } from "aws-amplify";

interface AmplifyProviderProps {
  readonly children: React.ReactNode;
}

let isAmplifyConfigured = false;

if (!isAmplifyConfigured) {
  if (validateAuthConfig()) {
    try {
      Amplify.configure(outputs);
      isAmplifyConfigured = true;
    } catch (error) {
      console.error("Failed to configure Amplify:", error);
    }
  } else {
    console.error("Auth configuration validation failed");
  }
}

export default function AmplifyProvider({ children }: AmplifyProviderProps) {
  return <>{children}</>;
}
