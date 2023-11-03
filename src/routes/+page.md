<script lang="ts">
  import Button from '$lib/components/Button.svelte';
</script>

<div class="prose max-w-none bg-white rounded border p-4">

<h1>Installation</h1>

Install `svelte-ux` package

```sh
npm install svelte-ux
```

Add install `svelte-preprocess` if not already available. Typescript projects with SvelteKit will already have this installed.

```sh
npm install svelte-preprocess
```

Lastly, add `tailwindcss` and dependencies. Requires the latest (v3.0+) with built-in JIT support.

```sh
npm install tailwindcss autoprefixer
```

---

<h1>Setup svelte-preprocess</h1>

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

---

<h1>Setup Tailwind</h1>

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
        accent: colors.blue,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('svelte-ux/plugins/tailwind.cjs')],
};
```

A few notes regarding the config

- `./node_modules/svelte-ux/**/*.{svelte,js}` makes sure all the library classes are JIT added
- Define `accent` color of your choice. Many components utilize this color and more are being updated to do so.
- Currently Svelte UX provides a tailwind plugin to use more [realistic shadows](https://www.joshwcomeau.com/css/designing-shadows/) by having multiple shadow layers, unlike the current Tailwind [shadows](https://tailwindcss.com/docs/box-shadow) which have at most 2 layers, exposed as `elevation-#` classes. This may change in the future.
- The `tailwindcss-forms` plugin should not be used. The styles that it sets up for inputs conflict with the styles used by Svelte UX.

Next, import Tailwind layers in `src/routes/+layout.svelte` style block

```svelte
<style lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
```

---

<h1>Usage</h1>

Using `components`, `actions`, or `stores` is as simple as importing from `svelte-ux`.

```svelte
<script>
  import { Button } from 'svelte-ux';
</script>

<Button>Click here</Button>
```

Currently, `utils` are not exposed as top-level exports to not polute the namespace, although this may change in the future. For now, you can import them using the full path.

```js
import { dateDisplay } from 'svelte-ux/utils/dateDisplay';
```

See each component page for detailed usage examples.

 </div>
