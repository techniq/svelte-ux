<script lang="ts">
	import api from '$lib/components/NumberStepper.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

	import NumberStepper from '$lib/components/NumberStepper.svelte';
	import Preview from '$lib/components/Preview.svelte';

  let value = 10;
</script>

# Examples

## basic

<Preview>
  <NumberStepper />
</Preview>

## bind:value

<Preview>
  <NumberStepper bind:value /> {value}
</Preview>

## on:change

<Preview>
  <NumberStepper on:change={e => console.log(e.detail.value)} />
</Preview>

## dense

<Preview>
  <NumberStepper dense />
</Preview>

# API

<ApiDocs {api} />
