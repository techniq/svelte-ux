<script lang="ts">
  import { Button, Popover, Toggle } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';

  let open = $state(false);
</script>

<h1>Examples</h1>

<h2>Inferred anchor</h2>

<h3>Uses the parent element of `Popover` if `anchorEl` not provided</h3>

<Preview>
  <div class="inline-block">
    <Popover bind:open>
      <div class="p-2 bg-surface-100 border shadow">Example contents</div>
    </Popover>
    <Button onclick={() => (open = !open)}>Click me</Button>
  </div>
</Preview>

<h2>Placement</h2>

<Preview>
  <div class="mx-20">
    <div class="grid grid-cols-5">
      <Toggle>
        {#snippet children({ on: open, toggle, toggleOff })}
          <div class="col-start-2 text-right">
            <div class="inline-block">
              <Popover {open} onClose={toggleOff} placement="top-start">
                <div class="px-4 py-8 bg-surface-100 border shadow">Contents</div>
              </Popover>
              <Button onclick={toggle}>Top Start</Button>
            </div>
          </div>
        {/snippet}
      </Toggle>
      <Toggle>
        {#snippet children({ on: open, toggle, toggleOff })}
          <div class="col-start-3 text-center">
            <div class="inline-block">
              <Popover {open} onClose={toggleOff} placement="top">
                <div class="px-4 py-8 bg-surface-100 border shadow">Contents</div>
              </Popover>
              <Button onclick={toggle}>Top</Button>
            </div>
          </div>
        {/snippet}
      </Toggle>
      <Toggle>
        {#snippet children({ on: open, toggle, toggleOff })}
          <div class="col-start-4 text-left">
            <div class="inline-block">
              <Popover {open} onClose={toggleOff} placement="top-end">
                <div class="px-4 py-8 bg-surface-100 border shadow">Contents</div>
              </Popover>
              <Button onclick={toggle}>Top End</Button>
            </div>
          </div>
        {/snippet}
      </Toggle>
      <Toggle>
        {#snippet children({ on: open, toggle, toggleOff })}
          <div class="col-start-1 text-right">
            <div class="inline-block">
              <Popover {open} onClose={toggleOff} placement="left-start">
                <div class="px-4 py-8 bg-surface-100 border shadow">Contents</div>
              </Popover>
              <Button onclick={toggle}>Left Start</Button>
            </div>
          </div>
        {/snippet}
      </Toggle>
      <Toggle>
        {#snippet children({ on: open, toggle, toggleOff })}
          <div class="col-start-5 text-left">
            <div class="inline-block">
              <Popover {open} onClose={toggleOff} placement="right-start">
                <div class="px-4 py-8 bg-surface-100 border shadow">Contents</div>
              </Popover>
              <Button onclick={toggle}>Right Start</Button>
            </div>
          </div>
        {/snippet}
      </Toggle>
      <Toggle>
        {#snippet children({ on: open, toggle, toggleOff })}
          <div class="col-start-1 text-right">
            <div class="inline-block">
              <Popover {open} onClose={toggleOff} placement="left">
                <div class="px-4 py-8 bg-surface-100 border shadow">Contents</div>
              </Popover>
              <Button onclick={toggle}>Left</Button>
            </div>
          </div>
        {/snippet}
      </Toggle>
      <Toggle>
        {#snippet children({ on: open, toggle, toggleOff })}
          <div class="col-start-5 text-left">
            <div class="inline-block">
              <Popover {open} onClose={toggleOff} placement="right">
                <div class="px-4 py-8 bg-surface-100 border shadow">Contents</div>
              </Popover>
              <Button onclick={toggle}>Right</Button>
            </div>
          </div>
        {/snippet}
      </Toggle>
      <Toggle>
        {#snippet children({ on: open, toggle, toggleOff })}
          <div class="col-start-1 text-right">
            <div class="inline-block">
              <Popover {open} onClose={toggleOff} placement="left-end">
                <div class="px-4 py-8 bg-surface-100 border shadow">Contents</div>
              </Popover>
              <Button onclick={toggle}>Left End</Button>
            </div>
          </div>
        {/snippet}
      </Toggle>
      <Toggle>
        {#snippet children({ on: open, toggle, toggleOff })}
          <div class="col-start-5 text-left">
            <div class="inline-block">
              <Popover {open} onClose={toggleOff} placement="right-end">
                <div class="px-4 py-8 bg-surface-100 border shadow">Contents</div>
              </Popover>
              <Button onclick={toggle}>Right End</Button>
            </div>
          </div>
        {/snippet}
      </Toggle>
      <Toggle>
        {#snippet children({ on: open, toggle, toggleOff })}
          <div class="col-start-2 text-right">
            <div class="inline-block">
              <Popover {open} onClose={toggleOff} placement="bottom-start">
                <div class="px-4 py-8 bg-surface-100 border shadow">Contents</div>
              </Popover>
              <Button onclick={toggle}>Bottom Start</Button>
            </div>
          </div>
        {/snippet}
      </Toggle>
      <Toggle>
        {#snippet children({ on: open, toggle, toggleOff })}
          <div class="col-start-3 text-center">
            <div class="inline-block">
              <Popover {open} onClose={toggleOff} placement="bottom">
                <div class="px-4 py-8 bg-surface-100 border shadow">Contents</div>
              </Popover>
              <Button onclick={toggle}>Bottom</Button>
            </div>
          </div>
        {/snippet}
      </Toggle>
      <Toggle>
        {#snippet children({ on: open, toggle, toggleOff })}
          <div class="col-start-4 text-left">
            <div class="inline-block">
              <Popover {open} onClose={toggleOff} placement="bottom-start">
                <div class="px-4 py-8 bg-surface-100 border shadow">Contents</div>
              </Popover>
              <Button onclick={toggle}>Bottom End</Button>
            </div>
          </div>
        {/snippet}
      </Toggle>
    </div>
  </div>
</Preview>
