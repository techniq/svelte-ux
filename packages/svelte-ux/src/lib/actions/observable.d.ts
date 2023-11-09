// https://github.com/sveltejs/language-tools/blob/master/docs/preprocessors/typescript.md
declare namespace svelteHTML {
  interface HTMLAttributes<T> {
    'on:intersecting'?: (event: CustomEvent<IntersectionObserverEntry>) => any;
    'on:mutate'?: (event: CustomEvent<MutationRecord[]>) => any;
  }
}
