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

<div class={cls('relative overflow-hidden h-6', classes.root, $$props.class)}>
  <div class="h-full" style:transform="translateY({100 * offset}%)">
    <div class={cls('absolute -top-full h-full', classes.value)}>
      {Math.floor($displayValue + 1)}
    </div>
    <div class={cls('absolute h-full', classes.value)}>
      {Math.floor($displayValue)}
    </div>
  </div>
</div>
