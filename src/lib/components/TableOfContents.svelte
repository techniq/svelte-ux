<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { mdiCircleSmall } from '@mdi/js';

  import { buildTree } from '../utils/array';
  import { cls } from '../utils/styles';
  import TreeList from './TreeList.svelte';
  import Icon from './Icon.svelte';
  import { getComponentTheme } from './theme';

  export let element = 'main';
  export let maxDepth = 6;

  let activeHeadingId = '';
  let headings = [];
  let nodes = [];

  const theme = getComponentTheme('TableOfContents');

  function onScroll(e) {
    activeHeadingId = headings?.find(
      (heading) => heading.element.offsetTop >= e.target.scrollTop + e.target.offsetTop
    )?.id;
  }

  onMount(() => {
    const el = document.querySelector(element);

    const selector = Array.from({ length: maxDepth }, (_, i) => 'h' + ++i).join(','); // h1,h2,...
    headings = Array.from(el?.querySelectorAll(selector) ?? [], (el) => {
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
  class={cls('TableOfContents', theme.root, $$props.class)}
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
