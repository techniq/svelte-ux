<script module lang="ts">
  let cache = new Map<string, Promise<string>>();
</script>

<script lang="ts">
  import type { IconDefinition } from '@fortawesome/fontawesome-common-types';

  import { uniqueId } from '../utils/string.js';
  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';
  import type { Snippet } from 'svelte';
  import type { DOMAttributes } from 'svelte/elements';

  interface Props {
    size?: string | number;
    width?: string | number;
    height?: string | number;
    viewBox?: string;
    path?: string | string[];
    data?: IconDefinition | string | null;
    svg?: string;
    svgUrl?: string;
    // Accessibility
    title?: string;
    desc?: string;
    titleId?: string;
    descId?: string;
    classes?: {
      root?: string;
      path?: string | string[];
    };
    class?: string;
    style?: string;
    onclick?: DOMAttributes<Element>["onclick"];
    children?: Snippet;
  }

  let {
    size = '1.5em',
    width = $bindable(size),
    height = $bindable(size),
    viewBox = $bindable('0 0 24 24'),
    path = $bindable(''),
    data,
    svg = $bindable(),
    svgUrl = $bindable(),
    title,
    desc,
    titleId = title ? uniqueId('title-') : '',
    descId = desc ? uniqueId('desc-') : '',
    classes = {},
    class: className,
    style,
    onclick,
    children,
  }: Props = $props();
  const settingsClasses = getComponentClasses('Icon');

  let isLabelled = $derived(title || desc);
  $effect(() => {
    if (typeof data === 'object' && data && 'icon' in data) {
      // Font Awesome
      const [_width, _height, _ligatures, _unicode, _path] = data.icon;
      viewBox = `0 0 ${_width} ${_height}`;
      path = _path;
      width = '1.0rem';
      height = '1.0rem';
    } else if (typeof data === 'string') {
      // Also conveniently accept `path`, `svg`, or `svgUrl` as `data`
      const dataStr = data.toLowerCase();
      if (dataStr.includes('<svg')) {
        svg = data;
      } else if (dataStr.includes('http')) {
        svgUrl = data;
      } else {
        path = data;
      }
    }
  });
  $effect(() => {
    if (svgUrl) {
      let promise;
      if (cache.has(svgUrl)) {
        cache.get(svgUrl)?.then((text) => (svg = text));
      } else {
        promise = fetch(svgUrl)
          .then((resp) => resp.text())
          .catch(() => {
            // Failed request, remove promise so fetched again
            if (svgUrl && typeof svgUrl === 'string') {
              cache.delete(svgUrl);
            }
            // TODO: Consider showing error icon
            // throw e;
            return '';
          });
        cache.set(svgUrl, promise);
        promise.then((text) => {
          svg = text;
        });
      }
    }
  });
  // If the SVG includes the font awesome license comment, use `1.0em
  $effect(() => {
    if (svg?.includes('fontawesome.com')) {
      width = '1.0rem';
      height = '1.0rem';
    }
  });
</script>

{#if svg || svgUrl || children}
  <span
    class={cls(
      'Icon',
      'icon-container inline-block flex-shrink-0 align-middle fill-current',
      settingsClasses.root,
      classes.root,
      className
    )}
    {style}
    style:width
    style:height
    style:--width={width}
    style:--height={height}
    role={isLabelled ? 'img' : 'presentation'}
    aria-labelledby={isLabelled ? `${titleId} ${descId}` : undefined}
    {onclick}
  >
    {#if children}
      {@render children()}
    {:else}
      {@html svg ?? ''}
    {/if}
  </span>
{:else}
  <svg
    {width}
    {height}
    {viewBox}
    class={cls(
      'Icon',
      'inline-block flex-shrink-0 fill-current',
      settingsClasses.root,
      classes.root,
      className
    )}
    {style}
    role={isLabelled ? 'img' : 'presentation'}
    aria-labelledby={isLabelled ? `${titleId} ${descId}` : undefined}
    {onclick}
  >
    {#if title}
      <title id={titleId}>{title}</title>
    {/if}
    {#if desc}
      <desc id={descId}>{desc}</desc>
    {/if}

    {#each Array.isArray(path) ? path : [path] as d, i}
      <path
        {d}
        fill="currentColor"
        class={cls(
          Array.isArray(settingsClasses.path) ? settingsClasses.path[i] : settingsClasses.path,
          Array.isArray(classes.path) ? classes.path[i] : classes.path
        )}
      />
    {/each}
  </svg>
{/if}

<style>
  .icon-container :global(> svg) {
    width: var(--width);
    height: var(--height);
  }
</style>
