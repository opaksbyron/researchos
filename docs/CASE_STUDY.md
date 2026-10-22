# Building ResearchOS with ibl.ai Vibe

## The idea

I built ResearchOS to learn how the pieces in `iblai/vibe` fit together as a product. My goal was not to make another generic chat screen. I wanted one workflow where a researcher could add evidence, question it with an agent, keep useful context, and organize work around a project.

ResearchOS is an independent portfolio project. The underlying platform components come from the official ibl.ai SDK; my work is the application architecture, integration, product framing, agent configuration, and verification around those components.

## My mental model of Vibe

I think of Vibe as an assembly system for ibl.ai applications. Each skill describes a complete platform surface—such as chat, datasets, memory, projects, or settings—and the host application supplies the surrounding product structure.

The visible component is only the top layer. A working surface also depends on organization-aware authentication, API configuration, Redux state, permissions, and an agent identity. That dependency chain was the most important thing I learned while building ResearchOS.

```text
ResearchOS product shell
        |
        +-- SSO authentication and browser tokens
        +-- organization / tenant context
        +-- Redux store and RTK Query middleware
        +-- service-worker support
        |
        +-- ibl.ai Vibe surfaces
              +-- in-process agent chat
              +-- datasets and RAG
              +-- personal and shared memory
              +-- project-scoped chat
              +-- agent settings
        |
        +-- ibl.ai platform APIs and WebSocket streaming
```

## How I assembled the application

### Authentication and organization context

ResearchOS uses the SDK's `AuthProvider` and `TenantProvider`. SSO writes the browser tokens, user profile, and available organizations. The host resolves the active organization and initializes the data layer before SDK queries are allowed to run.

This taught me that an agent UUID alone is not enough. Every useful request is made in the context of a user and an organization.

### Shared state

The in-process chat does not operate as an isolated iframe. It shares the application's Redux store. I registered Vibe's fixed reducer keys for chat, chat input, files, RBAC, subscriptions, banners, and the SDK API slices. Those keys are part of the integration contract because SDK selectors expect their exact names.

### Chat and session lifecycle

The chat route passes the agent UUID, organization key, signed-in username, tenant information, and AXD token to Vibe's `Chat` component. A conversation is backed by a server-created session ID. ResearchOS also supports restoring a cached session and deliberately starting a new one.

I learned to keep the `Chat` tree stable. An accidental remount can discard session or voice state, so the component key changes only for an intentional session switch.

### Evidence, memory, and projects

`AgentDatasetsTab` is the Research Library. It provides the RAG knowledge base instead of making the system prompt pretend to know a researcher's sources.

`AgentMemoryTab` exposes two different kinds of continuity: personal memories tied to a person and shared memories applied to everyone using the agent. Projects add another boundary by grouping files, instructions, agents, and conversations around a research objective.

Together, those surfaces let me separate three concerns:

- datasets hold retrievable evidence;
- memory holds durable context and working rules;
- projects hold task-specific organization.

### Agent configuration

I created a real ResearchOS Research Assistant from Vibe's standard `ai-mentor` template. Its prompt asks it to separate source-backed findings, inference, uncertainty, and open questions, and never invent citations or evidence. The Settings surface exposes its identity, discovery rules, capabilities, and welcome experience.

## A debugging lesson

The most useful bug involved a chat composer that appeared but would not accept input. I traced the behavior into the shipped SDK instead of guessing from the UI.

The SDK disables the composer when it has no session ID, when a file upload is still active, or when the loaded RBAC map denies the agent's chat action. I checked the live platform permissions and confirmed that the connected user had `chat: true`. That ruled out the agent itself and narrowed the problem to browser authentication and session readiness.

This changed how I think about SDK integration: rendering a component is not the same as satisfying its runtime contract. A good host must make readiness and failures visible rather than leaving a control silently disabled.

## What I would improve next

- Gate the chat screen on explicit authentication and session readiness, with a useful recovery message.
- Add a browser-tested conversation-history screen for switching sessions.
- Add citations and richer research-output export around the SDK chat response.
- Deploy a public-safe showcase tenant containing only public-domain sample sources.
- Expand automated coverage around provider readiness and tenant switching.

## What this project demonstrates

- I can follow the official Vibe integration contracts instead of rebuilding SDK functionality.
- I understand how its UI surfaces depend on authentication, tenant context, RBAC, state, and API configuration.
- I can configure a real agent and organize datasets, memory, projects, and chat into one product workflow.
- I can inspect SDK runtime code to diagnose integration behavior.
- I can verify a Next.js integration with type checks, production builds, unit tests, route checks, and authenticated browser journeys.
