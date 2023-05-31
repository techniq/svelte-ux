<script lang="ts">
  import { spring, tweened } from 'svelte/motion';
  import { elasticOut, backInOut, bounceOut } from 'svelte/easing';
  import { cls } from '$lib/utils/styles';
  import { modulo } from '$lib/utils/number';

  export let value = 0;

  export let classes: {
    root?: string;
    value?: string;
  } = {};

  const displayValue = spring();
  // 	const displayValue = tweened(value, { duration: 1000, easing: bounceOut });
  $: $displayValue = value;
  $: offset = modulo($displayValue, 1);
</script>

<div class={cls('inline-grid overflow-hidden', classes.root, $$props.class)}>
  <div
    class={cls('col-span-full row-span-full', classes.value)}
    style:transform="translateY({-100 + 100 * offset}%)"
  >
    {Math.floor($displayValue + 1)}
  </div>
  <div
    class={cls('col-span-full row-span-full', classes.value)}
    style:transform="translateY({100 * offset}%)"
  >
    {Math.floor($displayValue)}
  </div>
</div>
