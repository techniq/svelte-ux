<script lang="ts">
  import { mdiMagnify } from '@mdi/js';
  import { autoFocus, selectOnFocus } from '@layerstack/svelte-actions';
  import { smScreen } from '@layerstack/svelte-stores';
  import { cls } from '@layerstack/tailwind';

  import Button from '../components/Button.svelte';
  import Dialog from '../components/Dialog.svelte';
  import Kbd from './Kbd.svelte';
  import SelectField from '../components/SelectField.svelte';
  import { getComponentClasses } from './theme.js';
  import type { MenuOption } from '../types/index.js';

  export let options: MenuOption<string>[] = [];

  export let classes: {
    root?: string;
    button?: string;
  } = {};
  const settingsClasses = getComponentClasses('QuickSearch');

  let open = false;

  let fieldActions = (node: any) => [autoFocus(node), selectOnFocus(node)];

  /*
    TODO:
     - [ ] Load descriptions/meta from +page.ts
  */

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      open = !open;
    } else if (open && e.key === 'Escape') {
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
    settingsClasses.button,
    classes.button
  )}
>
  <span class="flex-1 text-left max-sm:hidden">Search</span>
  <Kbd variant="none" class="opacity-50 max-sm:hidden" command>K</Kbd>
</Button>

<Dialog
  bind:open
  classes={{
    root: cls('items-start mt-8 sm:mt-24', settingsClasses.root, classes.root, $$props.class),
    backdrop: 'backdrop-blur-sm',
  }}
>
  <SelectField
    icon={mdiMagnify}
    placeholder="Search..."
    inlineOptions={true}
    {options}
    {fieldActions}
    on:change
    on:change={() => (open = false)}
    classes={{
      root: 'w-[420px] max-w-[95vw] py-1',
      field: {
        container: 'border-none hover:shadow-none group-focus-within:shadow-none',
      },
      options: 'overflow-auto max-h-[min(90dvh,380px)]',
      group: 'capitalize',
    }}
  />
</Dialog>
