<script lang="ts">
  import * as easings from 'svelte/easing';

  import Button from '$lib/components/Button.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import TweenedValue from '$lib/components/TweenedValue.svelte';

  let value: number | null = 0;

  function update() {
    value = Math.random() * 10;
  }
</script>

<h1>Examples</h1>

<Button variant="fill" color="blue" on:click={update}>Update value</Button>
<Button on:click={() => (value = null)}>Set null</Button>

<h2>Basic</h2>

<Preview>
  <TweenedValue {value} />
</Preview>

<h2>Formatted</h2>

<Preview>
  <TweenedValue {value} format="currency" />
</Preview>

<h2>Options</h2>

<Preview>
  <TweenedValue {value} format="decimal" options={{ duration: 1000, easing: easings.expoOut }} />
</Preview>

<h2>Style</h2>

<Preview>
  <TweenedValue {value} let:value>
    <span style:color={value == null || value < 5 ? 'red' : 'green'}>{value}</span>
  </TweenedValue>
</Preview>

<h2>Disabled</h2>

<Preview>
  <TweenedValue {value} disabled />
</Preview>
