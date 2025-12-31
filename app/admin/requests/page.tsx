"use client";

import type { Schema } from "@/amplify/data/resource";
import AdminLayout from "@/components/admin/AdminLayout";
import KanbanBoard from "@/components/admin/KanbanBoard";
import { Contact } from "@/types/contact";
import { generateClient } from "aws-amplify/data";
import { CheckCircle, Clock, LayoutGrid, List, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import AuthWrapper from "../../../components/AuthWrapper";
import { AuthGroups } from "../../../lib/auth-groups";

const client = generateClient<Schema>();

function ServiceRequestsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const { data } = await client.models.Contact.list();
      setContacts(data as Contact[]);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (
    contactId: string,
    newStatus: Contact["status"]
  ) => {
    try {
      await client.models.Contact.update({
        id: contactId,
        status: newStatus,
      });

      // Update local state
      setContacts((prev) =>
        prev.map((contact) =>
          contact.id === contactId
            ? {
                ...contact,
                status: newStatus,
              }
            : contact
        )
      );
    } catch (error) {
      console.error("Error updating contact status:", error);
    }
  };

  const getStatusCounts = () => {
    return {
      new: contacts.filter((c) => c.status === "NEW").length,
      inProgress: contacts.filter((c) => c.status === "IN_PROGRESS").length,
      done: contacts.filter((c) => c.status === "DONE").length,
    };
  };

  const statusCounts = getStatusCounts();

  const actions = (
    <div className="flex items-center gap-3">
      <div className="flex items-center bg-muted rounded-lg p-1">
        <button
          onClick={() => setViewMode("kanban")}
          className={`p-2 rounded-md transition-colors ${
            viewMode === "kanban"
              ? "bg-background shadow-sm"
              : "hover:bg-background/50"
          }`}
          title="Kanban View"
        >
          <LayoutGrid className="w-4 h-4" />
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={`p-2 rounded-md transition-colors ${
            viewMode === "list"
              ? "bg-background shadow-sm"
              : "hover:bg-background/50"
          }`}
          title="List View"
        >
          <List className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <AdminLayout
        title="Service Requests"
        subtitle="Manage client inquiries and project requests"
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading requests...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Service Requests"
      subtitle="Manage client inquiries and project requests"
      actions={actions}
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
                <p className="text-2xl font-bold text-red-500">
                  {statusCounts.new}
                </p>
              </div>
              <Mail className="w-8 h-8 text-red-500" />
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  In Progress
                </p>
                <p className="text-2xl font-bold text-yellow-500">
                  {statusCounts.inProgress}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Completed
                </p>
                <p className="text-2xl font-bold text-green-500">
                  {statusCounts.done}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Content based on view mode */}
        {viewMode === "kanban" ? (
          <div className="bg-card rounded-lg border border-border p-6">
            <KanbanBoard
              contacts={contacts}
              onUpdateStatus={handleUpdateStatus}
            />
          </div>
        ) : (
          <div className="bg-card rounded-lg border border-border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left p-6 font-medium text-muted-foreground">
                      Contact
                    </th>
                    <th className="text-left p-6 font-medium text-muted-foreground">
                      Message
                    </th>
                    <th className="text-left p-6 font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="text-left p-6 font-medium text-muted-foreground">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr
                      key={contact.id}
                      className="border-b border-border hover:bg-muted/50"
                    >
                      <td className="p-6">
                        <div>
                          <h3 className="font-medium">{contact.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {contact.email}
                          </p>
                        </div>
                      </td>
                      <td className="p-6">
                        <p className="text-sm line-clamp-2 max-w-md">
                          {contact.message}
                        </p>
                      </td>
                      <td className="p-6">
                        <select
                          value={contact.status}
                          onChange={(e) =>
                            contact.id &&
                            handleUpdateStatus(
                              contact.id,
                              e.target.value as Contact["status"]
                            )
                          }
                          className="px-3 py-1 rounded-lg border border-border bg-background text-sm"
                        >
                          <option value="NEW">New</option>
                          <option value="IN_PROGRESS">In Progress</option>
                          <option value="DONE">Done</option>
                        </select>
                      </td>
                      <td className="p-6 text-muted-foreground text-sm">
                        {contact.createdAt
                          ? new Date(contact.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {contacts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No service requests found.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default function AdminServiceRequestsPage() {
  return (
    <AuthWrapper requiredGroup={AuthGroups.ADMINS}>
      <ServiceRequestsPage />
    </AuthWrapper>
  );
}
