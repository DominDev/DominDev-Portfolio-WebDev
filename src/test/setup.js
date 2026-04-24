import { vi } from "vitest";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

class MockIntersectionObserver {
  observe() {}

  unobserve() {}

  disconnect() {}
}

class MockResizeObserver {
  observe() {}

  unobserve() {}

  disconnect() {}
}

window.IntersectionObserver = MockIntersectionObserver;
window.ResizeObserver = MockResizeObserver;
window.scrollTo = vi.fn();

Object.defineProperty(window, "devicePixelRatio", {
  configurable: true,
  value: 1,
});

Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
  configurable: true,
  value: vi.fn(),
});

Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
  configurable: true,
  value: vi.fn(() => ({
    setTransform: vi.fn(),
    clearRect: vi.fn(),
    beginPath: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
  })),
});
