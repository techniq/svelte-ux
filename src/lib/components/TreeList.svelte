<script lang="ts">
  import { cls } from '$lib/utils/styles';

  type Node = { name: string; level: number; id: number; children: Node[] };

  export let nodes: Node[];

  export let classes: {
    ul?: string | ((nodes: Node[]) => string);
    li?: string | ((node: Node) => string);
  } = {};
</script>

<ul class={cls(typeof classes.ul === 'string' ? classes.ul : classes.ul?.(node))}>
  {#each nodes as node}
    <li class={cls(typeof classes.li === 'string' ? classes.li : classes.li?.(node))}>
      <slot {node} />
      {#if node.children}
        <svelte:self nodes={node.children} {classes} let:node>
          <slot {node} />
        </svelte:self>
      {/if}
    </li>
  {/each}
</ul>
