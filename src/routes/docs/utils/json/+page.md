<script lang="ts">
	import Preview from '$lib/components/Preview.svelte';
	import Code from '$lib/components/Code.svelte';

  import testSource from '$lib/utils/json.test.ts?raw'
</script>

<h1>Usage</h1>

```svelte
<script>
  import { parse, stringify } from 'svelte-ux';
</script>
```

<h2>Tests</h2>

<Code source={testSource} language='js' />
