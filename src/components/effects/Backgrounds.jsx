/**
 * effects/Backgrounds.jsx
 * Shared background layers and canvas-driven visual effects.
 */

import React, { useRef, useEffect } from "react";

/**
 * Soft blurred orbs that add depth without introducing interaction cost.
 */
export function MeshBackground({ className = "" }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="hero-mesh-orb hero-mesh-orb--one" />
      <div className="hero-mesh-orb hero-mesh-orb--two" />
    </div>
  );
}

/**
 * Dot grid rendered on canvas to keep the hover field lightweight on large surfaces.
 */
export function DotGridCanvas({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === "undefined") return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const spacing = 44;
    const baseSize = 1;
    const maxSize = isCoarsePointer ? 4.4 : 3.5;
    const baseOpacity = isCoarsePointer ? 0.2 : 0.18;
    const maxOpacity = isCoarsePointer ? 1 : 0.95;
    const influence = isCoarsePointer ? 220 : 160;

    let dots = [];
    let width = 0;
    let height = 0;
    let mouseX = -9999;
    let mouseY = -9999;
    let rafId = null;
    let lastScrollY = window.scrollY;
    let scrollBoost = 0;
    let pulsePhase = Math.random() * Math.PI * 2;
    let introStartAt = null;

    const setup = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots = [];
      const cols = Math.floor(width / spacing) + 1;
      const rows = Math.floor(height / spacing) + 1;
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

    const getPointerPosition = (_timestamp) => {
      if (!isCoarsePointer) {
        return {
          pointerX: mouseX,
          pointerY: mouseY,
          influenceRadius: influence,
          opacityGain: 1,
          sizeGain: 1,
        };
      }

      // Touch devices do not have a persistent pointer, so scroll becomes the ambient driver.
      scrollBoost += (0 - scrollBoost) * 0.022;

      const ambientX = width * 0.18;
      const ambientY = height * 0.22;
      const scrollInfluenceX = Math.sin(window.scrollY * 0.0022 + pulsePhase) * 10;
      const scrollInfluenceY = Math.cos(window.scrollY * 0.0015 + pulsePhase) * 8;

      return {
        pointerX: ambientX + scrollInfluenceX,
        pointerY: ambientY + scrollInfluenceY,
        influenceRadius: 120 + scrollBoost * 45,
        opacityGain: 0.16 + scrollBoost * 0.12,
        sizeGain: 0.14 + scrollBoost * 0.12,
      };
    };

    const getIntroWaveFactor = (dot, timestamp) => {
      if (introStartAt === null) introStartAt = timestamp;

      const introDuration = isCoarsePointer ? 1050 : 760;
      const introProgress = Math.min(1, (timestamp - introStartAt) / introDuration);
      if (introProgress >= 1) return 0;

      const normalizedDiagonal =
        (dot.x / Math.max(width, 1) + dot.y / Math.max(height, 1)) / 2;
      const waveFront = -0.14 + introProgress * 1.32;
      const bandWidth = isCoarsePointer ? 0.16 : 0.12;
      const distance = Math.abs(normalizedDiagonal - waveFront);
      if (distance > bandWidth) return 0;

      const waveStrength = 1 - distance / bandWidth;
      const fadeOut = 1 - introProgress * (isCoarsePointer ? 0.3 : 0.44);
      const intensity = isCoarsePointer ? 1 : 0.68;
      return waveStrength * fadeOut * intensity;
    };

    const getTravelingScanFactor = (dot, timestamp) => {
      if (!isCoarsePointer) return 0;

      const cycleDuration = 5200;
      const activeDuration = 1480;
      const cycleTime = (timestamp + pulsePhase * 1000) % cycleDuration;
      if (cycleTime > activeDuration) return 0;

      const scanProgress = cycleTime / activeDuration;
      const normalizedDiagonal =
        (dot.x / Math.max(width, 1) + dot.y / Math.max(height, 1)) / 2;
      const scanFront = -0.14 + scanProgress * 1.3;
      const bandWidth = 0.12 + scrollBoost * 0.04;
      const distance = Math.abs(normalizedDiagonal - scanFront);
      if (distance > bandWidth) return 0;

      const scanStrength = 1 - distance / bandWidth;
      const easeOut = 1 - Math.abs(scanProgress - 0.5) * 1.35;
      return scanStrength * Math.max(0.2, easeOut) * (0.88 + scrollBoost * 0.26);
    };

    const draw = (timestamp) => {
      context.clearRect(0, 0, width, height);
      const { pointerX, pointerY, influenceRadius, opacityGain, sizeGain } =
        getPointerPosition(timestamp);

      dots.forEach((dot) => {
        const dx = pointerX - dot.x;
        const dy = pointerY - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let targetSize = baseSize;
        let targetOpacity = baseOpacity;

        if (distance < influenceRadius) {
          const factor = 1 - distance / influenceRadius;
          targetSize = baseSize + (maxSize - baseSize) * factor * sizeGain;
          targetOpacity =
            baseOpacity + (maxOpacity - baseOpacity) * factor * opacityGain;
        }

        const travelingScanFactor = getTravelingScanFactor(dot, timestamp);
        if (travelingScanFactor > 0) {
          targetSize = Math.max(
            targetSize,
            baseSize + (maxSize + 0.6 - baseSize) * travelingScanFactor
          );
          targetOpacity = Math.max(
            targetOpacity,
            baseOpacity + (Math.min(1, maxOpacity) - baseOpacity) * travelingScanFactor
          );
        }

        const introWaveFactor = getIntroWaveFactor(dot, timestamp);
        if (introWaveFactor > 0) {
          targetSize = Math.max(
            targetSize,
            baseSize + (maxSize + 1.2 - baseSize) * introWaveFactor
          );
          targetOpacity = Math.max(
            targetOpacity,
            baseOpacity +
              (Math.min(1, maxOpacity + 0.08) - baseOpacity) * introWaveFactor
          );
        }

        dot.size += (targetSize - dot.size) * 0.15;
        dot.opacity += (targetOpacity - dot.opacity) * 0.15;

        context.fillStyle = `rgba(255,255,255,${dot.opacity})`;
        context.beginPath();
        context.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        context.fill();
      });

      rafId = window.requestAnimationFrame(draw);
    };

    const handleMove = (event) => {
      if (isCoarsePointer) return;
      const rect = canvas.getBoundingClientRect();
      mouseX = event.clientX - rect.left;
      mouseY = event.clientY - rect.top;
    };

    const handleLeave = () => {
      if (isCoarsePointer) return;
      mouseX = -9999;
      mouseY = -9999;
    };

    const handleScroll = () => {
      if (!isCoarsePointer) return;
      const delta = Math.abs(window.scrollY - lastScrollY);
      lastScrollY = window.scrollY;
      scrollBoost = Math.min(1, scrollBoost + delta / 150);
    };

    const handleResize = () => {
      setup();
    };

    setup();
    rafId = window.requestAnimationFrame(draw);
    if (isCoarsePointer) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    } else {
      window.addEventListener("mousemove", handleMove, { passive: true });
      window.addEventListener("mouseout", handleLeave);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      if (isCoarsePointer) {
        window.removeEventListener("scroll", handleScroll);
      } else {
        window.removeEventListener("mousemove", handleMove);
        window.removeEventListener("mouseout", handleLeave);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
