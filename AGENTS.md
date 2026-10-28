# Deckora — AGENTS.md

**Project:** Deckora — AI Presentation Builder
**Version:** v1 Draft — for user review, 2026-10-27
**Companion document:** `PRD.md` in the same folder. PRD defines what to build. This file defines how an AI coding agent must work on Deckora.
**Language rule:** Write code comments, documentation, PRD, and AGENTS in clear, plain English. Communicate with the user in Indonesian unless the user asks otherwise.
**Design.md status:** Design.md is intentionally NOT created yet, by explicit user instruction. Do not create it until the user asks for it.

---

## 1. Purpose and source of truth

- This file is the permanent context for Deckora. Every coding session must read PRD.md and this file first, before writing code.
- If PRD.md and this file disagree, stop and ask the user. Do not resolve the conflict silently.
- If the user's chat instruction disagrees with PRD.md or this file, stop and ask the user. Do not treat a casual chat message as a silent change to the product requirements.
- Changes to PRD.md or AGENTS.md require the user's explicit approval.
- Deckora is an original re-implementation of Vivid-like behaviour under a new name. Do not copy the Vivid codebase, assets, or Figma file. Do not claim Deckora is Vivid.

## 2. Product in one paragraph

Deckora lets anyone create a presentation, view it in presentation mode, and share it through a link. AI helps by generating an outline and slide layouts from a prompt. The user can reorder the outline and slides by drag-and-drop, pick a theme, edit slide content in a recursive content editor, and rely on auto-save. V1 includes a modern clean landing page, dashboard/workspace, AI creation with 5 starting credits, editor, presentation mode, share link, thumbnails, and trash. Template store, selling templates, subscription/payment, and AI image generation are v2 and must not be built in v1.

## 3. Technology stack

### 3.1 Decided stack

- **Framework:** Next.js 16, App Router, no `src` folder, TypeScript.
- **UI:** Tailwind CSS v4, shadcn/ui, Aceternity UI (added by the user), Framer Motion for motion.
- **State:** Zustand for slide and editor state.
- **Auth:** Better Auth, Google login.
- **Database:** Neon Postgres with Drizzle ORM.
- **AI:** Vercel AI SDK, with Apinex and OpenRouter as providers, and real-time streaming.
- **Image upload (proposed, to confirm):** Uploadcare, following the Vivid pattern.
- **Payment (v2 only):** Midtrans, replacing LemonSqueezy. Do not implement payment in v1.
- **Deployment:** Vercel.

### 3.2 Verified repository snapshot

Verified on 2026-10-27 from https://github.com/alwan2398/slider-ai-persentation (public, default branch `main`, commit `4dd230d`):

- `package.json` lists Next.js `16.4.2`, React `19.3.0`, Drizzle ORM, Neon serverless, Tailwind CSS v4, Framer Motion, and shadcn tooling.
- Better Auth, Zustand, Vercel AI SDK, and Uploadcare are NOT shown as installed in that snapshot. Treat them as planned additions. Verify the current `package.json` at Build time before claiming they are installed.
- Scripts in that snapshot: `dev` (`next dev`), `build` (`next build`), `start` (`next start`), `lint` (`eslint`).

### 3.3 Commands

Use these commands, and report their real output:

```bash
npm run dev
npm run lint
npm run build
```

Do not claim a command passed if it did not run, or if it failed. Report the failing step exactly.

## 4. Repository structure — follow it, do not redesign it

Follow the structure of https://github.com/alwan2398/slider-ai-persentation. Verified root structure:

```text
app/
  (landing)/
    page.tsx
  favicon.ico
  globals.css
  layout.tsx
components/
  layout/
  ui/
  views/
    landing/
constant/
hooks/
lib/
  animations.ts
  db.ts
  highlighter.tsx
  schema.ts
  utils.ts
public/
.agents/ (if present in the working copy)
components.json
drizzle.config.ts
eslint.config.mjs
next.config.ts
package.json
tsconfig.json
```

Rules:

