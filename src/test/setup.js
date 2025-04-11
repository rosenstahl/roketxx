// src/test/setup.js
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock für window.fetch (für emailService)
global.fetch = vi.fn();

// Mock für IntersectionObserver (wird für Ihre ScrollAnimation Komponente benötigt)
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() { return null; }
  unobserve() { return null; }
  disconnect() { return null; }
};

// Mock für window.matchMedia (wird für Ihre responsive Komponenten benötigt)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
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

// Mock für window.scrollTo (wird für Ihre Navigation Komponente benötigt)
global.scrollTo = vi.fn();

// Clean up nach jedem Test
afterEach(() => {
  vi.clearAllMocks();
  global.fetch.mockClear();
});