<script lang="ts">
  /*
    TODO:
      - [x] min/max range (not just 0 - 1)
      - [x] step
      - [ ] on:change event
      - [x] Show value while hovered/dragging
        - https://svelte.dev/repl/8af0c98cc61d4f7fbca233282b885eaa?version=3.44.3
      - [x] Tween changes
      - [x] Clicking on track moves ranges
      - [x] Double click thumb to jump to min/max
      - [x] Keyboard input
        - left/right arrows move range
        - shift + left moves start, shift + right moves end
        - consider last item clicked gets events (both, start, end)...
      - [x] Ignore dy changes from movable
      - [ ] Support single and double thumb (array)
        - single: clicking range/track jumps to value
        - double: clicking range/track jumps range
      - [ ] Circular variant
        - https://svelte.dev/repl/e5db52ead53643c381eb626c7ee0f5a8?version=3.44.3
      - [ ] Support Dates, and possible other non-numbers (but has valueOf?)
      - [x] Maintain step precision / fix float math
      - [x] Disabled state
      - [ ] Change range color / gradient
      - [ ] Show min/max scale (opt in as prop).  Show above, below, option?
  */
  import { spring } from 'svelte/motion';
  import { fly } from 'svelte/transition';
  import { scaleLinear } from 'd3-scale';
  import { mdiDragHorizontal } from '@mdi/js';

  import { movable } from '$lib/actions/mouse';
  import { decimalCount, round } from '$lib/utils/number';
  import Icon from './Icon.svelte';
  import { cls } from '../utils/styles';

  export let min = 0;
  export let max = 100;
  export let step = 1;
  export let value = [min, max];
  export let disabled = false;

  $: stepPercent = step / (max - min);
  $: stepDecimals = decimalCount(step);

  $: scale = scaleLinear().domain([min, max]).range([0, 1]).clamp(true);

  let isMoving = false;
  let lastMoved: 'start' | 'range' | 'end' = 'range';
  let showStartValue = false;
  let showEndValue = false;
  let ignoreClickEvents = false;

  const start = spring(0);
  $: start.set(scale(value[0]));

  const end = spring(0);
  $: end.set(scale(value[1]));

  function onMoveStart(which: 'start' | 'range' | 'end') {
    return function (e: MouseEvent) {
      ignoreClickEvents = true;

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
    // Round to fix float math (ex. `0.1 + 0.2` or `0.3 - 0.1`)
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
      // Ignore immediate click events after a drag (also fired on mouse up)
      setTimeout(() => {
        ignoreClickEvents = false;
      }, 100);

      isMoving = false;
      showStartValue = false;
      showEndValue = false;
    };
  }

  function onMouseEnter(which: 'start' | 'range' | 'end') {
    return function (e: MouseEvent) {
      if (isMoving === false) {
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
      if (isMoving === false) {
        showStartValue = false;
        showEndValue = false;
      }
    };
  }

  function onKeyDown(e: KeyboardEvent) {
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
    // Focus for keyboard input
    e.target.focus();

    if (ignoreClickEvents) {
      return;
    }

    let sliderRect: DOMRect;
    if (e.target.classList.contains('RangeSlider')) {
      // Root / track
      sliderRect = e.target.getBoundingClientRect();
    } else if (e.target.classList.contains('range')) {
      // Range selection
      sliderRect = e.target.parentElement.getBoundingClientRect();
    } else {
      // Ignore clicks on thumbs, etc
      return;
    }

    const dx = e.clientX - sliderRect.x;
    const deltaPercent = dx / sliderRect.width;
    const newValue = min + (max - min) * deltaPercent;

    // Move value closest to clicked point
    if (Math.abs(value[0] - newValue) < Math.abs(value[1] - newValue)) {
      value = [round(newValue, stepDecimals), value[1]];
      lastMoved = 'start';
    } else {
      value = [value[0], round(newValue, stepDecimals)];
      lastMoved = 'end';
    }
  }
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
  class={cls(
    'RangeSlider group relative h-2 bg-black/10 rounded-full select-none outline-none',
    disabled && ' pointer-events-none opacity-50'
  )}
  style="--start: {$start}; --end: {$end};"
  {disabled}
  tabindex={disabled ? -1 : 0}
  on:click={onClick}
  on:keydown={onKeyDown}
  {...$$restProps}
>
  <div
    on:mouseenter={onMouseEnter('range')}
    on:mouseleave={onMouseLeave('range')}
    style="
      left:  calc(var(--start) * 100%);
      right: calc((1 - var(--end)) * 100%);
    "
    class="range absolute top-0 bottom-0 bg-accent-400 active:bg-accent-500"
  />

  <div
    use:movable={{ axis: 'x', stepPercent }}
    on:movestart={onMoveStart('range')}
    on:move={onMove('range')}
    on:moveend={onMoveEnd('range')}
    on:mouseenter={onMouseEnter('range')}
    on:mouseleave={onMouseLeave('range')}
    on:dblclick={() => (value = [min, max])}
    style="left: calc((((var(--end) - var(--start)) / 2 ) + var(--start)) * 100%);"
    class={cls(
      'range-thumb',
      'absolute top-1/2 w-8 h-4 -translate-x-1/2 -translate-y-1/2',
      'rounded-full',
      'flex items-center justify-center',
      showStartValue || showEndValue ? 'opacity-100' : 'opacity-0',
      'transition-opacity'
    )}
  >
    <Icon path={mdiDragHorizontal} class="text-white" />
  </div>

  <div
    use:movable={{ axis: 'x', stepPercent }}
    on:movestart={onMoveStart('start')}
    on:move={onMove('start')}
    on:moveend={onMoveEnd('start')}
    on:mouseenter={onMouseEnter('start')}
    on:mouseleave={onMouseLeave('start')}
    on:dblclick={() => (value = [min, value[1]])}
    style="left: calc(var(--start) * 100%);"
    class={cls(
      'thumb',
      'absolute top-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2',
      'border border-black/30 bg-white rounded-full outline-4',
      'hover:outline hover:outline-accent-500/20',
      (lastMoved === 'start' || lastMoved === 'range') &&
        'group-focus:outline group-focus:outline-accent-500/40'
    )}
  />

  <div
    use:movable={{ axis: 'x', stepPercent }}
    on:movestart={onMoveStart('end')}
    on:move={onMove('end')}
    on:moveend={onMoveEnd('end')}
    on:mouseenter={onMouseEnter('end')}
    on:mouseleave={onMouseLeave('end')}
    on:dblclick={() => (value = [value[0], max])}
    style="left: calc(var(--end) * 100%);"
    class={cls(
      'thumb',
      'absolute top-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2',
      'border border-black/30 bg-white rounded-full outline-4',
      'outline-accent-500/20',
      'hover:outline hover:outline-accent-500/20',
      (lastMoved === 'end' || lastMoved === 'range') &&
        'group-focus:outline group-focus:outline-accent-500/40'
    )}
  />

  {#if showStartValue}
    <output
      style="left: calc(var(--start) * 100%);"
      class="value absolute top-1/2 -translate-x-1/2 -translate-y-[180%] text-xs text-white bg-accent-500 rounded-full px-2 shadow"
      transition:fly|local={{ y: 4, duration: 300 }}
    >
      {value[0]}
    </output>
  {/if}

  {#if showEndValue}
    <output
      style="left: calc(var(--end) * 100%);"
      class="value absolute top-1/2 -translate-x-1/2 -translate-y-[180%] text-xs text-white bg-accent-500 rounded-full px-2 shadow"
      transition:fly|local={{ y: 4, duration: 300 }}
    >
      {value[1]}
    </output>
  {/if}
</div>
