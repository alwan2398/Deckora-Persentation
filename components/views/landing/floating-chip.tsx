"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "cn";

export interface FloatingChipProps {
  label: string;
  side: "left" | "right";
  /** Entrance animation delay in seconds. Staggered: 0, 0.12, 0.24, 0.36. */
  delay: number;
  /** Tailwind absolute-position classes, e.g. "left-[13%] top-[30%]". */
  positionClassName: string;
}

/**
 * Animated floating chip for the hero section (desktop only).
 *
 * Hydration strategy: the component mounts fully visible (opacity 1, no
 * transform) on both server and client so SSR HTML always matches the client's
 * initial render. After the first client paint, a `mounted` flag flips, and
 * Framer Motion replays the entrance from the hidden start state.
 *
 * Two nested motion elements keep entrance and float transforms independent:
 *   - Outer: entrance once on mount (opacity, scale, y) via variants.
 *   - Inner: gentle infinite 4px bob, starts after entrance finishes.
 *
 * Reduced motion: useReducedMotion skips both animations and stays at the
 * visible state so reduced-motion users always see the chips.
 */
export function FloatingChip({
  label,
  side,
  delay,
  positionClassName,
}: FloatingChipProps) {
  const shouldReduceMotion = useReducedMotion();
  // Start false on both server and client so SSR HTML matches.
  // Flip to true after the first paint to trigger the entrance animation.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const entranceDuration = 0.6;
  const floatDelay = delay + entranceDuration;

  // Variants keep the initial/animate values consistent across renders.
  const entranceVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 12 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  // Before mount: render at the visible end state (no animation).
  // After mount with reduced motion: stay at visible, no animation.
  // After mount without reduced motion: animate from hidden to visible.
  const animateState = "visible";
  const initialState = mounted && !shouldReduceMotion ? "hidden" : "visible";

  return (
    // Outer element: entrance animation, runs once after mount.
    <motion.div
      className={cn(
        "pointer-events-none absolute items-center",
        positionClassName,
      )}
      aria-hidden="true"
      variants={entranceVariants}
      initial={initialState}
      animate={animateState}
      transition={
        mounted && !shouldReduceMotion
          ? { duration: entranceDuration, delay, ease: [0.22, 1, 0.36, 1] }
          : { duration: 0 }
      }
    >
      {/* Inner element: gentle infinite float, starts after entrance. */}
      <motion.div
        className="relative flex items-center rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-white shadow-sm"
        animate={mounted && !shouldReduceMotion ? { y: [0, -4, 0] } : undefined}
        transition={
          mounted && !shouldReduceMotion
            ? { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: floatDelay }
            : undefined
        }
      >
        {label}

        {/* Triangle pointer inside the motion element so it animates with the chip. */}
        <span
          className={cn(
            "pointer-events-none absolute top-1.5",
            side === "left"
              ? // Left chip: triangle on right edge, pointing right toward center.
                "left-full border-y-[6px] border-l-10 border-y-transparent border-l-primary ml-[1px]"
              : // Right chip: triangle on left edge, pointing left toward center.
                "right-full border-y-[6px] border-r-10 border-y-transparent border-r-primary mr-[1px]",
          )}
          aria-hidden="true"
        />
      </motion.div>
    </motion.div>
  );
}
