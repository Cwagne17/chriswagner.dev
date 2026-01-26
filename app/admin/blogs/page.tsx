"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { Button, IconButton } from "@/components/ui";
import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import AuthWrapper from "../../../components/AuthWrapper";
import { AuthGroups } from "../../../lib/auth-groups";

function BlogsPage() {
  const [showForm, setShowForm] = useState(false);
  // Mock data - in real app this would come from your data source
  const blogPosts = [
    {
      id: 1,
      title: "AWS Lambda Best Practices for 2024",
      excerpt:
        "Learn the latest best practices for building serverless applications with AWS Lambda",
      status: "Published",
      publishDate: "2024-01-12",
      views: 1254,
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Infrastructure as Code with Terraform",
      excerpt:
        "A comprehensive guide to managing cloud infrastructure using Terraform",
      status: "Draft",
      publishDate: null,
      views: 0,
      readTime: "8 min read",
    },
    {
      id: 3,
      title: "Security Compliance in the Cloud",
      excerpt:
        "Implementing security best practices and compliance frameworks in cloud environments",
      status: "Published",
      publishDate: "2024-01-05",
      views: 892,
      readTime: "12 min read",
    },
    {
      id: 4,
      title: "Serverless Architecture Patterns",
      excerpt:
        "Common patterns and anti-patterns when building serverless applications",
      status: "Scheduled",
      publishDate: "2024-01-20",
      views: 0,
      readTime: "6 min read",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      case "Scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const actions = (
    <div className="flex items-center gap-3">
      <Button onClick={() => setShowForm(true)} leftIcon={Plus}>
        New Post
      </Button>
    </div>
  );

  return (
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
                <th className="text-left p-6 font-medium text-muted-foreground">
                  Post
                </th>
                <th className="text-left p-6 font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left p-6 font-medium text-muted-foreground">
                  Views
                </th>
                <th className="text-left p-6 font-medium text-muted-foreground">
                  Date
                </th>
                <th className="text-left p-6 font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {blogPosts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b border-border hover:bg-muted/50"
                >
                  <td className="p-6">
                    <div>
                      <h3 className="font-medium">{post.title}</h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        {post.excerpt}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {post.readTime}
                      </span>
                    </div>
                  </td>
                  <td className="p-6">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="p-6 text-muted-foreground">
                    {post.views.toLocaleString()}
                  </td>
                  <td className="p-6 text-muted-foreground">
                    {post.publishDate ? post.publishDate : "Not scheduled"}
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <IconButton
                        icon={Eye}
                        variant="ghost"
                        size="icon"
                        aria-label="View Post"
                      />
                      <IconButton
                        icon={Edit}
                        variant="ghost"
                        size="icon"
                        aria-label="Edit Post"
                      />
                      <IconButton
                        icon={Trash2}
                        variant="danger"
                        size="icon"
                        aria-label="Delete Post"
                      />
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

export default function AdminBlogsPage() {
  return (
    <AuthWrapper requiredGroup={AuthGroups.ADMINS}>
      <BlogsPage />
    </AuthWrapper>
  );
}
