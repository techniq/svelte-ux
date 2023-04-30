<script lang="ts">
	import { subDays, subMonths } from 'date-fns';

	import Preview from '$lib/components/Preview.svelte';

	import { autoFocus, autoHeight, blurOnEscape, selectOnFocus, debounceEvent } from '$lib/actions/input';
</script>

# Usage

```js
import { autoFocus, autoHeight, blurOnEscape, selectOnFocus, debounceEvent } from 'svelte-ux';
```

## autoFocus

### Auto focus node when rendered

<Preview>
  <input value="Example text" use:autoFocus class="border">
</Preview>

## selectOnFocus

### Selects the text inside a text node when the node is focused

<Preview>
  <input value="Example text" use:selectOnFocus class="border">
</Preview>

## blurOnEscape

### Blurs the node when Escape is pressed

<Preview>
  <input value="Example text" use:blurOnEscape class="border">
</Preview>

## autoHeight

### Automatically resize textarea based on content

<Preview>
  <textarea value="Example text" use:autoHeight class="border" />
</Preview>

## debounceEvent

### Debounce any event (input, change, etc)

<Preview>
  <input value="Example text" use:debounceEvent={{ type: 'input', listener: (e) => { console.log(e.target.value) }, timeout: 1000 }} class="border">
</Preview>
