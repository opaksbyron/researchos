"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { AgentSettingsProvider } from "@iblai/iblai-js/web-containers/next";
import { useIsAdmin, useUsername } from "@iblai/iblai-js/web-utils";
import config from "@/lib/iblai/config";

export default function AgentLayout({children}: {children: ReactNode}) {
  const {mentorId} = useParams<{mentorId: string}>();
  const username = useUsername();
  const isAdmin = useIsAdmin();
  const pathname = usePathname();
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

  if (!tenantKey || !mentorId || !username) return null;

  const projectRoute = pathname.includes("/projects/");

  return (
    <AgentSettingsProvider
      tenantKey={tenantKey}
      mentorId={mentorId}
      username={username}
      enableRBAC
      userIsStudent={!isAdmin}
      dmUrl={config.dmUrl()}
    >
      <div className="flex min-h-screen flex-col bg-[var(--sidebar-bg,#fafbfc)]">
        {!projectRoute && (
          <header className="flex min-h-14 items-center justify-between gap-5 border-b border-slate-200 bg-white px-4 md:px-6">
            <Link href="/" className="font-semibold tracking-tight text-[#0058cc]">
              ResearchOS
            </Link>
            <nav aria-label="Agent workspace" className="flex items-center gap-1 text-sm">
              {[
                ["Chat", `/agents/${mentorId}/chat-new`],
                ["Library", `/agents/${mentorId}/datasets`],
                ["Memory", `/agents/${mentorId}/memory`],
                ["Settings", `/agents/${mentorId}/settings`],
              ].map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  aria-current={pathname.startsWith(href) ? "page" : undefined}
                  className="rounded-md px-3 py-2 text-slate-600 hover:bg-slate-100 aria-[current=page]:bg-blue-50 aria-[current=page]:text-[#0058cc]"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </header>
        )}
        <div className="min-h-0 flex-1">{children}</div>
      </div>
    </AgentSettingsProvider>
  );
}
