<script lang="ts">
	import { subDays, subMonths } from 'date-fns';

	import Preview from '$lib/components/Preview.svelte';
	import Switch from '$lib/components/Switch.svelte';

	import timerStore from '$lib/stores/timerStore';

  let ticks = 0;

  const dateTimer = timerStore()
  const tickTimer = timerStore({ onTick: () => ticks += 1 })
</script>

## Usage

```svelte
const timer = timerStore()
```

```svelte
const timer = timerStore({ delay: 1000 })
$now
```

```svelte
const timer = timerStore({ delay: 1000, onTick: () => ({ now: new Date() }) })
$timer.now
```

## Example

<Preview>
  {$dateTimer}
  <Switch checked={dateTimer.isRunning()} on:change={e => e.detail ? dateTimer.start() : dateTimer.stop() } />
</Preview>

## Tick count

<Preview>
  {$tickTimer}
  <Switch checked={tickTimer.isRunning()} on:change={e => e.detail ? tickTimer.start() : tickTimer.stop() } />
</Preview>
