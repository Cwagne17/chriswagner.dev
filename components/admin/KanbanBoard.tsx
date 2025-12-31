"use client";

import { Contact } from "@/types/contact";
import { Calendar, Mail, User } from "lucide-react";
import { useState } from "react";

interface KanbanBoardProps {
  contacts: Contact[];
  onUpdateStatus: (contactId: string, newStatus: Contact["status"]) => void;
}

interface KanbanColumnProps {
  title: string;
  status: Contact["status"];
  contacts: Contact[];
  onUpdateStatus: (contactId: string, newStatus: Contact["status"]) => void;
  color: string;
}

function KanbanColumn({
  title,
  status,
  contacts,
  onUpdateStatus,
  color,
}: KanbanColumnProps) {
  const [draggedOver, setDraggedOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedOver(true);
  };

  const handleDragLeave = () => {
    setDraggedOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedOver(false);

    const contactId = e.dataTransfer.getData("text/plain");
    if (contactId) {
      onUpdateStatus(contactId, status);
    }
  };

  return (
    <div className="flex-1 min-w-80">
      <div className={`p-4 rounded-t-lg ${color}`}>
        <h3 className="font-semibold text-white flex items-center justify-between">
          {title}
          <span className="bg-white/20 px-2 py-1 rounded-full text-sm">
            {contacts.length}
          </span>
        </h3>
      </div>

      <div
        className={`min-h-96 p-4 bg-muted/30 rounded-b-lg border-2 border-dashed transition-colors ${
          draggedOver
            ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20"
            : "border-transparent"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="space-y-3">
          {contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}

          {contacts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No {title.toLowerCase()} requests</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ContactCard({ contact }: { contact: Contact }) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", contact.id || "");
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-card p-4 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow cursor-move"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-muted-foreground" />
          <h4 className="font-medium text-sm">{contact.name}</h4>
        </div>
        <span className="text-xs text-muted-foreground">
          {contact.createdAt
            ? new Date(contact.createdAt).toLocaleDateString()
            : "N/A"}
        </span>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <Mail className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">{contact.email}</span>
      </div>

      <p className="text-sm line-clamp-3 mb-3">{contact.message}</p>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>
            {contact.updatedAt
              ? new Date(contact.updatedAt).toLocaleDateString()
              : "N/A"}
          </span>
        </div>
        <span className="font-medium">ID: {contact.id?.slice(-6)}</span>
      </div>
    </div>
  );
}

export default function KanbanBoard({
  contacts,
  onUpdateStatus,
}: KanbanBoardProps) {
  const newContacts = contacts.filter((c) => c.status === "NEW");
  const inProgressContacts = contacts.filter((c) => c.status === "IN_PROGRESS");
  const doneContacts = contacts.filter((c) => c.status === "DONE");

  return (
    <div className="flex gap-6 overflow-x-auto pb-4">
      <KanbanColumn
        title="New Requests"
        status="NEW"
        contacts={newContacts}
        onUpdateStatus={onUpdateStatus}
        color="bg-red-500"
      />

      <KanbanColumn
        title="In Progress"
        status="IN_PROGRESS"
        contacts={inProgressContacts}
        onUpdateStatus={onUpdateStatus}
        color="bg-yellow-500"
      />

      <KanbanColumn
        title="Completed"
        status="DONE"
        contacts={doneContacts}
        onUpdateStatus={onUpdateStatus}
        color="bg-green-500"
      />
    </div>
  );
}
