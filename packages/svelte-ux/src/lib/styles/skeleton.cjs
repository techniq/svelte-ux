const { getThemeProperties } = require('@skeletonlabs/tw-plugin');

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
];

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

function processTheme(themeName, scheme) {
  const properties = getThemeProperties(themeName);

  let mappedThemeProperties = Object.entries(properties)
    .map(([key, value]) => {
      if (key.startsWith('--color')) {
        // `--color-primary-500` => `primary-500`
        // `--color-primary-500` => `primary`
        const matches = key.match(/--color-(\w*)-([0-9]{3})/);
        const skeletonColorName = matches?.[1];
        const skeletonColorShade = matches?.[2];
        const themeColorName = skeletonColorMap[skeletonColorName];
        if (themeColorName) {
          return [`${themeColorName}-${skeletonColorShade}`, `rgb(${value})`];
        }
      } else if (key.startsWith('--on-')) {
        // `--on-primary` => `primary-content`
        const matches = key.match(/--on-(\w*)/);
        const skeletonColorName = matches?.[1];
        const themeColorName = skeletonColorMap[skeletonColorName];
        if (themeColorName) {
          return [`${themeColorName}-content`, `rgb(${value})`];
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
    .filter((d) => d);

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
    Object.fromEntries(mappedThemeProperties),
  ];
}

const themes = Object.fromEntries(
  themeNames.flatMap((themeName) => {
    return [processTheme(themeName, 'light'), processTheme(themeName, 'dark')];
  })
);

const lightThemes = Object.keys(themes).filter((themeName) => !themeName.endsWith('dark'));
const darkThemes = Object.keys(themes).filter((themeName) => themeName.endsWith('dark'));

module.exports = { themes, lightThemes, darkThemes };
