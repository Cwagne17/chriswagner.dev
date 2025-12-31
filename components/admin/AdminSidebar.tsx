"use client";

import { 
  BarChart3, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  FolderOpen, 
  Home, 
  LogOut, 
  Mail, 
  Settings, 
  Shield 
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: string;
}

interface AdminSidebarProps {
  onSignOut: () => void;
}

const sidebarItems: SidebarItem[] = [
  {
    id: "overview",
    label: "Overview",
    icon: <Home className="w-5 h-5" />,
    href: "/admin"
  },
  {
    id: "projects",
    label: "Projects",
    icon: <FolderOpen className="w-5 h-5" />,
    href: "/admin/projects"
  },
  {
    id: "blogs",
    label: "Blog Posts",
    icon: <FileText className="w-5 h-5" />,
    href: "/admin/blogs"
  },
  {
    id: "requests",
    label: "Service Requests",
    icon: <Mail className="w-5 h-5" />,
    href: "/admin/requests",
    badge: "3"
  }
];

export default function AdminSidebar({ onSignOut }: AdminSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-full bg-card border-r border-border flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-blue-500" />
              <span className="font-bold text-lg">Admin</span>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link key={item.id} href={item.href}>
              <div
                className={`
                  flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer
                  ${isActive 
                    ? "bg-blue-500/10 text-blue-500 border border-blue-500/20" 
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  }
                  ${isCollapsed ? "justify-center" : ""}
                `}
              >
                <div className="relative">
                  {item.icon}
                  {item.badge && !isCollapsed && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </div>
                
                {!isCollapsed && (
                  <>
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <button
          onClick={onSignOut}
          className={`
            w-full flex items-center gap-3 p-3 rounded-lg transition-all
            text-red-500 hover:bg-red-500/10
            ${isCollapsed ? "justify-center" : ""}
          `}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="font-medium">Sign Out</span>}
        </button>
      </div>
    </motion.div>
  );
}
