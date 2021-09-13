<script lang="ts">
	import { mdiRefresh } from '@mdi/js';

	import AppBar from '$lib/components/AppBar.svelte';
	import Button from '$lib/components/Button.svelte';
	import Preview from '$lib/components/Preview.svelte';
</script>

## Usage

```js
import { AppBar } from 'svelte-ux';
```

## Default

<Preview>
	<AppBar />
</Preview>

## Title as string

<Preview>
	<AppBar title="Example" />
</Preview>

## Title as array

<Preview>
	<AppBar title={['One', 'Two', 'Three']} />
</Preview>

## Actions

<Preview>
	<AppBar title="Example">
		<div slot="actions">
			<Button icon={mdiRefresh} class="p-2 hover:bg-white/10" />
		</div>
	</AppBar>
</Preview>
