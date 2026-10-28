# Deckora — Product Requirements Document (PRD)

**Product:** Deckora — AI Presentation Builder
**Version:** v1 Draft — for user review, 2026-10-27
**Status:** Draft. This document is not final until the user confirms the Open Questions in Section 14. Do not start Build work on any item marked `[TO CONFIRM]`.
**Language rule:** This document is written in clear, plain English so that a coding AI agent can parse it without ambiguity. The product UI language is to be confirmed in Design.md, which is intentionally not created yet.
**Source of inspiration:** The functional behaviour of Vivid from the Web Prodigies tutorial series “AI Presentation Builder (PART 1/2 and PART 2/2) — Next.js 15, OpenAI, LemonSqueezy, Prisma, Clerk, Neon”. Deckora is an original re-implementation of that behaviour under a new name. Do not copy the Vivid codebase, assets, or Figma file.

---

## 1. Product vision

Deckora lets anyone create a presentation, view it immediately in presentation mode, and share it with other users through a link. AI assists the user in creating the presentation so that making a good deck is easier and faster than starting from a blank slide.

In one sentence: **anyone can turn an idea into a presentable, shareable deck, with AI help, without design skill.**

## 2. Target users

Primary users:

- Students who need class, assignment, or seminar presentations.
- Teachers who need lesson and classroom presentations.
- Anyone who wants to create a presentation quickly, including professionals and creators.

Non-goal users for v1: enterprise teams with shared workspaces, real-time multi-user co-editing, and marketplace sellers. Those are not v1 requirements.

## 3. User journey (v1)

1. The user opens Deckora and sees a modern, clean landing page.
2. The user signs in or signs up at `/sign-in` or `/sign-up`.
3. After sign-in, the user enters the dashboard / workspace.
4. In the workspace, the user can create, edit, and delete presentations, exactly in spirit to the Vivid dashboard flow.
5. To create a presentation, the user writes a prompt/topic. AI generates an outline. The user can reorder the outline by drag-and-drop.
6. The user picks a theme. AI generates slide layouts for the outline.
7. The user edits slides in the editor: text, lists, images, tables, callouts, and code blocks.
8. Changes are saved automatically.
9. The user opens presentation mode and presents the deck slide by slide.
10. The user shares the deck through a share link. A recipient who opens the link can view the presentation.
11. The user can move a presentation to trash, and manage it from trash.

## 4. V1 scope — must be built

V1 is complete only when every item below works end to end, not only when its code exists.

### 4.1 Marketing and entry

- Modern, clean landing page.
- Sign-in page at `/sign-in`.
- Sign-up page at `/sign-up`.
- Google login through Better Auth.

### 4.2 Dashboard / workspace

- Authenticated dashboard / workspace listing the signed-in user's presentations.
- Create a new presentation.
- Open an existing presentation in the editor.
- Edit presentation metadata, such as title.
- Delete a presentation by moving it to trash.
- Thumbnail preview for each presentation/slide set.
- Empty state when the user has no presentations.
- Loading state while presentations are fetched.

### 4.3 AI-assisted creation

- Create from a prompt/topic.
- AI-generated outline for the presentation.
- Outline rendering with drag-and-drop reordering, built from scratch in spirit to the Vivid approach: the dragged order must be the order stored in state and in the database.
- Theme picker with theme cards.
- AI-generated slide layouts from the outline.
- Real-time AI streaming, as in the Vivid video: the user sees progress while AI output is generated, instead of waiting for the whole result with no feedback.
- AI output must be structured data (JSON), validated before rendering. AI must not be asked to output free-form HTML for slides.

### 4.4 Editor

- Slide editor at a presentation route, for example `/presentation/[presentationId]`. The exact workspace route naming is `[TO CONFIRM]` if it differs from this pattern.
- Slide store with ordered slides and reorder support.
- Drop zones and drag-and-drop slide reordering.
- Recursive content renderer: one renderer reads a content block's `type` and renders the matching component. Supported content types in v1:
  - Heading (H1–H4 and title)
  - Paragraph, with auto-height editing
  - List
  - Callout box
  - Code block
  - Image
  - Table, including resizable columns
