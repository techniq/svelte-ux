<script lang="ts">
  import Preview from '$lib/components/Preview.svelte';
  import Blockquote from '$docs/Blockquote.svelte';
  import Code from '$lib/components/Code.svelte';

  import { popover } from '$lib/actions/popover.js';
</script>

<h1>Usage</h1>

<Code source={`import { popover } from 'svelte-ux';`} language="javascript" />
