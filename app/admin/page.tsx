"use client";

import {
  BarChart3,
  FileText,
  FolderOpen,
  Mail,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import AdminLayout from "../../components/admin/AdminLayout";
import AuthWrapper from "../../components/AuthWrapper";

function AdminDashboard() {
  return (
    <AdminLayout title="Overview" subtitle="Welcome to your admin dashboard">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Projects
              </p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <FolderOpen className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            +2 from last month
          </p>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Blog Posts
              </p>
              <p className="text-2xl font-bold">8</p>
            </div>
            <FileText className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            +1 from last month
          </p>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Service Requests
              </p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <Mail className="w-8 h-8 text-orange-500" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Awaiting response
          </p>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Site Views
              </p>
              <p className="text-2xl font-bold">2.4k</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            +12% from last week
          </p>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Link href="/admin/projects">
          <div className="bg-card rounded-lg p-6 border border-border hover:border-blue-500/50 transition-all cursor-pointer group">
            <div className="flex items-center gap-3 mb-4">
              <FolderOpen className="w-8 h-8 text-blue-500" />
              <h3 className="font-semibold text-lg">Manage Projects</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Add, edit, or remove projects from your portfolio
            </p>
            <div className="text-blue-500 text-sm font-medium group-hover:underline">
              Manage Projects →
            </div>
          </div>
        </Link>

        <Link href="/admin/blogs">
          <div className="bg-card rounded-lg p-6 border border-border hover:border-green-500/50 transition-all cursor-pointer group">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-green-500" />
              <h3 className="font-semibold text-lg">Blog Posts</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Create and manage your blog content
            </p>
            <div className="text-green-500 text-sm font-medium group-hover:underline">
              Manage Blog →
            </div>
          </div>
        </Link>

        <Link href="/admin/requests">
          <div className="bg-card rounded-lg p-6 border border-border hover:border-orange-500/50 transition-all cursor-pointer group">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-8 h-8 text-orange-500" />
              <h3 className="font-semibold text-lg">Service Requests</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Review and respond to client inquiries
            </p>
            <div className="text-orange-500 text-sm font-medium group-hover:underline">
              View Requests →
            </div>
          </div>
        </Link>

        <Link href="/admin/analytics">
          <div className="bg-card rounded-lg p-6 border border-border hover:border-purple-500/50 transition-all cursor-pointer group">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-8 h-8 text-purple-500" />
              <h3 className="font-semibold text-lg">Analytics</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              View site performance and user insights
            </p>
            <div className="text-purple-500 text-sm font-medium group-hover:underline">
              View Analytics →
            </div>
          </div>
        </Link>

        <Link href="/admin/settings">
          <div className="bg-card rounded-lg p-6 border border-border hover:border-gray-500/50 transition-all cursor-pointer group">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-gray-500" />
              <h3 className="font-semibold text-lg">Settings</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Configure site settings and preferences
            </p>
            <div className="text-gray-500 text-sm font-medium group-hover:underline">
              Manage Settings →
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="bg-card rounded-lg border border-border">
        <div className="p-6 border-b border-border">
          <h3 className="font-semibold text-lg">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground">
                Project &quot;AWS Cloud Infrastructure&quot; was updated
              </span>
              <span className="text-xs text-muted-foreground ml-auto">
                2 hours ago
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground">
                New service request received from John Doe
              </span>
              <span className="text-xs text-muted-foreground ml-auto">
                4 hours ago
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground">
                Blog post &quot;Serverless Best Practices&quot; published
              </span>
              <span className="text-xs text-muted-foreground ml-auto">
                1 day ago
              </span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default function AdminPage() {
  return (
    <AuthWrapper requiredGroup="ADMINS">
      <AdminDashboard />
    </AuthWrapper>
  );
}
