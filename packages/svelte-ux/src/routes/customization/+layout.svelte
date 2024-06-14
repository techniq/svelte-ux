<script lang="ts">
  import { TableOfContents } from 'svelte-ux';
</script>

<div class="grid grid-cols-[1fr,auto] gap-6 pt-2 pb-4">
  <div class="bg-surface-100 p-4 m-2 rounded shadow-lg border overflow-auto">
    <div class="prose max-w-none">
      <slot />
    </div>
  </div>

  <div class="hidden lg:block w-[224px]">
    <div class="sticky top-0 pr-2 max-h-[calc(100vh-64px)] overflow-auto">
      <div class="text-xs uppercase leading-8 tracking-widest text-surface-content/50">
        On this page
      </div>
      <TableOfContents />
    </div>
  </div>
</div>
