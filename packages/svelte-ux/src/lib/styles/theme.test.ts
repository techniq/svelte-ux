import { describe, it, expect } from 'vitest';
import { flattenThemeColors, processThemeColors } from './theme.js';
import tailwindColors from 'tailwindcss/colors.js';

describe('flattenThemeColors', () => {
  it('Flatten recursive colors object', () => {
    const actual = flattenThemeColors({
      // Simple key-value pair
      primary: '#ff0000',
      dark: {
        // Default value
        DEFAULT: '#000',
        // Nested once
        blue: '#0000ff',
        red: {
          // Nested twice
          500: '#f00',
          // Multiple nested properties
          content: 'white',
        },
      },
      light: {
        // Should not be used, since objects do not guarantee respecting insertion, but it should work without any error
        green: { 100: '#0f0' },
        'green-100': '#0f0',
      },
    });
    const expected = {
      primary: '#ff0000',
      dark: '#000',
      'dark-blue': '#0000ff',
      'dark-red-500': '#f00',
      'dark-red-content': 'white',
      'light-green-100': '#0f0',
    };

    expect(actual).toEqual(expected);
  });
});

describe('processThemeColors', () => {
  it('Process theme colors recursive colors object', () => {
    const actual = processThemeColors(
      {
        // overriding semantic colors
        primary: {
          ...tailwindColors.blue,
          content: 'white',
          DEFAULT: tailwindColors.blue[600],
        },
        secondary: { ...tailwindColors.orange, content: 'white' },
        accent: { ...tailwindColors.fuchsia, content: 'white' },
        neutral: { ...tailwindColors.gray, content: 'white' },
        // overriding state colors
        info: tailwindColors.blue,
        success: tailwindColors.green,
        warning: tailwindColors.amber,
        danger: tailwindColors.red,
        // overriding surface colors
        surface: {
          100: 'white',
          200: tailwindColors.gray[200],
          300: tailwindColors.gray[300],
          content: tailwindColors.gray[900],
        },
      },
      'hsl'
    );

    expect(actual).toMatchSnapshot();
  });
});
