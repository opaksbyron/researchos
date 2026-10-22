"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {
  AgentSettingsTab,
  type CopyMentorTenant,
} from "@iblai/iblai-js/web-containers/next";

export default function AgentSettingsPage() {
  const router = useRouter();
  const [tenants, setTenants] = useState<CopyMentorTenant[]>([]);
  const [isLoadingTenants, setIsLoadingTenants] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("tenants");
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) {
        setTenants(
          parsed.map((tenant) => {
            const item = tenant as Record<string, unknown>;
            return {
              key: String(item.key ?? ""),
              name: String(item.name ?? item.key ?? ""),
              is_admin: Boolean(item.is_admin),
            };
          }).filter((tenant) => tenant.key),
        );
      }
    } catch {
      setTenants([]);
    } finally {
      setIsLoadingTenants(false);
    }
  }, []);

  return (
    <div className="flex h-full flex-col bg-white">
      <AgentSettingsTab
        tenants={tenants}
        isLoadingTenants={isLoadingTenants}
        labels={{
          header: {
            title: "Research assistant settings",
            description: "Configure this assistant's identity, discovery, capabilities, and welcome experience.",
          },
        }}
        onSuccessfulDelete={() => router.push("/")}
        onSuccessfulCopy={({forkedMentorId, destinationTenantKey}) => {
          const tenant = destinationTenantKey
            ? `?tenant=${encodeURIComponent(destinationTenantKey)}`
            : "";
          router.push(`/agents/${forkedMentorId}/settings${tenant}`);
        }}
        onSuccessfulSave={() => router.refresh()}
      />
    </div>
  );
}
