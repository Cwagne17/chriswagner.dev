"use client";

import { signOut } from "aws-amplify/auth";
import { LogOut, Shield, User } from "lucide-react";
import { motion } from "motion/react";
import AuthWrapper from "../../components/AuthWrapper";

function AdminDashboard() {

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-500" />
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Welcome to Admin Panel</h2>
            <p className="text-muted-foreground">
              Manage your portfolio content and settings
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <User className="w-8 h-8 text-blue-500" />
                <h3 className="font-semibold text-lg">Profile Management</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Update your personal information and contact details
              </p>
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                Manage Profile
              </button>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-green-500" />
                <h3 className="font-semibold text-lg">Projects</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Add, edit, or remove projects from your portfolio
              </p>
              <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
                Manage Projects
              </button>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <LogOut className="w-8 h-8 text-purple-500" />
                <h3 className="font-semibold text-lg">Settings</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Configure site settings and preferences
              </p>
              <button className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors">
                Site Settings
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default function AdminPage() {
  return (
    <AuthWrapper>
      <AdminDashboard />
    </AuthWrapper>
  );
}
