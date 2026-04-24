/**
 * ui/Mockups.jsx
 * Components visualizing interface and architecture concepts with lightweight SVG motion.
 */

import React, { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { NoiseOverlay } from "./Cards";

export function MockupChart() {
  const shouldReduceMotion = useReducedMotion();
  const repeat = shouldReduceMotion ? 0 : Infinity;

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-black/30">
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:20px_20px]" />
      <svg viewBox="0 0 400 250" className="h-full w-full">
        <defs>
          <linearGradient id="scan-glow" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.38)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        <rect width="400" height="250" fill="transparent" />
        <rect x="0" y="0" width="70" height="250" fill="rgba(255,255,255,0.03)" />
        <rect
          x="15"
          y="20"
          width="40"
          height="4"
          rx="2"
          fill="rgba(255,255,255,0.45)"
        />
        <rect
          x="15"
          y="52"
          width="30"
          height="2"
          rx="1"
          fill="rgba(255,255,255,0.22)"
        />
        <rect
          x="15"
          y="66"
          width="40"
          height="2"
          rx="1"
          fill="rgba(255,255,255,0.22)"
        />
        <rect
          x="90"
          y="20"
          width="100"
          height="6"
          rx="2"
          fill="rgba(255,255,255,0.65)"
        />
        <rect
          x="90"
          y="34"
          width="60"
          height="3"
          rx="1"
          fill="rgba(255,255,255,0.24)"
        />

        {[
          { x: 90, w: 90, label: "hero", delay: 0 },
          { x: 185, w: 90, label: "offer", delay: 0.9 },
          { x: 280, w: 90, label: "cta", delay: 1.8 },
        ].map((panel) => (
          <g key={panel.label}>
            <rect
              x={panel.x}
              y="56"
              width={panel.w}
              height="50"
              rx="5"
              fill="rgba(255,255,255,0.02)"
              stroke="rgba(255,255,255,0.24)"
            />
            <motion.rect
              x={panel.x}
              y="56"
              width={panel.w}
              height="50"
              rx="5"
              fill="rgba(255,255,255,0.13)"
              stroke="rgba(255,255,255,0.48)"
              initial={{ opacity: 0 }}
              animate={
                shouldReduceMotion ? { opacity: 0.08 } : { opacity: [0, 0.52, 0] }
              }
              transition={{
                duration: 1.1,
                delay: panel.delay,
                repeat,
                repeatDelay: 2.6,
                ease: "easeInOut",
              }}
            />
          </g>
        ))}

        <rect
          x="100"
          y="80"
          width="40"
          height="12"
          rx="2"
          fill="rgba(255,255,255,0.85)"
        />
        <rect
          x="195"
          y="80"
          width="45"
          height="12"
          rx="2"
          fill="rgba(255,255,255,0.85)"
        />
        <motion.rect
          x="290"
          y="80"
          width="35"
          height="12"
          rx="2"
          fill="rgba(255,255,255,0.9)"
          animate={
            shouldReduceMotion
              ? undefined
              : { opacity: [0.65, 1, 0.65], scale: [1, 1.08, 1] }
          }
          transition={{
            duration: 1,
            delay: 1.8,
            repeat,
            repeatDelay: 2.6,
            ease: "easeInOut",
          }}
        />

        <rect
          x="90"
          y="120"
          width="285"
          height="110"
          rx="5"
          fill="none"
          stroke="rgba(255,255,255,0.22)"
        />
        <motion.rect
          x="86"
          y="118"
          width="32"
          height="114"
          fill="url(#scan-glow)"
          initial={{ x: -40, opacity: 0 }}
          animate={
            shouldReduceMotion ? { opacity: 0 } : { x: [0, 260], opacity: [0, 1, 0] }
          }
          transition={{
            duration: 2.6,
            delay: 0.15,
            repeat,
            repeatDelay: 1.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        <polyline
          points="105,220 140,200 175,205 210,190 245,185 280,175 315,170 355,155"
          fill="none"
          stroke="rgba(255,255,255,0.24)"
          strokeWidth="1"
        />
        <motion.polyline
          points="105,210 140,180 175,190 210,150 245,160 280,130 315,140 355,110"
          fill="none"
          stroke="rgba(255,255,255,0.82)"
          strokeWidth="1.7"
          initial={shouldReduceMotion ? false : { pathLength: 0.15, opacity: 0.45 }}
          animate={
            shouldReduceMotion
              ? { pathLength: 1, opacity: 0.75 }
              : { pathLength: [0.15, 1, 1], opacity: [0.45, 0.9, 0.62] }
          }
          transition={{
            duration: 3.2,
            repeat,
            repeatDelay: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </svg>
      <NoiseOverlay />
    </div>
  );
}

export function MockupTopology() {
  const shouldReduceMotion = useReducedMotion();
  const markerId = useId().replace(/:/g, "");
  const repeat = shouldReduceMotion ? 0 : Infinity;
  const services = [
    { x: 40, label: "auth", width: 75, delay: 0 },
    { x: 135, label: "orders", width: 75, delay: 0.75 },
    { x: 230, label: "billing", width: 75, delay: 1.5 },
    { x: 325, label: "mail", width: 55, delay: 2.25 },
  ];
  const routes = [
    { x1: 175, y1: 60, x2: 85, y2: 108, delay: 0 },
    { x1: 200, y1: 60, x2: 172.5, y2: 108, delay: 0.75 },
    { x1: 225, y1: 60, x2: 267.5, y2: 108, delay: 1.5 },
    { x1: 235, y1: 60, x2: 352.5, y2: 108, delay: 2.25 },
  ];

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-black/30">
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:20px_20px]" />
      <svg viewBox="0 0 400 250" className="h-full w-full">
        <defs>
          <marker
            id={markerId}
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="4"
            markerHeight="4"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.5)" />
          </marker>
        </defs>

        <motion.rect
          x="160"
          y="20"
          width="80"
          height="40"
          rx="4"
          fill="rgba(255,255,255,0.05)"
          stroke="rgba(255,255,255,0.5)"
          animate={shouldReduceMotion ? undefined : { opacity: [0.72, 1, 0.72] }}
          transition={{ duration: 3, repeat, ease: "easeInOut" }}
        />
        <text
          x="200"
          y="38"
          textAnchor="middle"
          fontSize="9"
          fill="rgba(255,255,255,0.9)"
        >
          API Gateway
        </text>
        <text
          x="200"
          y="50"
          textAnchor="middle"
          fontSize="7"
          fill="rgba(255,255,255,0.4)"
        >
          v1
        </text>

        {routes.map((route) => (
          <g key={`${route.x1}-${route.x2}`}>
            <line
              x1={route.x1}
              y1={route.y1}
              x2={route.x2}
              y2={route.y2}
              stroke="rgba(255,255,255,0.16)"
              strokeWidth="1"
              markerEnd={`url(#${markerId})`}
            />
            <motion.line
              x1={route.x1}
              y1={route.y1}
              x2={route.x2}
              y2={route.y2}
              stroke="rgba(255,255,255,0.78)"
              strokeWidth="1.6"
              markerEnd={`url(#${markerId})`}
              initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={
                shouldReduceMotion
                  ? { pathLength: 1, opacity: 0.35 }
                  : { pathLength: [0, 1, 1], opacity: [0, 1, 0] }
              }
              transition={{
                duration: 1.15,
                delay: route.delay,
                repeat,
                repeatDelay: 2.3,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </g>
        ))}

        {services.map((box) => (
          <g key={box.label}>
            <rect
              x={box.x}
              y="110"
              width={box.width}
              height="40"
              rx="4"
              fill="rgba(255,255,255,0.03)"
              stroke="rgba(255,255,255,0.28)"
            />
            <motion.rect
              x={box.x}
              y="110"
              width={box.width}
              height="40"
              rx="4"
              fill="rgba(255,255,255,0.09)"
              stroke="rgba(255,255,255,0.55)"
              initial={{ opacity: 0 }}
              animate={
                shouldReduceMotion ? { opacity: 0.08 } : { opacity: [0, 0.58, 0] }
              }
              transition={{
                duration: 1.15,
                delay: box.delay,
                repeat,
                repeatDelay: 2.3,
                ease: "easeInOut",
              }}
            />
            <text
              x={box.x + box.width / 2}
              y="127"
              textAnchor="middle"
              fontSize="8"
              fill="rgba(255,255,255,0.82)"
            >
              {box.label}
            </text>
            <motion.circle
              cx={box.x + box.width - 10}
              cy="117"
              r="2.4"
              fill="#4ade80"
              animate={shouldReduceMotion ? undefined : { opacity: [0.55, 1, 0.55] }}
              transition={{
                duration: 1.15,
                delay: box.delay,
                repeat,
                repeatDelay: 2.3,
                ease: "easeInOut",
              }}
            />
          </g>
        ))}

        <rect
          x="60"
          y="190"
          width="90"
          height="36"
          rx="4"
          fill="rgba(255,255,255,0.03)"
          stroke="rgba(255,255,255,0.25)"
        />
        <rect
          x="170"
          y="190"
          width="80"
          height="36"
          rx="4"
          fill="rgba(255,255,255,0.03)"
          stroke="rgba(255,255,255,0.25)"
        />
        <rect
          x="270"
          y="190"
          width="85"
          height="36"
          rx="4"
          fill="rgba(255,255,255,0.03)"
          stroke="rgba(255,255,255,0.25)"
        />
        <text
          x="105"
          y="212"
          textAnchor="middle"
          fontSize="8"
          fill="rgba(255,255,255,0.65)"
        >
          postgresql
        </text>
        <text
          x="210"
          y="212"
          textAnchor="middle"
          fontSize="8"
          fill="rgba(255,255,255,0.65)"
        >
          redis
        </text>
        <text
          x="312.5"
          y="212"
          textAnchor="middle"
          fontSize="8"
          fill="rgba(255,255,255,0.65)"
        >
          queue
        </text>
      </svg>
      <NoiseOverlay />
    </div>
  );
}