- Do not create a `src/` folder.
- Do not rename or move top-level folders (`app`, `components`, `constant`, `hooks`, `lib`, `public`) without user approval.
- Reuse components in `components/ui/` and `components/layout/` before creating new ones. Do not recreate a shadcn/ui component that already exists.
- New features must fit the existing App Router layout. Landing stays under `app/(landing)`. Authenticated and editor routes must use route groups approved in implementation planning.
- Before any database change, read `lib/schema.ts` and `lib/db.ts` in full. Extend them; do not silently replace them.
- Before any UI change, check `components/ui/`, `components/layout/`, and `components/views/` for an existing component that already does the job.
- Keep `constant/` and `hooks/` at the root, as in the repository, unless the user approves a move.

## 5. Architecture patterns — mandatory

These patterns come from the Vivid tutorial analysis and from the user's decisions. They are not optional style preferences.

### 5.1 AI generation flow

```
Prompt
  -> Outline (structured data)
  -> Theme selection
  -> Layout JSON (structured data, validated)
  -> Recursive content renderer
  -> Slide editor
  -> Presentation mode / share link
```

Rules:

- AI output for outlines and layouts must be structured JSON, validated with Zod (or an equivalent explicit validator) before it is saved or rendered.
- Never render AI output as raw HTML for slides.
- Never save a layout that failed validation as if it succeeded.
- Stream AI output in real time where the pattern uses streaming, so the user sees progress.
- A failed generation must not corrupt an existing presentation and must not leave a broken deck marked as successful.

### 5.2 Content renderer

- Use one recursive content renderer. The renderer reads a content block's `type` and renders the matching component.
- Supported v1 types: heading (H1–H4, title), paragraph (auto-height), list, callout box, code block, image, table (with resizable columns).
- To add a new content type, add one type and one component. Do not rewrite the whole editor.
- Editing one block must update only that block, then trigger auto-save.

### 5.3 State and ordering

- Use Zustand for slide and editor state, including ordered slides and the current slide.
- Drag-and-drop order in the outline and in the editor must be the order stored in state and in the database.
- After refresh, the displayed order, theme, content, and trash state must match the database.
- Do not implement drag-and-drop visuals that do not update the stored order.

### 5.4 Server rules

- Validate presentation ID, ownership, authentication, and AI credits on the server before any generation, edit, delete, share, or trash action.
- Never rely on UI hiding alone for protection. A hidden button is not a security rule.
- Credit checks for AI generation must happen on the server before generation starts.
- Share viewing is view-only. It must not allow editing, deleting, or generating.

## 6. Authentication and database rules

- Better Auth with Google login is the decided auth method. Do not add email/password or other providers without user approval.
- Database: Neon Postgres through Drizzle ORM. Use Drizzle migrations/kit workflow as configured in `drizzle.config.ts`. Do not bypass the ORM with ad-hoc SQL unless the user approves it for a specific, documented reason.
- Every query for presentations, slides, layouts, and content must be scoped to the owner, except for view-only share access.
- Trash is a status, not immediate deletion. Permanent deletion requires explicit UI confirmation and must follow the confirmed data model.
- Sensitive work on the database requires the user's permission under the vibe-coding rules in Section 10, and must be followed by a clear report of what was read or changed.

## 7. AI provider rules — never guess

- Providers: Apinex and OpenRouter, through the Vercel AI SDK.
- Apinex, user-stated on 2026-10-27: site https://apinex.bond/overview, base URL https://api.apinex.bond/v1, free models named by the user as GLM 5.3 Flash and DeepSeek V4 Flash. These values are user-stated, not provider-verified, because the Apinex overview page required login and its model list and base URL were not visible without an account on 2026-10-27. Confirm the exact model IDs from the provider dashboard at Build time.
- First Apinex model to try, confirmed by the user on 2026-10-27: GLM 5.3 Flash. DeepSeek V4 Flash is recorded as the next Apinex option.
- Provider order: Apinex is primary, OpenRouter is secondary (fallback). Fallback trigger, agreed by the user on 2026-10-27: provider error, rate limit, or timeout, not output quality alone.
- OpenRouter model ID is deferred by the user until the user has reviewed OpenRouter's free models. Do not choose one on the user's behalf.
- The user's phrase “Apinex Bound” is clarified as Apinex on the apinex.bond domain. Do not turn it into a separate model name, base URL, or provider ID.
- Never invent, guess, or hard-code: OpenRouter model ID, API keys, or secrets.
- All of those values must come from the user's own accounts.
- Proposed environment variable names only (values are never written here):

