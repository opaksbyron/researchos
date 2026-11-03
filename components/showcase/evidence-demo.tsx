"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Check,
  CircleHelp,
  FileText,
  Search,
} from "lucide-react";

const steps = [
  { label: "Ground", shortLabel: "1", icon: BookOpen },
  { label: "Question", shortLabel: "2", icon: Search },
  { label: "Verify", shortLabel: "3", icon: Check },
] as const;

function GroundStep() {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
      <div>
        <p className="text-sm font-semibold text-blue-700">Research Library</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
          Begin with material you can inspect.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
          This preview uses ResearchOS&apos;s own public engineering case study. The
          live workspace can train an agent on files, URLs, repositories, videos,
          drives, and crawled sites.
        </p>
      </div>

      <article className="evidence-paper p-5 sm:p-7" aria-label="Trained public source">
        <div className="flex items-start justify-between gap-5">
          <span className="rounded-lg bg-blue-50 p-2 text-blue-700">
            <FileText aria-hidden="true" className="size-5" />
          </span>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
            <Check aria-hidden="true" className="size-4" />
            Trained
          </span>
        </div>
        <h3 className="mt-8 text-xl font-semibold text-slate-950">
          Building ResearchOS with ibl.ai Vibe
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          A public case study covering authentication, shared state, chat sessions,
          datasets, memory, projects, and a composer-readiness debugging lesson.
        </p>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-slate-200 pt-4 text-xs text-slate-500">
          <span>Markdown</span>
          <span>Public repository source</span>
          <span>docs/CASE_STUDY.md</span>
        </div>
      </article>
    </div>
  );
}

function QuestionStep() {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
      <div>
        <p className="text-sm font-semibold text-blue-700">Research Chat</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
          Ask for the reasoning, not just the result.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
          The response separates the observed behavior, the debugging path, and the
          remaining uncertainty so a reviewer can follow the conclusion.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_24px_70px_-45px_rgba(15,23,42,0.5)]">
        <div className="border-b border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700">
          What did the disabled chat composer teach you?
        </div>
        <div className="space-y-5 p-5 sm:p-7">
          <p className="leading-7 text-slate-700">
            Rendering an SDK component is not the same as satisfying its runtime
            contract. The composer can remain disabled when the session ID is
            missing, an upload is active, or RBAC denies chat access.
            <a
              className="ml-1 font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4 hover:decoration-blue-700"
              href="https://github.com/opaksbyron/researchos/blob/main/docs/CASE_STUDY.md#a-debugging-lesson"
              rel="noreferrer"
              target="_blank"
            >
              [1]
            </a>
          </p>
          <p className="leading-7 text-slate-700">
            Live permissions showed that chat was allowed, which narrowed the fault
            to browser authentication and session readiness. The product lesson was
            to expose readiness and recovery instead of leaving a control silently
            unavailable.
            <a
              className="ml-1 font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4 hover:decoration-blue-700"
              href="https://github.com/opaksbyron/researchos/blob/main/docs/CASE_STUDY.md#a-debugging-lesson"
              rel="noreferrer"
              target="_blank"
            >
              [1]
            </a>
          </p>
          <div className="flex items-start gap-3 rounded-lg bg-amber-50 p-4 text-sm leading-6 text-amber-950">
            <CircleHelp aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <p>
              <span className="font-semibold">Uncertainty:</span> the case study
              records the diagnostic boundary, not a benchmark of model quality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function VerifyStep() {
  const evidence = [
    ["Observed", "The SDK composer checks session, upload, and permission state."],
    ["Ruled out", "The connected user had chat permission in the live RBAC map."],
    ["Narrowed to", "Browser authentication and session readiness."],
    ["Product action", "Make readiness and recovery visible in the host app."],
  ] as const;

  return (
    <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
      <div>
        <p className="text-sm font-semibold text-blue-700">Evidence view</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
          Keep the claim attached to its trail.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
          ResearchOS is designed around inspectable boundaries: source material,
          durable context, organization permissions, and session state.
        </p>
      </div>

      <dl className="divide-y divide-slate-200 border-y border-slate-200">
        {evidence.map(([term, description]) => (
          <div className="grid gap-2 py-5 sm:grid-cols-[8rem_1fr] sm:gap-6" key={term}>
            <dt className="text-sm font-semibold text-slate-950">{term}</dt>
            <dd className="text-sm leading-6 text-slate-600">{description}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function EvidenceDemo() {
  const [activeStep, setActiveStep] = useState(0);
  const panels = [<GroundStep key="ground" />, <QuestionStep key="question" />, <VerifyStep key="verify" />];

  return (
    <section aria-labelledby="guided-demo-heading" className="bg-[var(--research-paper)] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-7 border-b border-slate-300 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-700">How to inspect the result</p>
            <h1 id="guided-demo-heading" className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Follow one claim from source to conclusion.
            </h1>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-600">
            The walkthrough below explains the evidence pattern demonstrated by the
            live anonymous agent above. The member workspace adds private organization data after SSO.
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[15rem_1fr]">
          <div aria-label="Demo steps" className="flex gap-2 lg:flex-col" role="tablist">
            {steps.map(({ label, shortLabel, icon: Icon }, index) => (
              <button
                aria-controls={`demo-panel-${index}`}
                aria-selected={activeStep === index}
                className="group flex min-w-0 flex-1 items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-semibold text-slate-500 transition-colors hover:bg-white hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 aria-selected:bg-white aria-selected:text-blue-700 aria-selected:shadow-sm lg:flex-none"
                id={`demo-tab-${index}`}
                key={label}
                onClick={() => setActiveStep(index)}
                role="tab"
                type="button"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-slate-50 group-aria-selected:border-blue-200 group-aria-selected:bg-blue-50">
                  <Icon aria-hidden="true" className="hidden size-4 sm:block" />
                  <span className="sm:hidden">{shortLabel}</span>
                </span>
                <span className="truncate">{label}</span>
              </button>
            ))}
          </div>

          <div
            aria-labelledby={`demo-tab-${activeStep}`}
            className="min-h-[26rem] rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_30px_90px_-65px_rgba(15,23,42,0.65)] sm:p-10"
            id={`demo-panel-${activeStep}`}
            role="tabpanel"
            tabIndex={0}
          >
            {panels[activeStep]}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-slate-300 pt-7">
          <p className="max-w-xl text-sm leading-6 text-slate-600">
            Ready to inspect the real integration? The workspace opens the member SSO
            flow and connects to the configured showcase organization.
          </p>
          <Link
            className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            href="/workspace"
          >
            Launch live workspace
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
