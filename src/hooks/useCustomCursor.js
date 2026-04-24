/**
 * hooks/useCustomCursor.js
 * Drives the custom cursor outside React renders so pointer movement stays smooth.
 */

import { useEffect, useRef } from "react";

export function useCustomCursor({ disabled = false } = {}) {
  const cursorRef = useRef(null);
  const targetPositionRef = useRef({ x: 0, y: 0 });
  const currentPositionRef = useRef({ x: 0, y: 0 });
  const isVisibleRef = useRef(false);
  const isExpandedRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const reduceMotionRef = useRef(false);
  const rafIdRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const finePointerQuery = window.matchMedia("(pointer: fine)");
    if (!finePointerQuery.matches) return;

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotionRef.current = reduceMotionQuery.matches;

    const updateCursorNode = () => {
      const cursorNode = cursorRef.current;
      if (!(cursorNode instanceof HTMLElement)) return;

      const scale = isExpandedRef.current ? 3 : 1;
      cursorNode.style.opacity = !disabled && isVisibleRef.current ? "1" : "0";
      cursorNode.style.transform = `translate(${currentPositionRef.current.x}px, ${currentPositionRef.current.y}px) translate(-50%, -50%) scale(${scale})`;
    };

    const stopAnimation = () => {
      if (rafIdRef.current) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = 0;
      }
      isAnimatingRef.current = false;
    };

    const animateCursor = () => {
      const deltaX = targetPositionRef.current.x - currentPositionRef.current.x;
      const deltaY = targetPositionRef.current.y - currentPositionRef.current.y;
      const smoothing = reduceMotionRef.current ? 1 : 0.26;

      currentPositionRef.current = {
        x: currentPositionRef.current.x + deltaX * smoothing,
        y: currentPositionRef.current.y + deltaY * smoothing,
      };

      updateCursorNode();

      if (Math.abs(deltaX) < 0.12 && Math.abs(deltaY) < 0.12) {
        currentPositionRef.current = { ...targetPositionRef.current };
        updateCursorNode();
        stopAnimation();
        return;
      }

      rafIdRef.current = window.requestAnimationFrame(animateCursor);
    };

    const ensureAnimation = () => {
      if (isAnimatingRef.current || disabled) return;
      isAnimatingRef.current = true;
      rafIdRef.current = window.requestAnimationFrame(animateCursor);
    };

    const handleMove = (event) => {
      targetPositionRef.current = { x: event.clientX, y: event.clientY };

      if (!isVisibleRef.current) {
        currentPositionRef.current = { ...targetPositionRef.current };
        isVisibleRef.current = true;
      }

      const interactiveTarget =
        event.target instanceof Element
          ? event.target.closest("a, button, [data-cursor='hover']")
          : null;
      isExpandedRef.current = Boolean(interactiveTarget);

      if (reduceMotionRef.current) {
        currentPositionRef.current = { ...targetPositionRef.current };
        updateCursorNode();
        return;
      }

      ensureAnimation();
      updateCursorNode();
    };

    const handleLeaveDocument = (event) => {
      if (event.relatedTarget || event.toElement) return;

      isVisibleRef.current = false;
      isExpandedRef.current = false;
      updateCursorNode();
    };

    const handleReduceMotionChange = (event) => {
      reduceMotionRef.current = event.matches;
      if (event.matches) {
        currentPositionRef.current = { ...targetPositionRef.current };
        updateCursorNode();
        stopAnimation();
      }
    };

    updateCursorNode();
    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseout", handleLeaveDocument);
    reduceMotionQuery.addEventListener("change", handleReduceMotionChange);

    return () => {
      stopAnimation();
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseout", handleLeaveDocument);
      reduceMotionQuery.removeEventListener("change", handleReduceMotionChange);
    };
  }, [disabled]);

  useEffect(() => {
    const cursorNode = cursorRef.current;
    if (!(cursorNode instanceof HTMLElement)) return;

    cursorNode.style.opacity = disabled ? "0" : cursorNode.style.opacity || "0";
  }, [disabled]);

  return { cursorRef };
}
