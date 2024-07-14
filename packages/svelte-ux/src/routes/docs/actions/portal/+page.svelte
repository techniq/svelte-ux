<script lang="ts">
  import { Button, portal, Toggle, type PortalOptions } from 'svelte-ux';

  import Preview from '$lib/components/Preview.svelte';
  import Code from '$lib/components/Code.svelte';
</script>

<h1>Usage</h1>

<Code source={`import { portal } from 'svelte-ux';`} language="javascript" />

<h1>Examples</h1>

<h2>basic</h2>

<Preview>
  <div class="relative">
    <Toggle let:on={enabled} let:toggleOn let:toggleOff>
      <Button on:click={toggleOn} class="border mt-4">Move to body</Button>
      <div use:portal={enabled} class="portal-content">
        <div>Portal content</div>
        {#if enabled}
          <Button on:click={toggleOff} class="border mt-4">Move back to parent</Button>
        {/if}
      </div>
    </Toggle>
  </div>
</Preview>

<h2>first/sibling <code>.PortalTarget</code></h2>

<Preview>
  <Toggle let:on={enabled} let:toggleOn let:toggleOff>
    <div class="relative">
      <Button on:click={toggleOn} class="border mt-4">
        Move to first <code>.PortalTarget</code>
      </Button>
      <div use:portal={enabled} class="portal-content">
        <div>Portal content</div>
        {#if enabled}
          <Button on:click={toggleOff} class="border mt-4">Move back to parent</Button>
        {/if}
      </div>
    </div>
    <div class="PortalTarget relative h-32 bg-surface-200 mt-4"></div>
  </Toggle>
</Preview>

<h2>anscestor <code>.PortalTarget</code></h2>
<!-- This example has to come after the previous one, so the previous one doesn't find this .PortalTarget -->

<Preview>
  <Toggle let:on={enabled} let:toggleOn let:toggleOff>
    <div class="PortalTarget relative">
      <div>
        <Button on:click={toggleOn} class="border mt-4">
          Move to closest <code>.PortalTarget</code>
        </Button>
        <div use:portal={enabled} class="portal-content">
          <div>Portal content</div>
          {#if enabled}
            <Button on:click={toggleOff} class="border mt-4">Move back to parent</Button>
          {/if}
        </div>
      </div>
    </div>
  </Toggle>
</Preview>

<h2>custom target</h2>

<Preview>
  <Toggle let:on={enabled} let:toggleOn let:toggleOff>
    <div class="relative">
      <Button on:click={toggleOn} class="border mt-4">
        Move to <code>.custom-portal-target</code>
      </Button>
      <div use:portal={{ enabled, target: '.custom-portal-target' }} class="portal-content">
        <div>Portal content</div>
        {#if enabled}
          <Button on:click={toggleOff} class="border mt-4">Move back to parent</Button>
        {/if}
      </div>
    </div>
    <div class="custom-portal-target relative h-32 bg-surface-200 mt-4"></div>
  </Toggle>
</Preview>

<h2>Destroyable</h2>

<Preview>
  <Toggle let:on={destroyed} let:toggleOn={destroy} let:toggleOff={restore}>
    <Toggle let:on={enabled} let:toggleOn let:toggleOff>
      {#if !destroyed}
        <div class="PortalTarget relative">
          <div class="relative">
            <Button on:click={toggleOn} class="border mt-4">Move to target</Button>
            <Button on:click={destroy} class="border mt-4">Destroy</Button>
            <div
              use:portal={{ enabled, target: '.destroyable-example-target' }}
              class="portal-content"
            >
              <div>Portal content</div>
              {#if enabled}
                <Button on:click={toggleOff} class="border mt-4">Move back to parent</Button>
              {/if}
            </div>
          </div>
          <div class="destroyable-example-target relative h-32 bg-surface-200 mt-4"></div>
        </div>
      {:else}
        <Button on:click={restore} class="border mt-4">Restore</Button>
      {/if}
    </Toggle>
  </Toggle>
</Preview>

<style lang="postcss">
  .portal-content {
    @apply absolute top-1/2 left-1/2 shadow bg-surface-100 p-4 -translate-x-1/2 -translate-y-1/2 text-center;
  }
</style>
