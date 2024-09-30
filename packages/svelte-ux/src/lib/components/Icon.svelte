<script context="module" lang="ts">
  let cache = new Map<string, Promise<string>>();
</script>

<script lang="ts">
  import type { IconDefinition } from '@fortawesome/fontawesome-common-types';
  import { cls } from '@layerstack/tailwind';
  import { uniqueId } from '@layerstack/utils';

  import { getComponentClasses } from './theme.js';

  export let size: string | number = '1.5em';
  export let width = size;
  export let height = size;
  export let viewBox = '0 0 24 24';
  export let path: string | string[] = '';
  export let data: IconDefinition | string | null | undefined = undefined;
  export let svg: string | undefined = undefined;
  export let svgUrl: string | undefined = undefined;

  // Accessibility
  export let title: string | undefined = undefined;
  export let desc: string | undefined = undefined;
  export let titleId: string | undefined = title ? uniqueId('title-') : '';
  export let descId: string | undefined = desc ? uniqueId('desc-') : '';
  $: isLabelled = title || desc;

  export let classes: {
    root?: string;
    path?: string | string[];
  } = {};
  const settingsClasses = getComponentClasses('Icon');

  $: if (typeof data === 'object' && data && 'icon' in data) {
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

  // If the SVG includes the font awesome license comment, use `1.0em
  $: if (svg?.includes('fontawesome.com')) {
    width = '1.0rem';
    height = '1.0rem';
  }

  $: if (svgUrl) {
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
</script>

{#if svg || svgUrl || $$slots.default}
  <span
    class={cls(
      'Icon',
      'icon-container inline-block flex-shrink-0 align-middle fill-current',
      settingsClasses.root,
      classes.root,
      $$props.class
    )}
    style={$$props.style}
    style:width
    style:height
    style:--width={width}
    style:--height={height}
    role={isLabelled ? 'img' : 'presentation'}
    aria-labelledby={isLabelled ? `${titleId} ${descId}` : undefined}
    on:click
  >
    <slot>
      {@html svg ?? ''}
    </slot>
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
      $$props.class
    )}
    style={$$props.style}
    role={isLabelled ? 'img' : 'presentation'}
    aria-labelledby={isLabelled ? `${titleId} ${descId}` : undefined}
    on:click
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
