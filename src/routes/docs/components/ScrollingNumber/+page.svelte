<script lang="ts">
  import api from '$lib/components/InfiniteScroll.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Preview from '$lib/components/Preview.svelte';
  import ScrollingNumber from '$lib/components/ScrollingNumber.svelte';
  import Button from '$lib/components/Button.svelte';
  import Field from '$lib/components/Field.svelte';
  import { mdiMinus, mdiPlus } from '@mdi/js';
  import ButtonGroup from '$lib/components/ButtonGroup.svelte';
  import { timerStore } from '$lib';

  let value = 0;
  let min = -10;
  let max = 10;

  const timer = timerStore({ initial: 60, onTick: (value) => value - 1, disabled: true });
  $: ({ isRunning } = timer);

  function onKeyDown(e: KeyboardEvent) {
    e.preventDefault();
    const step = e.shiftKey ? 10 : e.altKey ? 100 : 1;
    switch (e.code) {
      case 'ArrowUp':
        value += step;
        break;
      case 'ArrowDown':
        value -= step;
        break;
    }
  }
</script>

<svelte:window on:keydown={onKeyDown} />

<h1>Examples</h1>

<ButtonGroup variant="fill" class="grid grid-flow-col ml-2">
  <Button on:click={() => (value -= 100)}>-100</Button>
  <Button on:click={() => (value -= 10)}>-10</Button>
  <Button on:click={() => (value -= 1)}>-1</Button>
  <Button on:click={() => (value = 0)}>0</Button>
  <Button on:click={() => (value += 1)}>+1</Button>
  <Button on:click={() => (value += 10)}>+10</Button>
  <Button on:click={() => (value += 100)}>+100</Button>
</ButtonGroup>

<h2>Basic</h2>

<Preview>
  <ScrollingNumber bind:value />
</Preview>

<h2>Font-size</h2>
<span class="text-xs ml-2 text-black/50">
  Root container height must match value font-size / line-height
</span>

<Preview>
  <ScrollingNumber bind:value classes={{ root: 'h-16', value: 'text-6xl' }} />
</Preview>

<h2>Field</h2>
<h3>With label and appended actions</h3>

<Preview>
  <Field label="Value">
    <ScrollingNumber bind:value class="w-full" />
    <div slot="append" class="flex">
      <Button
        icon={mdiMinus}
        on:click={() => (value -= 1)}
        size="sm"
        disabled={min != null && value <= min}
      />
      <Button
        icon={mdiPlus}
        on:click={() => (value += 1)}
        size="sm"
        disabled={max != null && value >= max}
      />
    </div>
  </Field>
</Preview>

<h2>Field</h2>
<h3>Centered value</h3>

<Preview>
  <Field class="w-36">
    <div slot="prepend" class="flex">
      <Button
        icon={mdiMinus}
        on:click={() => (value -= 1)}
        size="sm"
        disabled={min != null && value <= min}
      />
    </div>
    <ScrollingNumber bind:value classes={{ root: 'w-full', value: 'w-full text-center' }} />
    <div slot="append" class="flex">
      <Button
        icon={mdiPlus}
        on:click={() => (value += 1)}
        size="sm"
        disabled={max != null && value >= max}
      />
    </div>
  </Field>
</Preview>

<h2>Countdown</h2>

<Preview>
  <ScrollingNumber value={$timer} classes={{ root: 'h-16', value: 'text-6xl' }} />
  <ButtonGroup variant="fill" _class="grid grid-flow-col gap-1 ml-2">
    <Button on:click={timer.start} disabled={$isRunning}>Start</Button>
    <Button on:click={timer.stop} disabled={!$isRunning}>Stop</Button>
  </ButtonGroup>
  <Button on:click={timer.reset}>Reset</Button>
</Preview>

<h2>Debug</h2>

<Preview>
  <ScrollingNumber
    bind:value
    classes={{ root: 'h-16', value: 'text-6xl first:bg-red-100 last:bg-green-100' }}
  />
  <div class="grid grid-flow-col">
    <Button on:click={() => (value -= 100)}>-100</Button>
    <Button on:click={() => (value -= 10)}>-10</Button>
    <Button on:click={() => (value -= 1)}>-1</Button>
    <Button on:click={() => (value = 0)}>0</Button>
    <Button on:click={() => (value += 1)}>+1</Button>
    <Button on:click={() => (value += 10)}>+10</Button>
    <Button on:click={() => (value += 100)}>+100</Button>
  </div>
</Preview>

<h1>API</h1>

<ApiDocs {api} />
