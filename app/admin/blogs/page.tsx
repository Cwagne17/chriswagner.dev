"use client";

import type { Schema } from "@/amplify/data/resource";
import AdminLayout from "@/components/admin/AdminLayout";
import BlogForm from "@/components/admin/BlogForm";
import { Blog } from "@/types/blog";
import { generateClient } from "aws-amplify/data";
import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import AuthWrapper from "../../../components/AuthWrapper";
import { AuthGroups } from "../../../lib/auth-groups";

const client = generateClient<Schema>();

function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | undefined>();
  const [formLoading, setFormLoading] = useState(false);
  const [sortField, setSortField] = useState<"title" | "status" | "updatedAt">(
    "updatedAt"
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data } = await client.models.Blog.list();
      setBlogs(data as Blog[]);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBlog = async (blogData: Partial<Blog>) => {
    setFormLoading(true);
    try {
      const now = new Date().toISOString();

      if (editingBlog?.id) {
        // Update existing blog
        await client.models.Blog.update({
          id: editingBlog.id,
          ...blogData,
          updatedAt: now,
        });
      } else {
        // Create new blog
        await client.models.Blog.create({
          ...blogData,
          updatedAt: now,
        } as any);
      }

      await fetchBlogs();
      setShowForm(false);
      setEditingBlog(undefined);
    } catch (error) {
      console.error("Error saving blog:", error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      try {
        await client.models.Blog.delete({ id });
        await fetchBlogs();
      } catch (error) {
        console.error("Error deleting blog:", error);
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

  const sortedBlogs = [...blogs].sort((a, b) => {
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
        New Post
      </button>
    </div>
  );

  if (loading) {
    return (
      <AdminLayout title="Blog Posts" subtitle="Manage your blog content">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading blog posts...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <>
      <AdminLayout
        title="Blog Posts"
        subtitle="Manage your blog content"
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
                    Post{" "}
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
                    Tags
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
                {sortedBlogs.map((blog) => (
                  <tr
                    key={blog.id}
                    className="border-b border-border hover:bg-muted/50"
                  >
                    <td className="p-6">
                      <div>
                        <h3 className="font-medium">{blog.title}</h3>
                      </div>
                    </td>
                    <td className="p-6">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(blog.status)}`}
                      >
                        {blog.status}
                      </span>
                    </td>
                    <td className="p-6">
                      <div className="flex flex-wrap gap-1">
                        {blog.tags?.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex px-2 py-1 bg-muted rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                        {(blog.tags?.length || 0) > 3 && (
                          <span className="text-xs text-muted-foreground">
                            +{(blog.tags?.length || 0) - 3} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-6 text-muted-foreground">
                      {blog.updatedAt
                        ? new Date(blog.updatedAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground"
                          title="View Post"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingBlog(blog);
                            setShowForm(true);
                          }}
                          className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground"
                          title="Edit Post"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => blog.id && handleDeleteBlog(blog.id)}
                          className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-red-500"
                          title="Delete Post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {blogs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No blog posts found. Create your first post!
                </p>
              </div>
            )}
          </div>
        </div>
      </AdminLayout>

      {showForm && (
        <BlogForm
          blog={editingBlog}
          onSave={handleSaveBlog}
          onCancel={() => {
            setShowForm(false);
            setEditingBlog(undefined);
          }}
          isLoading={formLoading}
        />
      )}
    </>
  );
}

export default function AdminBlogsPage() {
  return (
    <AuthWrapper requiredGroup={AuthGroups.ADMINS}>
      <BlogsPage />
    </AuthWrapper>
  );
}
