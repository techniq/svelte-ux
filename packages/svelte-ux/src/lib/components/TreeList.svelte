<script lang="ts">
  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';

  type Node = { id: number; name: string; level: number; children: Node[] };

  export let nodes: Node[];

  export let classes: {
    ul?: string | ((nodes: Node[]) => string);
    li?: string | ((node: Node) => string);
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
