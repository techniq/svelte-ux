<script lang="ts">
  import Preview from '$lib/components/Preview.svelte';
  import ScrollingValue from '$lib/components/ScrollingValue.svelte';
  import Button from '$lib/components/Button.svelte';
  import Field from '$lib/components/Field.svelte';
  import { mdiMinus, mdiPlus } from '@mdi/js';
  import ButtonGroup from '$lib/components/ButtonGroup.svelte';
  import { timerStore } from '$lib';

  let value = 0;

  const timer = timerStore({
    initial: 60,
    onTick: (value) => {
      if (value == null || value <= 0) {
        timer.stop();
        return value;
      } else {
        return value - 1;
      }
    },
    disabled: true,
  });
  $: ({ isRunning } = timer);

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

  const indexTimer = timerStore({
    initial: 0,
    delay: 2000,
    onTick: (value) => (value ?? 0) + 1,
  });
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
<span class="text-xs ml-2 text-black/50"
  >also keyboard up/down with shift: +/- 10 option: +/- 100
</span>

<h2>Basic</h2>

<Preview>
  <ScrollingValue bind:value />
</Preview>

<h2>Individual numbers</h2>

<Preview>
  {#each Math.abs(value).toString().split('') as num}
    <ScrollingValue value={Number(num)} single class="text-3xl tabular-nums" />
  {/each}
</Preview>

<h2>Formatted</h2>

<Preview>
  <span class="text-3xl">
    <span class="font-semibold">Svelte</span> is
    <ScrollingValue
      value={$indexTimer}
      format={(value) => {
        const options = ['compiled', 'compact', 'complete'];
        return options[Math.abs(value) % options.length];
      }}
      classes={{
        value:
          'font-bold text-transparent bg-clip-text bg-gradient-to-b from-green-200 via-cyan-400 to-blue-500',
      }}
    />
  </span>
</Preview>

<h2>Field</h2>
<h3>With label and appended actions</h3>

<Preview>
  <Field label="Value">
    <ScrollingValue bind:value class="w-full" />
    <div slot="append" class="flex">
      <Button icon={mdiMinus} on:click={() => (value -= 1)} size="sm" />
      <Button icon={mdiPlus} on:click={() => (value += 1)} size="sm" />
    </div>
  </Field>
</Preview>

<h2>Field</h2>
<h3>Centered value</h3>

<Preview>
  <Field class="w-36">
    <div slot="prepend" class="flex">
      <Button icon={mdiMinus} on:click={() => (value -= 1)} size="sm" />
    </div>
    <ScrollingValue bind:value classes={{ root: 'w-full', value: 'w-full text-center' }} />
    <div slot="append" class="flex">
      <Button icon={mdiPlus} on:click={() => (value += 1)} size="sm" />
    </div>
  </Field>
</Preview>

<h2>ButtonGroup</h2>

<Preview>
  <div class="flex gap-4">
    <ButtonGroup variant="outline">
      <Button icon={mdiMinus} on:click={() => (value -= 1)} size="sm" iconOnly={false} />
      <Button class="w-20 pointer-events-none">
        <ScrollingValue bind:value classes={{ root: 'w-full', value: 'w-full text-center' }} />
      </Button>
      <Button icon={mdiPlus} on:click={() => (value += 1)} size="sm" iconOnly={false} />
    </ButtonGroup>

    <ButtonGroup variant="fill">
      <Button icon={mdiMinus} on:click={() => (value -= 1)} size="sm" iconOnly={false} />
      <Button class="w-20 pointer-events-none">
        <ScrollingValue bind:value classes={{ root: 'w-full', value: 'w-full text-center' }} />
      </Button>
      <Button icon={mdiPlus} on:click={() => (value += 1)} size="sm" iconOnly={false} />
    </ButtonGroup>

    <ButtonGroup color="accent" variant="fill-light">
      <Button icon={mdiMinus} on:click={() => (value -= 1)} size="sm" iconOnly={false} />
      <Button class="w-20 pointer-events-none">
        <ScrollingValue bind:value classes={{ root: 'w-full', value: 'w-full text-center' }} />
      </Button>
      <Button icon={mdiPlus} on:click={() => (value += 1)} size="sm" iconOnly={false} />
    </ButtonGroup>

    <ButtonGroup color="accent" variant="fill-outline">
      <Button icon={mdiMinus} on:click={() => (value -= 1)} size="sm" iconOnly={false} />
      <Button class="w-20 pointer-events-none">
        <ScrollingValue bind:value classes={{ root: 'w-full', value: 'w-full text-center' }} />
      </Button>
      <Button icon={mdiPlus} on:click={() => (value += 1)} size="sm" iconOnly={false} />
    </ButtonGroup>
  </div>
</Preview>

<h2>Countdown</h2>

<Preview>
  <ScrollingValue value={$timer ?? 0} class="text-6xl tabular-nums" />
  <ButtonGroup variant="fill" class="ml-3">
    <Button on:click={timer.start} disabled={$isRunning}>Start</Button>
    <Button on:click={timer.stop} disabled={!$isRunning}>Stop</Button>
  </ButtonGroup>
  <Button on:click={timer.reset}>Reset</Button>
</Preview>

<h2>Debug</h2>

<Preview>
  <ScrollingValue
    bind:value
    classes={{ value: 'text-6xl first:bg-red-500/50 last:bg-green-500/50' }}
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
