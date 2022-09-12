---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script lang="ts">
  import { sort } from 'd3-array';

	import Button from '$lib/components/Button.svelte';
	import Preview from '$lib/components/Preview.svelte';

	import { dataBackground } from '$lib/actions/dataBackground';
	import { randomInteger } from '$lib/utils/number';
	
	let originalDomain = [-100, 100]
	
	function getValues() {
		return Array.from({ length: 20 }).map(() => randomInteger(originalDomain[0], originalDomain[1]));
	}
	
	let values = getValues();
	let domainSelected = 'original' // 'derived'
	let sorted = false;
	let inset = [0, 0];
	
	// Use original domain (ex. -100 => 100) or derive based on data
	$: domain = domainSelected === 'original'
		? originalDomain
		: [Math.min(...values), Math.max(...values)]
</script>

<Button on:click={() => values = getValues()}>Update data</Button>

<h2>Domain</h2>
<label>
	<input type="radio" bind:group={domainSelected} value="original" />
	Original
</label>

<label>
	<input type="radio" bind:group={domainSelected} value="derived" />
	Derived
</label>

<h2>Options</h2>

<label>
	<input type="checkbox" bind:checked={sorted} />
	Sorted
</label>

<div>
  <label>
    Inset X: <input type="number" bind:value={inset[0]} min={0} max={10} style="width: 100px" />
  </label>
  <label>
    Inset Y: <input type="number" bind:value={inset[1]} min={0} max={10} style="width: 100px" />
  </label>
</div>

<div>
	Min: <input type="number" bind:value={originalDomain[0]} style="width: 100px" />
	Max: <input type="number" bind:value={originalDomain[1]} style="width: 100px" />
</div>

## dataBackground

<Preview>
  <table class="w-40 border">
    {#each (sorted ? sort(values) : values) as value}
      <tr>
        <td class="text-right" use:dataBackground={{ value, color: value > 0 ? 'hsl(140 100% 80%)' : 'hsl(0 100% 80%)', domain, bar: true, inset }}>{value}%</td>
      </tr>
    {/each}
  </table>
</Preview>
