"use client";

import Link from "next/link";
import { BookOpen, Brain, MessageSquareText } from "lucide-react";
import config from "@/lib/iblai/config";
import { useUsername } from "@/hooks/use-user";

const destinations = [
  {
    label: "Research chat",
    description: "Explore a question, synthesize evidence, and continue earlier sessions.",
    href: (agentId: string) => `/agents/${agentId}/chat-new`,
    icon: MessageSquareText,
  },
  {
    label: "Research library",
    description: "Train the agent on papers, datasets, repositories, URLs, and other sources.",
    href: (agentId: string) => `/agents/${agentId}/datasets`,
    icon: BookOpen,
  },
  {
    label: "Research memory",
    description: "Manage researcher context and knowledge shared across the lab.",
    href: (agentId: string) => `/agents/${agentId}/memory`,
    icon: Brain,
  },
] as const;

export default function Home() {
  const username = useUsername();
  const agentId = config.defaultAgentId();

  return (
    <main className="min-h-screen bg-[var(--sidebar-bg,#fafbfc)] px-5 py-12 text-slate-900 md:px-10">
      <div className="mx-auto max-w-5xl">
        <header className="max-w-3xl border-b border-slate-200 pb-8">
          <p className="mb-3 text-sm font-medium text-[#0058cc]">ResearchOS</p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Turn scattered sources into shared understanding.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Welcome{username ? `, ${username}` : ""}. Work with a research agent,
            organize evidence in projects, and preserve the context your team needs.
          </p>
        </header>

        {agentId ? (
          <nav aria-label="ResearchOS workspace" className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
            {destinations.map(({label, description, href, icon: Icon}) => (
              <Link
                key={label}
                href={href(agentId)}
                className="group flex items-start gap-4 px-2 py-6 transition-colors hover:bg-blue-50/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0058cc]"
              >
                <span className="mt-0.5 rounded-lg bg-blue-50 p-2 text-[#0058cc]">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-lg font-medium group-hover:text-[#0058cc]">{label}</span>
                  <span className="mt-1 block max-w-2xl text-sm leading-6 text-slate-600">{description}</span>
                </span>
                <span aria-hidden="true" className="mt-2 text-slate-400 group-hover:text-[#0058cc]">→</span>
              </Link>
            ))}
          </nav>
        ) : (
          <section className="mt-10 max-w-2xl rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-medium">Connect a research agent</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Add a real agent UUID as <code>NEXT_PUBLIC_DEFAULT_AGENT_ID</code> in
              <code> .env.local</code>. ResearchOS never invents an agent identity.
            </p>
            <a
              className="mt-5 inline-flex rounded-md bg-[#0058cc] px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              href="https://os.iblai.app"
              rel="noreferrer"
              target="_blank"
            >
              Create or choose an agent
            </a>
          </section>
        )}
      </div>
    </main>
  );
}
