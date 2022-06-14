<script lang="ts">
  import AppBar from '$lib/components/AppBar.svelte';
</script>

<AppBar title="svelte-ux" />

<main class="p-2">
<div class="prose max-w-none bg-white rounded border p-4">

## Installation

Install `svelte-ux` package

```sh
npm install svelte-ux
```

Add install `svelte-preprocess` if not already available. Typescript projects with SvelteKit will already have this installed.

```sh
npm install svelte-preprocess
```

Lastly, add `TailwindCSS` and dependencies. Requires the latest (v3.0+) with built-in JIT support.

```sh
npm install tailwindcss autoprefixer
```

## Setup svelte-preprocess

Update `svelte.config.js` and add `svelte-preprocess` if not already added.

```js
import sveltePreprocess from 'svelte-preprocess';

const config = {
  preprocess: [sveltePreprocess()],

  kit: {
    // ...
  },
};
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
  plugins: [require('svelte-ux/plugins/tailwind')],
};
```

A few notes regarding the config

- Define `accent` color of your choice. Many components utilize this color and more are being updated to do so.
- Currently `svelte-ux` provides a tailwind plugin to use more [realistic shadows](https://www.joshwcomeau.com/css/designing-shadows/) by having multiple shadow layers, unlike the current Tailwind [shadows](https://tailwindcss.com/docs/box-shadow) which have at most 2 layers, exposed as `elevation-#` classes. This may change in the future.

Next, import Tailwind layers in `src/routes/__layout.svelte` style block

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

Lastly, use `components` (or `actions`, `stores`, or `utils`) by importing from `svelte-ux`

```svelte
<script>
  import { Button } from 'svelte-ux';
</script>

<Button>Click here</Button>
```

All `components` `actions` and `stores` are available as top-level imports as shown above, although `utils` must be imported with a deeper path as to not polute the top-level imports. This may change in the future.

```js
import { dateDisplay } from 'svelte-ux/utils/dateDisplay';
```

 </div>
</main>
