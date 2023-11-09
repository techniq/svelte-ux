import { type Readable, type Subscriber, writable } from 'svelte/store';

function dirtyStore<T extends Readable<any>>(store: T) {
  const count = writable(-1);

  const unsubStore = store.subscribe(() => count.update((x) => ++x));

  return {
    subscribe(run: Subscriber<boolean>) {
      const unsubCount = count.subscribe(($count) => run($count > 0));
      return () => {
        unsubStore();
        unsubCount();
      };
    },
    reset() {
      count.set(0);
    },
  };
}

export default dirtyStore;
