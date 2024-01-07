<script lang="ts">
  import * as easings from 'svelte/easing';

  import Button from '$lib/components/Button.svelte';
  import ButtonGroup from '$lib/components/ButtonGroup.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import TweenedValue from '$lib/components/TweenedValue.svelte';
  import { getSettings } from '$lib/components/settings';
  import { format } from '$lib/utils/format';
  import { cls } from '$lib/utils/styles';

  let value: number = 0;

  const settings = getSettings();

  function onKeyDown(e: KeyboardEvent) {
    const step = e.shiftKey ? 10 : e.altKey ? 100 : 1;
    switch (e.code) {
      case 'ArrowUp':
        value += step;
        e.preventDefault();
        break;
      case 'ArrowDown':
        value -= step;
        e.preventDefault();
        break;
    }
  }
</script>

<svelte:window on:keydown={onKeyDown} />

<h1>Examples</h1>

<div class="grid grid-cols-[1fr,auto,auto] gap-2">
  <ButtonGroup variant="fill" class="grid grid-flow-col ml-2">
    <Button on:click={() => (value -= 100)}>-100</Button>
    <Button on:click={() => (value -= 10)}>-10</Button>
    <Button on:click={() => (value -= 1)}>-1</Button>
    <Button on:click={() => (value = 0)}>0</Button>
    <Button on:click={() => (value += 1)}>+1</Button>
    <Button on:click={() => (value += 10)}>+10</Button>
    <Button on:click={() => (value += 100)}>+100</Button>
  </ButtonGroup>
  <Button variant="fill" on:click={() => (value = Math.random() * 10)}>Random</Button>
  <Button
    variant="fill"
    on:click={() =>
      // @ts-ignore
      (value = null)}>Null</Button
  >
</div>
<span class="text-xs ml-2 text-surface-content/50">
  also keyboard up/down with shift: +/- 10 option: +/- 100
</span>

<h2>Basic</h2>

<Preview>
  <TweenedValue {value} />
</Preview>

<h2>Formatted</h2>

<Preview>
  <TweenedValue {value} format="decimal" />
</Preview>

<h2>Options</h2>

<Preview>
  <TweenedValue {value} format="decimal" options={{ duration: 1000, easing: easings.expoOut }} />
</Preview>

<h2>Style</h2>

<Preview>
  <TweenedValue {value} let:value>
    <span class={cls('tabular-nums', (value ?? 0) < 0 ? 'text-red-500' : 'text-green-500')}>
      {format(value, 'decimal')}
    </span>
  </TweenedValue>
</Preview>

<h2>Disabled</h2>

<Preview>
  <TweenedValue {value} disabled />
</Preview>
