<script lang="ts">
	import { subDays, subMonths } from 'date-fns';

	import Preview from '$lib/components/Preview.svelte';
  import Blockquote from '$docs/Blockquote.svelte';

	import { resize, intersection, mutate } from '$lib/actions/observer';
</script>

<h1>Usage</h1>

```js
import { resize, intersection, mutate } from 'svelte-ux';
```

<h2>use:resize</h2>

<h3>Example</h3>

<Preview showCode>
  <div use:resize on:resize={e => {
    console.log(e.detail);
    e.target.innerText = JSON.stringify(e.detail.contentRect, null, 2)
  }} />
</Preview>

<h3>Full coordinates</h3>

<Preview showCode>
  <div use:resize on:resize={e => {
    e.target.innerText = JSON.stringify(e.target.getBoundingClientRect(), null, 2)
  }} />
</Preview>

<h3>Setting CSS variable</h3>

<Preview showCode>
  <div
    use:resize
    on:resize={e => {
      e.target.style.setProperty('--nodeWidth', e.detail.contentRect.width);
      e.target.style.setProperty('--nodeHeight', e.detail.contentRect.height);
      e.target.style.setProperty('--color', e.detail.contentRect.width % 255);
      //e.target.style.setProperty('--rotate', e.detail.contentRect.width % 5 + 'deg');
    }}
    class="text-white"
    style:background-color="rgb(var(--color), 0, 0)"
    style:transform="rotate(var(--rotate))"
  >
    Inspect element as well
  </div>
</Preview>

<h2>use:intersection</h2>

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

<h2>use:mutate</h2>

<Blockquote>TODO</Blockquote>
