import { scaleLinear } from 'd3-scale';
import { tweened } from 'svelte/motion';

export type DataBackgroundOptions = {
  value: number;
  domain: [number, number];

  /**
   * Set color explicitly.  Can also use the following:
   *   - tailwind gradient classes (`from-blue-200 to-blue-400`)
   *   - Set CSS variables `--color-from` and `--color-to`
   */
  color?: string;

  /**
   * Render as bar.  Default to fill (heatmap)
   */
  bar?: boolean;

  /** Inset bar.  Pass as [x,y] to specify per axis */
  inset?: number | [number, number];

  enabled?: boolean;

  /**
   * Show baseline
   */
  baseline?: boolean;

  tweened?: Parameters<typeof tweened>[1];
};

export function dataBackground(
  node: HTMLElement,
  options: DataBackgroundOptions
): SvelteActionReturnType {
  // Set duration to 0 by default to be instantaneous
  const baseline = tweened(0, { duration: 0, ...options.tweened });
  const barStart = tweened(0, { duration: 0, ...options.tweened });
  const barEnd = tweened(0, { duration: 0, ...options.tweened });

  function update(options) {
    if (options.enabled === false) {
      // remove styles
      node.style.backgroundImage = '';
      node.style.backgroundRepeat = '';
      node.style.backgroundSize = '';
    } else {
      // Map values from 0% to 100%
      const scale = scaleLinear()
        .domain(options.domain ?? [-100, 100])
        .range([0, 100]);

      baseline.set(scale(0));
      baseline.subscribe((value) => {
        node.style.setProperty('--baseline', `${value}%`);
      });

      barStart.set(scale(Math.min(0, options.value)));
      barStart.subscribe((value) => {
        node.style.setProperty('--barStart', `${value}%`);
      });

      barEnd.set(scale(Math.max(0, options.value)));
      barEnd.subscribe((value) => {
        node.style.setProperty('--barEnd', `${value}%`);
      });

      node.style.setProperty('--color-from', options.color ?? 'var(--tw-gradient-from)');
      node.style.setProperty('--color-to', options.color ?? 'var(--tw-gradient-to)');

      const insetX = Array.isArray(options.inset) ? options.inset[0] : options.inset;
      const insetY = Array.isArray(options.inset) ? options.inset[1] : options.inset;

      node.style.backgroundSize = `
			calc(100% - (${insetX}px * 2))
			calc(100% - (${insetY}px * 2))`;
      node.style.backgroundPosition = `${insetX}px ${insetY}px`;

      // Show black baseline at `0` first, then value bar
      // TODO: Handle baseline at `100%` (only negative numbers)
      node.style.backgroundImage = options.bar
        ? `${
            options.baseline
              ? `
          linear-gradient(
            to right,
            transparent var(--baseline),
            #999 var(--baseline),
            #999 calc(var(--baseline) + 1px),
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

  update(options);

  return { update };
}
