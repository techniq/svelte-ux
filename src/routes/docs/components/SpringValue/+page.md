---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script>
  import api from '$lib/components/SpringValue.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import AppBar from '$lib/components/AppBar.svelte';
  import Button from '$lib/components/Button.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import SpringValue from '$lib/components/SpringValue.svelte';
  import { formatNumberAsStyle } from '$lib/utils/number';

  let value = 0;

  function update() {
    value = Math.random() * 10;
  }
</script>

# Examples

<Button variant="filled" color="blue" on:click={update}>Update value</Button>
<Button on:click={() => value = null}>Set null</Button>

## Basic

<Preview>
  <SpringValue {value} />
</Preview>

## Formatted

<Preview>
  <SpringValue {value} format="currency" />
</Preview>

## Options

<Preview>
  <SpringValue {value} format="decimal" options={{ stiffness: 0.01, damping: 0.25 }} />
</Preview>

## Style

<Preview>
  <SpringValue {value} let:value>
    <span style:color={value < 5 ? 'red' : 'green'}>{value}</span>
  </SpringValue>
</Preview>

## Disabled

<Preview>
  <SpringValue {value} disabled />
</Preview>

# API

<ApiDocs {api} />
