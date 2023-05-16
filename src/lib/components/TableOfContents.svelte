<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { mdiCircleSmall } from '@mdi/js';

  import { buildTree } from '../utils/array';
  import { cls } from '../utils/styles';
  import TreeList from './TreeList.svelte';
  import Icon from './Icon.svelte';

  export let element = 'main';

  let activeHeadingId = '';
  let headings = [];
  let nodes = [];

  function onScroll(e) {
    activeHeadingId = headings?.find(
      (heading) => heading.element.offsetTop >= e.target.scrollTop + e.target.offsetTop
    )?.id;
  }

  onMount(() => {
    const el = document.querySelector(element);

    headings = Array.from(el?.querySelectorAll('h1,h2,h3,h4,h5,h6') ?? [], (el) => {
      if (!el.hasAttribute('id')) {
        el.setAttribute('id', el.innerHTML.toLowerCase().replaceAll(' ', '-'));
      }

      return {
        id: el.id,
        name: el.innerHTML,
        level: Number(el.tagName[1]),
        element: el,
      };
    });
    nodes = buildTree(headings);

    el?.addEventListener('scroll', onScroll, { passive: true });
    // set first heading until scrolled
    activeHeadingId = headings[0]?.id;
  });

  onDestroy(() => {
    const el = document.querySelector(element);
    el?.removeEventListener('scroll', onScroll);
  });
</script>

<TreeList
  {nodes}
  classes={{ li: (node) => cls(node.level === 1 ? 'mb-2' : node.level > 2 ? 'ml-3' : '') }}
  {...$$restProps}
  let:node
>
  <slot {node} {activeHeadingId}>
    <a
      href="#{node.id}"
      class={cls(
        'flex gap-1 px-2 rounded-lg hover:bg-black/5 ',
        node.level === 1 ? 'font-semibold' : 'text-sm',
        node.id && node.id === activeHeadingId && 'bg-black/5'
      )}
    >
      {#if node.level > 1}
        <Icon path={mdiCircleSmall} class="-mx-1 text-black/30" />
      {/if}
      {@html node.name}
    </a>
  </slot>
</TreeList>
