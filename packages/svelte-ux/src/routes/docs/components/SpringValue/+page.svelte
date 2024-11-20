<script lang="ts">
  import { Button, ButtonGroup, Kbd, SpringValue, getSettings } from 'svelte-ux';
  import { cls } from '@layerstack/tailwind';

  import Preview from '$lib/components/Preview.svelte';

  const { format } = getSettings();

  let value: number | null = 0;

  function onKeyDown(e: KeyboardEvent) {
    const step = e.shiftKey ? 10 : e.altKey ? 100 : 1;
    switch (e.code) {
      case 'ArrowUp':
        increment(step);
        e.preventDefault();
        break;
      case 'ArrowDown':
        increment(-step);
        e.preventDefault();
        break;
    }
  }

  function increment(newValue: number) {
    value = (value ?? 0) + newValue;
  }
</script>

<svelte:window on:keydown={onKeyDown} />

<h1>Examples</h1>

<div class="grid grid-cols-[1fr,auto,auto] gap-2">
  <ButtonGroup variant="fill-light" class="grid grid-flow-col ml-2">
    <Button on:click={() => increment(-100)}>-100</Button>
    <Button on:click={() => increment(-10)}>-10</Button>
    <Button on:click={() => increment(-1)}>-1</Button>
    <Button on:click={() => (value = 0)}>0</Button>
    <Button on:click={() => increment(1)}>+1</Button>
    <Button on:click={() => increment(10)}>+10</Button>
    <Button on:click={() => increment(100)}>+100</Button>
  </ButtonGroup>
  <Button variant="fill-light" on:click={() => (value = Math.random() * 10)}>Random</Button>
  <Button variant="fill-light" on:click={() => (value = null)}>Null</Button>
</div>
<div class="text-xs mt-1 ml-2 text-surface-content/50">
  Keyboard: <Kbd>↑</Kbd>
  <Kbd>↓</Kbd> +/- 1. With <Kbd shift>shift</Kbd> +/- 10. With <Kbd option>option</Kbd>: +/- 100
</div>

<h2>Basic</h2>

<Preview>
  <SpringValue {value} />
</Preview>

<h2>Formatted</h2>

<Preview>
  <SpringValue {value} format="decimal" />
</Preview>

<h2>Options</h2>

<Preview>
  <SpringValue {value} format="decimal" options={{ stiffness: 0.01, damping: 0.25 }} />
</Preview>

<h2>Style</h2>

<Preview>
  <SpringValue {value} let:value>
    <span class={cls('tabular-nums', (value ?? 0) < 0 ? 'text-danger' : 'text-success-500')}>
      {$format(value, 'decimal')}
    </span>
  </SpringValue>
</Preview>

<h2>Disabled</h2>

<Preview>
  <SpringValue {value} disabled />
</Preview>
