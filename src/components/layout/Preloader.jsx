import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import logoWhite from "../../assets/icons/logo-white.png";
import { MeshBackground } from "../effects/Backgrounds";

function PreloaderDotField({ shouldReduceMotion, progressValue }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === "undefined") return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const spacing = window.matchMedia("(pointer: coarse)").matches ? 32 : 30;
    const baseSize = 1;
    const baseOpacity = 0.14;
    const maxSize = 4.8;
    const maxOpacity = 1;
    const bandWidth = 64;

    let width = 0;
    let height = 0;
    let dots = [];
    let rafId = 0;
    let startedAt = 0;

    const setup = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots = [];
      const cols = Math.floor(width / spacing) + 2;
      const rows = Math.floor(height / spacing) + 2;
      const offsetX = (width - (cols - 1) * spacing) / 2;
      const offsetY = (height - (rows - 1) * spacing) / 2;

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          dots.push({
            x: offsetX + col * spacing,
            y: offsetY + row * spacing,
            size: baseSize,
            opacity: baseOpacity,
          });
        }
      }
    };

    const draw = (timestamp) => {
      if (!startedAt) startedAt = timestamp;
      const elapsed = timestamp - startedAt;
      context.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const maxRadius = Math.hypot(width / 2, height / 2) + 40;

      const cycleProgress = shouldReduceMotion ? 1 : progressValue;
      let waveRadius = 0;

      if (!shouldReduceMotion) {
        if (cycleProgress <= 0.56) {
          const expandProgress = cycleProgress / 0.56;
          waveRadius = maxRadius * (1 - Math.pow(1 - expandProgress, 2.1));
        } else {
          const contractProgress = (cycleProgress - 0.56) / 0.44;
          waveRadius = maxRadius * Math.pow(1 - contractProgress, 1.5);
        }
      }

      dots.forEach((dot) => {
        const distance = Math.hypot(dot.x - centerX, dot.y - centerY);
        const coreGlow = Math.max(0, 1 - distance / (Math.min(width, height) * 0.28));

        let targetSize = baseSize + coreGlow * 0.35;
        let targetOpacity = baseOpacity + coreGlow * 0.08;

        if (!shouldReduceMotion) {
          const bandDistance = Math.abs(distance - waveRadius);
          if (bandDistance < bandWidth) {
            const bandStrength = 1 - bandDistance / bandWidth;
            targetSize = Math.max(targetSize, baseSize + (maxSize - baseSize) * bandStrength);
            targetOpacity = Math.max(
              targetOpacity,
              baseOpacity + (maxOpacity - baseOpacity) * bandStrength,
            );
          }

          if (cycleProgress > 0.7) {
            const returnStrength = (cycleProgress - 0.7) / 0.3;
            const centerPulse = Math.max(
              0,
              1 - distance / (Math.min(width, height) * (0.12 + returnStrength * 0.1)),
            );
            targetSize = Math.max(targetSize, baseSize + centerPulse * 2.9);
            targetOpacity = Math.max(targetOpacity, baseOpacity + centerPulse * 0.58);
          }
        }

        dot.size += (targetSize - dot.size) * 0.18;
        dot.opacity += (targetOpacity - dot.opacity) * 0.18;

        context.fillStyle = `rgba(255,255,255,${dot.opacity})`;
        context.beginPath();
        context.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        context.fill();
      });

      rafId = window.requestAnimationFrame(draw);
    };

    const handleResize = () => {
      setup();
    };

    setup();
    rafId = window.requestAnimationFrame(draw);
    window.addEventListener("resize", handleResize);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, [progressValue, shouldReduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}

export function Preloader({ onFinish }) {
  const shouldReduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const duration = shouldReduceMotion ? 1100 : 3200;

  useEffect(() => {
    let rafId = 0;
    const startedAt = performance.now();

    const tick = (timestamp) => {
      const elapsed = timestamp - startedAt;
      const rawProgress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - rawProgress, 2.6);
      setProgressValue(rawProgress);
      setProgress(Math.round(easedProgress * 100));

      if (rawProgress < 1) {
        rafId = window.requestAnimationFrame(tick);
        return;
      }

      onFinish();
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [duration, onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: shouldReduceMotion ? 1 : 1.02,
        transition: {
          duration: shouldReduceMotion ? 0.24 : 0.62,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      className="fixed inset-0 z-[9998] overflow-hidden bg-black"
      aria-hidden="true"
    >
      <MeshBackground className="opacity-100" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(255,255,255,0.09),transparent_26%),radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.05),transparent_28%),radial-gradient(circle_at_84%_82%,rgba(255,255,255,0.04),transparent_30%)]" />

      <motion.div
        initial={shouldReduceMotion ? false : { scale: 0.78, opacity: 0.24 }}
        animate={shouldReduceMotion ? undefined : { scale: [0.78, 1.3, 1.05], opacity: [0.24, 0.5, 0.22] }}
        transition={{ duration: 2.6, ease: [0.22, 1, 0.36, 1], times: [0, 0.48, 1] }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[46vw] w-[46vw] min-h-[18rem] min-w-[18rem] max-h-[38rem] max-w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.08)_28%,rgba(255,255,255,0.03)_50%,transparent_72%)] blur-3xl"
      />

      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_center,black_0%,black_48%,rgba(0,0,0,0.9)_72%,transparent_100%)]">
        <PreloaderDotField shouldReduceMotion={shouldReduceMotion} progressValue={progressValue} />
      </div>

      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 18, filter: "blur(12px)" }}
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          duration: shouldReduceMotion ? 0.3 : 0.88,
          delay: shouldReduceMotion ? 0.08 : 0.28,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 flex min-h-full flex-col items-center justify-center px-6 text-center"
      >
        <div className="relative flex flex-col items-center">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0.35, scale: 0.9 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: [0.35, 1, 0.92], scale: [0.9, 1.04, 1] }}
            transition={{ duration: shouldReduceMotion ? 0.3 : 1.2, delay: shouldReduceMotion ? 0.1 : 0.52, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/18 blur-[68px] sm:h-36 sm:w-36"
          />

          <motion.img
            src={logoWhite}
            alt=""
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.84, rotate: -4 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.3 : 0.82, delay: shouldReduceMotion ? 0.12 : 0.44, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 h-16 w-auto sm:h-20"
          />
        </div>
      </motion.div>

      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: shouldReduceMotion ? 0.12 : 0.96, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 z-10 px-6 pb-8 sm:px-8 sm:pb-10"
      >
        <div className="mx-auto w-full max-w-4xl">
          <div className="mb-3 flex items-end justify-between font-mono uppercase text-zinc-400">
            <span className="text-[11px] tracking-[0.24em]">Loading</span>
            <span className="text-xl tracking-[0.08em] text-white sm:text-2xl">
              {String(progress).padStart(2, "0")}%
            </span>
          </div>

          <div className="relative h-[5px] overflow-hidden rounded-sm bg-white/[0.08]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute inset-y-0 left-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.3),rgba(255,255,255,0.98)_72%,rgba(255,255,255,0.46))] shadow-[0_0_24px_rgba(255,255,255,0.28)]"
            />
          </div>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_38%,rgba(0,0,0,0.24)_70%,rgba(0,0,0,0.72)_100%)]" />
    </motion.div>
  );
}