- Layout reordering that stays correct after refresh.
- Auto-save while editing, with a visible saved indicator. The user must not need a manual save button to avoid losing work.
- Image uploading for slides.

### 4.5 Presentation and sharing

- Presentation mode: full-screen, slide-by-slide presentation.
- Share link for a presentation, for example `/share/[presentationId]`. A recipient can view the shared presentation.
- Copy share link action in the editor.

### 4.6 Trash

- Move a presentation to trash instead of permanently deleting it immediately.
- Trash view listing trashed presentations.
- Restore a trashed presentation.
- Permanently delete a trashed presentation. Permanent deletion is destructive and must require an explicit confirmation step in the UI.

### 4.7 Credits

- AI presentation generation uses credits.
- Each user starts with 5 AI generation credits. This is the user's stated limit: “give 5x”.
- Proposed rule `[TO CONFIRM]`: 1 successful AI presentation generation consumes 1 credit. A failed generation that produces no usable presentation must not consume a credit.
- When credits are exhausted, AI generation is blocked with a clear message. Non-AI editing, viewing, presenting, and sharing must still work.
- Credit balance must be checked on the server before generation starts, not only hidden in the UI.

## 5. V2 scope — explicitly deferred

Do not build these in v1, even if they appear in the Vivid tutorial:

- Template store.
- Selling templates to other users.
- Subscription and payment. The future payment provider is Midtrans, replacing LemonSqueezy from the video. Payment stays deferred until all v1 features truly work.
- AI image generation. User image upload in the editor is v1; AI-generated images are v2.

If v1 work would make a v2 feature harder, note it in the implementation plan, but do not implement the v2 feature itself.

## 6. Functional requirements by feature

### 6.1 Landing page

- Must communicate what Deckora does, who it is for, and the main action: sign in / sign up / start.
- Must be modern and clean. Generic, low-effort “AI slop” UI is explicitly forbidden. See AGENTS.md.
- Must be responsive on mobile and desktop.

### 6.2 Authentication

- Google login is the stated login method.
- Unauthenticated users cannot access the dashboard, editor, or generation actions.
- A user can only access, edit, delete, share, or generate for presentations they own, except for viewing a presentation through a valid share link.
- Auth checks must be enforced on the server, not only in the UI.

### 6.3 Dashboard

- List only the signed-in user's presentations, ordered by most recent activity.
- Each card shows title, thumbnail, and last-updated information.
- Actions: open, rename/edit, move to trash.
- Search or filtering is not a v1 requirement unless it is already present in the chosen dashboard design. Do not add it silently; ask the user first.

### 6.4 Create from prompt and outline

- Input: a prompt/topic, with validation for empty input.
- Output step 1: an editable outline, one item per planned slide.
- The user can reorder outline items by drag-and-drop before layout generation.
- The stored outline order must match the displayed order after refresh.

### 6.5 Theme picker and layout generation

- Theme picker shows theme cards with a visual preview.
- Selecting a theme applies that theme to the whole deck.
- Layout generation:
  1. Validate the presentation ID and ownership.
  2. Verify the user is authenticated.
  3. Check AI credits on the server. Block generation when credits are exhausted.
  4. Call the LLM through the Vercel AI SDK with a prompt that requests validated JSON layout data.
  5. Parse and validate the JSON. On parse failure, show a clear error and do not save a broken layout.
  6. Generate or attach images only for placeholders that require them, using the v1 upload/image flow. AI image generation itself is v2.
  7. Redirect or navigate the user to the presentation editor when layouts are ready.
- Streaming: layout/content generation streams to the UI in real time where the video pattern uses streaming.

### 6.6 Editor and content renderer

