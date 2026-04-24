/**
 * App.jsx
 * Główny punkt wejścia aplikacji.
 * Składa modularne sekcje w spójną całość i zarządza globalnymi stanami (kursor).
 */

import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Header, Footer } from "./components/layout/Navigation";
import { Preloader } from "./components/layout/Preloader";
import { Hero } from "./components/sections/Hero";
import { About, Approach } from "./components/sections/AboutApproach";
import { Architecture, Work, Contact } from "./components/sections/MainSections";
import { ScrollToTop } from "./components/ui/ScrollToTop";
import { useCustomCursor } from "./hooks/useCustomCursor";

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const { cursorVisible, cursorExpanded, cursorPosition } = useCustomCursor();
  const handlePreloaderFinish = useCallback(() => {
    setShowPreloader(false);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const previousOverflow = document.body.style.overflow;
    if (showPreloader) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showPreloader]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Autorski kursor - React 19 zoptymalizuje jego renderowanie */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed z-[9999] hidden h-5 w-5 rounded-full bg-white mix-blend-difference transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [@media(pointer:fine)]:block ${
          cursorVisible && !showPreloader ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y,
          transform: `translate(-50%, -50%) scale(${cursorExpanded ? 3 : 1})`,
        }}
      />

      {/* Skip link dla a11y */}
      <a
        href="#main"
        className="absolute left-4 top-4 z-[120] -translate-y-24 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black focus:translate-y-0"
      >
        Przejdź do treści
      </a>

      {/* Subtelne tło globalne */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.05),transparent_45%),radial-gradient(circle_at_85%_90%,rgba(255,255,255,0.04),transparent_50%)]" />

      <Header />

      <main id="main" className="relative z-10">
        <Hero />
        <About />
        <Approach />
        <Architecture />
        <Work />
        <Contact />
      </main>

      <Footer />
      <ScrollToTop />

      <AnimatePresence>
        {showPreloader ? <Preloader onFinish={handlePreloaderFinish} /> : null}
      </AnimatePresence>
    </div>
  );
}
