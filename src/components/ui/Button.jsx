/**
 * UI/Button.jsx
 * Uniwersalny komponent przycisku z obsługą stylów Primary i Ghost.
 */

import React from "react";

export function PrimaryButton({
  as: Component = "button",
  children,
  className = "",
  ...props
}) {
  return (
    <Component
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-white bg-white px-5 py-3 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(255,255,255,0.08)] transition hover:-translate-y-0.5 hover:bg-zinc-200 focus-visible:border-white focus-visible:bg-zinc-100 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

export function GhostButton({
  as: Component = "button",
  children,
  className = "",
  ...props
}) {
  return (
    <Component
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.08] focus-visible:border-white/45 focus-visible:bg-white/[0.1] ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
