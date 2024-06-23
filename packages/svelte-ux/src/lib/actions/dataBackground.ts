import type { Action } from 'svelte/action';
import { tweened } from 'svelte/motion';
import { scaleLinear } from 'd3-scale';

export type DataBackgroundOptions = {
  value: number | null | undefined;
  domain?: [number, number];

  /**
   * Set color explicitly.  Can also use the following:
   *   - tailwind gradient classes (`from-blue-200 to-blue-400`)
   *   - Set CSS variables `--color-from` and `--color-to`
   */
  color?: string | ((value: number) => string);

  /**
   * Render as bar or fill (heatmap)
   */
  mode?: 'bar' | 'fill';

  /** Inset bar.  Pass as [x,y] to specify per axis */
  inset?: number | [number, number];

  enabled?: boolean;

  /**
   * Show baseline
   */
  baseline?: boolean;

  tweened?: Parameters<typeof tweened<number | null>>[1];
};

export const dataBackground: Action<HTMLElement, DataBackgroundOptions> = (node, options) => {
  // Set duration to 0 by default to be instantaneous
  const baseline = tweened(0, { duration: 0, ...options?.tweened });
  const barStart = tweened(0, { duration: 0, ...options?.tweened });
  const barEnd = tweened(0, { duration: 0, ...options?.tweened });

  function update(options: DataBackgroundOptions) {
    const { domain, color, mode = 'bar', inset, enabled } = options;

    const value = options.value ?? 0;

    if (enabled === false) {
      // remove styles
      node.style.backgroundImage = '';
      node.style.backgroundRepeat = '';
      node.style.backgroundSize = '';
    } else {
      // Map values from 0% to 100%
      const scale = scaleLinear()
        .domain(domain ?? [-100, 100])
        .range([0, 100]);

      baseline.set(scale(0));
      baseline.subscribe((value) => {
        node.style.setProperty('--baseline', `${value}%`);
      });

      barStart.set(scale(Math.min(0, value)));
      barStart.subscribe((value) => {
        node.style.setProperty('--barStart', `${value}%`);
      });

      barEnd.set(scale(Math.max(0, value)));
      barEnd.subscribe((value) => {
        node.style.setProperty('--barEnd', `${value}%`);
      });

      node.style.setProperty(
        '--color-from',
        (typeof color === 'function' ? color(value) : color) ?? 'var(--tw-gradient-from)'
      );
      node.style.setProperty(
        '--color-to',
        (typeof color === 'function' ? color(value) : color) ?? 'var(--tw-gradient-to)'
      );

      const insetX = Array.isArray(inset) ? inset[0] : inset;
      const insetY = Array.isArray(inset) ? inset[1] : inset;

      node.style.backgroundSize = `
			calc(100% - (${insetX}px * 2))
			calc(100% - (${insetY}px * 2))`;
      node.style.backgroundPosition = `${insetX}px ${insetY}px`;

      // Show black baseline at `0` first, then value bar
      // TODO: Handle baseline at `100%` (only negative numbers)
      node.style.backgroundImage =
        mode === 'bar'
          ? `${
              options.baseline
                ? `
          linear-gradient(
            to right,
            transparent var(--baseline),
            currentColor var(--baseline),
            currentColor calc(var(--baseline) + 1px),
            transparent 0%,
            transparent 100%
          ),
        `
                : ''
            }
          linear-gradient(
            to right,
            transparent var(--barStart),
            var(--color-from) var(--barStart),
            var(--color-to) var(--barEnd),
            transparent 0%,
            transparent 100%
          )
        `
          : `linear-gradient(
        to right,
        var(--color-from),
        var(--color-to)
      )`;

      // Add `no-repeat` to fix small gap on 100% and also support `background-origin` setting (inset)
      node.style.backgroundRepeat = 'no-repeat';
    }
  }

  if (options) {
    update(options);
  }

  return { update };
};
