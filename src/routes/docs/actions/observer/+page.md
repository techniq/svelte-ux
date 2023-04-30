<script lang="ts">
	import { subDays, subMonths } from 'date-fns';

	import Preview from '$lib/components/Preview.svelte';

	import { resize, intersection, mutate } from '$lib/actions/observer';
</script>

# Usage

```js
import { resize, intersection, mutate } from 'svelte-ux';
```

## resize

> TODO

## intersection

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

## mutate

> TODO
