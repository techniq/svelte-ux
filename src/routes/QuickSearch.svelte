<script lang="ts">
  import { mdiMagnify } from '@mdi/js';

  import { goto } from '$app/navigation';

  import Button from '$lib/components/Button.svelte';
  import Dialog from '$lib/components/Dialog.svelte';
  import SelectList from '$lib/components/SelectList.svelte';

  let open = false;

  /*
    TODO:
     - [ ] Sticky search
     - [ ] Refine SelectList / reuse with SelectField (and maybe MultiSelect)
     - [ ] Improve size of Dialog (move class to Dialog without breaking overflow)
     - [ ] Load descriptions/meta from +page.ts
     - [ ] Improve dialog positioning on small viewports (consistent top/bottom with max height)
  */

  const options = Object.entries(
    import.meta.glob('./docs/**/+page.md', { as: 'raw', eager: true })
  ).flatMap(([file, source]) => {
    const url = file.replace('.', '').replace('/+page.md', '');
    const [_, docs, group, name] = url.split('/');
    return {
      name,
      group: group,
      value: url,
    };
  });

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'k' && e.metaKey) {
      open = true;
    }
  }
</script>

<svelte:window on:keydown={onKeyDown} />

<Button
  icon={mdiMagnify}
  on:click={() => (open = true)}
  class="bg-black/10 hover:bg-black/20 rounded-full w-56 justify-start"
>
  <span class="flex-1 text-left">Search</span>
  <kbd class="ml-2 font-sans text-white/50">
    <abbr title="Command" class="no-underline">⌘</abbr>
    K
  </kbd>
</Button>
<Dialog bind:open classes={{ root: 'items-start mt-20' }}>
  <div class="overflow-auto max-h-[min(90vh,600px)] min-w-[400px] p-4">
    <SelectList
      icon={mdiMagnify}
      placeholder="Search..."
      {options}
      on:change={(e) => {
        goto(e.detail.value);
        open = false;
      }}
      classes={{ group: 'capitalize' }}
    />
  </div>
</Dialog>
