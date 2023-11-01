<script lang="ts">
  import { mdiMagnify } from '@mdi/js';

  import Button from '$lib/components/Button.svelte';
  import Dialog from '$lib/components/Dialog.svelte';
  import SelectList from '$lib/components/SelectList.svelte';
  import { getComponentTheme } from './theme';
  import { cls } from '$lib/utils/styles';
  import { smScreen } from '$lib/stores';

  export let options: { name: string; value: string; group?: string }[] = [];

  export let classes: {
    root?: string;
    button?: string;
  } = {};
  const theme = getComponentTheme('QuickSearch');

  let open = false;

  /*
    TODO:
     - [ ] Sticky search
     - [ ] Refine SelectList / reuse with SelectField (and maybe MultiSelect)
     - [ ] Improve size of Dialog (move class to Dialog without breaking overflow)
     - [ ] Load descriptions/meta from +page.ts
     - [ ] Improve dialog positioning on small viewports (consistent top/bottom with max height)
     - [ ] Improve look of search field
  */

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'k' && e.metaKey) {
      open = true;
    }
  }
</script>

<svelte:window on:keydown={onKeyDown} />

<Button
  icon={mdiMagnify}
  iconOnly={!$smScreen}
  on:click={() => (open = true)}
  class={cls(
    'sm:bg-black/10 sm:hover:bg-black/20 rounded-full sm:w-56 justify-start',
    theme.button,
    classes.button
  )}
>
  <span class="flex-1 text-left max-sm:hidden">Search</span>
  <kbd class="ml-2 font-sans text-white/50 max-sm:hidden">
    <abbr title="Command" class="no-underline">⌘</abbr>
    K
  </kbd>
</Button>

<Dialog
  bind:open
  classes={{
    root: cls('items-start mt-20', theme.root, classes.root, $$props.class),
    backdrop: 'backdrop-blur-sm bg-black/70',
  }}
>
  <div class="overflow-auto max-h-[min(90dvh,600px)] min-w-[400px] py-1">
    <SelectList
      icon={mdiMagnify}
      placeholder="Search..."
      {options}
      on:change
      on:change={(e) => (open = false)}
      classes={{
        field: {
          container: 'border-none hover:shadow-none group-focus-within:shadow-none',
        },
        group: 'capitalize',
        options: 'border-t mt-1 px-1',
      }}
    />
  </div>
</Dialog>
