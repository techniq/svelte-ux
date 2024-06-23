import type { Action } from 'svelte/action';

type SpotlightOptions =
  | {
      radius?: string;
      borderWidth?: string;
      borderColorStops?: string;
      surfaceColorStops?: string;
      hover?: {
        radius?: string;
        borderWidth?: string;
        borderColorStops?: string;
        surfaceColorStops?: string;
      };
    }
  | undefined;

export const spotlight: Action<HTMLElement, SpotlightOptions> = (node, options) => {
  if (options?.radius) {
    node.style.setProperty('--default-spotlight-radius', options.radius);
  }
  if (options?.borderWidth) {
    node.style.setProperty('--default-spotlight-border-width', options.borderWidth);
  }
  if (options?.borderColorStops) {
    node.style.setProperty('--default-spotlight-border-color-stops', options.borderColorStops);
  }
  if (options?.surfaceColorStops) {
    node.style.setProperty('--default-spotlight-surface-color-stops', options.surfaceColorStops);
  }

  if (options?.hover?.radius) {
    node.style.setProperty('--hover-spotlight-radius', options.hover.radius);
  }
  if (options?.hover?.borderWidth) {
    node.style.setProperty('--hover-spotlight-border-width', options.hover.borderWidth);
  }
  if (options?.hover?.borderColorStops) {
    node.style.setProperty('--hover-spotlight-border-color-stops', options.hover.borderColorStops);
  }
  if (options?.hover?.surfaceColorStops) {
    node.style.setProperty(
      '--hover-spotlight-surface-color-stops',
      options.hover.surfaceColorStops
    );
  }

  node.classList.add(
    'relative',
    'isolate',

    options?.radius ? '[--spotlight-radius:var(--default-spotlight-radius)]' : '',
    options?.borderWidth ? '[--spotlight-border-width:var(--default-spotlight-border-width)]' : '',
    options?.borderColorStops
      ? '[--spotlight-border-color-stops:var(--default-spotlight-border-color-stops)]'
      : '',
    options?.surfaceColorStops
      ? '[--spotlight-surface-color-stops:var(--default-spotlight-surface-color-stops)]'
      : '',

    options?.hover?.radius ? 'hover:[--spotlight-radius:var(--hover-spotlight-radius)]' : '',
    options?.hover?.borderWidth
      ? 'hover:[--spotlight-border-width:var(--hover-spotlight-border-width)]'
      : '',
    options?.hover?.borderColorStops
      ? 'hover:[--spotlight-border-color-stops:var(--hover-spotlight-border-color-stops)]'
      : '',
    options?.hover?.surfaceColorStops
      ? 'hover:[--spotlight-surface-color-stops:var(--hover-spotlight-surface-color-stops)]'
      : '',

    // Spotlight applied as :after element with 2 background gradients.  padding-box for surface, and border-box for border
    'before:absolute',
    'before:inset-0',
    'before:z-[-1]',
    'before:[border:var(--spotlight-border-width)_solid_transparent]',
    'before:[background:fixed_padding-box_radial-gradient(var(--spotlight-radius)_at_var(--x,0px)_var(--y,0px),var(--spotlight-surface-color-stops)),fixed_border-box_radial-gradient(var(--spotlight-radius)_at_var(--x,0px)_var(--y,0px),var(--spotlight-border-color-stops))]'
  );

  return {
    destroy() {
      //
    },
  };
};
