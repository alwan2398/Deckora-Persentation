import { cn } from "cn";

interface DotBackgroundProps {
  className?: string;
}

/**
 * Reusable dot background layer from Aceternity UI, revised for Deckora.
 *
 * Deviations from the Aceternity source:
 * - Dot size: 1px (unchanged).
 * - Dot spacing: 24px (was 20px) — airier, less dense.
 * - Dark mode dot color: rgba(255,255,255,0.18) — subtle white instead of
 *   #404040, so dots read as faint pinpoints, not thick blobs.
 * - Dot layer opacity: opacity-60, so the pattern stays faint overall.
 * - Mask changed to a radial-gradient centered on the hero: dots are
 *   fully visible in the center and fade toward the left and right edges.
 *   The original mask was edge-visible / center-faded — the opposite.
 * - Height and demo heading removed; this is a background layer only.
 * - Accepts className for caller overrides.
 */
export function DotBackground({ className }: DotBackgroundProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Dot layer: 24px grid, 1px dots, opacity-60 for overall subtlety */}
      <div
        className={cn(
          "absolute inset-0 opacity-60",
          "[background-size:24px_24px]",
          // Light mode: faint grey dots
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          // Dark mode: faint white dots at low opacity
          "dark:[background-image:radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)]",
        )}
        // Radial mask: center fully visible, edges fade to transparent.
        // ellipse 70% 60% keeps the fade off-center at the sides without
        // fading the top where the headline sits.
        style={{
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 75%)",
        }}
      />
    </div>
  );
}
