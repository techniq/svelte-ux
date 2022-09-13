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
  import { formatNumberAsStyle } from '$lib/utils/number';

  let value = 0;

  function update() {
    value = Math.random() * 10;
  }
</script>

# Examples

<Button on:click={update}>Update value</Button>

## Basic

<Preview>
  <TweenedValue {value} />
</Preview>

## Formatted

<Preview>
  <TweenedValue {value} let:value>
    {formatNumberAsStyle(value, 'currency')}
  </TweenedValue>
</Preview>

## Options

<Preview>
  <TweenedValue {value} options={{ duration: 1000, easing: easings.expoOut }} let:value>
    {formatNumberAsStyle(value, 'decimal')}
  </TweenedValue>
</Preview>

# API

<ApiDocs {api} />
