---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script lang="ts">
  import api from '$lib/components/Popover.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Button from '$lib/components/Button.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import Popover from '$lib/components/Popover.svelte';
  import Toggle from '$lib/components/Toggle.svelte';

  let open = false;
</script>

# Examples

## Inferred anchor

### Uses the parent element of `Popover` if `anchorEl` not provided

<Preview>
  <div class="inline-block">
    <Popover bind:open>
      <div class="p-2 bg-white border shadow">Example contents</div>
    </Popover>
    <Button on:click={() => (open = !open)}>Click me</Button>
  </div>
</Preview>

## Max viewport height

### below

<Preview>
  <Toggle let:on={open} let:toggle let:toggleOff>
    <div class="inline-block">
      <Popover {open} on:close={toggleOff} on:close={toggle} maxViewportHeight class="bg-white border shadow">
        <div class="p-2 h-[80vh] grid grid-rows-[auto,1fr,auto] items-center">
          <div>Top</div>
          <div>Middle</div>
          <div>Bottom</div>
        </div>
      </Popover>
      <Button on:click={toggle}>Click me</Button>
    </div>
  </Toggle>
</Preview>

### above

<Preview>
  <Toggle let:on={open} let:toggle let:toggleOff>
    <div class="inline-block">
      <Popover {open} on:close={toggleOff} placement="top" on:close={toggle} maxViewportHeight class="bg-white border shadow">
        <div class="p-2 h-[80vh] grid grid-rows-[auto,1fr,auto] items-center">
          <div>Top</div>
          <div>Middle</div>
          <div>Bottom</div>
        </div>
      </Popover>
      <Button on:click={toggle}>Click me</Button>
    </div>
  </Toggle>
</Preview>

## Placement

<Preview>
  <div class="mx-20">
    <div class="grid grid-cols-5">
      <Toggle let:on={open} let:toggle let:toggleOff>
        <div class="col-start-2 text-right">
          <div class="inline-block">
            <Popover {open} on:close={toggleOff} placement="top-start">
              <div class="px-4 py-8 bg-white border shadow">Contents</div>
            </Popover>
            <Button on:click={toggle}>Top Start</Button>
          </div>
        </div>
      </Toggle>
      <Toggle let:on={open} let:toggle let:toggleOff>
        <div class="col-start-3 text-center">
          <div class="inline-block">
            <Popover {open} on:close={toggleOff} placement="top">
              <div class="px-4 py-8 bg-white border shadow">Contents</div>
            </Popover>
            <Button on:click={toggle}>Top</Button>
          </div>
        </div>
      </Toggle>
      <Toggle let:on={open} let:toggle let:toggleOff>
        <div class="col-start-4 text-left">
          <div class="inline-block">
            <Popover {open} on:close={toggleOff} placement="top-end">
              <div class="px-4 py-8 bg-white border shadow">Contents</div>
            </Popover>
            <Button on:click={toggle}>Top End</Button>
          </div>
        </div>
      </Toggle>
      <Toggle let:on={open} let:toggle let:toggleOff>
        <div class="col-start-1 text-right">
          <div class="inline-block">
            <Popover {open} on:close={toggleOff} placement="left-start">
              <div class="px-4 py-8 bg-white border shadow">Contents</div>
            </Popover>
            <Button on:click={toggle}>Left Start</Button>
          </div>
        </div>
      </Toggle>
      <Toggle let:on={open} let:toggle let:toggleOff>
        <div class="col-start-5 text-left">
          <div class="inline-block">
            <Popover {open} on:close={toggleOff} placement="right-start">
              <div class="px-4 py-8 bg-white border shadow">Contents</div>
            </Popover>
            <Button on:click={toggle}>Right Start</Button>
          </div>
        </div>
      </Toggle>
      <Toggle let:on={open} let:toggle let:toggleOff>
        <div class="col-start-1 text-right">
          <div class="inline-block">
            <Popover {open} on:close={toggleOff} placement="left">
              <div class="px-4 py-8 bg-white border shadow">Contents</div>
            </Popover>
            <Button on:click={toggle}>Left</Button>
          </div>
        </div>
      </Toggle>
      <Toggle let:on={open} let:toggle let:toggleOff>
        <div class="col-start-5 text-left">
          <div class="inline-block">
            <Popover {open} on:close={toggleOff}  placement="right">
              <div class="px-4 py-8 bg-white border shadow">Contents</div>
            </Popover>
            <Button on:click={toggle}>Right</Button>
          </div>
        </div>
      </Toggle>
      <Toggle let:on={open} let:toggle let:toggleOff>
        <div class="col-start-1 text-right">
          <div class="inline-block">
            <Popover {open} on:close={toggleOff} placement="left-end">
              <div class="px-4 py-8 bg-white border shadow">Contents</div>
            </Popover>
            <Button on:click={toggle}>Left End</Button>
          </div>
        </div>
      </Toggle>
      <Toggle let:on={open} let:toggle let:toggleOff>
        <div class="col-start-5 text-left">
          <div class="inline-block">
            <Popover {open} on:close={toggleOff} placement="right-end">
              <div class="px-4 py-8 bg-white border shadow">Contents</div>
            </Popover>
            <Button on:click={toggle}>Right End</Button>
          </div>
        </div>
      </Toggle>
      <Toggle let:on={open} let:toggle let:toggleOff>
        <div class="col-start-2 text-right">
          <div class="inline-block">
            <Popover {open} on:close={toggleOff} placement="bottom-start">
              <div class="px-4 py-8 bg-white border shadow">Contents</div>
            </Popover>
            <Button on:click={toggle}>Bottom Start</Button>
          </div>
        </div>
      </Toggle>
      <Toggle let:on={open} let:toggle let:toggleOff>
        <div class="col-start-3 text-center">
          <div class="inline-block">
            <Popover {open} on:close={toggleOff} placement="bottom">
              <div class="px-4 py-8 bg-white border shadow">Contents</div>
            </Popover>
            <Button on:click={toggle}>Bottom</Button>
          </div>
        </div>
      </Toggle>
      <Toggle let:on={open} let:toggle let:toggleOff>
        <div class="col-start-4 text-left">
          <div class="inline-block">
            <Popover {open} on:close={toggleOff} placement="bottom-start">
              <div class="px-4 py-8 bg-white border shadow">Contents</div>
            </Popover>
            <Button on:click={toggle}>Bottom End</Button>
          </div>
        </div>
      </Toggle>
    </div>
  </div>
</Preview>

# API

<ApiDocs {api} />
