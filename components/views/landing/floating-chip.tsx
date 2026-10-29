"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "cn";

const TRIANGLE_W = 16;
const TRIANGLE_H = 20;

/**
 * Props for a floating workflow chip (Prompt / Outline / Theme / Share).
 */
export interface FloatingChipProps {
  /** Label text, e.g. "Prompt". */
  label: string;
  /** "left" or "right" decides the triangle side and pointer direction. */
  side: "left" | "right";
  /** Entrance animation delay in seconds. Staggered: 0, 0.12, 0.24, 0.36. */
  delay: number;
  /**
   * Tailwind absolute-position + visibility classes applied to the outermost
   * wrapper, e.g. "hidden lg:flex left-[13%] top-[30%]".
   */
  positionClassName: string;
}

/**
 * Triangle SVG that sits beside the chip box, pointing toward the hero center.
 *
 * Left chip: triangle is the second flex child, points right (toward center).
 * Right chip: triangle is the first flex child, points left (toward center).
 *
 * Polygon coords: left side "0,0 16,10 0,20" (tip at right midpoint).
 *                 right side "16,0 0,10 16,20" (tip at left midpoint).
 */
function Triangle({ side }: { side: "left" | "right" }) {
  const points =
    side === "left"
      ? `0,0 ${TRIANGLE_W},${TRIANGLE_H / 2} 0,${TRIANGLE_H}`
      : `${TRIANGLE_W},0 0,${TRIANGLE_H / 2} ${TRIANGLE_W},${TRIANGLE_H}`;

  return (
    <svg
      width={TRIANGLE_W}
      height={TRIANGLE_H}
      viewBox={`0 0 ${TRIANGLE_W} ${TRIANGLE_H}`}
      className="shrink-0"
      aria-hidden="true"
    >
      <polygon points={points} fill="currentColor" />
    </svg>
  );
}

/**
 * The visual chip: label + attached triangle as a single flex row.
 * Left chips: [box][triangle→]  Right chips: [←triangle][box]
 * The triangle is a flex sibling of the box, not absolutely positioned,
 * so it can never escape the wrapper and get clipped independently.
 */
function ChipBody({ label, side }: { label: string; side: "left" | "right" }) {
  if (side === "left") {
    return (
      <div className="flex items-center text-primary gap-1.5">
        <span className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
          {label}
        </span>
        <Triangle side="left" />
      </div>
    );
  }

  return (
    <div className="flex items-center text-primary gap-1.5">
      <Triangle side="right" />
      <span className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
        {label}
      </span>
    </div>
  );
}

/**
 * Animated floating chip for the hero section (desktop only).
 *
 * Two nested motion elements keep entrance and float transforms independent:
 *   Outer motion.div — entrance: opacity + scale + y, runs once on every mount.
 *   Inner motion.div — gentle 4px infinite bob, starts after entrance finishes.
 *
 * positionClassName carries the Tailwind absolute-position classes (top, left/right)
 * AND the responsive visibility class (hidden lg:flex), applied to the outer wrapper
 * so both the animated and reduced-motion paths behave identically.
 *
 * Reduced motion: chips render immediately at full opacity with no animation,
 * so reduced-motion users never see a hidden or missing chip.
 */
export function FloatingChip({
  label,
  side,
  delay,
  positionClassName,
}: FloatingChipProps) {
  const shouldReduceMotion = useReducedMotion();
  const floatDelay = delay + 0.6;

  if (shouldReduceMotion) {
    return (
      <div
        className={cn("pointer-events-none absolute z-20", positionClassName)}
        aria-hidden="true"
      >
        <ChipBody label={label} side={side} />
      </div>
    );
  }

  return (
    <motion.div
      className={cn("pointer-events-none absolute z-20", positionClassName)}
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.85, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        }}
      >
        <ChipBody label={label} side={side} />
      </motion.div>
    </motion.div>
  );
}
