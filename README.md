# Deckora

**Deckora is an AI presentation builder.**

Anyone can turn a prompt into a presentation, view it immediately in presentation mode, and share it with other users through a link. AI helps by generating an outline and slide layouts, so making a good deck is easier than starting from a blank slide.

**Status:** Planning documents are complete (PRD, AGENTS, Design). Build has not started yet. This README describes the v1 target, not a finished product.

**Repository:** https://github.com/alwan2398/Deckora-Persentation

**Related documents:** `PRD.md` defines what to build. `AGENTS.md` defines how to work on this project. `Design.md` defines how Deckora must look and feel.

> Deckora is an original re-implementation of Vivid-like behaviour from the Web Prodigies AI Presentation Builder tutorial series, under a new name. Do not copy the Vivid codebase, assets, or Figma file.

## Who Deckora is for

- Students who need class, assignment, or seminar presentations.
- Teachers who need lesson and classroom presentations.
- Anyone who wants to create a presentation quickly.

Enterprise teams with shared workspaces, real-time multi-user co-editing, and marketplace sellers are not v1 users.

## Features in v1

V1 is complete only when every feature below works end to end, not only when its code exists.

### Entry and account

- Modern, clean landing page.
- Sign-in at `/sign-in` and sign-up at `/sign-up`.
- Google login through Better Auth.

### Dashboard and workspace

- Authenticated dashboard listing the signed-in user's presentations.
- Create, open, and edit presentations.
- Thumbnail preview for each presentation.
- Empty state and loading state.
- Trash view with restore and permanent delete. Permanent delete requires explicit confirmation.

### AI-assisted creation

- Create from a prompt or topic.
- AI-generated outline, with drag-and-drop reordering.
- Theme picker with theme cards.
- AI-generated slide layouts from the outline.
- Real-time AI streaming, so the user sees progress while output is generated.
- AI output as structured, validated JSON. AI must not output free-form HTML for slides.

### Slide editor

- Slide editor for a presentation, for example at `/presentation/[presentationId]`.
- Ordered slides with drag-and-drop reordering.
- Recursive content renderer by content type: heading, paragraph, list, callout, code block, image, and table (including resizable columns).
- Inline text editing with auto-height paragraphs.
- Image uploading for slides.
- Auto-save with a visible saved indicator. No manual save button is required to avoid losing work.

### Presentation and sharing

- Full-screen presentation mode, slide by slide.
- Share link for a presentation, for example at `/share/[presentationId]`.
- Copy share link action in the editor. Shared presentations are view only.

### Credits

- Each user starts with 5 AI generation credits.
- Proposed rule, to confirm: 1 successful AI presentation generation consumes 1 credit, and a failed generation that produces no usable presentation must not consume a credit.
- When credits are exhausted, AI generation is blocked with a clear message. Editing, viewing, presenting, and sharing still work.
- Credit balance must be checked on the server before generation starts.

## Not in v1 (deferred to v2)

Do not build these in v1, even though they appear in the Vivid tutorial:

- Template store and selling templates.
- Subscription and payment. The future payment provider is Midtrans, replacing LemonSqueezy from the video. Payment stays deferred until all v1 features truly work.
- AI image generation. User image upload in the editor is v1. AI-generated images are v2.

## How Deckora works

```
Prompt
  -> Outline (structured data, reorder by drag and drop)
  -> Theme selection
  -> Layout JSON (structured data, validated)
  -> Recursive content renderer
  -> Slide editor (auto-save)
  -> Presentation mode / share link
```

User journey in v1:

1. Open Deckora and see the landing page.
2. Sign in or sign up.
3. Enter the dashboard and workspace.
4. Write a prompt, review and reorder the outline, pick a theme, and generate layouts.
5. Edit slides in the editor.
6. Present the deck, then share it by link.
7. Move a presentation to trash when it is no longer needed, or restore it from trash.

## Tech stack

