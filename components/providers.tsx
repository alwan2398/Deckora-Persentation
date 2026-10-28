"use client";

import { MotionConfig } from "framer-motion";

/**
 * App-level providers wrapper.
 *
 * reducedMotion="never" tells Framer Motion that the app handles
 * prefers-reduced-motion itself (via useReducedMotion in each component),
 * so Framer Motion should not intercept OS motion settings and should not
 * log the reduced-motion console warning.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="never">{children}</MotionConfig>;
}
