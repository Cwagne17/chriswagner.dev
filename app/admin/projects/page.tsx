"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import AuthWrapper from "../../../components/AuthWrapper";
import { AuthGroups } from "../../../lib/auth-groups";

function ProjectsPage() {
  // Mock data - in real app this would come from your data source
  const projects = [
    {
      id: 1,
      title: "AWS Cloud Infrastructure",
      description: "Serverless architecture with Lambda and DynamoDB",
      status: "Published",
      lastUpdated: "2024-01-15",
      views: 245,
    },
    {
      id: 2,
      title: "STIG Compliance Automation",
      description: "Automated security compliance checking system",
      status: "Draft",
      lastUpdated: "2024-01-10",
      views: 89,
    },
    {
      id: 3,
      title: "VDI Infrastructure",
      description: "Virtual desktop infrastructure on AWS WorkSpaces",
      status: "Published",
      lastUpdated: "2024-01-08",
      views: 156,
    },
  ];

  const actions = (
    <div className="flex items-center gap-3">
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
        <Plus className="w-4 h-4" />
        New Project
      </button>
    </div>
  );

  return (
    <AdminLayout
      title="Projects"
      subtitle="Manage your portfolio projects"
      actions={actions}
    >
      <div className="bg-card rounded-lg border border-border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr>
                <th className="text-left p-6 font-medium text-muted-foreground">
                  Project
                </th>
                <th className="text-left p-6 font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left p-6 font-medium text-muted-foreground">
                  Views
                </th>
                <th className="text-left p-6 font-medium text-muted-foreground">
                  Last Updated
                </th>
                <th className="text-left p-6 font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-border hover:bg-muted/50"
                >
                  <td className="p-6">
                    <div>
                      <h3 className="font-medium">{project.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {project.description}
                      </p>
                    </div>
                  </td>
                  <td className="p-6">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === "Published"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="p-6 text-muted-foreground">{project.views}</td>
                  <td className="p-6 text-muted-foreground">
                    {project.lastUpdated}
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default function AdminProjectsPage() {
  return (
    <AuthWrapper requiredGroup={AuthGroups.ADMINS}>
      <ProjectsPage />
    </AuthWrapper>
  );
}
