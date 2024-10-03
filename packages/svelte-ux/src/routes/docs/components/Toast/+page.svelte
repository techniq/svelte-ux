<script lang="ts">
  import { Button } from 'svelte-ux';
  import { Toast } from 'svelte-ux';
  import { addToast } from '$lib/stores/toastStore.js';

  function addSimpleToast() {
    addToast('This is a simple toast');
  }

  function addLongerToast() {
    addToast({text: 'This is a longer Toast'}, 3000);
  }

  function addToastWithBtns() {
    addToast({
      text: 'This has actions inside',
      actions: [{
        children: 'Add Another Toast',
        onClick: addToastWithBtns,
        color: 'primary',
      }]
    }, 7000);
  }
</script>

<h1>Examples</h1>

<Toast />
<h2>Add Simple Toast</h2>
<Button variant="fill-outline" color="primary" on:click={addSimpleToast}>Click Me</Button>

<h2>Add Longer Toast</h2>
<Button variant="fill-outline" color="primary" on:click={addLongerToast}>Click Me</Button>

<h2>With Actions</h2>
<Button variant="fill-outline" color="primary" on:click={addToastWithBtns}>
  With Actions
</Button>
