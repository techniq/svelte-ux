<script lang="ts">
  import TreeList from './TreeList.svelte';
  import type { TreeNode } from '../utils/array.js';
  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';
  import type { Snippet } from 'svelte';

  interface Props {
    nodes: TreeNode[];
    classes?: {
      ul?: string | ((nodes: TreeNode[]) => string);
      li?: string | ((node: TreeNode) => string);
    };
    class?: string;
    children?: Snippet<[{ node: TreeNode }]>;
  }

  let { nodes, classes = {}, class: className, children: childrenRender }: Props = $props();
  const settingsClasses = getComponentClasses('TreeList');
</script>

<ul
  class={cls(
    'TreeList',
    typeof settingsClasses.ul === 'string' ? settingsClasses.ul : settingsClasses.ul?.(nodes),
    typeof classes.ul === 'string' ? classes.ul : classes.ul?.(nodes),
    className
  )}
>
  {#each nodes ?? [] as node}
    <li
      class={cls(
        typeof settingsClasses.li === 'string' ? settingsClasses.li : settingsClasses.li?.(node),
        typeof classes.li === 'string' ? classes.li : classes.li?.(node)
      )}
    >
      {@render childrenRender?.({ node })}
      {#if node.children}
        <TreeList nodes={node.children} {classes}>
          {#snippet children({ node })}
            {@render childrenRender?.({ node })}
          {/snippet}
        </TreeList>
      {/if}
    </li>
  {/each}
</ul>
