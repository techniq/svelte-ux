<script lang="ts">
	import Preview from '$lib/components/Preview.svelte';

	import { queryParamsStore } from '$lib/stores/queryParamsStore';
</script>

<h1>queryParamStore()</h1>

Manage a single query param

```js
import { queryParamStore } from 'svelte-ux';
import { page } from '$app/stores';
import { goto } from '$app/navigation';

const dateRange = queryParamStore({
  name: 'range',
  default: {
    from: startOfToday(),
    to: endOfToday(),
  },
  paramType: 'object',
  page,
});

$: setDataRange = (value) => {
  const params = new URLSearchParams(location.search);
  dateRange.apply(params, value);
  const url = `${location.pathname}?${params.toString()}`;
  goto(url, $page);
};
```

If `goto` is passed, store can be set directly

```js
import { queryParamsStore } from 'svelte-ux';
import { page } from '$app/stores';
import { goto } from '$app/navigation';

const filters = queryParamStore({
  name: 'range',
  default: {
    from: startOfToday(),
    to: endOfToday(),
  },
  paramType: 'object',
  page,
  goto, // <--- IMPORTANT
});

$dataRange = newValue;
```

<h1>queryParamsStore()</h1>

Manage all query params as a single store

```js
import { queryParamsStore } from 'svelte-ux';
import { page } from '$app/stores';
import { goto } from '$app/navigation';

const filters = queryParamsStore({
  defaults: {
    name: null,
    value: null,
    range: {
      from: startOfToday(),
      to: endOfToday(),
    },
  },
  paramTypes: (key) => {
    switch (key) {
      case 'name':
        return 'string';
      case 'value':
        return 'number';
      case 'range':
        return 'object';
    }
  },
  page,
});

$: setFilters = (newFilters) => {
  const url = filters.createUrl(newFilters);
  goto(url, $page);
};
```

If `goto` is passed, store can be set directly

```js
import { queryParamsStore } from 'svelte-ux';
import { page } from '$app/stores';
import { goto } from '$app/navigation';

const filters = queryParamsStore({
  defaults: {
    name: null,
    value: null,
    range: {
      from: startOfToday(),
      to: endOfToday(),
    },
  },
  paramTypes: (key) => {
    switch (key) {
      case 'name':
        return 'string';
      case 'value':
        return 'number';
      case 'range':
        return 'object';
    }
  },
  page,
  goto, // <--- IMPORTANT
});

$filters = newFilters;
```
