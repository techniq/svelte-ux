---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script lang="ts">
	import Preview from '$lib/components/Preview.svelte';

	import queryParamsStore from '$lib/stores/queryParamsStore';
</script>

## Usage

```js
import { queryParamsStore } from 'svelte-ux';
import { page } from '$app/stores';
import { goto } from '$app/navigation';

const filters = queryParamsStore(
  page,
  // default values
  {
    name: null,
    value: null,
    range: {
      from: startOfToday(),
      to: endOfToday(),
    },
  },
  // param types
  (key) => {
    switch (key) {
      case 'name':
        return 'string';
      case 'value':
        return 'number';
      case 'range':
        return 'object';
    }
  }
);

$: setFilters = (newFilters) => {
  const url = filters.createUrl(newFilters);
  goto(url, $page);
};
```

If goto is passed as last argument, store can be set directly

```js
import { queryParamsStore } from 'svelte-ux';
import { page } from '$app/stores';
import { goto } from '$app/navigation';

const filters = queryParamsStore(
  page,
  // default values
  {
    name: null,
    value: null,
    range: {
      from: startOfToday(),
      to: endOfToday(),
    },
  },
  // param types
  (key) => {
    switch (key) {
      case 'name':
        return 'string';
      case 'value':
        return 'number';
      case 'range':
        return 'object';
    }
  },
  goto // <--- IMPORTANT
);

$filters = newFilters;
```
