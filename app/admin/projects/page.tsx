"use client";

import type { Schema } from "@/amplify/data/resource";
import AdminLayout from "@/components/admin/AdminLayout";
import ProjectForm from "@/components/admin/ProjectForm";
import { Project } from "@/types/project";
import { generateClient } from "aws-amplify/data";
import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import AuthWrapper from "../../../components/AuthWrapper";
import { AuthGroups } from "../../../lib/auth-groups";

const client = generateClient<Schema>();

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();
  const [formLoading, setFormLoading] = useState(false);
  const [sortField, setSortField] = useState<"title" | "status" | "updatedAt">(
    "updatedAt"
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await client.models.Project.list();
      setProjects(data as Project[]);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProject = async (projectData: Partial<Project>) => {
    setFormLoading(true);
    try {
      const now = new Date().toISOString();

      if (editingProject) {
        // Update existing project - we'll use the slug as identifier since we removed id
        const { data: existingProjects } = await client.models.Project.list({
          filter: { slug: { eq: editingProject.slug } },
        });

        if (existingProjects.length > 0) {
          await client.models.Project.update({
            id: existingProjects[0].id,
            ...projectData,
            assets: projectData.assets
              ? JSON.stringify(projectData.assets)
              : undefined,
            updatedAt: now,
          } as any);
        }
      } else {
        // Create new project
        await client.models.Project.create({
          ...projectData,
          assets: projectData.assets
            ? JSON.stringify(projectData.assets)
            : undefined,
          updatedAt: now,
        } as any);
      }

      await fetchProjects();
      setShowForm(false);
      setEditingProject(undefined);
    } catch (error) {
      console.error("Error saving project:", error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await client.models.Project.delete({ id });
        await fetchProjects();
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortedProjects = [...projects].sort((a, b) => {
    let aValue: any = a[sortField];
    let bValue: any = b[sortField];

    if (sortField === "updatedAt") {
      aValue = new Date(aValue || 0).getTime();
      bValue = new Date(bValue || 0).getTime();
    }

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "DRAFT":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "ARCHIVED":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const actions = (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setShowForm(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        New Project
      </button>
    </div>
  );

  if (loading) {
    return (
      <AdminLayout title="Projects" subtitle="Manage your portfolio projects">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading projects...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <>
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
                  <th
                    className="text-left p-6 font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                    onClick={() => handleSort("title")}
                  >
                    Project{" "}
                    {sortField === "title" &&
                      (sortDirection === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="text-left p-6 font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                    onClick={() => handleSort("status")}
                  >
                    Status{" "}
                    {sortField === "status" &&
                      (sortDirection === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="text-left p-6 font-medium text-muted-foreground">
                    Technologies
                  </th>
                  <th
                    className="text-left p-6 font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                    onClick={() => handleSort("updatedAt")}
                  >
                    Last Updated{" "}
                    {sortField === "updatedAt" &&
                      (sortDirection === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="text-left p-6 font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedProjects.map((project) => (
                  <tr
                    key={project.slug}
                    className="border-b border-border hover:bg-muted/50"
                  >
                    <td className="p-6">
                      <div>
                        <h3 className="font-medium">{project.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                    </td>
                    <td className="p-6">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="p-6">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies
                          ?.slice(0, 3)
                          .map((tech, index) => (
                            <span
                              key={index}
                              className="inline-flex px-2 py-1 bg-muted rounded text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        {(project.technologies?.length || 0) > 3 && (
                          <span className="text-xs text-muted-foreground">
                            +{(project.technologies?.length || 0) - 3} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-6 text-muted-foreground">
                      {project.updatedAt
                        ? new Date(project.updatedAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground"
                          title="View Project"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingProject(project);
                            setShowForm(true);
                          }}
                          className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground"
                          title="Edit Project"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteProject((project as any).id)
                          }
                          className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-red-500"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {projects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No projects found. Create your first project!
                </p>
              </div>
            )}
          </div>
        </div>
      </AdminLayout>

      {showForm && (
        <ProjectForm
          project={editingProject}
          onSave={handleSaveProject}
          onCancel={() => {
            setShowForm(false);
            setEditingProject(undefined);
          }}
          isLoading={formLoading}
        />
      )}
    </>
  );
}

export default function AdminProjectsPage() {
  return (
    <AuthWrapper requiredGroup={AuthGroups.ADMINS}>
      <ProjectsPage />
    </AuthWrapper>
  );
}
