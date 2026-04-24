/**
 * UI/Icons.jsx
 * SVG icon set used across the app.
 */

import React from "react";

function IconBase({ children, className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const GithubIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M9 19c-4 1.2-4-2-6-2" />
    <path d="M15 22v-3.1a3.3 3.3 0 0 0-.9-2.5c3 0 6-1.8 6-6.2a4.8 4.8 0 0 0-1.3-3.3 4.5 4.5 0 0 0-.1-3.2s-1.1-.4-3.5 1.3a12.1 12.1 0 0 0-6.4 0C6.4 3.3 5.3 3.7 5.3 3.7a4.5 4.5 0 0 0-.1 3.2A4.8 4.8 0 0 0 4 10.2c0 4.3 3 6.2 6 6.2a3.3 3.3 0 0 0-.9 2.5V22" />
  </IconBase>
);

export const ArrowRightIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M5 12h14" />
    <path d="m13 5 7 7-7 7" />
  </IconBase>
);

export const CodeIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="m8 9-4 3 4 3" />
    <path d="m16 9 4 3-4 3" />
    <path d="m14 4-4 16" />
  </IconBase>
);

export const LayersIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="m12 3 9 5-9 5-9-5 9-5Z" />
    <path d="m3 12 9 5 9-5" />
    <path d="m3 16 9 5 9-5" />
  </IconBase>
);

export const MailIcon = ({ className }) => (
  <IconBase className={className}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </IconBase>
);

export const MonitorIcon = ({ className }) => (
  <IconBase className={className}>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M8 20h8" />
    <path d="M12 16v4" />
  </IconBase>
);

export const DatabaseIcon = ({ className }) => (
  <IconBase className={className}>
    <ellipse cx="12" cy="6" rx="7" ry="3" />
    <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
    <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
  </IconBase>
);

export const ExternalLinkIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M14 5h5v5" />
    <path d="M10 14 19 5" />
    <path d="M19 14v5h-14V5h5" />
  </IconBase>
);

export const EyeIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </IconBase>
);

export const ShieldCheckIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="m9 12 2 2 4-4" />
  </IconBase>
);

export const PulseIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M2 12h4l2-5 4 10 2-5h8" />
  </IconBase>
);

export const CloudIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M18 10h-1.3A6 6 0 1 0 6 16h12a4 4 0 0 0 0-8Z" />
  </IconBase>
);

export const ChevronUpIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="m18 15-6-6-6 6" />
  </IconBase>
);
