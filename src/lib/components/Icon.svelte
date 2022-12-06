<script lang="ts">
  import clsx from 'clsx';
  import type { IconDefinition } from '@fortawesome/fontawesome-common-types';
  import { uniqueId } from '$lib/utils/string';

  export let size: string | number = '1.5em';
  export let width = size;
  export let height = size;
  export let viewBox = '0 0 24 24';
  export let path: string | string[] = '';
  export let data: IconDefinition | string = undefined;

  // Accessibility
  export let label: string | undefined = undefined;
  export let desc: string | undefined = undefined;
  export let titleId: string | undefined = label ? uniqueId('svg') : '';
  export let descId: string | undefined = desc ? uniqueId('svg') : '';
  $: isLabelled = label || desc;

  export let classes: {
    root?: string;
    path?: string | string[];
  } = {};

  $: if (typeof data === 'object' && 'icon' in data) {
    // Font Awesome
    const [_width, _height, _ligatures, _unicode, _path] = data.icon;
    viewBox = `0 0 ${_width} ${_height}`;
    path = _path;
    width = '1.0rem';
    height = '1.0rem';
  } else if (typeof data === 'string') {
    // Also conveniently accept path as data
    path = data;
  }
</script>

<svg
  {width}
  {height}
  {viewBox}
  class={clsx('inline-block flex-shrink-0', classes.root, $$props.class)}
  style={$$props.style}
  role={isLabelled ? 'img' : 'presentation'}
  aria-labelledby={isLabelled ? `${titleId} ${descId}` : undefined}
  on:click
>
  {#if label}
    <title id={titleId}>{label}</title>
  {/if}
  {#if desc}
    <desc id={descId}>{desc}</desc>
  {/if}

  {#each Array.isArray(path) ? path : [path] as d, i}
    <path
      {d}
      fill="currentColor"
      class={Array.isArray(classes.path) ? classes.path[i] : classes.path}
    />
  {/each}
</svg>
