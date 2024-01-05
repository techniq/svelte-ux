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

const lightThemes = themeNames.map((themeName) => (themeName === 'skeleton' ? 'light' : themeName));
const darkThemes = themeNames.map((themeName) =>
  themeName === 'skeleton' ? 'dark' : themeName + '-dark'
);

export { lightThemes, darkThemes };
