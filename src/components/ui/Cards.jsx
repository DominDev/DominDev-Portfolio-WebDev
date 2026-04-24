/**
 * UI/SurfaceCard.jsx
 * Shared card shell used across sections, with optional glow support.
 */

import React from "react";

export function SurfaceCard({ className = "", children, glow = false, ...props }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.03] ${glow ? "glow-card" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Shared section heading primitive with eyebrow, title, and optional description.
 */
export function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="mb-12 max-w-3xl">
      <div className="mb-4 inline-block border-b border-white/10 pb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
        {eyebrow}
      </div>
      <h2 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Lightweight texture layer used to keep dark surfaces from feeling too flat.
 */
export function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-10 mix-blend-overlay"
      style={{
        backgroundImage:
          "url(data:image/svg+xml,%3Csvg%20viewBox='0%200%20200%20200'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter%20id='n'%3E%3CfeTurbulence%20type='fractalNoise'%20baseFrequency='0.9'%20numOctaves='2'%20stitchTiles='stitch'/%3E%3C/filter%3E%3Crect%20width='100%25'%20height='100%25'%20filter='url(%23n)'%20opacity='0.55'/%3E%3C/svg%3E)",
      }}
    />
  );
}
