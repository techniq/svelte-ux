---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script>
  import api from '$lib/components/TweenedValue.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';
  import * as easings from 'svelte/easing'

  import AppBar from '$lib/components/AppBar.svelte';
  import Button from '$lib/components/Button.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import TweenedValue from '$lib/components/TweenedValue.svelte';
  import { format } from '$lib/utils/format';

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
  <TweenedValue {value} />
</Preview>

## Formatted

<Preview>
  <TweenedValue {value} format="currency" />
</Preview>

## Options

<Preview>
  <TweenedValue {value} format="decimal" options={{ duration: 1000, easing: easings.expoOut }} />
</Preview>

## Style

<Preview>
  <TweenedValue {value} let:value>
    <span style:color={value < 5 ? 'red' : 'green'}>{value}</span>
  </TweenedValue>
</Preview>

## Disabled

<Preview>
  <TweenedValue {value} disabled />
</Preview>

# API

<ApiDocs {api} />
