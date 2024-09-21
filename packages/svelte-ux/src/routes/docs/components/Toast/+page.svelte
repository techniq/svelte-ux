<script lang="ts">
  import { Button } from 'svelte-ux';
  import { Toast } from 'svelte-ux';
  import { addToast } from '$lib/stores/toastStore.js';

  function addSimpleToast() {
    addToast('This is a simple toast!');
  }

  function addLongerToast() {
    addToast('This is a longer toast!', 10000);
  }
</script>

<h1>Examples</h1>

<Toast />
<h2>Add Simple Toast</h2>
<Button variant="fill-outline" color="primary" on:click={addSimpleToast}>Click Me</Button>

<h2>Add Longer Toast</h2>
<Button variant="fill-outline" color="primary" on:click={addLongerToast}>Click Me</Button>
