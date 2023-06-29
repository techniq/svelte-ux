import { readable, writable } from 'svelte/store';
import { browser } from '../utils/env';

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
export const smScreen = matchMediaWidth(640);
export const mdScreen = matchMediaWidth(768);
export const lgScreen = matchMediaWidth(1024);
export const xlScreen = matchMediaWidth(1280);
export const xxlScreen = matchMediaWidth(1536);

// Media types
export const screen = matchMedia(`screen`);
export const print = matchMedia(`print`);

// Media features
export const darkColorScheme = matchMedia(`(prefers-color-scheme: dark)`);
export const lightColorScheme = matchMedia(`(prefers-color-scheme: light)`);
export const motionReduce = matchMedia(`(prefers-reduced-motion: reduce)`);
