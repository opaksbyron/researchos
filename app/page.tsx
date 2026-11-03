import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Braces,
  Check,
  Database,
  Github,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";
import { SiteHeader } from "@/components/showcase/site-header";

const workflow = [
  {
    number: "01",
    title: "Ground the agent",
    description:
      "Add papers, URLs, repositories, videos, drives, or crawled sites to a real ibl.ai knowledge base.",
    detail: "AgentDatasetsTab · training state · source visibility",
  },
  {
    number: "02",
    title: "Interrogate the evidence",
    description:
      "Ask for findings, supporting material, uncertainty, and open questions in one continuous research session.",
    detail: "Streaming chat · session lifecycle · file context",
  },
  {
    number: "03",
    title: "Preserve useful context",
    description:
      "Keep researcher-specific memory separate from shared facts and rules that apply across the organization.",
    detail: "Personal memory · shared memory · project boundaries",
  },
] as const;

const proof = [
  ["Authentication", "Organization-aware SSO with browser-token recovery"],
  ["State", "SDK reducer keys, RTK Query middleware, and session restoration"],
  ["Permissions", "RBAC-aware chat and document-management actions"],
  ["Verification", "TypeScript, production builds, Vitest, and Playwright journeys"],
] as const;

export default function PublicHome() {
  return (
    <div className="min-h-screen bg-[var(--research-paper)] text-slate-900">
      <SiteHeader />

      <main id="main-content">
        <section className="research-grid overflow-hidden border-b border-slate-200">
          <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.03fr_0.97fr] lg:py-28">
            <div className="relative z-10">
              <p className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-800">
                <span className="size-1.5 rounded-full bg-blue-600" aria-hidden="true" />
                Public portfolio build
              </p>
              <h1 className="mt-7 max-w-4xl text-[clamp(3.2rem,7vw,6.8rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-[var(--research-ink)]">
                Research that shows its working.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                ResearchOS turns source material into inspectable AI-assisted
                analysis, durable context, and organized project work. Every claim
                stays close to the evidence that produced it.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                  href="/demo"
                >
                  Try the guided demo
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
                <Link
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                  href="/case-study"
                >
                  Read the case study
                </Link>
              </div>

              <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-600" aria-label="Project proof points">
                <li className="inline-flex items-center gap-2">
                  <Check aria-hidden="true" className="size-4 text-emerald-600" />
                  Real platform data
                </li>
                <li className="inline-flex items-center gap-2">
                  <Check aria-hidden="true" className="size-4 text-emerald-600" />
                  Member SSO
                </li>
                <li className="inline-flex items-center gap-2">
                  <Check aria-hidden="true" className="size-4 text-emerald-600" />
                  Browser-tested journeys
                </li>
              </ul>
            </div>

            <div className="relative mx-auto w-full max-w-2xl lg:mx-0">
              <div className="absolute -left-6 top-12 hidden h-[74%] w-2 rounded-full bg-blue-700 lg:block" aria-hidden="true" />
              <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-[0_45px_120px_-55px_rgba(15,23,42,0.55)]">
                <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="rounded-md bg-blue-100 p-2 text-blue-700">
                      <BookOpen aria-hidden="true" className="size-4" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Research Library</p>
                      <p className="text-xs text-slate-500">Public showcase source</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                    <Check aria-hidden="true" className="size-3.5" />
                    Trained
                  </span>
                </div>

                <div className="p-5 sm:p-7">
                  <div className="rounded-lg border border-slate-200 bg-[var(--research-paper)] p-4">
                    <p className="text-xs font-semibold text-blue-700">Question</p>
                    <p className="mt-2 text-sm leading-6 text-slate-800">
                      What did the disabled composer reveal about SDK integration?
                    </p>
                  </div>

                  <div className="mt-5 space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 rounded-md bg-slate-900 p-2 text-white">
                        <MessageSquareText aria-hidden="true" className="size-4" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-950">Source-grounded answer</p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          Rendering the chat surface was only the visible layer. The
                          runtime also required a valid session, completed uploads,
                          and an RBAC grant for chat.
                          <span className="ml-1 font-semibold text-blue-700">[1]</span>
                        </p>
                      </div>
                    </div>

                    <div className="ml-11 grid gap-3 border-t border-slate-200 pt-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-semibold text-slate-500">Ruled out</p>
                        <p className="mt-1 text-sm text-slate-800">Agent chat permission</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-500">Narrowed to</p>
                        <p className="mt-1 text-sm text-slate-800">Auth and session readiness</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-5 py-4 text-xs text-slate-500">
                  <span>docs/CASE_STUDY.md</span>
                  <span>Evidence visible</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-28" id="workflow">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
              <div>
                <p className="text-sm font-semibold text-blue-700">One coherent workflow</p>
                <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--research-ink)] sm:text-5xl">
                  From a source to shared understanding.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
                  Datasets hold retrievable evidence. Memory holds durable context.
                  Projects hold the boundaries of the work. ResearchOS connects those
                  platform surfaces into one research journey.
                </p>
              </div>

              <ol className="divide-y divide-slate-200 border-y border-slate-200">
                {workflow.map((item) => (
                  <li className="grid gap-3 py-7 sm:grid-cols-[3.5rem_1fr] sm:gap-6" key={item.number}>
                    <span className="text-sm font-semibold text-blue-700">{item.number}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{item.description}</p>
                      <p className="mt-4 text-xs font-semibold text-slate-500">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-[var(--research-ink)] py-20 text-slate-100 sm:py-28" id="proof">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
              <div>
                <p className="text-sm font-semibold text-sky-300">The integration is the work</p>
                <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  More than a chat screen.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
                  ResearchOS uses official ibl.ai surfaces, then supplies the host
                  architecture they depend on: authentication, organization context,
                  state, permissions, routing, and readiness.
                </p>

                <Link
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sky-300 underline decoration-sky-700 underline-offset-4 hover:text-white"
                  href="/case-study"
                >
                  Inspect the engineering decisions
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>

              <div className="relative">
                <div className="absolute left-[1.15rem] top-8 h-[calc(100%-4rem)] w-px bg-slate-700" aria-hidden="true" />
                <ol className="relative space-y-5">
                  {[
                    [ShieldCheck, "SSO and tenant context", "AuthProvider → TenantProvider"],
                    [Database, "Shared application state", "Redux → RTK Query middleware"],
                    [Braces, "Vibe product surfaces", "Chat · Datasets · Memory · Projects"],
                  ].map(([Icon, title, detail]) => {
                    const StepIcon = Icon as typeof ShieldCheck;
                    return (
                      <li className="grid grid-cols-[2.4rem_1fr] gap-4" key={String(title)}>
                        <span className="relative z-10 flex size-9 items-center justify-center rounded-full border border-slate-600 bg-slate-900 text-sky-300">
                          <StepIcon aria-hidden="true" className="size-4" />
                        </span>
                        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
                          <p className="font-semibold text-white">{String(title)}</p>
                          <p className="mt-1 text-sm text-slate-400">{String(detail)}</p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>

            <dl className="mt-16 grid border-y border-slate-700 sm:grid-cols-2">
              {proof.map(([term, description], index) => (
                <div
                  className={`p-6 sm:p-8 ${index % 2 === 0 ? "sm:border-r sm:border-slate-700" : ""} ${index < 2 ? "border-b border-slate-700" : ""}`}
                  key={term}
                >
                  <dt className="font-semibold text-white">{term}</dt>
                  <dd className="mt-2 text-sm leading-6 text-slate-400">{description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="bg-[var(--research-paper)] py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
              <div>
                <p className="text-sm font-semibold text-blue-700">Clear ownership</p>
                <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--research-ink)] sm:text-5xl">
                  Built around the platform, not disguised as the platform.
                </h2>
              </div>
              <div>
                <p className="max-w-2xl text-lg leading-8 text-slate-700">
                  The SDK supplies the product surfaces. My work is the application
                  around them: provider and Redux wiring, SSO and tenant resolution,
                  agent configuration, routing, product framing, debugging, and
                  verification.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                    href="https://github.com/opaksbyron/researchos"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Github aria-hidden="true" className="size-4" />
                    View source
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </a>
                  <Link
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                    href="/workspace"
                  >
                    Launch the workspace
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>ResearchOS, an independent portfolio project built with ibl.ai Vibe.</p>
          <div className="flex gap-5">
            <Link className="hover:text-slate-900" href="/demo">Demo</Link>
            <Link className="hover:text-slate-900" href="/case-study">Case study</Link>
            <a className="hover:text-slate-900" href="https://ibl.ai" rel="noreferrer" target="_blank">ibl.ai</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
