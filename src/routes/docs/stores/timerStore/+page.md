<script lang="ts">
	import { subDays, subMonths } from 'date-fns';

	import Preview from '$lib/components/Preview.svelte';
	import Switch from '$lib/components/Switch.svelte';

	import timerStore from '$lib/stores/timerStore';

  let ticks = 0;

  const dateTimer = timerStore()
  const tickTimer = timerStore({ onTick: () => ticks += 1 })
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
  <Switch checked={dateTimer.isRunning()} on:change={e => e.detail ? dateTimer.start() : dateTimer.stop() } />
</Preview>

<h2>Tick count</h2>

```svelte
<script>
  const tickTimer = timerStore({ onTick: () => (ticks += 1) });
</script>
```

<Preview>
  <div>{$tickTimer}</div>
  <Switch checked={tickTimer.isRunning()} on:change={e => e.detail ? tickTimer.start() : tickTimer.stop() } />
</Preview>
