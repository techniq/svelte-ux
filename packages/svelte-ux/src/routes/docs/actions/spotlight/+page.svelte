<script lang="ts">
  import { flip } from 'svelte/animate';

  import Button from '$lib/components/Button.svelte';
  import Code from '$lib/components/Code.svelte';
  import Preview from '$lib/components/Preview.svelte';

  import { spotlight } from '$lib/actions/spotlight.js';
  import { cls } from '$lib/utils/styles.js';

  const itemCount = 12;
  $: items = Array.from({ length: itemCount }).map((_, i) => `Item ${i + 1}`);
</script>

<h1>Usage</h1>

<Code source={`import { spotlight } from 'svelte-ux';`} language="javascript" />

<svelte:window
  on:mousemove={(e) => {
    const body = window.document.body;
    body.style.setProperty('--x', e.clientX + 'px');
    body.style.setProperty('--y', e.clientY + 'px');
  }}
/>

<h2>Using global context and options</h2>

<Preview>
  <div class="grid grid-cols-sm gap-3">
    {#each items as item, i}
      <div
        use:spotlight={{
          radius: '200px',
          borderWidth: '1px',
          borderColorStops: 'var(--border_base), var(--border_base), transparent',
          surfaceColorStops: 'var(--surface_base), var(--surface_base)',
          hover: {
            radius: '400px',
            borderWidth: '2px',
            borderColorStops: 'var(--border_hover_1) 5%, var(--border_hover_2)',
            surfaceColorStops: 'var(--surface_hover_1), var(--surface_hover_2)',
          },
        }}
        class={cls(
          'border p-4 transition-shadow hover:shadow-md rounded-lg before:rounded-lg',
          '[--border_base:theme(colors.surface-content/50%)]',
          '[--border_hover_1:theme(colors.primary)]',
          '[--border_hover_2:theme(colors.secondary)]',
          '[--surface_base:theme(colors.surface-200)]',
          '[--surface_hover_1:theme(colors.surface-100/90%)]',
          '[--surface_hover_2:theme(colors.surface-100)]'
        )}
      >
        {item}
      </div>
    {/each}
  </div>
</Preview>

<h2>Using global context and CSS variables</h2>

<Preview>
  <div class="grid grid-cols-sm gap-3">
    {#each items as item, i}
      <div
        use:spotlight
        class={cls(
          'border p-4 transition-shadow hover:shadow-md rounded-lg before:rounded-lg',
          '[--spotlight-radius:200px]',
          '[--spotlight-border-width:1px]',
          '[--spotlight-border-color-stops:theme(colors.surface-content/50%),theme(colors.surface-content/50%),transparent]',
          '[--spotlight-surface-color-stops:theme(colors.surface-200),theme(colors.surface-200)]',
          'hover:[--spotlight-border-width:2px]',
          'hover:[--spotlight-border-color-stops:theme(colors.primary)_5%,theme(colors.secondary)]',
          'hover:[--spotlight-surface-color-stops:theme(colors.surface-100/90%),theme(colors.surface-100)]'
        )}
      >
        {item}
      </div>
    {/each}
  </div>
</Preview>

<h2>Line example</h2>

<Preview>
  <div class="grid grid-cols-sm gap-3">
    {#each items as item, i}
      <div
        use:spotlight
        class={cls(
          'border px-4 py-8 transition-shadow hover:shadow-md rounded-lg before:rounded-lg',
          '[--spotlight-radius:100px]',
          '[--spotlight-border-width:1px]',
          '[--spotlight-border-color-stops:theme(colors.surface-content/50%),theme(colors.surface-content/50%),transparent]',
          '[--spotlight-surface-color-stops:theme(colors.surface-200),theme(colors.surface-200)]',
          'hover:[--spotlight-radius:50px]',
          'hover:[--spotlight-border-width:2px]',
          'hover:[--spotlight-border-color-stops:theme(colors.primary)_100%,transparent]',
          'hover:[--spotlight-surface-color-stops:theme(colors.surface-200/90%),theme(colors.surface-200)]'
        )}
      >
        {item}
      </div>
    {/each}
  </div>
</Preview>
