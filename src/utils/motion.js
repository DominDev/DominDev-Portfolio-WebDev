/**
 * Motion utilities shared by interactive components.
 */

export function getPreferredScrollBehavior() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return "auto";
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}