```text
DATABASE_URL
BETTER_AUTH_SECRET
BETTER_AUTH_URL
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
APINEX_API_KEY
APINEX_BASE_URL
APINEX_MODEL
OPENROUTER_API_KEY
OPENROUTER_MODEL
UPLOADCARE_PUBLIC_KEY
UPLOADCARE_SECRET_KEY
MIDTRANS_SERVER_KEY
MIDTRANS_CLIENT_KEY
```

- Midtrans variables are v2 only. Do not require them in v1, and do not implement payment to use them in v1.
- If a provider value is missing or unclear, stop and ask the user. Do not substitute a different model and continue silently.
- If AI output cannot be parsed or validated, report the failure, do not save broken data, and do not consume a credit for a failed generation under the proposed credit rule in PRD.md (confirm that rule with the user before Build).

## 8. UI and design rules

- Landing page and product UI must be modern and clean.
- **No generic AI slop UI.** Do not produce templated, low-effort layouts, purple-gradient-everywhere defaults, or meaningless placeholder sections and call them finished.
- If the agent does not understand a design or product requirement, it must ask the user first, before executing. This is an explicit user rule.
- Reuse shadcn/ui components from `components/ui/` and existing layout components before creating new ones.
- Aceternity UI components may be added, but the exact components and visual direction belong in Design.md, which is not created yet. Do not invent a final visual system in code before Design.md exists, except for the landing and dashboard work the user explicitly approves in Build planning.
- Keep the UI responsive. If a screen is desktop-first by necessity, say so explicitly instead of claiming full mobile support.
- Keep interactive controls keyboard reachable where reasonable, and do not rely on colour alone to convey state.

## 9. Coding standards

- TypeScript, strict where the project already uses it. Do not weaken types to silence an error without explaining why.
- Prefer small, focused components and server actions over large, multi-purpose files.
- Name files, components, variables, and routes clearly in English. Avoid abbreviations that only the author understands.
- Do not leave dead code, commented-out experiments, or TODO stubs in a feature claimed as done, unless the TODO is explicitly approved as a v2 marker and documented in PRD.md.
- Do not add dependencies without a reason tied to a PRD requirement, and list every new dependency in the Build report.
- Do not commit secrets, API keys, tokens, or `.env` contents. Environment files must stay out of version control.
- Follow the existing ESLint and TypeScript configuration. Do not disable lint rules globally to make a build pass.

## 10. Vibe-coding workflow — mandatory

This section implements the user's `Vibe_coding_Context.docx` workflow for Deckora.

### 10.1 Five stages, in order

1. **Plan (Scope Skill):** Interactive interview to decide what is built. Result: PRD.md.
2. **Decide (Architect Skill):** Conscious technical blueprint decisions (stack, database, system limits) before touching code.
3. **Contextualize (Audit & Sync Skill):** Freeze all project context and rules in AGENTS.md so the agent does not lose memory when a chat session closes.
4. **Build (Develop Skill):** Step-by-step code execution. Refuse to work if a technical decision is still hanging.
5. **Verify & Fix (Check, Test, & Debug Skill):** Test the app in reality, not only by trusting the agent's claims. Write automated tests where agreed, and trace bugs to root cause.

Do not skip a stage, and do not start Build while Plan or Decide is still open.

### 10.2 Build order

Build in the PRD order, one phase at a time, with user approval to move to the next phase:

1. Scaffold and repository setup verification.
2. Landing page.
3. Dashboard / workspace.
4. Create from prompt and outline with drag-and-drop.
5. Theme picker and AI layout generation.
6. Editor with recursive content renderer, image upload, and auto-save.
7. Presentation mode, share link, trash, and thumbnails.
8. Monetisation (v2 only).

### 10.3 Plan Mode vs. Edit Mode

