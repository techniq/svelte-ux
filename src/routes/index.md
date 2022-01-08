<script lang="ts">
  import AppBar from '$lib/components/AppBar.svelte';
</script>

<AppBar title="svelte-ux" />

<main class="p-2 prose">

<div class="bg-white rounded border p-4">

## Installation

Install `svelte-ux` package

```sh
npm install svelte-ux
```

as well as `TailwindCSS` and dependencies

```sh
npm install tailwindcss tailwindcss-elevation autoprefixer
```

## Setup TailwindCSS

Create `postcss.config.cjs`

```js
const tailwindCSS = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [tailwindCSS(), autoprefixer],
};
```

Create `tailwind.config.cjs`

```js
const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{html,svelte}', './node_modules/svelte-ux/**/*.{svelte,js}'],
  theme: {
    extend: {
      colors: {
        'color-var': 'var(--color)',
        accent: colors.blue,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('tailwindcss-elevation')(['responsive'])],
};
```

A few notes regarding the config

- Define `accent` color of your choice. Many components utilize this color and more are being updated to do so.
- Currently `svelte-ux` uses the [tailwindcss-elevation](https://github.com/jonaskay/tailwindcss-elevation) plugin to use more [realistic shadows](https://www.joshwcomeau.com/css/designing-shadows/) by having multiple shadow layers, unlike the current Tailwind [shadows](https://tailwindcss.com/docs/box-shadow) which have at most 2 layers.

Import Tailwind base layers in `src/routes/__layout.svelte`

```svelte
<style lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  :global(body) {
    @apply bg-black/10;
  }
</style>
```

</div>
</main>
