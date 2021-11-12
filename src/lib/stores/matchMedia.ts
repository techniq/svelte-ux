import { readable } from 'svelte/store';

function matchMedia(queryString: string) {
  return readable(null, (set) => {
    if (window) {
      const query = window.matchMedia(queryString);
      const listener = (e) => set(e.matches);

      query.addListener(listener);
      listener(query); // Set value immediately

      return () => query.removeListener(listener);
    }
  });
}

export default matchMedia;
