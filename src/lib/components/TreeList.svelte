<script lang="ts">
  import { cls } from '$lib/utils/styles';
  import { getComponentTheme } from './theme';

  type Node = { id: number; name: string; level: number; children: Node[] };

  export let nodes: Node[];

  export let classes: {
    ul?: string | ((nodes: Node[]) => string);
    li?: string | ((node: Node) => string);
  } = {};
  const theme = getComponentTheme('TreeList');
</script>

<ul
  class={cls(
    'TreeList',
    typeof theme.ul === 'string' ? theme.ul : theme.ul?.(node),
    typeof classes.ul === 'string' ? classes.ul : classes.ul?.(node),
    $$props.class
  )}
>
  {#each nodes ?? [] as node}
    <li
      class={cls(
        typeof theme.li === 'string' ? theme.li : theme.li?.(node),
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