| Area              | Choice                                                         |
| ----------------- | -------------------------------------------------------------- |
| Framework         | Next.js 16, App Router, no `src` folder, TypeScript            |
| UI                | Tailwind CSS v4, shadcn UI, Aceternity UI, Framer Motion       |
| State             | Zustand for slide and editor state                             |
| Auth              | Better Auth, Google login                                      |
| Database          | Neon Postgres with Drizzle ORM                                 |
| AI                | Vercel AI SDK, Apinex and OpenRouter, with real-time streaming |
| Image upload      | Uploadcare, proposed, to confirm (following the Vivid pattern) |
| Payment (v2 only) | Midtrans                                                       |
| Deployment        | Vercel                                                         |

Note on the repository snapshot (2026-10-27): the repository already listed Next.js 16.4.2, React 19.3.0, Drizzle ORM, Neon serverless, Tailwind CSS v4, Framer Motion, and shadcn tooling. Better Auth, Zustand, Vercel AI SDK, and Uploadcare were not shown as installed in that snapshot. Treat them as planned additions and verify the current `package.json` at Build time before claiming they are installed.

## Design system

See `Design.md` for the full system. Summary of locked decisions:

- **Mode:** Dark mode first for v1. Light tokens exist in `globals.css`, but v1 design guidance and checks are dark first.
- **Theme source:** `app/globals.css`. Primary orange is `oklch(0.7049 0.1867 47.6044)`. The accent token is a muted surface token, not orange, so primary orange is used only for CTA and small accents.
- **Typography:** Plus Jakarta Sans for `font-sans`, Space Mono for `font-mono`, Georgia for `font-serif` (not a primary typeface in v1). Radius is `0.75rem`.
- **Logo:** Artboard icon as the Deckora logo mark, for now.
- **Components:** Aceternity UI is locked for expressive sections such as hero, cards, and bento grids, combined with shadcn UI primitives for functional controls.
- **Landing sections (v1):** Hero, Features, How It Works, Testimonials, FAQ, Footer. Landing style follows the Caps AI reference page (https://capsai.heyshreyas.com/) as a structural and rhythm reference only, not as copy to duplicate.
- **Slide themes are separate:** Caps AI colors govern the Deckora website (app UI) only. Slide themes in the theme picker are defined later and are not in `Design.md`.
- **Quality rules:** No generic AI slop UI. No fake testimonials, statistics, pricing, or reviews. No em dash character in Deckora UI copy.

## Project structure

Follow the repository structure. Do not create a `src` folder, and do not rename or move top-level folders without user approval.

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
components.json
drizzle.config.ts
eslint.config.mjs
next.config.ts
package.json
tsconfig.json
```

Rules from `AGENTS.md`:

- Reuse components in `components/ui/` and `components/layout/` before creating new ones.
- Landing stays under `app/(landing)`.
- Before any database change, read `lib/schema.ts` and `lib/db.ts` in full. Extend them, do not silently replace them.

## Getting started

### Prerequisites

- Node.js and npm.
- Accounts and keys for Google login, Neon Postgres, Apinex, and OpenRouter. The user prepares keys. The coding agent does the rest.
- Never share API keys in chat, and never commit secrets to the repository. Use the secure flow for credentials at Build time.

### Setup

```bash
git clone https://github.com/alwan2398/slider-ai-persentation.git
cd slider-ai-persentation
npm install
```

Create a local environment file (for example `.env.local`) with the variable names below. Values are never written in documentation.

| Variable                | Notes                                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------ |
| `DATABASE_URL`          | Neon Postgres connection                                                                         |
| `BETTER_AUTH_SECRET`    | Better Auth secret                                                                               |
| `BETTER_AUTH_URL`       | App URL used by Better Auth                                                                      |
| `GOOGLE_CLIENT_ID`      | Google login                                                                                     |
| `GOOGLE_CLIENT_SECRET`  | Google login                                                                                     |
| `APINEX_API_KEY`        | Apinex, primary provider                                                                         |
| `APINEX_BASE_URL`       | `https://api.apinex.bond/v1`                                                                     |
| `APINEX_MODEL`          | First model: GLM 5.3 Flash. Confirm the exact model ID from the provider dashboard at Build time |
| `OPENROUTER_API_KEY`    | OpenRouter, secondary and fallback provider                                                      |
| `OPENROUTER_MODEL`      | Deferred. Do not guess a model ID until the user has reviewed the free OpenRouter models         |
| `UPLOADCARE_PUBLIC_KEY` | Image upload, to confirm                                                                         |
| `UPLOADCARE_SECRET_KEY` | Image upload, to confirm                                                                         |
| `MIDTRANS_SERVER_KEY`   | v2 only, not required in v1                                                                      |
| `MIDTRANS_CLIENT_KEY`   | v2 only, not required in v1                                                                      |

### Run

```bash
npm run dev
```

Then open the address shown by the dev server in the terminal.

### Scripts

| Command         | Purpose                      |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run lint`  | Run lint checks              |
| `npm run build` | Build for production         |
| `npm run start` | Start the production server  |

Report the real output of these commands. Do not claim a command passed if it failed.

## AI providers and fallback

- **Primary:** Apinex at `https://api.apinex.bond/v1`, OpenAI compatible via the Vercel AI SDK.
- **Secondary and fallback:** OpenRouter, also OpenAI compatible via the Vercel AI SDK.
- **First Apinex model:** GLM 5.3 Flash. The next Apinex option recorded is DeepSeek V4 Flash.
- **Fallback trigger (agreed):** provider error, rate limit, or timeout. Fallback is not triggered by output quality alone.
- **OpenRouter model:** intentionally deferred by the user. Do not choose one on the user's behalf.
- **Verification note:** Apinex values here come from the user's own account information. The provider overview page required login at the check on 2026-10-27, so the exact model IDs must be confirmed from the provider dashboard at Build time.

## Development workflow

Deckora follows a phased vibe coding workflow. Do not jump straight to coding while a decision for that phase is still open.

1. **Plan:** Interactive interview, decisions recorded in `PRD.md`.
2. **Decide:** Conscious technical blueprint, recorded in `AGENTS.md`.
3. **Contextualize:** Freeze context and rules in `AGENTS.md` and `Design.md` so work survives a closed chat.
4. **Build:** Step by step, in this order: scaffold, landing page, dashboard, create and outline, theme and AI layout, editor, presentation mode, then monetisation (v2) last.
5. **Verify and Fix:** Test in a real browser, run automated tests where applicable, and trace bugs to their root cause. Do not trust an AI claim that something works without a real check.

Working rules:

- Read `PRD.md` and `AGENTS.md` first in every session.
- Changes to `PRD.md` or `AGENTS.md` require the user's explicit approval.
- If a requirement is not understood, ask first before executing.
- Sensitive actions (database schema or data changes, secrets, deploys, payments) need explicit permission for that exact action, plus a report after database work.
- Move between phases only with the user's approval.

## Project status and open decisions

Build has not started. These items are intentionally open, not forgotten:

- OpenRouter model ID (deferred by the user).
- Uploadcare confirmation as the image upload provider.
- Exact credit rule for failed generations.
- Exact workspace, editor, and share route names, if different from the patterns in `PRD.md`.
- Contents of `lib/schema.ts` and `lib/db.ts`, and how to extend them without breaking existing code.
- Slide theme specification (separate from the app theme).
- Exact Deckora landing copy and real testimonials.
- Exact Aceternity UI component choices and versions, and the exact artboard logo mark file or library name.
- Brainstorming answers 19 to 27 (verification detail, permissions detail, reusable skills, sub-agents).
- Light mode visual checks (v1 is dark first).

Do not invent or lock any of these items in code or documentation without user approval.
