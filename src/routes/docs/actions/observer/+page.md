<script lang="ts">
	import { subDays, subMonths } from 'date-fns';

	import Preview from '$lib/components/Preview.svelte';

	import { resize, intersection, mutate } from '$lib/actions/observer';
</script>

<h1>Usage</h1>

```js
import { resize, intersection, mutate } from 'svelte-ux';
```

<h2>resize</h2>

> TODO

<h2>intersection</h2>

```svelte
<div
  use:intersection
  on:intersecting={(e) => {
    if (e.detail.isIntersecting) {
      //
    }
  }}
/>
```

See also:

- InfiniteScroll
- Lazy

<h2>mutate</h2>

> TODO
