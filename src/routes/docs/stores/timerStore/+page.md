<script lang="ts">
	import { subDays, subMonths } from 'date-fns';

	import Preview from '$lib/components/Preview.svelte';
	import Switch from '$lib/components/Switch.svelte';

	import timerStore from '$lib/stores/timerStore';

  const dateTimer = timerStore({ initial: new Date(), onTick: () => new Date() })
  $: ({ isRunning: isDateRunning } = dateTimer);

  const tickTimer = timerStore({ initial: 0, onTick: (value) => value + 1 })
  $: ({ isRunning: isTickRunning } = tickTimer);
</script>

<h1>Usage</h1>

```js
const timer = timerStore();
```

```js
const timer = timerStore({ delay: number, onTick: () => {...}, disabled: boolean })
```

<h2>Example</h2>

```svelte
<script>
  const dateTimer = timerStore();
</script>
```

<Preview>
  <div>{$dateTimer}</div>
  <Switch checked={$isDateRunning} on:change={e => e.target.checked ? dateTimer.start() : dateTimer.stop()} />
</Preview>

<h2>Tick count</h2>

```svelte
<script>
  const tickTimer = timerStore({ initial: 0, onTick: (value) => value + 1 });
</script>
```

<Preview>
  <div>{$tickTimer}</div>
  <Switch checked={$isTickRunning} on:change={e => e.target.checked ? tickTimer.start() : tickTimer.stop()} />
</Preview>
