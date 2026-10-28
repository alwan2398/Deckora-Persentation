# Deckora - Design System (Design.md)

**Product:** Deckora - AI Presentation Builder
**Version:** v1 Draft, 2026-10-28
**Status:** Locked for the decisions in Section 2. Open items are listed in Section 14. Do not change a locked decision without user approval.
**Language rule:** This document is written in clear, plain English, like PRD.md and AGENTS.md, so that a coding AI agent can parse it without ambiguity.
**Companion documents:** PRD.md defines what to build. AGENTS.md defines how to work. This document defines how Deckora must look and feel, consistently across landing, dashboard, editor, presentation mode, and share view.
**Single source for tokens:** `app/globals.css` in the Deckora repository (https://github.com/alwan2398/slider-ai-persentation). Token values in this document are copied from that file as verified on 2026-10-28. If code and this document disagree, stop and ask the user. Do not silently change a token in code.

## 1. Design principles

1. **Clean first, decorative second.** Every screen must have one clear primary action and one clear reading order. Decoration must never compete with the task.
2. **Dark first for v1.** Deckora is designed dark first. Dark is the primary v1 visual direction. Light tokens exist in `globals.css`, but v1 design guidance, examples, and checks in this document are dark first. Light mode is not the v1 design focus.
3. **One system, everywhere.** Landing, dashboard, editor, presentation mode, and share view must use the same tokens, typography, radius, shadows, and component patterns. A new screen must not invent a new visual language.
4. **Orange only for call to action and accent.** The primary orange is a signal, not a background theme. Use it for primary buttons, key links, active states, focus rings, and small accents. Do not fill large surfaces with orange, and do not use orange for body text on a dark background unless contrast is verified in implementation.
5. **Calm product surfaces, expressive marketing surfaces.** Marketing sections may use Aceternity UI expressive patterns. Product surfaces (dashboard, editor, presentation mode) must stay calm, dense where useful, and predictable.
6. **No generic AI slop.** Do not produce templated, low effort marketing layouts, vague hero copy, meaningless feature grids, or stock style sections and call them finished. Every section must have a Deckora specific purpose, real Deckora copy, and a real next action.
7. **No fake proof.** Do not invent testimonials, statistics, user counts, logos, pricing, or reviews. A testimonials section may only show real testimonials supplied by the user. A statistics section is not part of v1 landing unless the user supplies real data.
8. **Copy rule: no em dash character.** Do not use the em dash character in Deckora UI copy, headings, landing copy, or in this design system when writing new copy. Use a comma, a period, or parentheses instead. This rule was set by the user on 2026-10-28 and applies to Deckora copy, not to code comments that quote an external source.

## 2. Locked decisions (from user answers, 2026-10-28)

| Decision | Locked value |
|---|---|
| File name | `Design.md`, in English, like PRD.md and AGENTS.md |
| Theme source | `app/globals.css` in the repository |
| Scope | Full design system, covering landing, dashboard, editor, presentation mode, and share view, for consistency |
| Primary mode | Dark mode first for v1 |
| App theme vs slide themes | Caps AI colors are for the Deckora website (app UI) only. Slide themes in the theme picker are separate and are defined later, not in this document |
| Aceternity UI | Locked for expressive sections, for example hero, cards, and bento grids, combined with shadcn UI components |
| Logo | Artboard icon as the Deckora logo mark, for now |
| Orange rule | Orange only for call to action (CTA) and accent |
| Landing sections (v1) | Hero, Features, How It Works, Testimonials, FAQ, Footer |
| Landing reference style | Caps AI landing page at https://capsai.heyshreyas.com/ , as a structural and rhythm reference only, not as copy to duplicate |

## 3. Brand

### 3.1 Name and wordmark

- Product name: Deckora.
- Wordmark: the word “Deckora” in Plus Jakarta Sans, with clear letter spacing from the token set in Section 4. Do not add a gradient wordmark, a generic AI sparkle, or a tagline that is not approved by the user.
- Logo mark: an artboard style icon, placed before the wordmark in the header and in compact contexts. The exact icon library name must be confirmed in implementation if the chosen library names it differently. Do not invent a logo file that does not exist in the repository.

### 3.2 Voice for UI copy

- Short, direct, and specific to presentations. Example tone: “Turn a prompt into a deck.” “Edit any slide.” “Present, then share the link.”
- Avoid vague claims such as “supercharge everything” or “unlock your potential” unless the user supplies that exact copy.
- Buttons must say what happens next: “Create presentation”, “Present”, “Copy share link”, “Move to trash”. Do not use a button label that hides a destructive action.

## 4. Design tokens (from globals.css)

All token names below use the CSS variable names from `globals.css`. Tailwind v4 maps them through the `@theme inline` block in that file. Do not rename tokens without user approval.

### 4.1 Typography

| Token | Value |
|---|---|
| `--font-sans` | Plus Jakarta Sans |
| `--font-mono` | Space Mono |
| `--font-serif` | Georgia, serif |
| `--tracking-normal` | -0.02em |
| Tracking scale | tighter: normal minus 0.05em, tight: normal minus 0.025em, wide: normal plus 0.025em, wider: normal plus 0.05em, widest: normal plus 0.1em |

Usage:

- `font-sans` (Plus Jakarta Sans) is the default for UI, headings, body, and buttons.
- `font-mono` (Space Mono) is only for code blocks, code labels, and small technical labels, such as a slide type label or a keyboard hint. Do not use Space Mono for body copy or headings.
- `font-serif` (Georgia) is available in the token set, but it is not a primary Deckora typeface. Do not use it for headings or body copy in v1 unless the user approves a specific serif use.
- Headings use Plus Jakarta Sans with tight tracking. Body copy uses Plus Jakarta Sans with normal tracking.
- Letter spacing on the body follows `--tracking-normal` as set in `globals.css`.

Type scale (guidance for implementation, to be checked against the landing and editor at Build time):

- Display / hero headline: largest, Plus Jakarta Sans, bold, tight tracking, one idea per line where possible.
- Section headline: large, Plus Jakarta Sans, semibold or bold.
- Card headline: medium, Plus Jakarta Sans, semibold.
- Body: base size, Plus Jakarta Sans, regular, with comfortable line height for reading.
- Small label / caption: small size, Plus Jakarta Sans, medium weight, used for labels such as “Theme”, “Slide 3”, or “Saved”.
- Code: Space Mono, at a size that keeps code readable in a slide and in the editor code block.

Do not add a new font family in v1.

### 4.2 Color tokens, dark mode (primary for v1)

These are the `.dark` values from `globals.css`:

| Token | Dark value |
|---|---|
| `--background` | oklch(0.1448 0 0) |
| `--foreground` | oklch(0.9851 0 0) |
| `--card` | oklch(0.1822 0 0) |
| `--card-foreground` | oklch(0.9851 0 0) |
| `--popover` | oklch(0.1822 0 0) |
| `--popover-foreground` | oklch(0.9851 0 0) |
| `--primary` | oklch(0.6741 0.191 42.8577) |
| `--primary-foreground` | oklch(1 0 0) |
| `--secondary` | oklch(0.2686 0 0) |
| `--secondary-foreground` | oklch(0.9851 0 0) |
| `--muted` | oklch(0.2178 0 0) |
| `--muted-foreground` | oklch(0.7155 0 0) |
| `--accent` | oklch(0.6741 0.191 42.8577) |
| `--accent-foreground` | oklch(1 0 0) |
| `--destructive` | oklch(0.3958 0.1331 25.723) |
| `--destructive-foreground` | oklch(0.9851 0 0) |
| `--border` | oklch(0.2178 0 0) |
| `--input` | oklch(0.2178 0 0) |
| `--ring` | oklch(0.6741 0.191 42.8577) |
| `--chart-1` | oklch(0.6741 0.191 42.8577) |
| `--chart-2` | oklch(0.8369 0.1644 84.4286) |
| `--chart-3` | oklch(0.6959 0.1491 162.4796) |
| `--chart-4` | oklch(0.6231 0.188 259.8145) |
| `--chart-5` | oklch(0.6268 0.2325 303.9004) |

In plain language: dark neutral background, near white foreground text, slightly lighter dark cards, dark neutral secondary and muted surfaces, and one orange for primary, accent, ring, and chart 1. Chart 2 to 5 are supporting chart colors only. Do not use chart colors as general UI accents.

### 4.3 Color tokens, light mode (retained in code, not the v1 design focus)

Light values from `:root` in `globals.css`, recorded here only so that code and this document stay consistent. V1 design checks are dark first.

| Token | Light value |
|---|---|
| `--background` | oklch(0.994 0 0) |
| `--foreground` | oklch(0.1448 0 0) |
| `--card` | oklch(1 0 0) |
| `--card-foreground` | oklch(0.1448 0 0) |
| `--popover` | oklch(1 0 0) |
| `--popover-foreground` | oklch(0.1448 0 0) |
| `--primary` | oklch(0.6741 0.191 42.8577) |
| `--primary-foreground` | oklch(1 0 0) |
| `--secondary` | oklch(0.2178 0 0) |
| `--secondary-foreground` | oklch(1 0 0) |
| `--muted` | oklch(0.9672 0 0) |
| `--muted-foreground` | oklch(0.5555 0 0) |
| `--accent` | oklch(0.6741 0.191 42.8577) |
| `--accent-foreground` | oklch(0.6741 0.191 42.8577) |
| `--destructive` | oklch(0.6368 0.2078 25.3313) |
| `--destructive-foreground` | oklch(0.9851 0 0) |
| `--border` | oklch(0.9219 0 0) |
| `--input` | oklch(0.9219 0 0) |
| `--ring` | oklch(0.6741 0.191 42.8577) |

Note the one intentional light mode difference: `--accent-foreground` in light mode is the orange value itself, while in dark mode it is white. Do not “fix” this difference silently. If it causes a contrast problem in implementation, report it and ask the user before changing a token.

### 4.4 Radius, spacing, and shadow

From `globals.css`:

- `--radius`: 0.75rem.
- Radius scale: small is radius minus 4px, medium is radius minus 2px, large is radius, extra large is radius plus 4px.
- `--spacing`: 0.25rem (Tailwind spacing base).
- Light shadow base: 0px horizontal, 4px vertical, 10px blur, 0px spread, opacity 0.1.
- Dark shadow base: 0px horizontal, 10px vertical, 20px blur, 0px spread, opacity 0.5.
- Shadow scale in the file goes from 2xs to 2xl, with the same direction (downward) and increasing blur and opacity for larger elevations.

Usage:

- Cards, dialogs, popovers, and panels use the large radius (0.75rem) by default, unless a smaller component (for example, a small badge or input) needs the small or medium radius from the scale.
- Shadows are for elevation only: a card on a page uses a small shadow, a popover or dropdown uses a medium shadow, a dialog uses a large shadow. Do not add a shadow to every element.
- Spacing follows the Tailwind spacing scale based on 0.25rem. Section spacing must be consistent across landing sections, not random per section.

### 4.5 Focus and borders

- Base rule in `globals.css`: all elements use the border token for borders and the ring token at 50 percent opacity for outlines.
- Body uses background and foreground tokens, with normal tracking.
- Focus state: visible ring in the primary orange. Do not remove the focus ring for visual cleanliness. Keyboard users must see where focus is.
- Borders use the border token only. Do not invent a new border color per component.

## 5. Layout system

### 5.1 Page structure

- Maximum content width must be consistent across landing and dashboard. Marketing sections may be wider than product screens, but the width must not change randomly from section to section.
- Landing sections follow a clear vertical rhythm: generous top and bottom padding, a centered section heading block where the section needs one, and a content block below it. This rhythm follows the Caps AI reference structure, without copying its copy.
- Product screens use an app shell, not a marketing layout: a sidebar or top navigation, a main content area, and a consistent header for the current context (dashboard, editor, or trash).

### 5.2 Grid and cards

- Feature and content cards use a grid that collapses cleanly to one column on mobile. A card must have a title, a short specific description, and, where relevant, one action. A card without a clear purpose is not a feature card.
- Bento grids (Aceternity UI) are allowed for landing feature sections only, where a larger card can show a more important feature and smaller cards show supporting features. Bento layout must not be used for the editor canvas, slide list, or dashboard data tables, where predictability matters more than visual variety.

### 5.3 Responsive rules

- Mobile first in structure, dark first in theme. A layout must work at mobile width, then expand to tablet and desktop, not the other way around.
- The editor is the most complex surface. On small screens, editor controls must remain reachable, or the limitation must be stated explicitly in implementation planning and approved by the user. Do not claim full mobile editor parity if it is not implemented.
- Presentation mode must fill the screen and keep slide content readable. Slide text must not overflow the slide frame at common presentation sizes.

## 6. Component system

Two component families, with a clear division of labour:

### 6.1 shadcn UI: functional primitives

Use existing shadcn UI components in `components/ui/` first, before creating a new primitive. This family covers:

- Button, Input, Textarea, Label, Select, Dialog, Dropdown Menu, Tabs, Tooltip, Badge, Separator, Skeleton, and similar primitives.
- Sidebar and layout components in `components/layout/`, where they already exist.
- Form controls, dashboard controls, editor controls, dialogs (including trash confirmation and share dialog), and settings style controls.

Rules for shadcn UI components:

- Do not recreate a primitive that already exists in `components/ui/`.
- Do not restyle a primitive per screen. If a primitive needs a change, change it in the primitive and check every screen that uses it.
- Primary button: orange background, white foreground (from `--primary` and `--primary-foreground`), large radius, clear label.
- Secondary button: secondary token background, secondary foreground text.
- Destructive action: destructive token, only for permanent delete and similar destructive actions, always behind an explicit confirmation dialog.
- Disabled state must be visibly disabled, not just a lighter version of an active button with no other cue.

### 6.2 Aceternity UI: expressive marketing sections

Aceternity UI is locked for expressive sections, combined with shadcn UI primitives for functional controls inside those sections. Approved Aceternity use in v1:

- Hero section patterns.
- Feature cards.
- Bento grid for landing features.

Rules for Aceternity UI components:

- Use Aceternity for landing marketing sections only in v1. Do not use an Aceternity marketing pattern as an editor control, a dashboard data control, or a slide content component, unless the user approves that specific use.
- An Aceternity component must still follow Deckora tokens: Plus Jakarta Sans for text, dark background tokens, border token, large radius, and orange only for CTA and accent. If an Aceternity example uses a different palette, adapt it to Deckora tokens. Do not import an example palette as a second theme.
- Animation from Aceternity or Framer Motion must be purposeful: entrance, hover, or selection feedback. Do not add continuous, distracting motion to product screens, and respect reduced motion where the platform supports it.

### 6.3 Combined rule

- Marketing section: Aceternity pattern for layout and expression, shadcn primitives for buttons, inputs, and dialogs inside it.
- Product screen: shadcn primitives and existing layout components first, Aceternity only where the user approves a specific expressive element.
- If a needed component exists in neither family, propose it to the user before creating a custom component, and record it in this document as an amendment if approved.

## 7. Landing page design

Landing reference: Caps AI landing page at https://capsai.heyshreyas.com/, as a structural and rhythm reference only. Deckora landing copy, product, pricing, testimonials, and statistics must be Deckora specific and real. Do not copy Caps AI copy, and do not copy its product (social media captions) into Deckora.

### 7.1 Landing sections, in order (v1)

1. **Hero.** Badge or eyebrow label, headline, supporting subcopy, primary CTA, and secondary action. The hero must say, in Deckora terms, that a user can turn a prompt into a presentation, view it, and share it by link, with AI help. The hero CTA must lead to sign in or sign up, or to creating a presentation after sign in, depending on the approved landing flow. Do not promise a free trial, a price, or a feature that is not in v1.
2. **Features.** A grid or bento grid of Deckora v1 features: create from prompt, outline drag and drop, theme picker, AI layout, slide editor, presentation mode, share link, auto-save, thumbnails, and trash. Each feature card must describe a real v1 feature in one or two short sentences. Do not list v2 features (template store, selling, subscription, AI image generation) as if they are available in v1.
3. **How It Works.** Three or four steps that match the real PRD flow: write a prompt, review and reorder the outline, pick a theme and generate layouts, edit, present, and share. Each step must have a short title and a short description. Do not add a step that does not exist in the product.
4. **Testimonials.** Only real testimonials supplied by the user. If no real testimonials are supplied, the section must be omitted or shown as a clearly marked placeholder in design review, never as invented quotes with invented names, roles, or companies. In production code, do not ship invented testimonials.
5. **FAQ.** Questions and answers about Deckora v1 only: what Deckora does, who it is for, how AI generation and credits work (starting at 5 AI generations), how sharing works, and what happens in trash. Do not answer pricing, subscription, or template store questions as if those v2 features exist. If a v2 question is included, the answer must state clearly that the feature is planned for a later version.
6. **Footer.** Product name and logo mark, short product description, links to sign in and sign up, links to main product areas, and a copyright line. Do not add legal, pricing, or social links that do not exist yet.

Sections deliberately not in v1 landing: pricing (v2), statistics with invented numbers (no data supplied), integrations list (no integrations confirmed for v1), and a template store showcase (v2).

### 7.2 Landing visual rules

- Follow the Caps AI rhythm: a clear hero first, then a feature section, then a process section, then social proof only if real, then FAQ, then footer. Do not reorder sections without user approval.
- Hero headline must be the largest text on the page, with tight tracking. Supporting copy must be shorter than the headline and must not repeat the headline.
- Feature cards and bento cards use card tokens, border tokens, and large radius. Orange appears only on the primary CTA, small accents, and active states, not as a card background.
- Section headings must be specific to Deckora. A heading such as “Features” alone is too generic for a finished landing page. Use a Deckora specific heading, for example “Everything you need to make a deck”, only if the user approves that exact copy in implementation. Otherwise, propose copy and wait for approval.
- The landing page must not use the em dash character in any copy, as stated in Section 1.

## 8. Dashboard and workspace design

- App shell: sidebar navigation (or top navigation on small screens) plus a main content area. Navigation items in v1: Dashboard/Workspace, Create, Trash, and account/sign out, plus a clear primary action to create a presentation. Do not add navigation for template store, subscription, or settings pages that are not in v1, unless the user approves them as placeholders.
- Presentation cards: thumbnail, title, last updated label, and actions (open, edit title where applicable, move to trash). Cards use card tokens and large radius. The thumbnail must be a real slide preview where available, not a generic placeholder image used for every deck.
- Create flow entry: a prominent primary button and, where the dashboard design supports it, a prompt input that leads to the create and outline flow. The prompt input must use shadcn Input and Button primitives.
- Empty state: when the user has no presentations, show a clear empty state with a short explanation and a primary action to create the first presentation. Do not show an empty grid with no guidance.
- Loading state: use Skeleton components from shadcn UI while presentations load. Do not show a blank page with no feedback.
- Trash view: same card pattern as the dashboard, with restore and permanent delete actions. Permanent delete uses the destructive token and a confirmation dialog.
- Credit display: where the dashboard shows AI credits, it must show the real remaining balance from the server, with a clear label such as “AI generations left”. Do not show a fake or hardcoded credit number.

## 9. Editor design

- Editor shell: top navbar, slide list or thumbnail panel, and a central slide canvas. The navbar must include, at minimum: back to dashboard, presentation title, copy share link, and Present. Do not add a Sell Template action in v1.
- Slide canvas: a slide frame with a clear border, card background, and a readable slide area. Slide content uses the slide theme for that deck, not the app UI theme. App UI theme (this document) governs chrome around the canvas. Slide themes are separate and are defined later.
- Slide list: thumbnail for each slide, title or first heading where available, active slide highlighted with the ring or accent token, and drag handle for reordering. Dragging must show a clear drop target.
- Content editing: text editing must be inline in the slide where the Vivid pattern uses inline editing, with auto height for paragraphs. A block that is being edited must be visibly focused. Toolbar controls, where present, must use shadcn primitives and must not obscure the slide.
- Auto-save indicator: a small, calm label such as “Saved”, “Saving”, or “Save failed”, placed consistently in the editor navbar or header. It must reflect the real save state. Do not show “Saved” when a save has failed.
- Credit and generation states: while AI generation streams, show progress in the relevant panel, not a full page block with no feedback. On failure, show a clear error, keep the existing deck intact, and do not mark a failed generation as successful.
- Outline view: outline items must be draggable, with a clear drag handle and drop indicator. The outline order after drag must match the slide order in the editor.

## 10. Presentation mode and share view design

- Presentation mode: full screen, dark background for the presentation frame where the slide theme allows it, centered slide, and clear navigation (previous, next, exit). Navigation controls must not obscure slide content for long. They may appear on interaction and fade where that pattern is approved, but keyboard navigation must always work.
- Slide content in presentation mode must match the editor content and theme exactly. No block type may disappear in presentation mode.
- Share view: a clean, view only presentation. It must not show editor controls, edit buttons, or generation controls. It may show the presentation title and a link back to Deckora, where that does not distract from the presentation.
- Share view loading and error states: a loading state while the shared deck loads, and a clear error state if the link is invalid or the deck is not available. Do not show an editor shell for an invalid share link.

## 11. Slide themes (theme picker) - separate from app theme

This is a critical separation, locked by the user:

- **App theme:** the tokens in Section 4, from Caps AI colors via `globals.css`, govern the Deckora website itself: landing, dashboard, editor chrome, dialogs, and share view chrome.
- **Slide themes:** the themes a user picks in the theme picker govern the slides themselves: slide background, slide text, slide accents, and slide component styling inside the slide frame.
- Slide themes are NOT defined in this document. They are defined later, in a separate slide theme specification. Do not use app primary orange as a slide theme by default, and do not copy app tokens into slide themes without a separate slide theme decision.
- Theme picker UI (the picker itself, its cards, and its selection state) follows this app design system. Theme picker content (the slide previews inside each theme card) follows the future slide theme specification.
- Until slide themes are defined, implementation must not invent slide theme palettes and present them as final. Use clearly marked placeholders in design review, and wait for the slide theme specification before finalising theme picker visuals.

## 12. States, feedback, and motion

### 12.1 States for every interactive surface

Define and implement these states, not just the default state:

- Default, hover, focus, active, disabled, loading, empty, error, and success where relevant.
- Focus must always be visible with the ring token.
- Disabled must be visibly disabled.
- Loading must use a skeleton or a progress indicator, not a blank area.
- Empty states must explain what is missing and give one next action.
- Error states must explain what went wrong in plain language and give a next action (retry, go back, or check input). Do not show a raw error code as the only message.

### 12.2 Motion

- Use Framer Motion for purposeful motion: page and section entrance, card hover lift where approved, theme card selection, drag and drop feedback, and presentation transitions.
- Motion must be fast and calm. Do not use slow, bouncy, or continuous motion on product screens.
- Drag and drop must give immediate visual feedback: dragged item elevation, drop target highlight, and a settled state after drop.
- Respect reduced motion preferences where the platform supports it. Do not force continuous animation on a user who prefers reduced motion.

## 13. Accessibility and quality checks

- Text contrast must be checked in implementation for dark mode, especially for muted foreground text, secondary text, and orange on dark surfaces. If a token combination fails a basic contrast check, report it and ask the user before changing a token.
- Interactive targets must be large enough to tap and click reliably. Small icon only buttons must have an accessible label.
- Forms and dialogs must have labels, not placeholder only text.
- Images in slides and in landing must have alt text handling. Decorative images must be marked as decorative where the platform supports it.
- Keyboard navigation must work for dashboard, editor slide list, presentation mode, dialogs, and share view navigation.
- Screen reader labels must be present for icon only actions such as copy link, present, trash, restore, and permanent delete.
- No em dash character in Deckora UI copy, as stated in Section 1. Check landing, dashboard, editor, dialogs, empty states, and error messages for this character before shipping a screen.

## 14. Open items and deferred work

Do not treat these as forgotten. They are intentionally deferred or open:

1. Slide theme specification: palettes, names, and preview rules for the theme picker. Separate from app theme. To be defined later.
2. Exact Deckora landing copy: hero headline, subcopy, feature descriptions, How It Works steps, FAQ answers, and footer copy. Structure is locked in Section 7. Copy must be approved by the user before it is treated as final.
3. Real testimonials: supply real testimonials before the testimonials section ships with content. Otherwise, omit the section in production.
4. Exact Aceternity UI component choices and versions: hero, card, and bento patterns are locked as categories. Exact component names and versions must be confirmed at Build time from the Aceternity UI source used by the project.
5. Exact artboard logo mark: icon style, size, and placement are locked as an artboard icon mark. The exact icon file or library name must be confirmed at Build time.
6. Light mode design checks: light tokens are retained in `globals.css`, but v1 design guidance is dark first. Light mode visual checks are deferred unless the user asks for them.
7. Pricing section: v2 only, with Midtrans as the future provider. Do not design or ship a pricing section in v1 landing.
8. Template store and AI image generation visuals: v2 only. Do not design them as v1 features.

## 15. Implementation notes for the coding agent

- Start from `app/globals.css` tokens. Do not create a second token file with different values.
- Use Tailwind v4 utility classes mapped to the tokens in Section 4, through the `@theme inline` block in `globals.css`.
- Use existing `components/ui/` and `components/layout/` components first. Add Aceternity UI patterns only for the approved landing sections in Section 6.2 and Section 7.
- When a design decision is missing from this document, ask the user first, as required by AGENTS.md. Do not invent a token, a slide theme, a testimonial, a statistic, or landing copy and present it as final.
- Before claiming a screen is done, check it in dark mode, at mobile and desktop widths, in loading, empty, and error states, and with keyboard navigation, as required by the phased vibe coding workflow.
- If a token in code differs from this document, report the difference and ask the user before changing either side.

---

## Appendix: traceability to user answers (2026-10-28)

- File name and language: answer 1, `Design.md`, English like PRD.md and AGENTS.md.
- Theme source: answer 2, `globals.css`.
- Scope: answer 3, full system for consistency.
- Dark mode first: answer 4.
- Slide themes separate, Caps AI colors for the website only: answer 5.
- Aceternity locked for hero, cards, bento, combined with shadcn UI: answer 6.
- Logo artboard icon, orange only for CTA and accent: answer 7.
- Landing sections: answer 8, hero, features, how it works, testimonials, FAQ, footer.
- Style rule: landing follows Caps AI reference style, no generic AI slop, no em dash character in copy.
