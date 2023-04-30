<script>
  import { onMount } from 'svelte';

  import { buildTree } from '../utils/array';
  import { cls } from '../utils/styles';
  import TreeList from './TreeList.svelte';

  let headings = [];

  onMount(() => {
    const headingItems = Array.from(
      document.querySelector('main').querySelectorAll('h1,h2,h3,h4,h5,h6')
    ).map((el) => ({ level: Number(el.tagName[1]), id: el.id, name: el.innerHTML }));
    headings = buildTree(headingItems);
  });
</script>

<TreeList
  nodes={headings}
  classes={{ li: (node) => cls('ml-4', node.level === 1 && 'mb-2') }}
  let:node
  {...$$restProps}
>
  <slot {node}>
    <a href="#{node.id}" class={cls(node.level === 1 ? 'font-semibold' : 'text-sm')}>
      {node.name}
    </a>
  </slot>
</TreeList>
