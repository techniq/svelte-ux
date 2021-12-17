<script lang="ts">
  /*
    TODO:
      - [x] min/max range (not just 0 - 1)
      - [x] step
      - [ ] on:change event
      - [ ] Show value while hovered/dragging
        - https://svelte.dev/repl/8af0c98cc61d4f7fbca233282b885eaa?version=3.44.3
      - [ ] Tween changes
      - [ ] Clicking on track moves ranges
      - [ ] Double click thumb to jump to min/max
      - [ ] Support single and double thumb (array)
        - single: clicking range/track jumps to value
        - double: clicking range/track jumps range
      - [ ] Keyboard input
        - left/right arrows move range
        - shift + left moves start, shift + right moves end
      - [x] Ignore dy changes from pannable
  */
  import { scaleLinear } from 'd3-scale';
  import { pannable } from '$lib/actions/mouse';

  export let min = 0;
  export let max = 100;
  export let step = 1;
  export let value = [min, max];

  $: stepPercent = step / (max - min);

  $: scale = scaleLinear().domain([min, max]).range([0, 1]).clamp(true);

  function onThumbMove(which) {
    return function (e) {
      const parentEl = e.target.parentElement;
      const parentRect = parentEl.getBoundingClientRect();

      const deltaPercent = e.detail.dx / parentRect.width;
      const deltaValue = (max - min) * deltaPercent;

      if (which === 'start') {
        const startValue = value[0] + deltaValue;
        if (startValue >= min && startValue <= max) {
          value = [startValue, Math.max(value[1], startValue)];
        } else {
          // Ignore
        }
      } else {
        const endValue = value[1] + deltaValue;
        if (endValue >= min && endValue <= max) {
          value = [Math.min(endValue, value[0]), endValue];
        } else {
          // Ignore
        }
      }
    };
  }

  function onRangeMove(e) {
    const parentEl = e.target.parentElement;
    const parentRect = parentEl.getBoundingClientRect();

    const deltaPercent = e.detail.dx / parentRect.width;
    const deltaValue = (max - min) * deltaPercent;

    if (value[0] + deltaValue >= min && value[1] + deltaValue <= max) {
      value = [value[0] + deltaValue, value[1] + deltaValue];
    } else {
      // Ignore
    }
  }
</script>

<div
  class="range-slider relative h-2 bg-black/10 rounded-full select-none"
  style="--start: {scale(value[0])}; --end: {scale(value[1])};"
>
  <div
    use:pannable={{ axis: 'x', stepPercent }}
    on:panmove={onRangeMove}
    style="
				left:  calc(100 * var(--start)     * 1%);
				right: calc(100 * (1 - var(--end)) * 1%);
			"
    class="range absolute top-0 bottom-0 bg-accent-400 cursor-ew-resize active:bg-accent-500"
  />

  <div
    use:pannable={{ axis: 'x', stepPercent }}
    on:panmove={onThumbMove('start')}
    style="left:  calc(100 * var(--start) * 1%);"
    class="thumb absolute top-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 border border-black/30 bg-white rounded-full outline-4 hover:outline hover:outline-accent-500/20 active:outline active:outline-accent-500/30"
  />

  <div
    use:pannable={{ axis: 'x', stepPercent }}
    on:panmove={onThumbMove('end')}
    style="left:  calc(100 * var(--end) * 1%);"
    class="thumb absolute top-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 border border-black/30 bg-white rounded-full outline-4 hover:outline hover:outline-accent-500/20 active:outline active:outline-accent-500/30"
  />
</div>
