<script lang="ts">
  import type { IconDefinition } from '@fortawesome/fontawesome-common-types';

  import { uniqueId } from '../utils/string';
  import { cls } from '../utils/styles';

  export let size: string | number = '1.5em';
  export let width = size;
  export let height = size;
  export let viewBox = '0 0 24 24';
  export let path: string | string[] = '';
  export let data: IconDefinition | string = undefined;

  // Accessibility
  export let title: string | undefined = undefined;
  export let desc: string | undefined = undefined;
  export let titleId: string | undefined = title ? uniqueId('svg') : '';
  export let descId: string | undefined = desc ? uniqueId('svg') : '';
  $: isLabelled = title || desc;

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
  class={cls('inline-block flex-shrink-0', classes.root, $$props.class)}
  style={$$props.style}
  role={isLabelled ? 'img' : 'presentation'}
  aria-labelledby={isLabelled ? `${titleId} ${descId}` : undefined}
  on:click
>
  {#if title}
    <title id={titleId}>{title}</title>
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
