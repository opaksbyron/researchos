import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-[color:oklch(0.985_0.004_255/0.94)] backdrop-blur-md">
      <a
        className="sr-only rounded-md bg-white px-4 py-2 text-sm font-semibold text-blue-700 focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
        href="#main-content"
      >
        Skip to content
      </a>
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-5 px-5 sm:px-8">
        <Link className="font-semibold tracking-tight text-slate-950" href="/">
          Research<span className="text-blue-700">OS</span>
        </Link>

        <nav aria-label="Public navigation" className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
          <Link className="transition-colors hover:text-slate-950" href="/demo">
            Live demo
          </Link>
          <Link className="transition-colors hover:text-slate-950" href="/case-study">
            Case study
          </Link>
          <a
            className="inline-flex items-center gap-1 transition-colors hover:text-slate-950"
            href="https://github.com/opaksbyron/researchos"
            rel="noreferrer"
            target="_blank"
          >
            Source
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </a>
        </nav>

        <Link
          className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          href="/workspace"
        >
          Open workspace
        </Link>
      </div>
    </header>
  );
}
