<script>
  import { onMount } from 'svelte';

  import { buildTree } from '../lib/utils/array';
  import { cls } from '../lib/utils/styles';
  import TreeList from '../lib/components/TreeList.svelte';

  let headings = [];

  onMount(() => {
    const headingItems = Array.from(
      document.querySelector('main').querySelectorAll('h1,h2,h3')
    ).map((el) => ({ level: Number(el.tagName[1]), id: el.id, name: el.innerHTML }));
    console.log({ headingItems });
    headings = buildTree(headingItems);
  });
</script>

<TreeList items={headings} classes={{ li: 'ml-4', levels: [{ li: 'mb-2' }] }} let:item>
  <a href="#{item.id}" class={cls(item.level === 1 ? 'font-semibold' : 'text-sm')}>
    {item.name}
  </a>
</TreeList>
