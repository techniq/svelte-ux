<script lang="ts">
  import { fade, type FadeParams } from 'svelte/transition';

  import { portal as portalAction, type PortalOptions } from '../actions/portal.js';
  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';
  import type { Snippet } from 'svelte';
  import type { SvelteHTMLElements } from 'svelte/elements';

  interface Props {
    blur?: boolean;
    portal?: PortalOptions;
    class?: string;
    fadeParams?: FadeParams;
    onKeyDown?: SvelteHTMLElements['div']['onkeydown'];
    onKeyUp?: SvelteHTMLElements['div']['onkeyup'];
    onKeyPress?: SvelteHTMLElements['div']['onkeypress'];
    onClick?: SvelteHTMLElements['div']['onclick'];
    onMouseDown?: SvelteHTMLElements['div']['onmousedown'];
    onMouseUp?: SvelteHTMLElements['div']['onmouseup'];
    children?: Snippet;
  }

  let {
    blur = false,
    portal = false,
    class: className,
    fadeParams = { duration: 300 },
    onKeyDown,
    onKeyUp,
    onKeyPress,
    onClick,
    onMouseDown,
    onMouseUp,
    children,
  }: Props = $props();

  const settingsClasses = getComponentClasses('Backdrop');
</script>

<div
  class={cls(
    'Backdrop',
    'fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-surface-content/50 dark:bg-surface-300/70',
    blur && 'backdrop-blur-sm',
    settingsClasses.root,
    className
  )}
  onkeydown={onKeyDown}
  onkeyup={onKeyUp}
  onkeypress={onKeyPress}
  onclick={onClick}
  onmousedown={onMouseDown}
  onmouseup={onMouseUp}
  in:fade|global={fadeParams}
  out:fade={fadeParams}
  use:portalAction={portal}
  role="none"
>
  {@render children?.()}
</div>
