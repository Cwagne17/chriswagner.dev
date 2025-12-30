"use client";

import { getCurrentUserWithGroups } from "@/lib/auth-utils";
import { Shield, X } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [userGroups, setUserGroups] = useState<string[]>([]);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const user = await getCurrentUserWithGroups();

      if (!user) {
        setIsAuthorized(false);
        setLoading(false);
        return;
      }

      console.log("🔍 Checking admin access for user:", user.username);
      console.log("👥 User groups:", user.groups);

      setUserGroups(user.groups);

      // Check if user is in ADMINS group
      const isAdmin = user.groups.includes("ADMINS");
      setIsAuthorized(isAdmin);

      if (!isAdmin) {
        console.log("❌ Access denied: User not in ADMINS group");
      } else {
        console.log("✅ Access granted: User is admin");
      }
    } catch (error) {
      console.error("❌ Error checking admin access:", error);
      setIsAuthorized(false);
    } finally {
      setLoading(false);
    }
  };

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

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full text-center"
        >
          <div className="bg-card rounded-lg p-8 border border-border shadow-lg">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="w-8 h-8 text-red-500" />
            </div>

            <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
            <p className="text-muted-foreground mb-6">
              You do not have permission to access the admin panel.
              {userGroups.length > 0 && (
                <>
                  <br />
                  <span className="text-sm">
                    Your groups: {userGroups.join(", ")}
                  </span>
                </>
              )}
            </p>

            <div className="space-y-3">
              <Link
                href="/"
                className="inline-flex w-full items-center justify-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Shield className="w-4 h-4" />
                Return to Home
              </Link>

              <p className="text-xs text-muted-foreground">
                If you believe this is an error, please contact the
                administrator.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}
