<script>
  import { onDestroy, onMount } from 'svelte';

  import { buildTree } from '../utils/array';
  import { cls } from '../utils/styles';
  import TreeList from './TreeList.svelte';

  let activeHeadingId = '';
  let headings = [];
  let nodes = [];

  function onScroll(e) {
    activeHeadingId = headings?.find(
      (heading) => heading.element.offsetTop >= e.target.scrollTop + e.target.offsetTop
    )?.id;
  }

  onMount(() => {
    const mainEl = document.querySelector('main');

    headings = Array.from(mainEl.querySelectorAll('h1,h2,h3,h4,h5,h6'), (el) => ({
      id: el.id,
      name: el.innerHTML,
      level: Number(el.tagName[1]),
      element: el,
    }));
    nodes = buildTree(headings);

    mainEl.addEventListener('scroll', onScroll, { passive: true });
    // set first heading until scrolled
    activeHeadingId = headings[0]?.id;
  });

  onDestroy(() => {
    const mainEl = document.querySelector('main');
    mainEl.removeEventListener('scroll', onScroll);
  });
</script>

<TreeList
  {nodes}
  classes={{ li: (node) => cls(node.level === 1 ? 'mb-2' : 'ml-2') }}
  {...$$restProps}
  let:node
>
  <slot {node}>
    <a
      href="#{node.id}"
      class={cls(
        'block px-2',
        node.level === 1 ? 'font-semibold' : 'text-sm',
        node.id === activeHeadingId && 'bg-black/[0.08] rounded-lg'
      )}
    >
      {node.name}
    </a>
  </slot>
</TreeList>
