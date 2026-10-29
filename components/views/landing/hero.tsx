import { cn } from "cn";
import { ArrowRight, CheckCircle, Play, Sparkles } from "lucide-react";
import Link from "next/link";
import { DotBackground } from "@/components/ui/dot-background";
import { FloatingChip } from "@/components/views/landing/floating-chip";

/**
 * Chip data: delay is in seconds for Framer Motion transition.
 * Stagger: 0, 0.12, 0.24, 0.36 so the last chip finishes at ~1 second.
 */
const FLOATING_CHIPS = [
  { label: "Prompt", side: "left", position: "upper", delay: 0 },
  { label: "Outline", side: "left", position: "lower", delay: 0.12 },
  { label: "Theme", side: "right", position: "upper", delay: 0.24 },
  { label: "Share", side: "right", position: "lower", delay: 0.36 },
] as const;

/** Trust line items. No pricing claims. The 5 generations figure is from PRD.md section 4.7. */
const TRUST_ITEMS = [
  { icon: Sparkles, label: "5 AI generations included" },
  { icon: CheckCircle, label: "No design skill needed" },
] as const;

/**
 * Returns absolute-position classes for each floating chip.
 * These are passed as positionClassName to FloatingChip and include the
 * responsive hidden/flex control (hidden below lg).
 */
function chipPositionClass(
  side: "left" | "right",
  position: "upper" | "lower",
): string {
  const base = "hidden lg:block";
  if (side === "left" && position === "upper")
    return `${base} left-[13%] top-[57%]`;
  if (side === "left" && position === "lower")
    return `${base} left-[20%] top-[72%]`;
  if (side === "right" && position === "upper")
    return `${base} right-[13%] top-[57%]`;
  return `${base} right-[20%] top-[72%]`;
}

/**
 * Hero section for the Deckora landing page.
 *
 * Background stack (bottom to top):
 *   1. bg-background token
 *   2. DotBackground (1px dots, radial mask fading edges)
 *   3. Soft radial orange glow at the top center
 *   4. Hero content (z-10)
 *   5. Floating workflow chips (z-20, desktop only, Framer Motion animated)
 *
 * This component is a Server Component. The FloatingChip client component
 * handles the Framer Motion animation in isolation.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-svh overflow-hidden bg-background pt-40 pb-24 sm:pt-44 sm:pb-32"
    >
      <DotBackground />

      {/* Orange glow: top center, behind the headline */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-1 h-72 sm:h-80"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, oklch(0.7049 0.1867 47.6044 / 0.12) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6">
        {/* Badge — glass style with orange tint on hover */}
        <div
          className={cn(
            "mb-6 inline-flex animate-in fade-in slide-in-from-bottom-2 cursor-default items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 shadow-sm backdrop-blur-md duration-500 delay-0",
            "transition-colors duration-200 hover:border-primary/30 hover:bg-primary/10 hidden md:flex",
          )}
        >
          <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
            NEW
          </span>
          <span className="text-xs font-medium text-foreground/80">
            Create presentations with AI
          </span>
        </div>

        {/* Headline */}
        <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-3 font-sans text-4xl font-extrabold leading-[1.08] tracking-tighter text-foreground duration-500 delay-100 sm:text-5xl lg:text-6xl xl:text-7xl">
          {"Turn an idea into a "}
          <span className="text-primary">presentation</span>
          {" with AI"}
        </h1>

        {/* Subcopy */}
        <p className="mb-10 max-w-2xl animate-in fade-in slide-in-from-bottom-2 text-base leading-relaxed text-muted-foreground duration-500 delay-200 sm:text-lg">
          Write a prompt, reorder the outline, pick a theme, edit your slides,
          then present and share the deck by link.
        </p>

        {/* CTA row */}
        <div className="mb-8 flex animate-in fade-in slide-in-from-bottom-2 flex-wrap items-center justify-center gap-3 duration-500 delay-300">
          {/* Primary CTA: solid orange */}
          <Link
            href="/sign-up"
            className="inline-flex h-11 min-w-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span className="leading-none">Start creating</span>
            <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
          </Link>

          {/* Secondary CTA: glass style with orange tint on hover */}
          <Link
            href="#how-it-works"
            className={cn(
              "inline-flex h-11 min-w-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-white/10 bg-white/5 px-6 text-sm font-semibold text-foreground/90 backdrop-blur-md",
              "transition-all duration-200 hover:border-primary/30 hover:bg-primary/10",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
          >
            <Play
              className="size-3.5 shrink-0 fill-current"
              aria-hidden="true"
            />
            <span className="leading-none">How it works</span>
          </Link>
        </div>

        {/* Trust line */}
        <div className="flex animate-in fade-in slide-in-from-bottom-2 flex-wrap items-center justify-center gap-x-4 gap-y-2 duration-500 delay-500">
          {TRUST_ITEMS.map(({ icon: Icon, label }, index) => (
            <span
              key={label}
              className="flex items-center gap-1.5 text-xs text-muted-foreground"
            >
              {index > 0 && (
                <span
                  className="mr-2 select-none text-border hidden lg:block"
                  aria-hidden="true"
                >
                  &bull;
                </span>
              )}
              <Icon
                className="size-3.5 shrink-0 text-primary"
                aria-hidden="true"
              />
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Floating workflow chips — desktop only, z-20 to stay above background layers */}
      {FLOATING_CHIPS.map(({ label, side, position, delay }) => (
        <FloatingChip
          key={label}
          label={label}
          side={side}
          delay={delay}
          positionClassName={cn("z-20", chipPositionClass(side, position))}
        />
      ))}
    </section>
  );
}
