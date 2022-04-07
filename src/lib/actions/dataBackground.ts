import { scaleLinear } from 'd3-scale';

type DataBackgroundOptions = {
  value: number;
  domain: [number, number];
  /**
   * Set color explicitly.  Can also use the following:
   *   - tailwind gradient classes (`from-blue-200 to-blue-400`)
   *   - Set CSS variables `--color-from` and `--color-to`
   */
  color?: string;
  bar?: boolean;
  inset?: number;
  enabled?: boolean;
};

export function dataBackground(
  node: HTMLElement,
  options: DataBackgroundOptions
): SvelteActionReturnType {
  function update(options) {
    if (options.enabled === false) {
      // remove styles
      node.style.backgroundImage = '';
      node.style.backgroundRepeat = '';
      node.style.backgroundSize = '';
    } else {
      const scale = scaleLinear()
        .domain(options.domain ?? [-100, 100])
        .range([0, 100]);

      const baseline = scale(0);
      const barStart = scale(Math.min(0, options.value));
      const barEnd = scale(Math.max(0, options.value));

      node.style.setProperty('--baseline', `${baseline}%`);
      node.style.setProperty('--barStart', `${barStart}%`);
      node.style.setProperty('--barEnd', `${barEnd}%`);

      node.style.setProperty('--color-from', options.color ?? 'var(--tw-gradient-from)');
      node.style.setProperty('--color-to', options.color ?? 'var(--tw-gradient-to)');

      node.style.backgroundSize = `
			calc(100% - (${options.inset}px * 2))
			calc(100% - (${options.inset}px * 2))`;
      node.style.backgroundPosition = `${options.inset}px ${options.inset}px`;

      // Show black baseline at `0` first, then value bar
      // TODO: Handle baseline at `100%` (only negative numbers)
      node.style.backgroundImage = options.bar
        ? `
          linear-gradient(
            to right,
            transparent var(--baseline),
            #999 var(--baseline),
            #999 calc(var(--baseline) + 1px),
            transparent 0%,
            transparent 100%
          ),
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
