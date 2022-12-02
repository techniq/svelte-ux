<script lang="ts">
  import clsx from 'clsx';
  import type { IconDefinition } from '@fortawesome/fontawesome-common-types';

  export let size = '1.5em';
  export let width = size;
  export let height = size;
  export let viewBox = '0 0 24 24';
  export let path: string | string[] = '';
  export let data: IconDefinition | string = undefined;

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
  on:click
>
  {#each Array.isArray(path) ? path : [path] as d, i}
    <path
      {d}
      fill="currentColor"
      class={Array.isArray(classes.path) ? classes.path[i] : classes.path}
    />
  {/each}
</svg>
