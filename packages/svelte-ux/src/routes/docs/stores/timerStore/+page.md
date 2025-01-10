<script lang="ts">
	import { Switch, timerStore } from 'svelte-ux';
	import Preview from '$lib/components/Preview.svelte';

  const dateTimer = timerStore({ initial: new Date(), onTick: () => new Date() })
  let { isRunning: isDateRunning } = dateTimer;

  const tickTimer = timerStore({ initial: 0, onTick: (value) => value + 1 })
  let { isRunning: isTickRunning } = tickTimer;
</script>

<h1>Usage</h1>

```js
const timer = timerStore();
```

```ts
const timer = timerStore<T>({ initial?: T, onTick?: (value: T) => {...}, delay?: number, disabled?: boolean })
```

<h2>Example</h2>

```svelte
<script>
  const dateTimer = timerStore();
</script>
```

<Preview>
  <div>{$dateTimer}</div>
  <Switch checked={$isDateRunning} onchange={e => e.target?.checked ? dateTimer.start() : dateTimer.stop()} />
</Preview>

<h2>Tick count</h2>

```svelte
<script>
  const tickTimer = timerStore({ initial: 0, onTick: (value) => value + 1 });
</script>
```

<Preview>
  <div>{$tickTimer}</div>
  <Switch checked={$isTickRunning} onchange={e => e.target?.checked ? tickTimer.start() : tickTimer.stop()} />
</Preview>
