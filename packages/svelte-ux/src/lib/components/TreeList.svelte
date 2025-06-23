<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { TreeNode } from '@layerstack/utils/array';
  import { cls } from '@layerstack/tailwind';

  import { getComponentClasses } from './theme.js';

  export let nodes: TreeNode[];

  export let props: {
    ul?:
      | HTMLAttributes<HTMLUListElement>
      | ((nodes: TreeNode[]) => HTMLAttributes<HTMLUListElement>);
    li?: HTMLAttributes<HTMLLIElement> | ((node: TreeNode) => HTMLAttributes<HTMLLIElement>);
  } = {};

  export let classes: {
    ul?: string | ((nodes: TreeNode[]) => string);
    li?: string | ((node: TreeNode) => string);
  } = {};
  const settingsClasses = getComponentClasses('TreeList');
</script>

<ul
  {...typeof props.ul === 'function' ? props.ul(nodes) : props.ul}
  class={cls(
    'TreeList',
    typeof settingsClasses.ul === 'string' ? settingsClasses.ul : settingsClasses.ul?.(nodes),
    typeof classes.ul === 'string' ? classes.ul : classes.ul?.(nodes),
    $$props.class
  )}
>
  {#each nodes ?? [] as node}
    <li
      data-level={node.level}
      class={cls(
        typeof settingsClasses.li === 'string' ? settingsClasses.li : settingsClasses.li?.(node),
        typeof classes.li === 'string' ? classes.li : classes.li?.(node)
      )}
      {...typeof props.li === 'function' ? props.li(node) : props.li}
    >
      <slot {node} />
      {#if node.children}
        <svelte:self nodes={node.children} {classes} {props} let:node>
          <slot {node} />
        </svelte:self>
      {/if}
    </li>
  {/each}
</ul>
