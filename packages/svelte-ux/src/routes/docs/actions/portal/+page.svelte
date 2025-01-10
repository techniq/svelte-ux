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
    <Toggle   >
      {#snippet children({ on: enabled, toggleOn, toggleOff })}
            <Button onclick={toggleOn} class="border mt-4">Move to body</Button>
        <!-- Explicit "target: document.body" only needed because ".PortalTarget" exists other examples -->
        <div use:portal={{ enabled, target: document.body }} class="portal-content">
          <div>Portal content</div>
          {#if enabled}
            <Button onclick={toggleOff} class="border mt-4">Move back to parent</Button>
          {/if}
        </div>
                {/snippet}
        </Toggle>
  </div>
</Preview>

<h2>first/sibling <code>.PortalTarget</code></h2>

<Preview>
  <Toggle   >
    {#snippet children({ on: enabled, toggleOn, toggleOff })}
        <div class="relative">
        <Button onclick={toggleOn} class="border mt-4">
          Move to first <code>.PortalTarget</code>
        </Button>
        <div use:portal={enabled} class="portal-content">
          <div>Portal content</div>
          {#if enabled}
            <Button onclick={toggleOff} class="border mt-4">Move back to parent</Button>
          {/if}
        </div>
      </div>
      <div class="PortalTarget relative h-32 bg-surface-200 mt-4"></div>
          {/snippet}
    </Toggle>
</Preview>

<h2>anscestor <code>.PortalTarget</code></h2>
<!-- This example has to come after the previous one, so the previous one doesn't find this .PortalTarget -->

<Preview>
  <Toggle   >
    {#snippet children({ on: enabled, toggleOn, toggleOff })}
        <div class="PortalTarget relative">
        <div>
          <Button onclick={toggleOn} class="border mt-4">
            Move to closest <code>.PortalTarget</code>
          </Button>
          <div use:portal={enabled} class="portal-content">
            <div>Portal content</div>
            {#if enabled}
              <Button onclick={toggleOff} class="border mt-4">Move back to parent</Button>
            {/if}
          </div>
        </div>
      </div>
          {/snippet}
    </Toggle>
</Preview>

<h2>custom target</h2>

<Preview>
  <Toggle   >
    {#snippet children({ on: enabled, toggleOn, toggleOff })}
        <div class="relative">
        <Button onclick={toggleOn} class="border mt-4">
          Move to <code>.custom-portal-target</code>
        </Button>
        <div use:portal={{ enabled, target: '.custom-portal-target' }} class="portal-content">
          <div>Portal content</div>
          {#if enabled}
            <Button onclick={toggleOff} class="border mt-4">Move back to parent</Button>
          {/if}
        </div>
      </div>
      <div class="custom-portal-target relative h-32 bg-surface-200 mt-4"></div>
          {/snippet}
    </Toggle>
</Preview>

<h2>Destroyable</h2>

<Preview>
  <Toggle   >
    {#snippet children({ on: destroyed, toggleOn: destroy, toggleOff: restore })}
        <Toggle   >
        {#snippet children({ on: enabled, toggleOn, toggleOff })}
            {#if !destroyed}
            <div class="PortalTarget relative">
              <div class="relative">
                <Button onclick={toggleOn} class="border mt-4">Move to target</Button>
                <Button onclick={destroy} class="border mt-4">Destroy</Button>
                <div
                  use:portal={{ enabled, target: '.destroyable-example-target' }}
                  class="portal-content"
                >
                  <div>Portal content</div>
                  {#if enabled}
                    <Button onclick={toggleOff} class="border mt-4">Move back to parent</Button>
                  {/if}
                </div>
              </div>
              <div class="destroyable-example-target relative h-32 bg-surface-200 mt-4"></div>
            </div>
          {:else}
            <Button onclick={restore} class="border mt-4">Restore</Button>
          {/if}
                  {/snippet}
        </Toggle>
          {/snippet}
    </Toggle>
</Preview>

<style lang="postcss">
  .portal-content {
    @apply absolute top-1/2 left-1/2 shadow bg-surface-100 p-4 -translate-x-1/2 -translate-y-1/2 text-center;
  }
</style>
