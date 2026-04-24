/**
 * Shared helper for positioning glow gradients via CSS custom properties.
 */

export function updateGlowPosition(event) {
  const element = event.currentTarget;
  const rect = element.getBoundingClientRect();

  element.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  element.style.setProperty("--my", `${event.clientY - rect.top}px`);
}