- The editor must support all content types in Section 4.4.
- Editing a heading, paragraph, list item, callout, code block, image, or table cell must update that block only, and must trigger auto-save.
- Resizable table columns must keep their widths after save and refresh.
- Reordering slides must update the slide store and the database in the same order.
- The editor navbar must include at least: back to dashboard, copy share link, and present. A “sell template” action is v2 and must not appear in v1.

### 6.7 Presentation mode

- Enter presentation mode from the editor.
- Navigate forward and backward through slides.
- Exit presentation mode back to the editor.
- Presentation mode must render the same content and theme as the editor, with no missing blocks.

### 6.8 Share

- A share link must open a view-only presentation for the recipient.
- The recipient view must not allow editing, deleting, or generating for that presentation.
- If a presentation is in trash, its share link must not present it as an active public deck. The exact behaviour (blocked view vs. not found) is `[TO CONFIRM]`.

### 6.9 Trash

- Trashed presentations must not appear in the main dashboard list.
- Restore returns the presentation to the main list with its slides and content intact.
- Permanent delete removes the presentation and its related slide/layout/content records, subject to the confirmed database design.

## 7. Data model — conceptual

This section defines the concepts the database must support. It does not replace the existing `lib/schema.ts` in the repository. Before implementation, the agent must read the existing schema and database client and extend them; it must not silently overwrite them.

Required concepts:

- **User:** identity from Better Auth, including Google identity, and AI credit balance.
- **Presentation:** owned by one user; title; theme reference; trash status; created and updated timestamps.
- **Slide / Outline item:** belongs to one presentation; ordered position; title/topic.
- **Layout:** belongs to a slide/presentation; layout type and structured layout data.
- **Content block:** belongs to a slide/layout; has a `type` (heading, paragraph, list, callout, code, image, table); has structured content data, not raw HTML.
- **Theme:** name, preview data, and style tokens applied by the renderer.
- **Credit ledger (proposed):** records credit grants and consumption, so the balance is auditable. The exact table design is `[TO CONFIRM]` during Decide/implementation planning.
- **Share access:** a presentation can be shared through a link. Share access is view-only.

Rules:

- Every presentation, slide, layout, and content record must be queryable by owner.
- Deleting a presentation to trash must not delete its slides immediately.
- All AI generation writes must be tied to an authenticated owner and a credit check.

## 8. Technology stack — decided, with status

Decided by the user in brainstorming answers 8–12, except where marked `[TO CONFIRM]`.

| Layer | Decision | Status |
|---|---|---|
| Framework | Next.js 16, App Router, no `src` folder, TypeScript | Decided. Differs from the video's Next.js 15. |
| UI foundation | Tailwind CSS v4, shadcn/ui, Framer Motion for motion | Decided, following the Vivid pattern. |
| Extra UI | Aceternity UI, added to the UI styling | Decided by the user. Exact Aceternity components to use are `[TO CONFIRM]` in Design.md, which is not created yet. |
| State (editor) | Zustand for slide/editor state | Decided, following the Vivid pattern. |
| Authentication | Better Auth, Google login | Decided. Email/password or other providers are not decided; do not add them without user approval. |
| Database | Neon Postgres, accessed through Drizzle ORM | Decided. |
| AI SDK | Vercel AI SDK | Decided. |
| AI providers | Apinex and OpenRouter | Decided as providers to use. See Section 9 for what is not decided. |
| AI streaming | Real-time streaming, as in the video | Decided. |
| Image upload | Uploadcare, following the Vivid pattern | Proposed, `[TO CONFIRM]`. The user said “the rest is the same as Vivid”, but did not name the upload provider separately in answers 8–12. |
| Payment (v2 only) | Midtrans, replacing LemonSqueezy | Decided for v2 only. Do not implement payment in v1. |
| Deployment | Vercel | Decided. |
| Repository structure | Follow https://github.com/alwan2398/slider-ai-persentation | Decided. See Section 10. |

Already verified in that repository on 2026-10-27 (public, default branch `main`, commit `4dd230d`):

