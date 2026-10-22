"use client";

export const dynamic = "force-dynamic";

import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Chat, type ChatConfig } from "@iblai/iblai-js/web-containers/next";
import {
  useAxdToken,
  useCachedSessionId,
  useIsAdmin,
  useUsername,
  useUserTenants,
  useVisitingTenant,
} from "@iblai/iblai-js/web-utils";
import { redirectToAuthSpa } from "@/lib/iblai/auth-utils";
import config from "@/lib/iblai/config";

export default function AgentChatPageWrapper() {
  return (
    <Suspense fallback={null}>
      <AgentChatPage />
    </Suspense>
  );
}

function AgentChatPage() {
  const { mentorId } = useParams<{mentorId: string}>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const restoreSessionId = searchParams.get("session") ?? undefined;
  const newParam = searchParams.get("new") ?? undefined;
  const [cachedSessionId, saveCachedSessionId] = useCachedSessionId();
  const [seededFor, setSeededFor] = useState<string | undefined>(
    restoreSessionId || newParam ? undefined : "none",
  );

  useEffect(() => {
    if (!mentorId) {
      setSeededFor("none");
      return;
    }
    const map = {...((cachedSessionId ?? {}) as Record<string, string>)};
    if (restoreSessionId) {
      if (map[mentorId] !== restoreSessionId) {
        saveCachedSessionId({...map, [mentorId]: restoreSessionId});
      }
      setSeededFor(restoreSessionId);
    } else if (newParam) {
      if (map[mentorId]) {
        delete map[mentorId];
        saveCachedSessionId(map);
      }
      setSeededFor(`new:${newParam}`);
    } else {
      setSeededFor("none");
    }
    // The SDK cache setter is stable; rerunning on its identity would remount chat.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restoreSessionId, newParam, mentorId]);

  const sessionReady = restoreSessionId
    ? seededFor === restoreSessionId
    : newParam
      ? seededFor === `new:${newParam}`
      : true;
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
    navigateToProject: (projectId, agentId) =>
      router.push(`/agents/${agentId}/projects/${projectId}`),
  };

  if (!tenantKey || !sessionReady) return null;

  return (
    <div className="flex h-screen w-full flex-col">
      <Chat
        key={`${mentorId}:${restoreSessionId ?? ""}:${newParam ?? ""}`}
        isPreviewMode={false}
        mentorId={mentorId}
        tenantKey={tenantKey}
        config={chatConfig}
        redirectToAuthSpa={(to, key, logout) => void redirectToAuthSpa(to, key, logout)}
        username={username ?? null}
        userTenants={userTenants ?? []}
        visitingTenant={visitingTenant}
        axdToken={axdToken ?? ""}
        userIsStudent={!isAdmin}
        showConversationStarters
        showExploreMentors
      />
    </div>
  );
}
