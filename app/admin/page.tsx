"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthWrapper from "../../components/AuthWrapper";
import { AuthGroups } from "../../lib/auth-groups";

function AdminRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/projects");
  }, [router]);

  return <div className="min-h-screen bg-background" />;
}

export default function AdminPage() {
  return (
    <AuthWrapper requiredGroup={AuthGroups.ADMINS}>
      <AdminRedirectPage />
    </AuthWrapper>
  );
}
