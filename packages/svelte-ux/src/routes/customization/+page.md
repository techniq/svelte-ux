<script lang="ts">
  import { Button, ThemeSelect, ThemeSwitch } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';
</script>

# Customization

## Theme

Svelte UX uses a collection of theme colors, enabling robust styling including light and dark modes. There are a handlful of required colors, and the Tailwind plugin will create or generate the additional colors and shades. You can also explicitly specify all colors, or use the [theme generator](/theme) to browse, create, or modify a large collection of themes, converted from [Daisy UI](https://daisyui.com/docs/themes/) and [Skeleton](https://www.skeleton.dev/) themes.

Theme colors are defined using `ux.themes` in `tailwind.config.cjs` and can be defined in any color format including `#000`, `rgb()`, `hsl()`, and `oklch()`

```js
module.exports = {
  ux: {
    themes: {
      // light mode
      light: {
        primary: 'oklch(49.12% 0.3096 275.75)',
        secondary: 'oklch(69.71% 0.329 342.55)',
        'secondary-content': 'oklch(98.71% 0.0106 342.55)',
        accent: 'oklch(76.76% 0.184 183.61)',
        neutral: '#2B3440',
        'neutral-content': '#D7DDE4',
        'surface-100': 'oklch(100% 0 0)',
        'surface-200': '#F2F2F2',
        'surface-300': '#E5E6E6',
        'surface-content': '#1f2937',
      },

      // dark mode
      dark: {
        primary: 'oklch(65.69% 0.196 275.75)',
        secondary: 'oklch(74.8% 0.26 342.55)',
        accent: 'oklch(74.51% 0.167 183.61)',
        neutral: '#2a323c',
        'neutral-content': '#A6ADBB',
        'surface-100': '#1d232a',
        'surface-200': '#191e24',
        'surface-300': '#15191e',
        'surface-content': '#A6ADBB',
      },
    },
  },
};
```

The Svelte UX tailwind plugin (`@layerstack/tailwind/plugin`) will translate the defined colors to a common color space, which uses `hsl()` by default. If you would like to change the color space, for example use `oklch()` for an increased gamut of colors, simply call the plugin with the `colorSpace` option defined.

```js
const layerstack = require('@layerstack/tailwind/plugin');

module.exports = {
  // ...
  plugins: [svelteUx({ colorSpace: 'oklch' })],
};
```

There are a few ways to quickly create themes for your site. You can use the [tailwindcss/colors](https://tailwindcss.com/docs/customizing-colors) package to easily select colors...

```js
const colors = require('tailwindcss/colors');

module.exports = {
  // ...
  ux: {
    themes: {
      light: {
        primary: colors['orange']['500'],
        'primary-content': 'white',
        secondary: colors['blue']['500'],
        'surface-100': 'white',
        'surface-200': colors['gray']['100'],
        'surface-300': colors['gray']['300'],
        'surface-content': colors['gray']['900'],
      },
      dark: {
        primary: colors['orange']['500'],
        'primary-content': 'white',
        secondary: colors['blue']['500'],
        'surface-100': colors['zinc']['800'],
        'surface-200': colors['zinc']['900'],
        'surface-300': colors['zinc']['950'],
        'surface-content': colors['zinc']['100'],
      },
    },
  },
};
```

or use the [theme generator](/theme) to browse, create, or modify a large collection of themes, converted from [Daisy UI](https://daisyui.com/docs/themes/) and [Skeleton](https://www.skeleton.dev/) themes.

If referencing a lot of colors, such as those captured from the theme generator, it can be helpful to put those in a separate file, such as `themes.json`, and reference the file in your `tailwind.config.cjs`.

```js
module.exports = {
  ux: {
    themes: require('./themes.json'),
  },
};
```

---

### Theme colors

- Semantic
  - `primary`
  - `secondary`
  - `accent`
  - `neutral`
- State
  - `info`
  - `success`
  - `warning`
  - `danger`
- `surface`

Semantic and state colors have a default color (ex. `bg-primary`), shades `50`-`900` (ex. `bg-primary-700`), and a `content` color (ex. `text-primary-content`). Shades can be explicitly provided (such as when using Skeleton themes) or will be generated if only the default/500 color is defined. The `content` color will be generated as a WCAG compatible lighter or darker shade color of the related color using the default/500 shade, if not explicitly defined.

<Preview>
  <div class="grid grid-cols-2 gap-2">
    <div class="bg-primary text-primary-content px-2 rounded">primary example</div>
    <div class="bg-secondary text-secondary-content px-2 rounded">secondary example</div>
    <div class="bg-success text-success-content px-2 rounded">Success example</div>
    <div class="bg-danger text-danger-content px-2 rounded">danger example</div>
  </div>
</Preview>

Surface colors are defined as `100` (lightest), `200` (medium), and `300` (darkest) shades as well as `content`.

<Preview>
  <div class="grid grid-cols-3 gap-2">
    <div class="bg-surface-100 text-surface-content px-2 rounded">surface-100 example</div>
    <div class="bg-surface-200 text-surface-content px-2 rounded">surface-200 example</div>
    <div class="bg-surface-300 text-surface-content px-2 rounded">surface-300 example</div>
  </div>
</Preview>

---

### Referencing theme colors

Colors can be referenced using Tailwind classes such as `bg-primary`, `text-primary-content`, and can even change the opacity (`bg-primary-600/50`).

You can also reference the colors using `theme()`, which is helpful to set CSS variables.

```html
<div class="[--text-color:theme(colors.primary)]" />
<div class="[--text-color:theme(colors.primary/50%)]" />

<style>
  div {
    --text-color: theme(colors.primary);
    --bg-color: theme(colors.primary / 50%);
  }
</style>
```

Lastly, you can reference the theme colors directly as CSS variables, for example `hsl(var(--color-primary))`. This can be helpful when it is not optimal to use a Tailwind class, such as within a Svelte action, or available, such as within the range of a `d3-scale`. Just be sure to wrap the variable in the same color space function as set in the Tailwind plugin (`hsl()` by default).

---

### Additional themes

Additional light and dark themes can be defined. You can also copy all Daisy UI and/or Skeleton themes using the [theme generator](/theme), if preferred. Svelte UX will attempt to set the correct [color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme) CSS property value (`light` or `dark`) based on the `surface-content` color, but you may explicitly define it to guarantee the default text color and other elements are legible for the theme.

```json
{
  "light": {
    "color-scheme": "light",
    // ...
  },
  "dark": {
    "color-scheme": "dark",
    // ...
  },
  "winter": {
    "color-scheme": "light",
    // ...
  },
  "black": {
    "color-scheme": "dark",
    // ...
  },
  "dracula": {
    "color-scheme": "dark",
    // ...
  },
```

You will also need to update your `settings()` (typically defined in `+layout.svelte`) with these additional theme names.

```svelte
<script>
  import { settings } from 'svelte-ux';

  settings({
    themes: {
      light: ['light', 'winter'],
      dark: ['dark', 'black', 'dracula'],
    },
  });
</script>
```

`light` and `dark` should always be the first 2 themes defined, in that order, to properly setup the themes based on system/browser preferences. Additional themes can be defined in any order.

---

### Theme selection

To handle theme selection, the theme store must be created using either the `settings()` function (along with `<ThemeInit>` to handle SSR theme initialization from localStorage)...

```svelte
<script>
  import { settings, ThemeInit } from 'svelte-ux';

  settings();
</script>

<ThemeInit />
```

or using the [Settings](/docs/components/Settings) component (which will also setup `<ThemeInit>` internally, by default)

```svelte
<script>
  import { Settings } from 'svelte-ux';
</script>

<Settings />
```

These are typically setup within your root `+layout.svelte`.

To easily change the active theme, [ThemeSelect](/docs/components/ThemeSelect) and [ThemeSwitch](/docs/components/ThemeSwitch) are provided. `ThemeSwitch` can be used to simply toggle between `light` and `dark` themes, and `ThemeSelect` supports selecting a theme when additional light and/or dark themes are defined.

<Preview>
  <div class="grid grid-cols-[auto,1fr] gap-3 items-center justify-items-start">
    <div class="font-semibold text-sm">ThemeSwitch</div>
    <ThemeSwitch />
    <div class="font-semibold text-sm">ThemeSelect</div>
    <ThemeSelect />
  </div>
</Preview>

You can also build your own theme selection using the `currentTheme` store from `getSettings()`.

```svelte
<script>
  import { getSettings } from 'svelte-ux';

  const { currentTheme, themes } = getSettings();

  // Current theme
  $currentTheme.theme;

  // Change theme
  currentTheme.setTheme('my-theme');

  // Is current theme dark color scheme
  $currentTheme.dark;
</script>
```

See the implementations of [ThemeSelect](/docs/components/ThemeSelect) and [ThemeSwitch](/docs/components/ThemeSwitch) for more details

---

## Settings

At the root of your app, you can use `settings({ ... })` or `<Settings ...>` to set component classes, define some default component props such as `variant` and `labelPlacement`, define locales / formats, or register additional `light `/ `dark` themes.

For each `ComponentName: ...` you can add convenient global styling by passing `classes` as a `string` to alter the root class string, or an `object` for finer control over internal elements.

Components based on `Button` and `Field` also let you customize the default `variant` and `labelPlacement` properties, respectively.

This is typically done in your root `+layout.svelte`.

```svelte
<script>
  import { settings } from 'svelte-ux';

  settings({
    components: {
      Button: {
        // same as <Button class="flex-2">
        classes: 'flex-2',
        // All component that wrap Button will also use this variant by default,
        variant: 'outline',
      },
      Field: {
        // All components based on Field will use this as well.
        labelPlacement: 'top',
      },
      TextField: {
        classes: {
          // same as <TextField classes={{ container: '...' }}>
          container: 'hover:shadow-none group-focus-within:shadow-none',
        },
      },
    },
  });
</script>
```

`settings()` is also used to define `localeFormats`, which are used by the `format()` util as well as date components (such as `DateField`, `DatePickerField`, and `DateRangeField`)

```js
settings({
  // ...

  // fallbackLocale: 'fr',
  localeFormats: {
    fr: createLocaleSettings({
      locale: 'fr',

      formats: {
        dates: {
          baseParsing: 'dd/MM/yyyy',
          ordinalSuffixes: {
            one: 'er',
          },
        },

        numbers: {
          defaults: {
            currency: 'EUR',
          },
        },
      },

      dictionary: {
        Ok: 'Valider',
        Cancel: 'Annuler',

        Date: {
          Start: 'Début',
          End: 'Fin',

          Day: 'Jour',
          DayTime: 'Jour & Heure',
          Time: 'Heure',
          Week: 'Semaine',
          Month: 'Mois',
          Quarter: 'Trimestre',
          CalendarYear: 'Année',
          FiscalYearOct: 'Année fiscale (octobre)',
          BiWeek: 'Bi-hebdomadaire',

          PeriodDay: {
            Current: "Aujourd'hui",
            Last: 'Hier',
            LastX: 'Les {0} derniers jours',
          },

          //...
        },
      },
    }),
  },
});
```

## `class` and `classes` props

Any tailwind class such as colors (`text-*`, `bg-*`), padding/margins (`p-*`, `mx-*`), etc can be passed to `class` or `classes` props of a component.

```svelte
<Button class="px-4">Click me</Button>
```

Using `classes` enables easy access to internal elements

```svelte
<Button icon={mdiMagnify} classes={{ icon: 'opacity-50' }}>Click me</Button>
```

Internally, each component uses the `cls()` util which leverages [tailwind-merge](https://github.com/dcastil/tailwind-merge) for easy style overriding (see `class precedence` below).

---

## Class precedence

Classes are applied in the following order, and [tailwind-merge](https://github.com/dcastil/tailwind-merge) handles conflict resolution (last wins).

- Base component classes
- Variant specific classes
- settings() `classes` (context)
- `classes` prop
- `class` prop

---

## Global classes

All components with top-level elements add a `{ComponentName}` class, to allow global CSS rules, if desired.

```css
:global(.Button) {
  background-color: red;
}
```

This also makes it easier to identify components in source / developer tools.

---

## Component variants

Some components provide multiple variants for built in styling, such as `Button` and `ToggleGroup`.

```svelte
<Button variant="fill" />
<Button variant="fill-light" />
<Button variant="outline" />
```

If a default variant is applied (for example Button uses `text`), you can use the `none` variant to strip down most of the default styling.

```svelte
<Button variant="none" />
```

These variants can also be styled using via `settings()`, and the defaults can be overridden as well.

```js
settings({
  components: {
    Button: {
      classes: '[&.variant-outline]:border-2',
      variant: 'outline',
    },
  },
});
```

or global CSS

```css
:global(.Button.variant-outline) {
  border-width: 2px;
}
```

---

## Slots

Many components expose slots, including `default` and named, to allow customization. A good example is the `Field` component.

---

## Composition

If you find yourself passing the same props repeatedly, you may find it useful to use composition to build your own custom components and leverage Svelte UX's components internally.
