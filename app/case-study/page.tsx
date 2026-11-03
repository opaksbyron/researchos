import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, GitBranch, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/showcase/site-header";

export const metadata: Metadata = {
  title: "Engineering Case Study",
  description:
    "How ResearchOS connects ibl.ai authentication, organization context, shared state, research surfaces, and browser verification.",
};

const layers = [
  {
    title: "Application shell",
    detail: "Public product story, authenticated routes, provider boundary, and recovery UI.",
  },
  {
    title: "Identity and organization",
    detail: "SSO browser tokens, active-tenant resolution, and organization mismatch recovery.",
  },
  {
    title: "Shared runtime state",
    detail: "Fixed SDK reducer keys, RTK Query middleware, and stable chat session identity.",
  },
  {
    title: "Research surfaces",
    detail: "Chat, datasets, memory, projects, and agent settings from the official SDK.",
  },
] as const;

export default function CaseStudyPage() {
  return (
    <div className="min-h-screen bg-[var(--research-paper)] text-slate-900">
      <SiteHeader />
      <main id="main-content">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
            <p className="text-sm font-semibold text-blue-700">Engineering case study</p>
            <h1 className="mt-4 max-w-4xl text-[clamp(2.9rem,7vw,5.8rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-[var(--research-ink)]">
              The visible component was only the top layer.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
              ResearchOS began as a focused question: what does it take to turn
              official ibl.ai building blocks into a coherent, dependable research
              product?
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                href="/demo"
              >
                Open guided demo
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <a
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                href="https://github.com/opaksbyron/researchos/blob/main/docs/CASE_STUDY.md"
                rel="noreferrer"
                target="_blank"
              >
                Read the source document
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            </div>
          </div>
        </header>

        <section className="py-20 sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="text-sm font-semibold text-blue-700">Mental model</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--research-ink)]">
                A dependency chain, not a component catalogue.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-600">
                A useful research surface depends on the user, organization, state,
                permissions, and session all being ready. ResearchOS makes that host
                architecture explicit.
              </p>
            </div>

            <ol className="relative space-y-4">
              <div className="absolute left-[1.1rem] top-8 h-[calc(100%-4rem)] w-px bg-blue-200" aria-hidden="true" />
              {layers.map((layer, index) => (
                <li className="relative grid grid-cols-[2.25rem_1fr] gap-4" key={layer.title}>
                  <span className="z-10 flex size-9 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-sm font-semibold text-blue-700">
                    {index + 1}
                  </span>
                  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_18px_55px_-45px_rgba(15,23,42,0.5)]">
                    <h3 className="font-semibold text-slate-950">{layer.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{layer.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-[var(--research-ink)] py-20 text-slate-100 sm:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
              <div>
                <ShieldCheck aria-hidden="true" className="size-8 text-sky-300" />
                <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white">
                  The most useful bug was a silent disabled state.
                </h2>
              </div>
              <div>
                <p className="text-lg leading-8 text-slate-300">
                  The chat composer rendered but would not accept input. Reading the
                  shipped SDK revealed three gates: a session ID, no active upload,
                  and permission to chat.
                </p>
                <ul className="mt-8 divide-y divide-slate-700 border-y border-slate-700">
                  {[
                    "Inspect the component's runtime contract instead of guessing from its appearance.",
                    "Verify the live RBAC map; chat permission was present.",
                    "Narrow the boundary to browser authentication and session readiness.",
                    "Turn the diagnosis into a product rule: readiness and recovery must be visible.",
                  ].map((item) => (
                    <li className="flex gap-3 py-4 text-sm leading-6 text-slate-300" key={item}>
                      <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-sky-300" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
              <div>
                <GitBranch aria-hidden="true" className="size-8 text-blue-700" />
                <h2 className="mt-5 text-4xl font-semibold tracking-tight text-[var(--research-ink)]">
                  What this project demonstrates.
                </h2>
              </div>
              <dl className="divide-y divide-slate-200 border-y border-slate-200">
                {[
                  ["Platform fluency", "I can follow an SDK's real integration contracts instead of rebuilding its visible controls."],
                  ["Systems thinking", "I understand how authentication, tenant context, RBAC, state, and sessions shape the UI."],
                  ["Product judgment", "I can organize datasets, memory, projects, and chat around a coherent research job."],
                  ["Verification", "I can back the implementation with builds, source-contract tests, and authenticated browser journeys."],
                ].map(([term, detail]) => (
                  <div className="grid gap-2 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6" key={term}>
                    <dt className="font-semibold text-slate-950">{term}</dt>
                    <dd className="text-sm leading-6 text-slate-600">{detail}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-16 flex flex-col gap-5 rounded-2xl bg-blue-50 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
              <div>
                <p className="text-xl font-semibold text-slate-950">See the research workflow in context.</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Use the public preview, then launch the real workspace when you are ready for SSO.
                </p>
              </div>
              <Link className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900" href="/demo">
                Start the guided demo
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
