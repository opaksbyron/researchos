"use client";

import { Suspense, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Database, ShieldCheck, Sparkles } from "lucide-react";
import { Chat, type ChatConfig } from "@iblai/iblai-js/web-containers/next";
import { AppShell } from "@/components/app-shell";
import config from "@/lib/iblai/config";

const starterQuestions = [
  "What did the disabled chat composer teach the ResearchOS project?",
  "How does ResearchOS separate application code from ibl.ai SDK capabilities?",
  "What evidence supports the conclusion about authentication and session readiness?",
] as const;

function LiveChat() {
  const router = useRouter();
  const tenantKey = config.mainTenantKey();
  const mentorId = config.defaultAgentId();

  const chatConfig = useMemo<ChatConfig>(
    () => ({
      baseWsUrl: () => config.baseWsUrl(),
      supportEmail: () => config.supportEmail(),
      authUrl: () => config.authUrl(),
      mainTenantKey: tenantKey,
      navigateToAdminBilling: () => undefined,
      navigateToExplore: () => router.push("/"),
      navigateToMentor: () => router.push("/demo"),
      features: {
        voiceCall: false,
        dictation: false,
        screenShare: false,
        fileUpload: false,
        camera: false,
        canvas: false,
        memory: false,
        prompts: false,
        skills: false,
        suggestedPrompts: false,
        cowork: false,
      },
      freeTrialDialog: null,
      showMessageActionsWhenLoggedOut: false,
      streamingFocusManagement: true,
    }),
    [router, tenantKey],
  );

  if (!tenantKey || !mentorId) {
    return (
      <div className="flex h-full min-h-[32rem] items-center justify-center p-8 text-center">
        <div className="max-w-md">
          <p className="font-semibold text-slate-950">Live sandbox is not configured</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Add the public organization key and ResearchOS agent ID to the deployment
            environment to enable anonymous research chat.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Chat
      axdToken=""
      config={chatConfig}
      embed
      hasBorder={false}
      isPreviewMode={false}
      isPublicRoute
      mentorId={mentorId}
      redirectToAuthSpa={() => router.push("/workspace")}
      showConversationStarters={false}
      showExploreMentors={false}
      slashSkillsEnabled={false}
      tenantKey={tenantKey}
      userIsStudent
      username={null}
      userTenants={[]}
    />
  );
}

function PublicChatSurface() {
  useEffect(() => {
    if (!window.location.search.includes("prompt=")) {
      return;
    }

    // The SDK reads the starter prompt from the URL. Remove it after the chat
    // has claimed it so a responsive remount cannot submit the same question twice.
    const clearStarterPrompt = window.setTimeout(() => {
      window.history.replaceState(null, "", "/demo");
    }, 5_000);

    return () => window.clearTimeout(clearStarterPrompt);
  }, []);

  return (
    <AppShell>
      <Suspense
        fallback={
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            Connecting to the research agent…
          </div>
        }
      >
        <LiveChat />
      </Suspense>
    </AppShell>
  );
}

const ClientOnlyPublicChat = dynamic(
  () => Promise.resolve(PublicChatSurface),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center text-sm text-slate-500">
        Connecting to the research agent…
      </div>
    ),
  },
);

export function PublicResearchSandbox() {
  return (
    <section aria-labelledby="live-sandbox-heading" className="bg-[var(--research-paper)] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 border-b border-slate-300 pb-9 lg:grid-cols-[1fr_28rem] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-800">
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-40 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-600" />
              </span>
              Live anonymous agent
            </div>
            <h1 id="live-sandbox-heading" className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Ask ResearchOS about the evidence behind its own build.
            </h1>
          </div>
          <p className="max-w-xl text-base leading-7 text-slate-600">
            This is the real ResearchOS agent, not a scripted response. It retrieves
            from the public engineering case study and streams its answer through the
            ibl.ai chat service.
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <aside aria-label="Sandbox information" className="space-y-7 lg:pt-3">
            <div>
              <p className="text-sm font-semibold text-slate-950">Try a grounded question</p>
              <div className="mt-3 space-y-2">
                {starterQuestions.map((question) => (
                  <a
                    className="block rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm leading-5 text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                    href={`/demo?prompt=${encodeURIComponent(question)}`}
                    key={question}
                  >
                    {question}
                  </a>
                ))}
              </div>
            </div>

            <dl className="divide-y divide-slate-200 border-y border-slate-200 text-sm">
              <div className="flex gap-3 py-4">
                <Database aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-blue-700" />
                <div>
                  <dt className="font-semibold text-slate-950">Grounded source</dt>
                  <dd className="mt-1 leading-5 text-slate-600">Public ResearchOS case study, trained and retrievable.</dd>
                </div>
              </div>
              <div className="flex gap-3 py-4">
                <Sparkles aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-blue-700" />
                <div>
                  <dt className="font-semibold text-slate-950">Real generation</dt>
                  <dd className="mt-1 leading-5 text-slate-600">Answers stream from the dedicated ibl.ai agent.</dd>
                </div>
              </div>
              <div className="flex gap-3 py-4">
                <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-blue-700" />
                <div>
                  <dt className="font-semibold text-slate-950">Public-safe surface</dt>
                  <dd className="mt-1 leading-5 text-slate-600">Uploads, memory, voice, and private tenant data are disabled; source retrieval stays available and a daily spend guard limits abuse.</dd>
                </div>
              </div>
            </dl>

            <a
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-900"
              href="https://github.com/opaksbyron/researchos/blob/main/docs/CASE_STUDY.md"
              rel="noreferrer"
              target="_blank"
            >
              Inspect the trained source
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </aside>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_90px_-60px_rgba(15,23,42,0.7)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600 sm:px-5">
              <span className="font-semibold text-slate-800">ResearchOS Research Assistant</span>
              <span>Anonymous session · do not submit sensitive information</span>
            </div>
            <div className="h-[42rem] min-h-[36rem] w-full sm:h-[46rem]">
              <ClientOnlyPublicChat />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
