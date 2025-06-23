<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount, type ComponentProps } from 'svelte';
  import { type HTMLAttributes } from 'svelte/elements';
  import { BROWSER } from 'esm-env';
  import { buildTree, type TreeNode } from '@layerstack/utils/array';
  import { cls } from '@layerstack/tailwind';

  import TreeList from './TreeList.svelte';
  import { getComponentClasses } from './theme.js';

  export let element = 'main';
  export let scrollContainer = BROWSER ? window : null;
  export let scrollOffset = 0;
  export let maxDepth = 6;

  /**
   * Indentation of each item
   */
  export let itemIndent = 0;

  /**
   * Indentation of each link
   */
  export let linkIndent = 0;

  // export let icon = mdiCircleSmall;
  let className: string | undefined = undefined;
  export { className as class };

  export let classes: {
    a?: string | ((node: TreeNode) => string);
  } & ComponentProps<typeof TreeList>['classes'] = {};

  export let props: {
    a?: HTMLAttributes<HTMLAnchorElement> | ((node: TreeNode) => HTMLAttributes<HTMLAnchorElement>);
  } & ComponentProps<typeof TreeList>['props'] = {};

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
  {classes}
  props={{
    li: {
      style: `margin-left: ${itemIndent}px`,
    },
    ...props,
  }}
  {...$$restProps}
  class={cls('TableOfContents', settingsClasses.root, className)}
  let:node
>
  {@const resolvedProps = typeof props.a === 'function' ? props.a(node) : props.a}
  {@const resolvedClass = typeof classes.a === 'function' ? classes.a(node) : classes.a}

  <slot {node} {activeHeadingId}>
    <a
      href="#{node.id}"
      data-level={node.level}
      data-active={node.id && node.id === activeHeadingId ? true : undefined}
      style={linkIndent ? `padding-left: ${linkIndent * node.level}px` : undefined}
      {...resolvedProps}
      class={cls('block', resolvedProps?.class, resolvedClass)}
      on:click={() => dispatch('nodeClick', node)}
    >
      <slot name="link" {node} {activeHeadingId}>
        {@html node.name}
      </slot>
    </a>
  </slot>
</TreeList>
