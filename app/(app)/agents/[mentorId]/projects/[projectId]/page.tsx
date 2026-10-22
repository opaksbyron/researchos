"use client";

export const dynamic = "force-dynamic";

import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Chat, type ChatConfig } from "@iblai/iblai-js/web-containers/next";
import {
  useAxdToken,
  useIsAdmin,
  useUsername,
  useUserTenants,
  useVisitingTenant,
} from "@iblai/iblai-js/web-utils";
import { redirectToAuthSpa } from "@/lib/iblai/auth-utils";
import config from "@/lib/iblai/config";

export default function AgentProjectPageWrapper() {
  return (
    <Suspense fallback={null}>
      <AgentProjectPage />
    </Suspense>
  );
}

function AgentProjectPage() {
  const {mentorId, projectId} = useParams<{mentorId: string; projectId: string}>();
  const router = useRouter();
  const [tenantKey, setTenantKey] = useState("");

  useEffect(() => {
    const appTenant = localStorage.getItem("app_tenant");
    const tenant = localStorage.getItem("tenant");
    let currentTenant = "";
    try {
      currentTenant = JSON.parse(localStorage.getItem("current_tenant") ?? "{}")?.key ?? "";
    } catch {
      // A malformed cached tenant should fall back to the configured organization.
    }
    setTenantKey(appTenant || currentTenant || tenant || config.mainTenantKey());
  }, []);

  const username = useUsername();
  const axdToken = useAxdToken();
  const {userTenants} = useUserTenants();
  const {visitingTenant} = useVisitingTenant();
  const isAdmin = useIsAdmin();
  const chatConfig: ChatConfig = {
    baseWsUrl: () => config.baseWsUrl(),
    supportEmail: () => config.supportEmail(),
    authUrl: () => config.authUrl(),
    mainTenantKey: config.mainTenantKey(),
    navigateToAdminBilling: () => router.push(`/agents/${mentorId}/settings?tab=billing`),
    navigateToExplore: () => router.push("/agents"),
    navigateToMentor: (id) => router.push(`/agents/${id}/chat-new`),
    navigateToProject: (nextProjectId, agentId) =>
      router.push(`/agents/${agentId}/projects/${nextProjectId}`),
  };

  if (!tenantKey || !mentorId || !projectId) return null;

  return (
    <div className="flex h-screen w-full flex-col">
      <Chat
        isPreviewMode={false}
        mentorId={mentorId}
        tenantKey={tenantKey}
        projectId={projectId}
        config={chatConfig}
        redirectToAuthSpa={(to, key, logout) => void redirectToAuthSpa(to, key, logout)}
        username={username ?? null}
        userTenants={userTenants ?? []}
        visitingTenant={visitingTenant}
        axdToken={axdToken ?? ""}
        userIsStudent={!isAdmin}
        showExploreMentors
      />
    </div>
  );
}
