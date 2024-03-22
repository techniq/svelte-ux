/*
 * Use local copy of Skeleton themes/getThemeProperties() due to:
 *   - Skeleton themse only available in `@skeletonlabs/tw-plugin` package, which
 *     - Does not publish the `src` directly
 *     - Requires the Node.js runtime (fs, path, tty, url, util)
 *   - Cloudflare not support Node.js runtime (unless using `require('node:...'))
 *     - https://developers.cloudflare.com/workers/runtime-apis/nodejs/
 *     - Builds work on Vercel (since they support the Node.js runtime)
 *   - See: https://github.com/techniq/svelte-ux/pull/192
 */
//
// https://github.com/skeletonlabs/skeleton/blob/dev/packages/plugin/src/tailwind/themes/index.ts#L17-L19
// import { getThemeProperties } from '@skeletonlabs/tw-plugin';
import { entries, fromEntries } from '../types/typeHelpers.js';
import { getThemeProperties } from './skeleton/index.js';

const themeNames = [
  'skeleton',
  'wintry',
  'modern',
  'rocket',
  'seafoam',
  'vintage',
  'sahara',
  'hamlindigo',
  'gold-nouveau',
] as const;

// Map Skeleton to Svelte UX theme colors
const skeletonColorMap = {
  // Semantic
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'accent',
  // '': 'neutral',
  // State
  success: 'success',
  warning: 'warning',
  error: 'danger',
  // Surface
  surface: 'surface',
};

function processTheme(
  themeName: (typeof themeNames)[number],
  scheme: 'light' | 'dark'
): [string, Record<string, string>] {
  const properties = getThemeProperties(themeName);

  let mappedThemeProperties: [string, string][] = entries(properties)
    .map(([key, value]) => {
      if (key.startsWith('--color')) {
        // `--color-primary-500` => `primary-500`
        // `--color-primary-500` => `primary`
        const matches = key.match(/--color-(\w*)-([0-9]{3})/);
        const skeletonColorName = matches?.[1] as keyof typeof skeletonColorMap | undefined;
        const skeletonColorShade = matches?.[2];
        const themeColorName = skeletonColorName && skeletonColorMap[skeletonColorName];
        if (themeColorName) {
          return [`${themeColorName}-${skeletonColorShade}`, `rgb(${value})`] satisfies [
            string,
            string,
          ];
        }
      } else if (key.startsWith('--on-')) {
        // `--on-primary` => `primary-content`
        const matches = key.match(/--on-(\w*)/);
        const skeletonColorName = matches?.[1] as keyof typeof skeletonColorMap | undefined;
        const themeColorName = skeletonColorName && skeletonColorMap[skeletonColorName];
        if (themeColorName) {
          return [`${themeColorName}-content`, `rgb(${value})`] satisfies [string, string];
        }
      } else {
        // consider mapping additional properties
        // '--theme-font-family-base': 'system-ui',
        // '--theme-font-family-heading': 'system-ui',
        // '--theme-font-color-base': '0 0 0',
        // '--theme-font-color-dark': '255 255 255',
        // '--theme-rounded-base': '9999px',
        // '--theme-rounded-container': '8px',
        // '--theme-border-base': '1px',
      }
    })
    .filter((d): d is [string, string] => Boolean(d));

  mappedThemeProperties =
    scheme === 'light'
      ? [
          ...mappedThemeProperties,
          ['color-scheme', 'light'],
          ['surface-100', `rgb(${properties['--color-surface-50']})`],
          ['surface-200', `rgb(${properties['--color-surface-100']})`],
          ['surface-300', `rgb(${properties['--color-surface-200']})`],
          ['surface-content', `rgb(0 0 0)`],
        ]
      : [
          ...mappedThemeProperties,
          ['color-scheme', 'dark'],
          ['surface-100', `rgb(${properties['--color-surface-700']})`],
          ['surface-200', `rgb(${properties['--color-surface-800']})`],
          ['surface-300', `rgb(${properties['--color-surface-900']})`],
          ['surface-content', `rgb(255 255 255)`],
        ];

  return [
    themeName === 'skeleton' ? scheme : scheme === 'dark' ? themeName + '-dark' : themeName,
    fromEntries(mappedThemeProperties),
  ];
}

const themes = fromEntries(
  themeNames.flatMap((themeName) => {
    return [processTheme(themeName, 'light'), processTheme(themeName, 'dark')];
  })
);

export { themes };
