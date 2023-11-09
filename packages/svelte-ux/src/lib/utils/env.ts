// Since it's not recommended to use `$app/environment` or `import.meta.env.SSR`, expose these instead
// See: https://kit.svelte.dev/docs/packaging
export const browser = typeof window !== 'undefined';
export const ssr = typeof window === 'undefined';
