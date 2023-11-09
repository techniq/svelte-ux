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

<h1>Param types</h1>
<h2>string</h2>
input

```js
const value = 'example';
```

output

```
?value=example
```

<h2>string[]</h2>
input

```js
const value = ['one', 'two', 'three'];
```

output

```
?value=one_two_three
```

<h2>number</h2>
input

```js
const value = 1234;
```

output

```
?value=1234
```

<h2>number[]</h2>
input

```js
const value = [1, 2, 3, 4];
```

output

```
?value=1_2_3_4
```

<h2>boolean</h2>
input

```js
const value = true;
```

output

```
?value=1
```

<h2>date</h2>
input

```js
const value = new Date('1982-03-30T00:00:00'); // keep in local time
```

output

```
?value=1982-03-30
```

<h2>datetime</h2>

input

```js
const value = new Date('1982-03-30T00:00:00-05:00');
```

output

```
?value=1982-03-30T05:00:00.000Z
```

<h2>json</h2>

input

```js
const value = {
  number: 1234,
  string: 'example',
  bool: true,
  date: new Date('1982-03-30T00:00:00-05:00'),
};
```

output

```
?value={"number":1234,"string":"example","bool":true,"date":"1982-03-30T05:00:00.000Z"}
```

<h2>object</h2>

input

```js
const value = {
  number: 1234,
  string: 'example',
  bool: true,
  date: new Date('1982-03-30T00:00:00-05:00'),
};
```

output

```
?value=number-1234_string-"example"_bool-true_date-"1982-03-30T05:00:00.000Z"
```
