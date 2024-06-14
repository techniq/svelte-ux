<script lang="ts">
  import { fly } from 'svelte/transition';
  import { Toggle, resize, intersection, mutate } from 'svelte-ux';

  import Preview from '$lib/components/Preview.svelte';
  import Blockquote from '$docs/Blockquote.svelte';
  import Code from '$lib/components/Code.svelte';
</script>

<h1>Usage</h1>

<Code source={`import { resize, intersection, mutate } from 'svelte-ux';`} language="javascript" />

<h2>use:resize</h2>

<h3>Basic</h3>

<Preview showCode>
  <div
    use:resize
    on:resize={(e) => {
      console.log(e.detail);
      e.target.innerText = JSON.stringify(e.detail.contentRect, null, 2);
    }}
    class="resize overflow-auto whitespace-pre outline rounded"
  />
</Preview>

<h3>Full coordinates (using `getBoundingClientRect()`)</h3>

<Preview showCode>
  <div
    use:resize
    on:resize={(e) => {
      e.target.innerText = JSON.stringify(e.target.getBoundingClientRect(), null, 2);
    }}
    class="resize overflow-auto whitespace-pre outline rounded"
  />
</Preview>

<h3>Setting CSS variable</h3>

<Preview showCode>
  <div
    use:resize
    on:resize={(e) => {
      e.target.style.setProperty('--color', e.detail.contentRect.width % 255);
    }}
    style:background-color="hsl(var(--color), 100%, 70%)"
    class="resize overflow-auto p-2 rounded"
  >
    Resize and watch me change colors
  </div>
</Preview>

<h2>use:intersection</h2>

<h3>Adding class when fully visible</h3>

<Preview showCode>
  <div class="h-[200px] overflow-auto">
    {#each { length: 10 } as _}
      <div>Scroll down</div>
    {/each}
    <div
      use:intersection={{ threshold: 1 }}
      on:intersecting={(e) => {
        if (e.detail.isIntersecting) {
          e.target.classList.add('bg-danger');
        } else {
          e.target.classList.remove('bg-danger');
        }
      }}
      class="transition-colors duration-500"
    >
      Watch me scroll away
    </div>
    {#each { length: 10 } as _}
      <div>Scroll up</div>
    {/each}
  </div>
</Preview>

<h3>Show header on scroll away</h3>

<Preview showCode>
  <Toggle let:on={showHeader} let:toggleOn let:toggleOff>
    <div class="relative overflow-hidden">
      {#if showHeader}
        <div
          class="absolute top-0 left-0 bg-primary text-primary-content p-4 w-full"
          transition:fly={{ y: '-100%', opacity: 1 }}
        >
          Header
        </div>
      {/if}
      <div class="h-[200px] overflow-auto">
        {#each { length: 10 } as _}
          <div>Scroll down</div>
        {/each}
        <div
          use:intersection={{ threshold: 1 }}
          on:intersecting={(e) => {
            if (e.detail.isIntersecting) {
              // Visible
              toggleOff();
            } else {
              if (e.detail.boundingClientRect.top < (e.detail.rootBounds?.top ?? 0)) {
                // Scrolled off top
                toggleOn();
              } else {
                // Scrolled off bottom
              }
            }
          }}
        >
          Watch me scroll away
        </div>
        {#each { length: 10 } as _}
          <div>Scroll up</div>
        {/each}
      </div>
    </div>
  </Toggle>
</Preview>

<h2>use:mutate</h2>

<Blockquote>TODO</Blockquote>
