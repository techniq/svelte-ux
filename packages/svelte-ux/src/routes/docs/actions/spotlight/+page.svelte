<script lang="ts">
  import { flip } from 'svelte/animate';

  import Button from '$lib/components/Button.svelte';
  import Code from '$lib/components/Code.svelte';
  import Preview from '$lib/components/Preview.svelte';

  import { spotlight } from '$lib/actions/spotlight';
  import { cls } from '$lib/utils/styles';

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
          borderColorStops: '#999, #999, transparent',
          surfaceColorStops: '#fff, #fff',
          hover: {
            radius: '400px',
            borderWidth: '2px',
            borderColorStops: 'var(--color-cyan-300) 5%, var(--color-blue-500)',
            surfaceColorStops: 'rgb(255 255 255 / 90%), #fff',
          },
        }}
        class="border p-4 transition-shadow hover:shadow-md rounded-lg before:rounded-lg"
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
          '[--spotlight-border-color-stops:#999,#999,transparent]',
          '[--spotlight-surface-color-stops:#fff,#fff]',
          'hover:[--spotlight-border-width:2px]',
          'hover:[--spotlight-border-color-stops:var(--color-cyan-300)_5%,_var(--color-blue-500)]',
          'hover:[--spotlight-surface-color-stops:rgb(255_255_255/90%),_#fff]'
        )}
      >
        {item}
      </div>
    {/each}
  </div>
</Preview>

<h2>Effect example 1</h2>

<Preview>
  <div class="grid grid-cols-sm gap-3">
    {#each items as item, i}
      <div
        use:spotlight={{
          radius: '200px',
          borderWidth: '1px',
          borderColorStops: '#999, #999, transparent',
          surfaceColorStops: '#fff, #fff',
          hover: {
            radius: '400px',
            borderWidth: '2px',
            borderColorStops: 'var(--color-cyan-300) 5%, var(--color-blue-500)',
            surfaceColorStops: 'rgb(255 255 255 / 90%), #fff',
          },
        }}
        class="p-4 transition-shadow hover:shadow-md rounded-lg before:rounded-lg"
      >
        {item}
      </div>
    {/each}
  </div>
</Preview>

<h2>Effect example 1</h2>

<Preview>
  <div class="grid grid-cols-sm gap-3">
    {#each items as item, i}
      <div
        use:spotlight={{
          radius: '100px',
          borderWidth: '1px',
          borderColorStops: '#999, #999, transparent',
          surfaceColorStops: '#fff, #fff',
          hover: {
            radius: '50px',
            borderWidth: '2px',
            borderColorStops: 'var(--color-cyan-300) 100%, transparent',
            surfaceColorStops: 'rgb(255 255 255 / 90%), #fff',
          },
        }}
        class="border px-4 py-8 transition-shadow rounded-lg before:rounded-lg"
      >
        {item}
      </div>
    {/each}
  </div>
</Preview>
