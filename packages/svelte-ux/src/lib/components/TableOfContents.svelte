<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from 'svelte';
  import { mdiCircleSmall } from '@mdi/js';
  import { BROWSER } from 'esm-env';
  import { buildTree, type TreeNode } from '@layerstack/utils/array';
  import { cls } from '@layerstack/tailwind';

  import TreeList from './TreeList.svelte';
  import Icon from './Icon.svelte';
  import { getComponentClasses } from './theme.js';

  export let element = 'main';
  export let scrollContainer = BROWSER ? window : null;
  export let scrollOffset = 0;
  export let maxDepth = 6;
  export let icon = mdiCircleSmall;
  let className: string | undefined = undefined;
  export { className as class };

  type HeadingNode = { id: string; name: string; level: number; element: HTMLElement };

  const dispatch = createEventDispatcher<{
    nodeClick: (typeof nodes)[number];
  }>();

  let activeHeadingId = '';
  let headings: HeadingNode[] = [];
  let nodes: TreeNode[] = [];

  const settingsClasses = getComponentClasses('TableOfContents');

  function onScroll(e: Event) {
    activeHeadingId =
      headings?.find((heading) => heading.element.offsetTop >= window.scrollY + scrollOffset)?.id ??
      '';
  }

  onMount(() => {
    const el = document.querySelector(element);

    const selector = Array.from({ length: maxDepth }, (_, i) => 'h' + ++i).join(','); // h1,h2,...
    headings = Array.from(el?.querySelectorAll<HTMLElement>(selector) ?? [], (el) => {
      if (!el.hasAttribute('id')) {
        el.setAttribute('id', el.innerText.toLowerCase().replace(/\s+/g, '_'));
      }

      return {
        id: el.id,
        name: el.innerHTML,
        level: Number(el.tagName[1]),
        element: el,
      };
    });
    nodes = buildTree(headings);

    scrollContainer?.addEventListener('scroll', onScroll, { passive: true });
    // set first heading until scrolled
    activeHeadingId = headings[0]?.id;
  });

  onDestroy(() => {
    scrollContainer?.removeEventListener('scroll', onScroll);
  });
</script>

<TreeList
  {nodes}
  classes={{ li: (node) => cls(node.level === 1 ? 'mb-2' : node.level > 2 ? 'ml-3' : '') }}
  {...$$restProps}
  class={cls('TableOfContents', settingsClasses.root, className)}
  let:node
>
  <slot {node} {activeHeadingId}>
    <a
      href="#{node.id}"
      class={cls(
        'flex gap-1 px-2 rounded-lg hover:bg-surface-content/5 ',
        node.level === 1 ? 'font-semibold' : 'text-sm',
        node.id && node.id === activeHeadingId && 'bg-surface-content/5'
      )}
      on:click={() => dispatch('nodeClick', node)}
    >
      {#if node.level > 1}
        <Icon data={icon} class="-mx-1 text-surface-content/30" />
      {/if}
      {@html node.name}
    </a>
  </slot>
</TreeList>
