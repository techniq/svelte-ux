<script lang="ts">
  import Collapse from './Collapse.svelte';
  import { cls } from '../utils/styles';

  /**
   * Controls how first, last, and gap between are calculated
   *   - type: items are of the same type
   *   - parent: items share a common parent
   *   - group: closest element with 'group' class
   */
  export let list: 'type' | 'parent' | 'group' = 'parent';

  // TODO: Is it possible to hide if defined but no contents (contents within #if) and not require the extra `disabled` prop?
  // https://svelte.dev/repl/4ad13ff353154720b684b0d73e034e61?version=3.32.1
  // related issue: https://github.com/sveltejs/svelte/issues/5312
  export let disabled = false;
  $: enabled = $$slots.default && !disabled;
</script>

<Collapse
  {...$$restProps}
  classes={{
    root: cls(
      'bg-white elevation-1 border-t',
      'relative', // Match ListItem (used for loading) so Stacking Context is consistent (else causes a solid line between ExpansionPanel and ListItem)
      list === 'type' && 'first-of-type:border-t-0 first-of-type:rounded-t last-of-type:rounded-b',
      list === 'parent' && 'first:border-t-0 first:rounded-t last:rounded-b',
      list === 'group' && 'group-first:border-t-0 group-first:rounded-t group-last:rounded-b',
      $$props.class
    ),
    icon: cls('text-gray-500 px-2', !enabled && 'hidden'),
  }}
  popout
  {list}
  {disabled}
  on:change
>
  <slot name="trigger" slot="trigger" />
  <slot name="actions" />

  {#if enabled}
    <div class="px-3 pt-2 pb-3 bg-gray-200 border-t border-gray-300">
      <slot />
    </div>
  {/if}
</Collapse>
