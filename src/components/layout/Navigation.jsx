/**
 * layout/Header.jsx
 * Header and footer navigation, including the fullscreen mobile menu.
 */

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { contactInfo, footerContent, navItems } from "../../data/content";
import logoWhite from "../../assets/icons/logo-white.png";
import { GithubIcon, MailIcon } from "../ui/Icons";

const trackedNavItems = [...navItems, { label: "Kontakt", href: "#contact" }];

function DockLink({ href, children, onClick, isActive = false }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="relative flex min-h-[44px] items-center rounded-full px-4 text-sm lg:min-h-[50px] lg:px-5 lg:text-base"
    >
      {isActive ? (
        <motion.span
          layoutId="desktop-active-pill"
          transition={{
            type: "spring",
            stiffness: 420,
            damping: 34,
            mass: 0.7,
          }}
          className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.06]"
        />
      ) : null}
      <span
        className={`relative z-10 transition ${
          isActive
            ? "text-white"
            : "muted-link hover:text-white focus-visible:text-white"
        }`}
      >
        {children}
      </span>
    </a>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("");
  const menuButtonRef = useRef(null);
  const menuPanelRef = useRef(null);
  const previousBodyOverflowRef = useRef("");
  const shouldRestoreFocusRef = useRef(false);
  const mobileMenuId = "mobile-navigation-panel";
  const mobileMenuTitleId = "mobile-navigation-title";
  const dotPatternPill = {
    backgroundImage: "radial-gradient(circle, #000 1.2px, transparent 1.2px)",
    backgroundSize: "10px 10px",
  };
  const dotPatternSoftPill = {
    backgroundImage:
      "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)",
    backgroundSize: "10px 10px",
  };
  const githubLink = contactInfo.socials.find((item) => item.label === "GitHub");
  const linkedInLink = contactInfo.socials.find((item) => item.label === "LinkedIn");
  const cvLink = contactInfo.socials.find((item) => item.label === "CV (PDF)");

  useEffect(() => {
    if (isMenuOpen) {
      previousBodyOverflowRef.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousBodyOverflowRef.current;
      };
    }

    document.body.style.overflow = previousBodyOverflowRef.current;
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      if (shouldRestoreFocusRef.current) {
        menuButtonRef.current?.focus();
        shouldRestoreFocusRef.current = false;
      }
      return;
    }

    const panel = menuPanelRef.current;
    if (!(panel instanceof HTMLElement)) {
      return;
    }

    const focusableElements = panel.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];

    if (firstFocusable instanceof HTMLElement) {
      firstFocusable.focus();
    } else {
      panel.focus();
    }

    // Treat the fullscreen mobile menu like a modal so keyboard users stay inside it.
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        shouldRestoreFocusRef.current = true;
        setIsMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const trappedFocusableElements = panel.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      if (!trappedFocusableElements.length) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const firstElement = trappedFocusableElements[0];
      const lastElement = trappedFocusableElements[trappedFocusableElements.length - 1];

      if (
        !(firstElement instanceof HTMLElement) ||
        !(lastElement instanceof HTMLElement)
      ) {
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sections = trackedNavItems
      .map((item) => {
        const section = document.querySelector(item.href);
        return section instanceof HTMLElement
          ? { href: item.href, element: section }
          : null;
      })
      .filter(Boolean);

    if (!sections.length) return;

    const visibilityMap = new Map();

    const resolveActiveSection = () => {
      const firstSectionTop = sections[0].element.offsetTop;
      if (window.scrollY < firstSectionTop - 180) {
        setActiveHref("");
        return;
      }

      const viewportAnchor = window.innerHeight * 0.42;
      const sectionsWithMetrics = sections.map(({ href, element }) => {
        const rect = element.getBoundingClientRect();
        return {
          href,
          top: rect.top,
          bottom: rect.bottom,
          containsAnchor: rect.top <= viewportAnchor && rect.bottom >= viewportAnchor,
          ratio: visibilityMap.get(href) ?? 0,
          distance: Math.abs(rect.top - viewportAnchor),
        };
      });

      const containingSection = sectionsWithMetrics.find(
        (section) => section.containsAnchor
      );
      if (containingSection) {
        setActiveHref(containingSection.href);
        return;
      }

      const highestVisibleSection = [...sectionsWithMetrics]
        .filter((section) => section.ratio > 0)
        .sort((a, b) => {
          if (b.ratio !== a.ratio) return b.ratio - a.ratio;
          return a.distance - b.distance;
        })[0];

      if (highestVisibleSection) {
        setActiveHref(highestVisibleSection.href);
        return;
      }

      const fallbackSection = [...sectionsWithMetrics]
        .reverse()
        .find((section) => section.top <= viewportAnchor);

      setActiveHref(fallbackSection?.href ?? "");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibilityMap.set(`#${entry.target.id}`, entry.intersectionRatio);
        });
        resolveActiveSection();
      },
      {
        rootMargin: "-18% 0px -42% 0px",
        threshold: [0, 0.12, 0.24, 0.4, 0.56, 0.72, 0.88, 1],
      }
    );

    sections.forEach(({ element }) => observer.observe(element));
    window.addEventListener("scroll", resolveActiveSection, { passive: true });
    window.addEventListener("resize", resolveActiveSection);
    resolveActiveSection();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", resolveActiveSection);
      window.removeEventListener("resize", resolveActiveSection);
    };
  }, []);

  const toggleMenu = () => {
    if (isMenuOpen) {
      shouldRestoreFocusRef.current = true;
    }
    setIsMenuOpen((current) => !current);
  };

  const closeMenu = ({ restoreFocus = false } = {}) => {
    shouldRestoreFocusRef.current = restoreFocus;
    setIsMenuOpen(false);
  };
  const handleMobileSectionClick = (event, href) => {
    if (typeof window === "undefined") return;

    const targetSection = document.querySelector(href);
    if (!(targetSection instanceof HTMLElement)) {
      closeMenu();
      return;
    }

    event.preventDefault();
    targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", href);
    closeMenu();
  };

  return (
    <>
      <header className="fixed left-1/2 top-5 z-[100] w-[calc(100%-1.5rem)] max-w-4xl -translate-x-1/2 lg:top-6 lg:max-w-5xl">
        <div className="flex items-center justify-between gap-5 rounded-full border border-white/10 bg-black/60 px-5 py-2 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] lg:px-6 lg:py-3">
          <a
            href="#top"
            onClick={closeMenu}
            className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-full font-medium text-white lg:min-h-[50px] lg:gap-3"
          >
            <img src={logoWhite} alt="DD logo" className="h-8 w-auto shrink-0 lg:h-9" />
            <span className="hidden xs:inline lg:text-base">Dominiak</span>
          </a>

          <nav className="hidden items-center gap-1 sm:flex">
            {navItems.map((item) => (
              <DockLink
                key={item.href}
                href={item.href}
                isActive={activeHref === item.href}
              >
                {item.label}
              </DockLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              onClick={closeMenu}
              className="hidden items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-zinc-200 focus-visible:border-white focus-visible:bg-zinc-100 sm:inline-flex lg:min-h-[50px] lg:px-6 lg:text-base"
            >
              Kontakt
            </a>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls={mobileMenuId}
              aria-haspopup="dialog"
              aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
              className="relative z-50 flex flex-none items-center justify-center overflow-hidden rounded-full bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 sm:hidden"
              style={{ width: "3.5rem", height: "2.25rem" }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 right-0 h-full w-1/2 opacity-[0.12]"
                style={dotPatternPill}
              />
              <div
                className="relative z-10"
                style={{ width: "1.35rem", height: "0.9rem" }}
              >
                <span
                  className="absolute left-0 block w-full rounded-full bg-black transition-all duration-300 ease-in-out"
                  style={{
                    height: "3px",
                    top: isMenuOpen ? "5.5px" : "0px",
                    transform: isMenuOpen
                      ? "translateX(0) rotate(38deg)"
                      : "translateX(0) rotate(0deg)",
                    transformOrigin: "center center",
                  }}
                />
                <span
                  className="absolute left-0 block w-full rounded-full bg-black transition-all duration-300 ease-in-out"
                  style={{
                    height: "3px",
                    top: "5.5px",
                    opacity: isMenuOpen ? 0 : 1,
                    transform: isMenuOpen ? "scaleX(0.2)" : "scaleX(1)",
                    transformOrigin: "center center",
                  }}
                />
                <span
                  className="absolute left-0 block w-full rounded-full bg-black transition-all duration-300 ease-in-out"
                  style={{
                    height: "3px",
                    top: isMenuOpen ? "5.5px" : "11px",
                    transform: isMenuOpen
                      ? "translateX(0) rotate(-38deg)"
                      : "translateX(0) rotate(0deg)",
                    transformOrigin: "center center",
                  }}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuPanelRef}
            id={mobileMenuId}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={mobileMenuTitleId}
            tabIndex={-1}
            className="fixed inset-0 z-[90] flex flex-col bg-black p-6 pt-32 sm:hidden overflow-y-auto"
          >
            <h2 id={mobileMenuTitleId} className="sr-only">
              Menu mobilne
            </h2>
            <nav className="flex flex-col gap-4">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(event) => handleMobileSectionClick(event, item.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: activeHref === item.href ? 16 : 0 }}
                  transition={{
                    delay: idx * 0.05,
                    x: {
                      type: "spring",
                      stiffness: 320,
                      damping: 28,
                      mass: 0.7,
                    },
                    opacity: { duration: 0.2 },
                  }}
                  aria-current={activeHref === item.href ? "page" : undefined}
                  className="text-4xl font-semibold tracking-tight text-white"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={(event) => handleMobileSectionClick(event, "#contact")}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: activeHref === "#contact" ? 16 : 0 }}
                transition={{
                  delay: navItems.length * 0.05,
                  x: { type: "spring", stiffness: 320, damping: 28, mass: 0.7 },
                  opacity: { duration: 0.2 },
                }}
                aria-current={activeHref === "#contact" ? "page" : undefined}
                className={`mt-4 text-4xl font-semibold tracking-tight transition-colors ${
                  activeHref === "#contact"
                    ? "text-white"
                    : "text-white/60 hover:text-white focus-visible:text-white"
                }`}
              >
                Kontakt
              </motion.a>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-auto flex flex-col items-center gap-6 pt-10"
            >
              <div className="h-px w-full bg-white/10" />

              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`mailto:${contactInfo.email}`}
                  aria-label="Napisz wiadomość"
                  className="relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.09] text-white/85 shadow-[0_0_24px_rgba(255,255,255,0.03)] transition hover:-translate-y-0.5 hover:border-white/16 hover:bg-white/[0.14] hover:text-white focus-visible:scale-[1.02]"
                  style={{ width: "3.8rem", height: "2.4rem" }}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-0 right-0 h-full w-1/2 opacity-[0.08]"
                    style={dotPatternSoftPill}
                  />
                  <MailIcon className="relative z-10 h-[18px] w-[18px]" />
                </a>
                <a
                  href={githubLink?.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.09] text-white/85 shadow-[0_0_24px_rgba(255,255,255,0.03)] transition hover:-translate-y-0.5 hover:border-white/16 hover:bg-white/[0.14] hover:text-white focus-visible:scale-[1.02]"
                  style={{ width: "3.8rem", height: "2.4rem" }}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-0 right-0 h-full w-1/2 opacity-[0.08]"
                    style={dotPatternSoftPill}
                  />
                  <GithubIcon className="relative z-10 h-[18px] w-[18px]" />
                </a>
                <a
                  href={linkedInLink?.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.09] text-white/85 shadow-[0_0_24px_rgba(255,255,255,0.03)] transition hover:-translate-y-0.5 hover:border-white/16 hover:bg-white/[0.14] hover:text-white focus-visible:scale-[1.02]"
                  style={{ width: "3.8rem", height: "2.4rem" }}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-0 right-0 h-full w-1/2 opacity-[0.08]"
                    style={dotPatternSoftPill}
                  />
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="relative z-10 h-[18px] w-[18px]"
                    aria-hidden="true"
                  >
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>
                <a
                  href={cvLink?.href}
                  download={cvLink?.download ? "" : undefined}
                  aria-label={cvLink?.label || "CV"}
                  className="relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.09] text-white/85 shadow-[0_0_24px_rgba(255,255,255,0.03)] transition hover:-translate-y-0.5 hover:border-white/16 hover:bg-white/[0.14] hover:text-white focus-visible:scale-[1.02]"
                  style={{ width: "3.8rem", height: "2.4rem" }}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-0 right-0 h-full w-1/2 opacity-[0.08]"
                    style={dotPatternSoftPill}
                  />
                  <span className="relative z-10 font-mono text-[11px] uppercase tracking-[0.16em]">
                    CV
                  </span>
                </a>
              </div>
            </motion.div>

            <div className="pb-10 pt-4 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                {footerContent.mobileTagline}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex items-center gap-2 font-medium text-white">
          <img src={logoWhite} alt="DD logo" className="h-7 w-auto shrink-0" />
          {footerContent.signature}
        </div>
        <div className="font-mono text-[11px] uppercase tracking-[0.1em]">
          {footerContent.tagline}
        </div>
      </div>
    </footer>
  );
}
