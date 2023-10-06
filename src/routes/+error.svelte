<script lang="ts">
  import { page } from '$app/stores';

  $: console.error($page.error);
</script>

<div class="p-4">
  <div class="grid gap-4">
    <span class="text-2xl font-bold">Error: {$page.status}</span>

    <div>
      <h2 class="text-lg font-bold mb-1">Message:</h2>
      <pre class="ml-2 p-4 border rounded-md text-xs bg-black/80 text-white">{$page.error
          .message}</pre>
    </div>

    {#if $page.error.frame}
      <div>
        <h2 class="text-lg font-bold mb-1">Frame:</h2>
        <pre class="ml-2 p-4 border rounded-md text-xs bg-black/80 text-white">{$page.error
            .frame}</pre>
      </div>
    {/if}

    {#if $page.error.stack}
      <div>
        <h2 class="text-lg font-bold mb-1">Stack:</h2>
        <pre class="ml-2 p-4 border rounded-md text-xs bg-black/80 text-white">{$page.error
            .stack}</pre>
      </div>
    {/if}
  </div>
</div>
