"use client";

import { AuthUser, getCurrentUser } from "aws-amplify/auth";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import AuthGroups from "../lib/auth-groups";
import { isInGroup } from "../lib/auth-utils";
import LoginForm from "./LoginForm";

interface AuthWrapperProps {
  readonly children: React.ReactNode;
  readonly requiredGroup?: AuthGroups;
}

export default function AuthWrapper({
  children,
  requiredGroup,
}: AuthWrapperProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [authChecking, setAuthChecking] = useState(false);

  const checkAuthState = useCallback(async () => {
    try {
      setAuthChecking(true);
      const currentUser = await getCurrentUser().catch(() => null);
      setUser((currentUser as AuthUser) ?? null);

      if (currentUser && requiredGroup) {
        setIsAuthorized(await isInGroup(requiredGroup));
      } else if (!currentUser && requiredGroup) {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log("User not authenticated:", error);
      setUser(null);
      if (requiredGroup) {
        setIsAuthorized(false);
      }
    } finally {
      setLoading(false);
      setAuthChecking(false);
    }
  }, [requiredGroup]);

  const handleAuthSuccess = () => {
    void checkAuthState();
  };

  useEffect(() => {
    void checkAuthState();
  }, [checkAuthState]);

  // Show loading during initial load or when checking auth
  if (loading || authChecking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!user) {
    return <LoginForm onAuthSuccess={handleAuthSuccess} />;
  }

  // Only show unauthorized after user is authenticated but doesn't have permission
  if (requiredGroup && !isAuthorized && !authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-card p-8 rounded shadow">
          <h2 className="text-lg font-semibold">Unauthorized</h2>
          <p className="text-sm text-muted-foreground mt-2">
            You do not have permission to view this page.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
