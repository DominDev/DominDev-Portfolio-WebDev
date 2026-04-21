/**
 * hooks/useCustomCursor.js
 * Zarządza stanem i pozycją niestandardowego kursora.
 * Obsługuje interakcje (hover) z linkami i przyciskami.
 */

import { useState, useEffect } from "react";

export function useCustomCursor() {
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorExpanded, setCursorExpanded] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) return;

    const handleMove = (event) => {
      setCursorVisible(true);
      setCursorPosition({ x: event.clientX, y: event.clientY });
      const interactiveTarget =
        event.target instanceof Element
          ? event.target.closest("a, button, [data-cursor='hover']")
          : null;
      setCursorExpanded(Boolean(interactiveTarget));
    };

    const handleLeaveDocument = (event) => {
      if (!event.relatedTarget && !event.toElement) {
        setCursorVisible(false);
        setCursorExpanded(false);
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseout", handleLeaveDocument);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseout", handleLeaveDocument);
    };
  }, []);

  return { cursorVisible, cursorExpanded, cursorPosition };
}
