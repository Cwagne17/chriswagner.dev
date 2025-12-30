"use client";

import { signOut } from "aws-amplify/auth";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export default function AdminLayout({ 
  children, 
  title, 
  subtitle, 
  actions 
}: AdminLayoutProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  };

  return (
    <div className="h-screen bg-background flex">
      {/* Sidebar */}
      <AdminSidebar onSignOut={handleSignOut} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        {(title || actions) && (
          <header className="bg-card border-b border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                {title && (
                  <h1 className="text-2xl font-bold text-foreground">{title}</h1>
                )}
                {subtitle && (
                  <p className="text-muted-foreground mt-1">{subtitle}</p>
                )}
              </div>
              {actions && (
                <div className="flex items-center gap-3">
                  {actions}
                </div>
              )}
            </div>
          </header>
        )}

        {/* Content Area */}
        <main className="flex-1 overflow-auto bg-background">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-6"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
