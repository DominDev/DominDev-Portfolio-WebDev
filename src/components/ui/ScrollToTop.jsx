/**
 * ui/ScrollToTop.jsx
 * Przycisk powrotu na górę strony, pojawiający się po przewinięciu.
 */

import React, { useState, useEffect } from "react";

export function ScrollToTop() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress =
        scrollableHeight > 0 ? Math.min(scrollTop / scrollableHeight, 1) : 0;

      setShowScrollTop(scrollTop > 300);
      setScrollProgress(nextProgress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!showScrollTop) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Wróć na górę"
      className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full p-[2px] text-white shadow-[0_18px_50px_rgba(0,0,0,0.45)] transition hover:-translate-y-1 hover:scale-[1.02] focus-visible:scale-[1.02]"
      style={{
        background: `conic-gradient(rgba(255,255,255,0.95) ${scrollProgress * 360}deg, rgba(255,255,255,0.16) ${scrollProgress * 360}deg 360deg)`,
      }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-[2px] rounded-full bg-black/85 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)] backdrop-blur-md transition"
      />
      <span
        aria-hidden="true"
        className="absolute inset-[7px] rounded-full bg-white/[0.06] transition"
      />
      <svg
        viewBox="0 0 24 24"
        className="relative z-10 h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
