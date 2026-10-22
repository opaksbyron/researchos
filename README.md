<div align="center">

<a href="https://ibl.ai"><img src="https://ibl.ai/images/iblai-logo.png" alt="ibl.ai" width="300"></a>

# ResearchOS

A source-grounded AI workspace for research questions, evidence, projects, and shared knowledge.

[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Claude Code](https://img.shields.io/badge/Claude_Code-CC785C?logoColor=white)](https://claude.ai)

</div>

---

## What is ResearchOS?

ResearchOS is an independent portfolio project that shows how I assemble the official [iblai/vibe](https://github.com/iblai/vibe) building blocks into a focused product. It uses `@iblai/iblai-js` and the hosted `iblai.app` platform to help researchers ground an agent in source material, analyze evidence, preserve context, and organize work into projects.

I did not recreate the underlying SDK components. My work is the application architecture around them: provider and state wiring, organization-aware authentication, agent configuration, routing, product workflow, and verification.

| Feature | What it demonstrates |
|---------|----------------------|
| **SSO authentication** | Vibe's `AuthProvider` and `TenantProvider`, browser tokens, and organization context |
| **Research chat** | The in-process SDK `Chat` component with streaming, sessions, files, canvas, prompts, and voice |
| **Research Library** | `AgentDatasetsTab` as the agent's RAG knowledge base for files, URLs, repositories, videos, drives, and crawls |
| **Research memory** | `AgentMemoryTab` for personal researcher context and shared agent knowledge |
| **Research projects** | Project-scoped files, instructions, assigned agents, and conversations |
| **Agent settings** | `AgentSettingsTab` for identity, discovery, capabilities, copying, and welcome behavior |
| **RBAC-aware access** | Platform permissions controlling chat and document-management actions |
| **Offline foundation** | Vibe's service-worker provider and bundled worker |

## Demo

The application itself is the working demo. It requires an ibl.ai organization because the chat, datasets, memory, and project surfaces use real platform data rather than mock responses.

Follow the [90-second demo script](docs/DEMO.md) to show one complete workflow:

```text
Add a public source -> train the knowledge base -> ask an evidence question
-> inspect the answer -> show memory -> explain the provider architecture
```

No screenshots are committed yet because the authenticated UI may contain organization or research data. A portfolio recording should use a public-safe showcase tenant and follow the redaction checklist in the demo guide.

## Case study

Read [Building ResearchOS with ibl.ai Vibe](docs/CASE_STUDY.md) for my explanation of:

- how I understand Vibe's skill and SDK architecture;
- why provider order and fixed Redux keys matter;
- how chat sessions are created, cached, restored, and reset;
- how datasets, memory, and projects solve different research problems;
- how I traced a disabled composer through session and RBAC conditions.

## Architecture

```text
ResearchOS product shell
        |
        +-- SSO authentication and organization context
        +-- Redux store and RTK Query middleware
        +-- service-worker support
        |
        +-- ibl.ai Vibe surfaces
              +-- Chat
              +-- Datasets / RAG
              +-- Memory
              +-- Projects
              +-- Agent Settings
        |
        +-- ibl.ai platform APIs and WebSocket streaming
```

## AGENTS.md / CLAUDE.md

See [CLAUDE.md](CLAUDE.md) for SDK import conventions, component priorities, architecture decisions, and environment setup. [AGENTS.md](AGENTS.md) records the Next.js version guidance generated for development agents.

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm
- An ibl.ai account and organization
- A real ibl.ai agent UUID

### Install and run

```bash
pnpm install --ignore-scripts
cp .env.example .env.local
pnpm dev
```

Set these values in `.env.local`:

```bash
NEXT_PUBLIC_MAIN_TENANT_KEY=your-organization-key
NEXT_PUBLIC_DEFAULT_AGENT_ID=your-agent-uuid
IBLAI_API_KEY=your-server-side-platform-token
```

Open [http://localhost:3000](http://localhost:3000). An unauthenticated member is sent through ibl.ai SSO and returned to the ResearchOS workspace.

Service URLs default to hosted `iblai.app` endpoints in `lib/iblai/config.ts`. Never expose `IBLAI_API_KEY` through a `NEXT_PUBLIC_*` variable.

### Build

```bash
pnpm typecheck
pnpm build
pnpm test
pnpm start
```

### Authenticated browser journeys

Copy the E2E template and fill it locally:

```bash
cp e2e/.env.example e2e/.env.development
pnpm test:e2e
```

`e2e/.env.development` and Playwright authentication state are gitignored. Never commit test-user credentials or browser tokens.

### Deploy

Deploy through the ibl.ai platform hosting API with the official [`/iblai-vibe-ops-deploy` workflow](https://github.com/iblai/vibe/blob/main/skills/ship/iblai-vibe-ops-deploy/SKILL.md). It packages this server-rendered Next.js application, uploads it with the platform API key from `iblai.env`, and returns the assigned `site_url`.

For a public portfolio deployment, use a showcase organization containing only public sources and confirm that the deployment origin is approved for SSO redirects.

## Project Structure

```text
app/
├── (auth)/sso-login-complete/        SSO callback
└── (app)/
    ├── page.tsx                      ResearchOS launchpad
    └── agents/[mentorId]/
        ├── chat-new/page.tsx         In-process Vibe chat
        ├── datasets/page.tsx         Research Library
        ├── memory/page.tsx           Personal and shared memory
        ├── projects/[projectId]/     Project-scoped chat
        └── settings/page.tsx         Agent configuration
components/
├── app-shell.tsx                     Store and provider boundary
└── radix-pointer-events-guard.tsx    SDK dialog recovery
docs/
├── CASE_STUDY.md                     First-person architecture case study
└── DEMO.md                           90-second demo walkthrough
lib/iblai/                            Platform config, auth, and tenant helpers
providers/                            Auth, tenant, and service-worker providers
store/                                SDK reducers and RTK Query middleware
e2e/                                  Authenticated Playwright journeys
```

## Built With

- [Next.js](https://nextjs.org) — App Router
- [@iblai/iblai-js](https://www.npmjs.com/package/@iblai/iblai-js) — authentication, data, and agent UI
- [iblai/vibe](https://github.com/iblai/vibe) — official integration skills, templates, and conventions
- [Redux Toolkit](https://redux-toolkit.js.org) — shared SDK and application state
- [Tailwind CSS](https://tailwindcss.com) — application-shell styling
- [shadcn/ui](https://ui.shadcn.com) — accessible host UI primitives
- [iblai.app](https://iblai.app) — hosted authentication and AI platform services

## Verification

The repository includes:

- TypeScript validation with `pnpm typecheck`;
- an optimized Next.js production build;
- Vitest source-contract tests;
- Playwright journeys covering authentication, navigation, and an enabled Vibe chat composer;
- local runtime route smoke checks.

Authenticated E2E tests require locally supplied test credentials and are intentionally not runnable from a public clone without them.

## Contributing

1. Fork and clone the repository.
2. Install dependencies with `pnpm install --ignore-scripts`.
3. Create a branch from `main`.
4. Prefer ibl.ai SDK components over custom replacements.
5. Do not override SDK component styles.
6. Run `pnpm typecheck`, `pnpm build`, and `pnpm test`.
7. Touch-test changed routes in a real signed-in browser.

## Resources

- [ibl.ai Documentation](https://ibl.ai/docs)
- [Vibe](https://github.com/iblai/vibe)
- [Vibe Starter](https://github.com/iblai/vibe/tree/main/skills/start/iblai-vibe-ops-init/assets/vibe-starter)
- [@iblai/iblai-js](https://www.npmjs.com/package/@iblai/iblai-js)
- [@iblai/mcp](https://www.npmjs.com/package/@iblai/mcp)

---

<sub>Built independently with the public ibl.ai Vibe toolkit and SDK.</sub>