- **Plan Mode:** propose, interview, and design. No code changes, no database changes, no deployments.
- **Edit Mode:** execute only the plan the user approved, within the rules already set.
- Do not switch from Plan Mode to Edit Mode without the user's approval for that phase.
- The user confirmed that phase-by-phase approval is allowed. Treat that as the default.

### 10.4 Agentic loop and permissions

- Do not give the agent full, unchecked access. The user is still learning, and the agent must keep the user in the loop.
- Always point the user to the relevant AGENTS.md and PRD.md context when a decision matters, and assign a clear task so work does not drift out of context.
- Sensitive actions require explicit permission, especially: database schema changes, database data changes, secret handling, deployments, and payments.
- After sensitive database work, provide a report: what was read, what was changed, what was not changed, and how to verify it.
- The user prepares what is needed, such as API keys. The agent does the remaining implementation work, except for items the user explicitly keeps for himself.
- Never delete data, deploy to production, or process a payment without explicit user approval for that exact action.

### 10.5 Reusable skills

- Turn repeated procedures into reusable skills/workflows, for example: AI layout generation, content rendering, theme application, and auto-save verification.
- A skill must be written down (steps, inputs, outputs, failure cases) before it is reused as if it were standard. Do not claim a skill exists if it was only done once in chat.

### 10.6 Sub-agents and context isolation

- When the app grows large or a chat gets deep, split work and isolate context: one sub-agent or session per bounded area (for example, editor vs. payment), with PRD.md and AGENTS.md as the shared source of truth.
- A sub-agent must not change PRD.md or AGENTS.md on its own. It reports back, and the main agent asks the user before changing those documents.
- If context is at risk of drifting, stop and re-sync from PRD.md and AGENTS.md instead of continuing from memory.

## 11. Verification — mandatory before claiming done

A feature is done only when:

- It works end to end in a real browser.
- Server-side ownership, auth, and credit checks pass.
- Data survives refresh.
- `npm run lint` and `npm run build` pass, or failures are reported honestly with the exact failing step.
- Bugs are traced to root cause, fixed, and re-tested. A workaround without explanation is not a fix.

Test scope, manual checklists, and automated test requirements per phase are open questions, because brainstorming answers 19–27 were not provided yet. Do not invent a test plan as if the user approved it. Ask the user to complete those answers before finalising the Verify section in implementation planning.

## 12. Prohibitions

Do not:

- Copy the Vivid codebase, assets, or Figma file.
- Invent Apinex/OpenRouter base URLs, model IDs, routing rules, or API keys.
- Build template store, selling, subscription, payment, or AI image generation in v1.
- Create Design.md until the user explicitly asks for it.
- Restructure the repository, rename top-level folders, or overwrite `lib/schema.ts` / `lib/db.ts` without approval.
- Produce generic AI slop UI and call it finished.
- Execute a requirement the agent does not understand without asking the user first.
- Change PRD.md or AGENTS.md without the user's explicit approval.
- Claim a feature, test, build, or deployment succeeded when it did not run or it failed.
- Commit secrets or `.env` contents.
- Deploy or process a payment without explicit approval for that exact action.

## 13. Open questions for the agent — do not guess

Before Build, the agent must get user answers for:

1. OpenRouter model ID — deferred by the user until the user has reviewed OpenRouter's free models.
3. Uploadcare confirmation for image upload.
4. Exact credit rule and failed-generation behaviour.
5. Google-only login vs. other Better Auth methods later.
6. Exact workspace/editor/share route names, if different from PRD patterns.
7. Existing `lib/schema.ts` / `lib/db.ts` contents and extension plan.
8. Aceternity UI components and visual direction (Design.md, deferred).
9. Verification, permissions, reusable skills, and sub-agent answers (original brainstorming questions 19–27).
10. Light/dark mode requirement for v1.
11. Share-link behaviour for trashed presentations.

---

## Appendix: how to use this file in a new session

1. Read PRD.md first, then this file.
2. Check which Build phase is approved and which questions are still open.
3. If any required decision is open, stay in Plan Mode and ask the user. Do not start Edit Mode.
4. Work one phase at a time, verify it, report it honestly, and wait for approval before the next phase.
