"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, HelpCircle, LayoutGrid, Play, X } from "lucide-react";
import Link from "next/link";
import { cn } from "cn";

/**
 * Mobile menu nav links with per-link icons.
 * Icons chosen to match each link's meaning:
 *   How it works -> Play (a play/demo action)
 *   Features     -> LayoutGrid (a product overview)
 *   FAQ          -> HelpCircle (questions and answers)
 */
const MOBILE_NAV_LINKS = [
  { label: "How it works", href: "#how-it-works", icon: Play },
  { label: "Features", href: "#features", icon: LayoutGrid },
  { label: "FAQ", href: "#faq", icon: HelpCircle },
] as const;

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Full-screen mobile menu overlay.
 *
 * Covers the hero and page content below the navbar. Background is the solid
 * dark background token, so menu text is readable over any hero imagery.
 *
 * Opens and closes with a 280ms ease-out opacity + translateY transition.
 * Body scroll is locked while the menu is open (caller is responsible for
 * toggling isOpen; this component handles the side effect internally).
 *
 * Accessibility:
 *   - Escape key closes the menu.
 *   - Focus moves to the first nav link on open.
 *   - aria-hidden="true" hides the overlay from screen readers when closed.
 */
export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Lock body scroll while menu is open; restore on close and unmount.
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Move focus to the first link when the menu opens.
  useEffect(() => {
    if (isOpen) {
      firstLinkRef.current?.focus();
    }
  }, [isOpen]);

  // Close on Escape key.
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      aria-hidden={!isOpen}
      className={cn(
        // Full-screen fixed overlay, starts below the navbar (pt-18 = navbar height)
        "fixed inset-0 z-40 flex flex-col bg-background pt-18 lg:hidden",
        // Open/close transition: opacity + translateY
        "transition-all duration-[280ms] ease-out",
        isOpen
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-2 pointer-events-none",
      )}
    >
      {/* Nav links */}
      <nav className="flex-1 overflow-y-auto px-6 pt-8" aria-label="Mobile navigation">
        <ul role="list" className="space-y-1">
          {MOBILE_NAV_LINKS.map(({ label, href, icon: Icon }, index) => (
            <li key={href}>
              <Link
                ref={index === 0 ? firstLinkRef : undefined}
                href={href}
                onClick={onClose}
                className={cn(
                  "flex w-full items-center gap-4 rounded-lg px-4 py-3.5 text-lg font-medium text-foreground/90",
                  "transition-colors duration-150 hover:bg-white/5 hover:text-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                )}
                tabIndex={isOpen ? 0 : -1}
              >
                <Icon className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom actions */}
      <div className="px-6 pb-8 pt-6 space-y-3 border-t border-border">
        <Link
          href="/sign-in"
          onClick={onClose}
          className={cn(
            "inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 text-sm font-medium text-foreground/90 backdrop-blur-md",
            "transition-colors duration-150 hover:bg-white/10 hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
          tabIndex={isOpen ? 0 : -1}
        >
          Login
        </Link>
        <Link
          href="/sign-up"
          onClick={onClose}
          className={cn(
            "inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-primary-foreground",
            "transition-colors duration-150 hover:bg-primary/90",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
          tabIndex={isOpen ? 0 : -1}
        >
          <span className="leading-none">Start creating</span>
          <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

/**
 * Hamburger / close toggle icon.
 * Renders three lines when closed, an X when open.
 */
interface HamburgerIconProps {
  isOpen: boolean;
}

export function HamburgerIcon({ isOpen }: HamburgerIconProps) {
  if (isOpen) {
    return <X className="size-5" aria-hidden="true" />;
  }
  // Three-line hamburger using spans
  return (
    <span className="flex flex-col gap-[5px]" aria-hidden="true">
      <span className="block h-px w-5 rounded-full bg-foreground" />
      <span className="block h-px w-5 rounded-full bg-foreground" />
      <span className="block h-px w-5 rounded-full bg-foreground" />
    </span>
  );
}
