import clsx, { type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';
import { range } from 'd3-array';
import { entries } from '../types/typeHelpers.js';

/**
 * Convert object to style string
 */
export function objectToString(styleObj: { [key: string]: string }) {
  return entries(styleObj)
    .map(([key, value]) => {
      if (value) {
        // Convert camelCase into kaboob-case (ex.  (transformOrigin => transform-origin))
        // @ts-ignore
        const propertyName = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        return `${propertyName}: ${value};`;
      } else {
        return null;
      }
    })
    .filter((x) => x)
    .join(' ');
}

/**
 * Wrapper around `tailwind-merge` and `clsx`
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      shadow: [
        'shadow-border-l',
        'shadow-border-r',
        'shadow-border-t',
        'shadow-border-b',
        'elevation-none',
        ...range(1, 25).map((x) => `elevation-${x}`),
      ],
    },
  },
});

export const cls = (...inputs: ClassValue[]) => twMerge(clsx(...inputs));