- Root folders: `app`, `components`, `constant`, `hooks`, `lib`, `public`.
- `app` contains `(landing)/page.tsx`, `favicon.ico`, `globals.css`, `layout.tsx`.
- `components` contains `layout`, `ui`, and `views/landing`.
- `lib` contains `animations.ts`, `db.ts`, `highlighter.tsx`, `schema.ts`, `utils.ts`.
- `package.json` already lists Next.js `16.4.2`, React `19.3.0`, Drizzle ORM, Neon serverless, Tailwind CSS v4, Framer Motion, and shadcn tooling. Better Auth, Zustand, Vercel AI SDK, and Uploadcare are not shown as installed in that `package.json` snapshot; they are planned additions, not verified installations. Do not claim they are installed until the agent checks the repository at Build time.

## 9. AI provider rules — what is decided and what is not

Decided:

- Use the Vercel AI SDK.
- Use Apinex and OpenRouter as providers.
- Stream AI output in real time.
- Validate AI JSON output before saving or rendering it.

Decided by the user on 2026-10-27, user-stated (not provider-verified, see note below):

- Provider name and site: Apinex, at https://apinex.bond/overview. The user's earlier phrase “Apinex Bound” is clarified as Apinex on the apinex.bond domain.
- Apinex base URL: https://api.apinex.bond/v1
- Apinex free models named by the user: GLM 5.3 Flash and DeepSeek V4 Flash. The exact model IDs as shown in the provider dashboard must be confirmed at Build time; the names above are the user's stated models, not a verified dashboard listing.
- First Apinex model to try, confirmed by the user on 2026-10-27: GLM 5.3 Flash. DeepSeek V4 Flash is the other Apinex free model named by the user; its exact position after GLM in the chain is recorded as the next Apinex option, and the user may correct this if that is not intended.
- Both providers are OpenAI-compatible, so the setup pattern is the same for both: base URL, API key, and model. In Deckora this pattern is implemented through the Vercel AI SDK's OpenAI-compatible provider support, not by copying a raw OpenAI SDK example into production code.
- Provider order: Apinex is primary, OpenRouter is secondary (fallback).
- Fallback trigger, agreed by the user on 2026-10-27: fall back on provider error, rate limit, or timeout, not on output quality alone.

Verification note: the Apinex overview page could not be verified without login on 2026-10-27. It showed only a session check and then redirected to a login page, so its model list, base URL, and setup examples were not visible without an account. The values above therefore rest on the user's own account information, not on a public provider page check. Do not present them as provider-verified.

Not decided — do not invent these:

- OpenRouter model ID. Deferred by the user on 2026-10-27: the user has not yet reviewed OpenRouter's free models, so this decision is intentionally postponed, not forgotten.
- Whether both providers are used for the same generation step, or for different steps (outline vs. layout vs. copy).

Rule: all provider base URLs, model IDs, and API keys must come from the user's own accounts. The agent must never guess, invent, or hard-code them. Environment variable names in AGENTS.md are proposals only. The example API key in a provider documentation snippet must never be copied into Deckora code or documents.

## 10. Repository and structure rules

- The repository structure and component organisation must follow https://github.com/alwan2398/slider-ai-persentation.
- Do not restructure folders, rename existing top-level folders, or move `constant/` and `hooks/` without user approval.
- Reuse existing components in `components/ui/` and `components/layout/` before creating new ones.
- New Deckora features must fit the existing App Router layout: landing under `app/(landing)`, authenticated and editor routes in their own route groups as approved in implementation planning.
- The existing `lib/schema.ts` and `lib/db.ts` must be read before any database change. Extending them is allowed; silently replacing them is not.

## 11. Build order — decided

Build in this order, one phase at a time, with user approval to move to the next phase:

1. Scaffold and repository setup verification.
2. Landing page.
3. Dashboard / workspace.
4. Create from prompt and outline with drag-and-drop.
5. Theme picker and AI layout generation.
6. Editor with recursive content renderer, image upload, and auto-save.
7. Presentation mode, share link, trash, and thumbnails.
8. Monetisation — v2 only: Midtrans payment and template store. Do not start phase 8 in v1.

