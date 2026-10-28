"use client";

import { useEffect, useState } from "react";

/**
 * Returns true when the page has scrolled past `threshold` pixels.
 * SSR-safe: initial state is false; the scroll position is synced after mount.
 */
export function useScrolled(threshold = 8): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > threshold);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setScrolled(window.scrollY > threshold);

    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
