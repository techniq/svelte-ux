<script lang="ts">
  import { page } from '$app/stores';

  $: console.error($page.error);
</script>

<div class="p-4">
  <div class="grid gap-4">
    <span class="text-2xl font-bold">Error: {$page.status}</span>

    {#if $page.error}
      <div>
        <h2 class="text-lg font-bold mb-1">Message:</h2>
        <pre
          class="ml-2 p-4 border border-danger-300 rounded-md text-xs bg-danger-50 text-danger-content">{$page
            .error.message}</pre>
      </div>
    {/if}
  </div>
</div>
