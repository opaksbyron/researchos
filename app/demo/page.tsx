import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EvidenceDemo } from "@/components/showcase/evidence-demo";
import { PublicResearchSandbox } from "@/components/showcase/public-research-sandbox";
import { SiteHeader } from "@/components/showcase/site-header";

export const metadata: Metadata = {
  title: "Live Research Demo",
  description:
    "Ask the live ResearchOS agent a source-grounded question, then inspect the evidence workflow behind its answer.",
};

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-[var(--research-paper)]">
      <SiteHeader />
      <main id="main-content">
        <PublicResearchSandbox />
        <EvidenceDemo />
        <section className="border-t border-slate-200 bg-white py-14">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div>
              <p className="font-semibold text-slate-950">Want the implementation story?</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Read how the providers, state, sessions, and permissions fit together.
              </p>
            </div>
            <Link className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900" href="/case-study">
              <ArrowLeft aria-hidden="true" className="size-4 rotate-180" />
              Continue to the case study
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
