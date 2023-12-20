<script lang="ts">
  import { mdiMagnify } from '@mdi/js';

  import Button from '$lib/components/Button.svelte';
  import Dialog from '$lib/components/Dialog.svelte';
  import SelectField from '$lib/components/SelectField.svelte';
  import { getComponentTheme } from './theme';
  import { cls } from '$lib/utils/styles';
  import { smScreen } from '$lib/stores';
  import { autoFocus, selectOnFocus } from '$lib/actions';
  import type { MenuOption } from '$lib/types/options';

  export let options: MenuOption[] = [];

  export let classes: {
    root?: string;
    button?: string;
  } = {};
  const theme = getComponentTheme('QuickSearch');

  let open = false;

  let fieldActions = (node: any) => [autoFocus(node), selectOnFocus(node)];

  /*
    TODO:
     - [ ] Sticky search
     - [ ] Improve size of Dialog (move class to Dialog without breaking overflow)
     - [ ] Load descriptions/meta from +page.ts
     - [ ] Improve dialog positioning on small viewports (consistent top/bottom with max height)
     - [ ] Improve look of search field
  */

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      open = !open;
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
  <kbd class="ml-2 font-sans opacity-50 max-sm:hidden">
    <abbr title="Command" class="no-underline">⌘</abbr>
    K
  </kbd>
</Button>

<Dialog
  bind:open
  classes={{
    root: cls('items-start mt-20', theme.root, classes.root, $$props.class),
    backdrop: 'backdrop-blur-sm',
  }}
>
  <div class="overflow-auto max-h-[min(90dvh,600px)] min-w-[400px] py-1">
    <SelectField
      icon={mdiMagnify}
      placeholder="Search..."
      inlineOptions={true}
      {options}
      {fieldActions}
      on:change
      on:change={() => (open = false)}
      classes={{
        field: {
          container: 'border-none hover:shadow-none group-focus-within:shadow-none',
        },
        group: 'capitalize',
      }}
    />
  </div>
</Dialog>
