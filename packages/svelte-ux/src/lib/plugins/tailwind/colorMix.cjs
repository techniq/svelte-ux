module.exports = function ({ matchUtilities }) {
  // color-mix (ex. `bg-mix-[indigo/80]`, or `bg-mix-[indigo/-40]`)
  // https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix
  // https://twitter.com/Saadeghi/status/1727954306140172295
  // https://twitter.com/crswll/status/1724459346489139675
  matchUtilities({
    'text-mix': (value) => {
      const [color, percent] = value.split('/');
      return {
        color: `color-mix(in oklab,color-mix(in oklab,${color},${
          percent?.startsWith('-') ? 'black' : percent?.endsWith('%') ? 'transparent' : 'white'
        } ${
          percent?.replace('-', '') + '%'
        }),transparent calc(100% - 100% * var(--tw-text-opacity,1)))`,
      };
    },
    'bg-mix': (value) => {
      const [color, percent] = value.split('/');
      return {
        backgroundColor: `color-mix(in oklab,color-mix(in oklab,${color},${
          percent?.startsWith('-') ? 'black' : percent?.endsWith('%') ? 'transparent' : 'white'
        } ${
          percent?.replace('-', '') + '%'
        }),transparent calc(100% - 100% * var(--tw-bg-opacity,1)))`,
      };
    },
    'border-mix': (value) => {
      const [color, percent] = value.split('/');
      return {
        borderColor: `color-mix(in oklab,color-mix(in oklab,${color},${
          percent?.startsWith('-') ? 'black' : percent?.endsWith('%') ? 'transparent' : 'white'
        } ${
          percent?.replace('-', '') + '%'
        }),transparent calc(100% - 100% * var(--tw-border-opacity,1)))`,
      };
    },
  });
};
