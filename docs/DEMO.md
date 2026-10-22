# ResearchOS 90-second demo

This walkthrough demonstrates the real ResearchOS application and its ibl.ai Vibe integration. It is not a mocked interface.

## Before recording

1. Copy `.env.example` to `.env.local` and set your organization key and agent UUID.
2. Run `pnpm install --ignore-scripts` and `pnpm dev`.
3. Open `http://localhost:3000` and complete ibl.ai SSO.
4. Add a public, non-sensitive paper or URL to the Research Library and wait for training to finish.
5. Keep the browser console closed during the product tour, then show it briefly at the end if it is clean.

## Recording script

**0:00–0:12 — Problem and product**

> ResearchOS brings research sources, AI-assisted analysis, memory, and project work into one workspace. I built it with the official ibl.ai Vibe SDK rather than recreating the platform components.

Show the ResearchOS home screen and its Chat, Library, and Memory destinations.

**0:12–0:30 — Ground the agent**

Open **Library**. Show the trained source and briefly open the add-source options.

> Vibe's dataset surface lets the agent retrieve from files, URLs, repositories, videos, cloud drives, and crawled sites. ResearchOS uses that surface as its evidence library.

**0:30–0:55 — Ask an evidence question**

Open **Chat** and ask:

> What are the source's main claims, what evidence supports them, and what remains uncertain?

Show the response and its source-aware structure.

**0:55–1:10 — Preserve context**

Open **Memory**.

> Personal memory retains researcher-specific context, while shared memory stores facts and rules that should apply to everyone using this research assistant.

**1:10–1:25 — Show the architecture**

Show `providers/index.tsx`, `store/index.ts`, and the chat route.

> The main integration work is the provider and state architecture: SSO, organization context, service-worker support, the SDK's required Redux reducers, and the agent/session identifiers passed into the in-process Chat component.

**1:25–1:30 — Close**

> This project demonstrates that I can assemble Vibe's platform surfaces into a coherent product and debug the authentication, RBAC, and session boundaries between them.

## What not to expose

- `.env`, `.env.local`, or `iblai.env`
- Browser local storage or authentication tokens
- Private research documents
- Network request headers
- E2E usernames or passwords
