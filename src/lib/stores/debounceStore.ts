import { derived, get } from 'svelte/store';

type Stores = Parameters<typeof derived>[0];

function debounceStore<T extends Stores>(original: T, timeout = 300) {
	return derived(
		original,
		($original, set) => {
			const timer = setTimeout(() => set($original), timeout);

			return () => {
				clearTimeout(timer);
			};
		},
		get(original)
	);
}

export default debounceStore;
