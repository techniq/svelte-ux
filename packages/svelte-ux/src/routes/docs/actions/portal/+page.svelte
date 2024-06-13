<script lang="ts">
  import Preview from '$lib/components/Preview.svelte';
  import Code from '$lib/components/Code.svelte';
  import { portal, type PortalOptions } from '$lib/actions/portal.js';
  import Button from '$lib/components/Button.svelte';

  let optionsBasic: PortalOptions = false;
  let optionsAnscestor: PortalOptions = false;
  let optionsSibling: PortalOptions = false;
  let optionsCustom: PortalOptions = false;
  let optionsDestroyable: PortalOptions = { target: undefined, enabled: false };
  let destroy = false;
</script>

<h1>Usage</h1>

<Code source={`import { portal } from 'svelte-ux';`} language="javascript" />

<h1>Examples</h1>

<h2>basic</h2>

<Preview>
  <div class="relative">
    <Button on:click={() => (optionsBasic = true)} class="border mt-4">Move to body</Button>
    <div use:portal={optionsBasic} class="portal-content">
      <div>Portal content</div>
      {#if optionsBasic}
        <Button on:click={() => (optionsBasic = false)} class="border mt-4">
          Move back to parent
        </Button>
      {/if}
    </div>
  </div>
</Preview>

<h2>first/sibling <code>.PortalTarget</code></h2>

<Preview>
  <div class="relative">
    <Button on:click={() => (optionsSibling = true)} class="border mt-4">
      Move to first <code>.PortalTarget</code>
    </Button>
    <div use:portal={optionsSibling} class="portal-content">
      <div>Portal content</div>
      {#if optionsSibling}
        <Button on:click={() => (optionsSibling = false)} class="border mt-4">
          Move back to parent
        </Button>
      {/if}
    </div>
  </div>
  <div class="PortalTarget relative h-32 bg-surface-200 mt-4"></div>
</Preview>

<h2>anscestor <code>.PortalTarget</code></h2>
<!-- This example has to come after the previous one, so the previous one doesn't find this .PortalTarget -->

<Preview>
  <div class="PortalTarget relative">
    <div>
      <Button on:click={() => (optionsAnscestor = true)} class="border mt-4">
        Move to closest <code>.PortalTarget</code>
      </Button>
      <div use:portal={optionsAnscestor} class="portal-content">
        <div>Portal content</div>
        {#if optionsAnscestor}
          <Button on:click={() => (optionsAnscestor = false)} class="border mt-4">
            Move back to parent
          </Button>
        {/if}
      </div>
    </div>
  </div>
</Preview>

<h2>custom target</h2>

<Preview>
  <div class="relative">
    <Button
      on:click={() => (optionsCustom = { target: '.custom-portal-target' })}
      class="border mt-4"
    >
      Move to <code>.custom-portal-target</code>
    </Button>
    <div use:portal={optionsCustom} class="portal-content">
      <div>Portal content</div>
      {#if optionsCustom}
        <Button on:click={() => (optionsCustom = false)} class="border mt-4">
          Move back to parent
        </Button>
      {/if}
    </div>
  </div>
  <div class="custom-portal-target relative h-32 bg-surface-200 mt-4"></div>
</Preview>

<h2>Destroyable</h2>

<Preview>
  {#if !destroy}
    <div class="PortalTarget relative">
      <div class="relative">
        <Button
          on:click={() => (optionsDestroyable = { target: '.destroyable-example-target' })}
          class="border mt-4">Move to target</Button
        >
        <Button on:click={() => (destroy = !destroy)} class="border mt-4">
          {#if destroy}
            Recreate
          {:else}
            Destroy
          {/if}
        </Button>
        <div use:portal={optionsDestroyable} class="portal-content">
          <div>Portal content</div>
          {#if optionsBasic}
            <Button on:click={() => (optionsBasic = false)} class="border mt-4">
              Move back to parent
            </Button>
          {/if}
        </div>
      </div>
      <div class="destroyable-example-target relative h-32 bg-surface-200 mt-4"></div>
    </div>
  {/if}
</Preview>

<style lang="postcss">
  .portal-content {
    @apply absolute top-1/2 left-1/2 shadow bg-surface-100 p-4 -translate-x-1/2 -translate-y-1/2 text-center;
  }
</style>
