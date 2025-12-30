"use client";

import { validateAuthConfig } from "@/lib/auth-config";
import outputs from "@/amplify_outputs.json";
import { Amplify } from "aws-amplify";
import { useEffect } from "react";

interface AmplifyProviderProps {
  children: React.ReactNode;
}

export default function AmplifyProvider({ children }: AmplifyProviderProps) {
  useEffect(() => {
    console.log('🔧 Configuring Amplify...');

    // Validate configuration before configuring
    if (!validateAuthConfig()) {
      console.error('❌ Auth configuration validation failed');
      return;
    }

    try {
      Amplify.configure(outputs);
      console.log('✅ Amplify configured successfully');
    } catch (error) {
      console.error('❌ Failed to configure Amplify:', error);
    }
  }, []);

  return <>{children}</>;
}
