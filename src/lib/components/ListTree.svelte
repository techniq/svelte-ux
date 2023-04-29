<script lang="ts">
  import { cls } from '$lib/utils/styles';

  type Items = { name: string; level: number; id: number; children: Items }[];

  export let items: Items;

  export let classes: {
    ul?: string;
    li?: string;
    /** Per-level styles (by array position) */
    levels?: {
      ul?: string;
      li?: string;
    }[];
  } = {};
</script>

<ul class={cls(classes.ul)}>
  {#each items as item}
    <li class={cls(classes.li, classes.levels?.[item.level - 1]?.li)}>
      <slot {item} />
      {#if item.children}
        <svelte:self items={item.children} {classes} let:item>
          <slot {item} />
        </svelte:self>
      {/if}
    </li>
  {/each}
</ul>
