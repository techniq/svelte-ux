// https://github.com/sveltejs/language-tools/blob/master/docs/preprocessors/typescript.md
declare namespace svelteHTML {
  interface HTMLAttributes<T> {
    // use:intersection
    'on:intersecting'?: (event: CustomEvent<IntersectionObserverEntry>) => void;

    // use:mutate
    'on:mutate'?: (event: CustomEvent<MutationRecord[]>) => void;

    // use:movable
    'on:movestart'?: (event: CustomEvent<{ x: number; y: number }>) => void;
    'on:move'?: (event: CustomEvent<{ x: number; y: number; dx: number; dy: number }>) => void;
    'on:moveend'?: (event: CustomEvent<{ x: number; y: number }>) => void;

    // use:popover
    'on:clickOutside'?: (event: CustomEvent) => void;

    // use:overflow
    'on:overflow'?: (event: CustomEvent<{ overflowX: number; overflowY: number }>) => void;

    // use:longpress
    'on:longpress'?: (event: CustomEvent) => void;
  }
}
