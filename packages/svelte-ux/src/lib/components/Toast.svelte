<script lang="ts">
  import toastStore from '$lib/stores/toastStore.js';
  import Notification from './Notification.svelte';
</script>

<div class="fixed bottom-0 left-1/2 translate-x-[-50%] z-50 gap-y-4">
  {#each $toastStore as toast}
  <div class="mt-4">
    <Notification open={true} closeIcon>
      <span slot="title">{toast.text}</span>
    </Notification>
  </div>
  {/each}
</div>
