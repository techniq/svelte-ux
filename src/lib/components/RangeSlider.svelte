<script lang="ts">
  /*
    TODO:
      - [x] min/max range (not just 0 - 1)
      - [x] step
      - [ ] on:change event
      - [x] Show value while hovered/dragging
        - https://svelte.dev/repl/8af0c98cc61d4f7fbca233282b885eaa?version=3.44.3
      - [x] Tween changes
      - [ ] Clicking on track moves ranges
      - [x] Double click thumb to jump to min/max
      - [x] Keyboard input
        - left/right arrows move range
        - shift + left moves start, shift + right moves end
        - consider last item clicked gets events (both, start, end)...
      - [x] Ignore dy changes from pannable
      - [ ] Support single and double thumb (array)
        - single: clicking range/track jumps to value
        - double: clicking range/track jumps range
      - [ ] Circular variant
        - https://svelte.dev/repl/e5db52ead53643c381eb626c7ee0f5a8?version=3.44.3
      - [ ] Support Dates, and possible other non-numbers (but has valueOf?)
      - [x] Maintain step precision / fix float math
  */
  import { spring } from 'svelte/motion';
  import { scaleLinear } from 'd3-scale';
  import { pannable } from '$lib/actions/mouse';
  import { fly } from 'svelte/transition';
  import { decimalCount, round } from '$lib/utils/number';

  export let min = 0;
  export let max = 100;
  export let step = 1;
  export let value = [min, max];

  $: stepPercent = step / (max - min);
  $: stepDecimals = decimalCount(step);

  $: scale = scaleLinear().domain([min, max]).range([0, 1]).clamp(true);

  const start = spring(0);
  $: start.set(scale(value[0]));

  const end = spring(0);
  $: end.set(scale(value[1]));

  let isMoving = false;
  let lastMoved: 'start' | 'range' | 'end' = 'range';
  let showStartValue = false;
  let showEndValue = false;

  function onMoveStart(which: 'start' | 'range' | 'end') {
    return function (e: MouseEvent) {
      isMoving = true;
      switch (which) {
        case 'start':
          lastMoved = 'start';
          showStartValue = true;
          break;

        case 'range':
          lastMoved = 'range';
          showStartValue = true;
          showEndValue = true;
          break;

        case 'end':
          lastMoved = 'end';
          showEndValue = true;
          break;
      }
    };
  }

  function onMove(which: 'start' | 'range' | 'end') {
    return function (e: MouseEvent) {
      const parentEl = e.target.parentElement;
      const parentRect = parentEl.getBoundingClientRect();

      const deltaPercent = e.detail.dx / parentRect.width;
      const deltaValue = (max - min) * deltaPercent;

      applyMove(which, deltaValue);
    };
  }

  function applyMove(which: 'start' | 'range' | 'end', deltaValue: number) {
    const [currentStartValue, currentEndValue] = value;
    // Round to fix float math (ex. 0.1 + 0.2 or 0.3 - 0.1)
    const newStartValue = round(currentStartValue + deltaValue, stepDecimals);
    const newEndValue = round(currentEndValue + deltaValue, stepDecimals);

    switch (which) {
      case 'start':
        if (newStartValue >= min && newStartValue <= max) {
          value = [newStartValue, Math.max(currentEndValue, newStartValue)];
        } else {
          // Ignore
        }
        break;

      case 'range':
        if (newStartValue >= min && newEndValue <= max) {
          value = [newStartValue, newEndValue];
        } else {
          // Ignore
        }
        break;

      case 'end':
        if (newEndValue >= min && newEndValue <= max) {
          value = [Math.min(newEndValue, currentStartValue), newEndValue];
        } else {
          // Ignore
        }
        break;
    }
  }

  function onMoveEnd(which: 'start' | 'range' | 'end') {
    return function (e: MouseEvent) {
      isMoving = null;
      showStartValue = false;
      showEndValue = false;
    };
  }

  function onMouseEnter(which: 'start' | 'range' | 'end') {
    return function (e: MouseEvent) {
      if (isMoving == null) {
        switch (which) {
          case 'start':
            showStartValue = true;
            break;

          case 'range':
            showStartValue = true;
            showEndValue = true;
            break;

          case 'end':
            showEndValue = true;
            break;
        }
      }
    };
  }

  function onMouseLeave(which: 'start' | 'range' | 'end') {
    return function (e: MouseEvent) {
      if (isMoving == null) {
        showStartValue = false;
        showEndValue = false;
      }
    };
  }

  function onKeyDown(e: KeyboardEvent) {
    console.log(e);
    switch (e.key) {
      case 'ArrowLeft':
        applyMove(lastMoved, -step);
        break;
      case 'ArrowRight':
        applyMove(lastMoved, step);
        break;
    }
  }

  function onClick(e: MouseEvent) {
    // Focus for key input
    e.target.focus();
  }
</script>

<div
  class="range-slider relative h-2 bg-black/10 rounded-full select-none outline-none"
  style="--start: {$start}; --end: {$end};"
  tabindex="0"
  on:click={onClick}
  on:keydown={onKeyDown}
  {...$$restProps}
>
  <div
    use:pannable={{ axis: 'x', stepPercent }}
    on:panstart={onMoveStart('range')}
    on:panmove={onMove('range')}
    on:panend={onMoveEnd('range')}
    on:mouseenter={onMouseEnter('range')}
    on:mouseleave={onMouseLeave('range')}
    on:dblclick={() => (value = [min, max])}
    style="
      left:  calc(100 * var(--start)     * 1%);
      right: calc(100 * (1 - var(--end)) * 1%);
    "
    class="range absolute top-0 bottom-0 bg-accent-400 cursor-ew-resize active:bg-accent-500"
  />

  <div
    use:pannable={{ axis: 'x', stepPercent }}
    on:panstart={onMoveStart('start')}
    on:panmove={onMove('start')}
    on:panend={onMoveEnd('start')}
    on:mouseenter={onMouseEnter('start')}
    on:mouseleave={onMouseLeave('start')}
    on:dblclick={() => (value = [min, value[1]])}
    style="left: calc(100 * var(--start) * 1%);"
    class="thumb absolute top-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 border border-black/30 bg-white rounded-full outline-4 hover:outline hover:outline-accent-500/20 active:outline active:outline-accent-500/30"
  />

  <div
    use:pannable={{ axis: 'x', stepPercent }}
    on:panstart={onMoveStart('end')}
    on:panmove={onMove('end')}
    on:panend={onMoveEnd('end')}
    on:mouseenter={onMouseEnter('end')}
    on:mouseleave={onMouseLeave('end')}
    on:dblclick={() => (value = [value[0], max])}
    style="left: calc(100 * var(--end) * 1%);"
    class="thumb absolute top-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 border border-black/30 bg-white rounded-full outline-4 hover:outline hover:outline-accent-500/20 active:outline active:outline-accent-500/30"
  />

  {#if showStartValue}
    <output
      style="left: calc(100 * var(--start) * 1%);"
      class="value absolute top-1/2 -translate-x-1/2 -translate-y-[180%] text-xs text-white bg-accent-500 rounded-full px-2 shadow"
      transition:fly={{ y: 4, duration: 300 }}
    >
      {value[0]}
    </output>
  {/if}

  {#if showEndValue}
    <output
      style="left: calc(100 * var(--end) * 1%);"
      class="value absolute top-1/2 -translate-x-1/2 -translate-y-[180%] text-xs text-white bg-accent-500 rounded-full px-2 shadow"
      transition:fly={{ y: 4, duration: 300 }}
    >
      {value[1]}
    </output>
  {/if}
</div>
