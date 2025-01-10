// https://github.com/sveltejs/language-tools/blob/master/docs/preprocessors/typescript.md
declare namespace svelteHTML {
  interface HTMLAttributes<T> {
    // use:intersection
    'onintersecting'?: (event: CustomEvent<IntersectionObserverEntry>) => void;

    // use:mutate
    'onmutate'?: (event: CustomEvent<MutationRecord[]>) => void;

    // use:movable
    'onmovestart'?: (event: CustomEvent<{ x: number; y: number }>) => void;
    'onmove'?: (event: CustomEvent<{ x: number; y: number; dx: number; dy: number }>) => void;
    'onmoveend'?: (event: CustomEvent<{ x: number; y: number }>) => void;

    // use:popover
    'onclickOutside'?: (event: CustomEvent) => void;

    // use:overflow
    'onoverflow'?: (event: CustomEvent<{ overflowX: number; overflowY: number }>) => void;

    // use:longpress
    'onlongpress'?: (event: CustomEvent) => void;
  }
}
