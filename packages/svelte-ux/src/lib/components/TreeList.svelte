<script lang="ts">
  import type { TreeNode } from '@layerstack/utils/array';
  import { cls } from '@layerstack/tailwind';
  import { getComponentClasses } from './theme.js';

  export let nodes: TreeNode[];

  export let classes: {
    ul?: string | ((nodes: TreeNode[]) => string);
    li?: string | ((node: TreeNode) => string);
  } = {};
  const settingsClasses = getComponentClasses('TreeList');
</script>

<ul
  class={cls(
    'TreeList',
    typeof settingsClasses.ul === 'string' ? settingsClasses.ul : settingsClasses.ul?.(nodes),
    typeof classes.ul === 'string' ? classes.ul : classes.ul?.(nodes),
    $$props.class
  )}
>
  {#each nodes ?? [] as node}
    <li
      class={cls(
        typeof settingsClasses.li === 'string' ? settingsClasses.li : settingsClasses.li?.(node),
        typeof classes.li === 'string' ? classes.li : classes.li?.(node)
      )}
    >
      <slot {node} />
      {#if node.children}
        <svelte:self nodes={node.children} {classes} let:node>
          <slot {node} />
        </svelte:self>
      {/if}
    </li>
  {/each}
</ul>
