"use client";

import { AuthUser, fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import LoginForm from "./LoginForm";

interface AuthWrapperProps {
  children: React.ReactNode;
  requiredGroup?: string | null;
}

export default function AuthWrapper({
  children,
  requiredGroup = null,
}: AuthWrapperProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(true);

  const checkAuthState = useCallback(async () => {
    try {
      console.log("🔍 Checking authentication state...");
      const currentUser = await getCurrentUser().catch(() => null);
      console.log("✅ User (if any):", currentUser);
      setUser((currentUser as AuthUser) ?? null);

      // Prefer using fetchAuthSession to reliably read token payloads
      let session = await fetchAuthSession().catch(() => null);
      let groups = (session?.tokens?.accessToken?.payload?.["cognito:groups"] ?? []) as string[];

      console.debug("AuthWrapper: session:", session);
      console.debug("AuthWrapper: initial groups:", groups);

      // If no groups are present, try forcing a refresh (useful after adding a user to a group)
      if (requiredGroup && (!groups || groups.length === 0)) {
        console.debug("AuthWrapper: no groups found — attempting forceRefresh to refresh tokens");
        session = await fetchAuthSession({ forceRefresh: true }).catch(() => null);
        groups = (session?.tokens?.accessToken?.payload?.["cognito:groups"] ?? []) as string[];
        console.debug("AuthWrapper: groups after forceRefresh:", groups);
      }

      if (requiredGroup) {
        if (!groups || groups.length === 0) {
          setIsAuthorized(false);
        } else {
          const hasGroup = groups.includes(requiredGroup);
          setIsAuthorized(hasGroup);
        }
      }
    } catch (error) {
      console.log("🔒 User not authenticated:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [requiredGroup]);

  const handleAuthSuccess = () => {
    void checkAuthState();
  };

  useEffect(() => {
    void checkAuthState();
  }, [checkAuthState]);

  if (loading) {
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

  if (!isAuthorized) {
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
