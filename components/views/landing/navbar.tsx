"use client";

import { useCallback, useRef, useState } from "react";
import { cn } from "cn";
import { ArrowRight, LayoutPanelLeft } from "lucide-react";
import Link from "next/link";
import { useScrolled } from "@/hooks/use-scrolled";
import { HamburgerIcon, MobileMenu } from "./mobile-menu";

const SCROLL_THRESHOLD = 8;

const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "FAQ", href: "#faq" },
] as const;

/**
 * Fixed top navbar with a three-zone grid layout.
 *
 * Zone 1 (left):  logo, justify-self-start.
 * Zone 2 (center): nav links, justify-self-center — true page center (desktop only).
 * Zone 3 (right): Login + Start creating (desktop) / hamburger (mobile).
 *
 * Container matches the hero section: max-w-6xl, same horizontal padding.
 * Center links and desktop actions hidden below lg.
 * Hamburger and mobile menu visible only below lg.
 *
 * Scrolled: dimmed background, backdrop-blur, 1px border, shadow.
 */
export function Navbar() {
  const scrolled = useScrolled(SCROLL_THRESHOLD);
  const [menuOpen, setMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const openMenu = useCallback(() => setMenuOpen(true), []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    // Return focus to the hamburger button after the menu closes.
    hamburgerRef.current?.focus();
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-border bg-background/70 shadow-sm backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        {/*
         * Mobile: flex justify-between — logo on left, hamburger on right.
         * Desktop (lg+): three-zone grid — logo | center links | right actions.
         * The grid is desktop-only so the hidden center zone never displaces
         * the hamburger on mobile.
         */}
        <nav
          className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr]"
          aria-label="Main navigation"
        >
          {/* Zone 1: Logo */}
          <Link
            href="/"
            className="justify-self-start flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Deckora home"
          >
            <LayoutPanelLeft className="size-5 text-primary" aria-hidden="true" />
            <span className="font-sans text-base font-bold tracking-tight text-foreground">
              Deckora
            </span>
          </Link>

          {/* Zone 2: Center nav links (desktop only) */}
          <ul
            className="justify-self-center hidden lg:flex items-center gap-8"
            role="list"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Zone 3: Desktop actions / mobile hamburger */}
          <div className="justify-self-end flex items-center gap-3">
            {/* Desktop: Login + Start creating */}
            <Link
              href="/sign-in"
              className="hidden lg:inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-border bg-background/20 px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Login
            </Link>
            <Link
              href="/sign-up"
              className="hidden lg:inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="leading-none">Start creating</span>
              <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
            </Link>

            {/* Mobile: Hamburger toggle */}
            <button
              ref={hamburgerRef}
              type="button"
              onClick={menuOpen ? closeMenu : openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className={cn(
                "lg:hidden inline-flex size-10 items-center justify-center rounded-lg",
                "transition-colors duration-150 hover:bg-white/5",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
            >
              <HamburgerIcon isOpen={menuOpen} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay — rendered outside the header so it can cover the full page */}
      <MobileMenu isOpen={menuOpen} onClose={closeMenu} />
    </>
  );
}