The user prepares what is needed, such as API keys. The AI agent does the remaining implementation work, except for items the user explicitly keeps for himself.

## 12. Non-functional requirements

- **Performance:** dashboard, editor, and presentation mode must feel responsive. AI generation progress must be visible through streaming; the UI must not freeze with no feedback.
- **Responsiveness:** landing, dashboard, editor, and presentation mode must work on desktop and mobile layouts, with editor controls usable on smaller screens or clearly marked as desktop-first `[TO CONFIRM]` if the user accepts that limit.
- **Accessibility:** interactive controls must be keyboard reachable where reasonable, images must have alt text handling, and colour alone must not be the only way to convey state.
- **Design quality:** modern, clean, and deliberate. Generic, templated “AI slop” UI is forbidden. If the agent does not understand a design or product requirement, it must ask the user first, before executing.
- **Security:** ownership and credit checks on the server; no secrets in code, logs, or committed files; no client-side-only protection for generation, sharing, or deletion.
- **Reliability:** failed AI generation must not corrupt an existing presentation. A failed new generation must not leave a broken, half-saved deck as if it succeeded.
- **Cost control:** credits are the v1 cost control. The agent must not add paid services or paid tiers without user approval.

## 13. Verification and definition of done

A v1 feature is done only when all of these are true:

- The user can complete its full flow in a real browser, not only in code review.
- Its server-side ownership, auth, and (for generation) credit checks pass.
- Its data survives refresh: order, theme, content, and trash state are correct after reload.
- `npm run lint` and `npm run build` pass, or failures are reported honestly with the exact failing step.
- Bugs found during verification are traced to root cause and fixed, not hidden by a workaround without explanation.

Automated tests, manual checklists, and the exact test scope for each phase are to be defined in implementation planning, because brainstorming answers 19–27 were not yet provided. Do not invent a test plan as if the user approved it.

## 14. Open questions — must be confirmed before Build

These are not decisions. The agent must ask the user about them and must not guess the answers in code.

1. OpenRouter model ID — deferred by the user until the user has reviewed OpenRouter's free models. Do not choose one on the user's behalf in v1 planning.
3. Is Uploadcare confirmed for image upload, or is another upload service preferred?
4. What is the exact credit rule: does 1 AI presentation generation always cost 1 credit, and does a failed generation cost 0?
5. Is Google the only login method, or are other Better Auth methods allowed later?
6. What are the exact workspace/editor/share route names, if they differ from the patterns in this PRD?
7. What are the contents of the existing `lib/schema.ts` and `lib/db.ts`, and how should they be extended without breaking existing code?
8. Which Aceternity UI components are approved, and what is the final visual direction? This belongs in Design.md, which the user explicitly said not to create yet.
9. What are the brainstorming answers for verification, permissions, reusable skills, and sub-agent/context isolation (original questions 19–27)? Those answers will complete AGENTS.md's Verify and workflow sections.
10. Is light/dark mode required in v1, following the Vivid pattern, or is a single theme enough for v1?
11. When a trashed presentation's share link is opened, should it show a blocked message or a not-found view?

## 15. Change control

- Changes to this PRD or to AGENTS.md require the user's explicit approval. The user confirmed this in brainstorming answer 15.
- If a new requirement conflicts with this PRD, stop and ask the user before implementing it.
- Design.md is intentionally deferred. Do not create Design.md until the user explicitly asks for it.

---

## Appendix: traceability to brainstorming answers

- Vision, users, v1 features, deferred features, user journey, and credits: answers 1–7.
- Stack, auth/database, AI providers, payment deferral, and deployment: answers 8–12.
- Repository structure, UI quality rule, and change approval: answers 13–15.
- Build order and division of work: answers 16–18.
- Answers 19–27 (verification, permissions, skills, sub-agents) were not provided in this round and are therefore open questions, not decisions.
