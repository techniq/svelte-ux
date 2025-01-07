<script lang="ts">
  import type { ComponentProps, Snippet } from 'svelte';
  import Collapse from './Collapse.svelte';
  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';

  // TODO: Is it possible to hide if defined but no contents (contents within #if) and not require the extra `disabled` prop?
  // https://svelte.dev/repl/4ad13ff353154720b684b0d73e034e61?version=3.32.1

  interface Props {
    /**
     * Controls how first, last, and gap between are calculated
     *   - type: items are of the same type
     *   - parent: items share a common parent
     *   - group: closest element with 'group' class
     */
    list?: 'type' | 'parent' | 'group';
    // related issue: https://github.com/sveltejs/svelte/issues/5312
    disabled?: boolean;
    classes?: {
      root?: string;
      toggle?: string;
    };
    class?: string;
    trigger?: Snippet;
    actions?: Snippet;
    children?: Snippet;
  }

  let {
    list = 'parent',
    disabled = false,
    children,
    classes = {},
    class: className,
    trigger: triggerRender,
    actions,
    ...restProps
  }: Props & Omit<ComponentProps<typeof Collapse>, keyof Props> = $props();

  const settingsClasses = getComponentClasses('ExpansionPanel');
  let enabled = $derived(children && !disabled);
</script>

<Collapse
  {...restProps}
  classes={{
    root: cls(
      'ExpansionPanel',
      'bg-surface-100 elevation-1 border-t',
      'relative', // Match ListItem (used for loading) so Stacking Context is consistent (else causes a solid line between ExpansionPanel and ListItem)
      list === 'type' && 'first-of-type:border-t-0 first-of-type:rounded-t last-of-type:rounded-b',
      list === 'parent' && 'first:border-t-0 first:rounded-t last:rounded-b',
      list === 'group' && 'group-first:border-t-0 group-first:rounded-t group-last:rounded-b',
      settingsClasses.root,
      classes.root,
      className
    ),
    icon: cls('text-surface-content/30 px-2', !enabled && 'hidden'),
  }}
  popout
  {list}
  {disabled}
>
  {#snippet trigger()}
    {@render triggerRender?.()}
  {/snippet}
  {@render actions?.()}

  {#if enabled}
    <div class={cls('px-3 pt-2 pb-3', settingsClasses.toggle, classes.toggle)}>
      {@render children?.()}
    </div>
  {/if}
</Collapse>
