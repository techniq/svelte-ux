<script lang="ts">
	import api from '$lib/components/NumberStepper.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

	import NumberStepper from '$lib/components/NumberStepper.svelte';
	import Preview from '$lib/components/Preview.svelte';

  let value = 10;
</script>

<h1>Examples</h1>

<h2>basic</h2>

<Preview>
  <NumberStepper />
</Preview>

<h2>bind:value</h2>

<Preview>
  <NumberStepper bind:value /> {value}
</Preview>

<h2>on:change</h2>

<Preview>
  <NumberStepper on:change={e => console.log(e.detail.value)} />
</Preview>

<h2>dense</h2>

<Preview>
  <NumberStepper dense />
</Preview>

<h1>API</h1>

<ApiDocs {api} />
