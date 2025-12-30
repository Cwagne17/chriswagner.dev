"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { CheckCircle, Clock, Eye, Mail, User } from "lucide-react";
import AuthWrapper from "../../../components/AuthWrapper";

function ServiceRequestsPage() {
  // Mock data - in real app this would come from your data source
  const requests = [
    {
      id: 1,
      name: "John Doe",
      email: "john@company.com",
      subject: "AWS Migration Project",
      message:
        "We need help migrating our legacy infrastructure to AWS. Looking for expertise in containerization and serverless architecture.",
      status: "New",
      priority: "High",
      createdAt: "2024-01-15T10:30:00Z",
      budget: "$50,000 - $100,000",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@startup.io",
      subject: "DevOps Consultation",
      message:
        "Our startup is looking for DevOps consultation to set up CI/CD pipelines and improve our deployment process.",
      status: "In Progress",
      priority: "Medium",
      createdAt: "2024-01-14T14:15:00Z",
      budget: "$10,000 - $25,000",
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike@enterprise.com",
      subject: "Security Audit",
      message:
        "We need a comprehensive security audit of our AWS infrastructure and compliance assessment.",
      status: "Completed",
      priority: "High",
      createdAt: "2024-01-10T09:00:00Z",
      budget: "$25,000 - $50,000",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "New":
        return <Mail className="w-4 h-4 text-blue-500" />;
      case "In Progress":
        return <Clock className="w-4 h-4 text-orange-500" />;
      case "Completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Mail className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "In Progress":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Low":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <AdminLayout
      title="Service Requests"
      subtitle="Manage client inquiries and project requests"
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  New Requests
                </p>
                <p className="text-2xl font-bold text-blue-500">
                  {requests.filter((r) => r.status === "New").length}
                </p>
              </div>
              <Mail className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  In Progress
                </p>
                <p className="text-2xl font-bold text-orange-500">
                  {requests.filter((r) => r.status === "In Progress").length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Completed
                </p>
                <p className="text-2xl font-bold text-green-500">
                  {requests.filter((r) => r.status === "Completed").length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className="bg-card rounded-lg border border-border p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{request.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {request.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}
                  >
                    {getStatusIcon(request.status)}
                    {request.status}
                  </span>
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}
                  >
                    {request.priority}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">{request.subject}</h4>
                <p className="text-muted-foreground text-sm">
                  {request.message}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Budget: {request.budget}</span>
                  <span>•</span>
                  <span>{formatDate(request.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  {request.status === "New" && (
                    <button className="flex items-center gap-1 px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
                      <CheckCircle className="w-4 h-4" />
                      Respond
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

export default function AdminServiceRequestsPage() {
  return (
    <AuthWrapper requiredGroup="ADMINS">
      <ServiceRequestsPage />
    </AuthWrapper>
  );
}
