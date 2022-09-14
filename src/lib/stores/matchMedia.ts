import { readable } from 'svelte/store';
// import { browser } from '$app/env';

// TODO: Replace with `browser` from `$app/env` once better supported when imported as package
// const browser = !import.meta.env.SSR;
const browser = typeof window !== 'undefined';

function matchMedia(queryString: string) {
  return readable(null, (set) => {
    if (browser) {
      const query = window.matchMedia(queryString);
      const listener = (e) => set(e.matches);

      query.addListener(listener);
      listener(query); // Set value immediately

      return () => query.removeListener(listener);
    }
  });
}

export default matchMedia;
