<script lang="ts">
	import Preview from '$lib/components/Preview.svelte';
</script>

<h1>Usage</h1>

```svelte
<script>
  import { Logger } from 'svelte-ux';
  const logger = new Logger('MyComponent');

  logger.trace('...');
  logger.debug('...');
  logger.info('...');
  logger.warn('...');
  logger.error('...');
</script>
```

to enable

```js
localStorage.logger = 'MyComponent';
localStorage.logger = 'MyComponent:INFO';
localStorage.logger = 'MyComponent,OtherComponent';
localStorage.logger = 'MyComponent:INFO,OtherComponent';
```
