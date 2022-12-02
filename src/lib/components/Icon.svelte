<script lang="ts">
  import clsx from 'clsx';

  export let size = '1.5em';
  export let width = size;
  export let height = size;
  export let viewBox = '0 0 24 24';
  export let path: string | string[] = '';

  export let data = undefined;

  export let classes: {
    root?: string;
    path?: string | string[];
  } = {};

  $: if (data?.icon) {
    // Font Awesome
    const [_width, _height, _ignore1, _ignore2, _path] = data.icon;
    viewBox = `0 0 ${_width} ${_height}`;
    path = _path;
    width = '1.0rem';
    height = '1.0rem';
  } else if (typeof data === 'string') {
    // Convenient accept path as data
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
