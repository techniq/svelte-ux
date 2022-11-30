import { readable } from 'svelte/store';
import { browser } from '../utils/env';

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
