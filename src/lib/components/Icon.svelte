<script lang="ts">
  import clsx from 'clsx';

  export let size = '1.5em';
  export let width = size;
  export let height = size;
  export let viewBox = '0 0 24 24';
  export let path = '';
</script>

<svg
  {width}
  {height}
  {viewBox}
  class={clsx('inline-block flex-shrink-0', $$props.class)}
  style={$$props.style}
  on:click
>
  <path d={path} fill="currentColor" />
</svg>
