# Customization

## Adjusting colors

- Adjusting colors (`text-accent-500`, `bg-purple-500`, etc) using `tailwind.config.cjs`

Many components leverage the `accent` color as the default color (checkbox, radio, switch, etc).

See Tailwind's [customizing colors](https://tailwindcss.com/docs/customizing-colors) page for more details, fairly synonymous with the [accent-color](https://developer.mozilla.org/en-US/docs/Web/CSS/accent-color) CSS property.

## `class` and `classes` props

Pass tailwind classes (colors such as `text-*`, `bg-*`, padding (`p-*`, `px-*`), etc) as `class` or `classes` props of a component

`Classes` allows accessing internal elements easily

```svelte
<Button classes={{ icon: '' }}>Click me</Button>
```

> Uses [tailwind-merge](https://github.com/dcastil/tailwind-merge) via `cls()` util to allow overriding of classes

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

Classes are applied in the following order, and [tailwind-merge](https://github.com/dcastil/tailwind-merge) handles overrides (last wins)

- Base component classes
- Variant specific classes
- Theme classes
- `classes` prop
- `class` prop

## Global classes

All components with top-level elements add a `{ComponentName}` class, to allow easy overriding using global CSS rules

```css
:global(.Button) {
  background-color: red;
}
```

## Component variants

Variants, include variant="none"
Examples: Button, ToggleGroup, ...

```svelte
<Button variant="fill" />
<Button variant="fill-light" />
<Button variant="outline" />
```

These variants can also be styled using the global CSS

```css
:global(.Button.variant-outline) {
  border-width: 2px;
}
```

or using `createTheme()`

```js
createTheme({
  Button: '[&.variant-outline]:border-2',
});
```

> TODO: Add `variant-*`

## Extend a component by using it within another

> TODO: Add example

## Slots (default and named)

> TODO: Add example
