import { readable, writable } from 'svelte/store';
import { browser } from '../utils/env.js';

export function matchMedia(queryString: string) {
  if (browser) {
    const query = window.matchMedia(queryString);
    return readable(query.matches, (set) => {
      const listener = (e: MediaQueryListEvent | MediaQueryList) => set(e.matches);

      query.addEventListener('change', listener);
      // listener(query); // Set value immediately

      return () => query.removeEventListener('change', listener);
    });
  } else {
    // ssr
    return writable(true);
  }
}

// Simplify common media query use case
export const matchMediaWidth = (width: number) => matchMedia(`(min-width: ${width}px)`);

// Matches tailwind defaults (https://tailwindcss.com/docs/screens)
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
};

export const smScreen = matchMediaWidth(breakpoints.sm);
export const mdScreen = matchMediaWidth(breakpoints.md);
export const lgScreen = matchMediaWidth(breakpoints.lg);
export const xlScreen = matchMediaWidth(breakpoints.xl);
export const xxlScreen = matchMediaWidth(breakpoints.xxl);

// Media types
export const screen = matchMedia(`screen`);
export const print = matchMedia(`print`);

// Media features
export const darkColorScheme = matchMedia(`(prefers-color-scheme: dark)`);
export const lightColorScheme = matchMedia(`(prefers-color-scheme: light)`);
export const motionReduce = matchMedia(`(prefers-reduced-motion: reduce)`);
export const landscape = matchMedia(`(orientation: landscape)`);
export const portrait = matchMedia(`(orientation: portrait)`);
