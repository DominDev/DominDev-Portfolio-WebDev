/**
 * layout/Header.jsx
 * Nawigacja górna z obsługą menu mobilnego (burger) i interaktywnymi linkami.
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { contactInfo, footerContent, navItems } from "../../data/content";
import logoWhite from "../../assets/icons/logo-white.png";
import { GithubIcon, MailIcon, ArrowRightIcon } from "../ui/Icons";

function DockLink({ href, children, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="muted-link flex min-h-[44px] items-center rounded-full px-4 text-sm transition hover:bg-white/5 focus-visible:bg-white/5 lg:min-h-[50px] lg:px-5 lg:text-base"
    >
      {children}
    </a>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Blokowanie scrolla przy otwartym menu
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="fixed left-1/2 top-5 z-[100] w-[calc(100%-1.5rem)] max-w-4xl -translate-x-1/2 lg:top-6 lg:max-w-5xl">
        <div className="flex items-center justify-between gap-5 rounded-full border border-white/10 bg-black/60 px-5 py-2 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] lg:px-6 lg:py-3">
          <a
            href="#top"
            onClick={closeMenu}
            className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-full font-medium text-white lg:min-h-[50px] lg:gap-3"
          >
            <img
              src={logoWhite}
              alt="DD logo"
              className="h-8 w-auto shrink-0 lg:h-9"
            />
            <span className="hidden xs:inline lg:text-base">Dominiak</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 sm:flex">
            {navItems.map((item) => (
              <DockLink key={item.href} href={item.href}>
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

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 focus-visible:border-white/40 focus-visible:bg-white/10 sm:hidden"
            >
              <div className="relative h-4 w-5">
                <span
                  className={`absolute left-0 block h-0.5 w-full bg-current transition-all duration-300 ${
                    isMenuOpen ? "top-2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-2 block h-0.5 w-full bg-current transition-opacity duration-300 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-0.5 w-full bg-current transition-all duration-300 ${
                    isMenuOpen ? "top-2 -rotate-45" : "top-4"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] flex flex-col bg-black p-6 pt-32 sm:hidden overflow-y-auto"
          >
            <nav className="flex flex-col gap-4">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="text-4xl font-semibold tracking-tight text-white transition hover:text-zinc-300 focus-visible:text-zinc-300"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={closeMenu}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                className="mt-4 text-4xl font-semibold tracking-tight text-white/60 transition hover:text-white focus-visible:text-white"
              >
                Kontakt
              </motion.a>
            </nav>

            {/* Nowa sekcja: Social & Mail w Mobile Menu */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 flex flex-col gap-6"
            >
              <div className="h-px w-full bg-white/10" />
              
              <div className="grid grid-cols-1 gap-3">
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-white transition hover:bg-white/10 focus-visible:border-white/35 focus-visible:bg-white/10"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
                    <MailIcon className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="muted-label text-[10px] uppercase tracking-wider">Napisz wiadomość</span>
                    <span className="font-medium">{contactInfo.email}</span>
                  </div>
                </a>

                <div className="grid grid-cols-2 gap-3">
                  <a 
                    href={contactInfo.socials.find(s => s.label === "GitHub")?.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-white transition hover:bg-white/10 focus-visible:border-white/35 focus-visible:bg-white/10"
                  >
                    <GithubIcon className="h-5 w-5" />
                    <span className="font-medium">GitHub</span>
                  </a>
                  <a 
                    href={contactInfo.socials.find(s => s.label === "LinkedIn")?.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-white transition hover:bg-white/10 focus-visible:border-white/35 focus-visible:bg-white/10"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                    <span className="font-medium">LinkedIn</span>
                  </a>
                </div>
              </div>
            </motion.div>

            <div className="mt-auto pb-10">
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
          <img
            src={logoWhite}
            alt="DD logo"
            className="h-7 w-auto shrink-0"
          />
          {footerContent.signature}
        </div>
        <div className="font-mono text-[11px] uppercase tracking-[0.1em]">
          {footerContent.tagline}
        </div>
      </div>
    </footer>
  );
}
