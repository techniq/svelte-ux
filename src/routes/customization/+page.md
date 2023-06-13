<script>
  import Button from '$lib/components/Button.svelte';
</script>

# Customization

## Colors

You can adjust any color by updating your `tailwind.config.cjs`. See Tailwind's [customizing colors](https://tailwindcss.com/docs/customizing-colors) page for more details.

Many components leverage the `accent` color as the default color (`Checkbox`, `Radio`, `Switch`, etc) which should be set in `tailwind.config.cjs`.

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        'color-var': 'var(--color)',
        accent: colors.blue,
      },
    },
  },
  // ...
};
```

This is fairly synonymous with the CSS [accent-color](https://developer.mozilla.org/en-US/docs/Web/CSS/accent-color) property.

---

## `class` and `classes` props

Any tailwind classes such as colors (`text-*`, `bg-*`), padding/margins (`p-*`, `mx-*`), etc can be passed to `class` or `classes` props of a component.

```svelte
<Button class="px-4">Click me</Button>
```

Using `classes` enables easy access to internal elements

```svelte
<Button classes={{ icon: '' }}>Click me</Button>
```

Internally, each component uses the `cls()` util which leverages [tailwind-merge](https://github.com/dcastil/tailwind-merge) for easy style overriding.

---

## Theme via context (`createTheme()`)

Using `createTheme({ ComponentName: ... })` you can pass `class` (when value is a `string`) or `classes` (when value is an `object`) props to each component via context to allow convenient global styling, including access to internal element (when using `classes`)

```js
createTheme({
  Button: 'flex-2', // same as <Button class="flex-2">
  TextField: {
    container: 'hover:shadow-none group-focus-within:shadow-none', // same as <TextField classes={{ container: '...' }}>
  },
});
```

---

## Class precedence

Classes are applied in the following order, and [tailwind-merge](https://github.com/dcastil/tailwind-merge) handles overrides (last wins)

- Base component classes
- Variant specific classes
- Theme classes
- `classes` prop
- `class` prop

---

## Global classes

All components with top-level elements add a `{ComponentName}` class, to allow easy overriding using global CSS rules, if desired

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

These variants can also be styled using via `createTheme()`

```js
createTheme({
  Button: '[&.variant-outline]:border-2',
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

If you find yourself passing the same props repeatily, you may find it useful to use composition to build your own custom components and leverage svelte-ux's components internally
