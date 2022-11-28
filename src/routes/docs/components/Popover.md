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
  <Toggle let:on={open} let:toggle>
    <div class="inline-block">
      <Popover {open} on:close={toggle} maxViewportHeight class="bg-white border shadow">
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
  <Toggle let:on={open} let:toggle>
    <div class="inline-block">
      <Popover {open} placement="top" on:close={toggle} maxViewportHeight class="bg-white border shadow">
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
      <Toggle let:on={open} let:toggle>
        <div class="inline-block text-right col-start-2">
          <Popover {open} placement="top-start">
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={toggle}>Top Start</Button>
        </div>
      </Toggle>
      <Toggle let:on={open} let:toggle>
        <div class="inline-block text-center col-start-3">
          <Popover {open} placement="top">
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={toggle}>Top</Button>
        </div>
      </Toggle>
      <Toggle let:on={open} let:toggle>
        <div class="inline-block text-left col-start-4">
          <Popover {open} placement="top-end">
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={toggle}>Top End</Button>
        </div>
      </Toggle>
      <Toggle let:on={open} let:toggle>
        <div class="inline-block text-right col-start-1">
          <Popover {open} placement="left-start">
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={toggle}>Left Start</Button>
        </div>
      </Toggle>
      <Toggle let:on={open} let:toggle>
        <div class="inline-block text-left col-start-5">
          <Popover {open} placement="right-start">
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={toggle}>Right Start</Button>
        </div>
      </Toggle>
      <Toggle let:on={open} let:toggle>
        <div class="inline-block text-right col-start-1">
          <Popover {open} placement="left">
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={toggle}>Left</Button>
        </div>
      </Toggle>
      <Toggle let:on={open} let:toggle>
        <div class="inline-block text-left col-start-5">
          <Popover {open} placement="right">
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={toggle}>Right</Button>
        </div>
      </Toggle>
      <Toggle let:on={open} let:toggle>
        <div class="inline-block text-right col-start-1">
          <Popover {open} placement="left-end">
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={toggle}>Left End</Button>
        </div>
      </Toggle>
      <Toggle let:on={open} let:toggle>
        <div class="inline-block text-left col-start-5">
          <Popover {open} placement="right-end">
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={toggle}>Right End</Button>
        </div>
      </Toggle>
      <Toggle let:on={open} let:toggle>
        <div class="inline-block text-right col-start-2">
          <Popover {open} placement="bottom-start">
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={toggle}>Bottom Start</Button>
        </div>
      </Toggle>
      <Toggle let:on={open} let:toggle>
        <div class="inline-block text-center col-start-3">
          <Popover {open} placement="bottom">
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={toggle}>Bottom</Button>
        </div>
      </Toggle>
      <Toggle let:on={open} let:toggle>
        <div class="inline-block text-left col-start-4">
          <Popover {open} placement="bottom-end">
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={toggle}>Bottom End</Button>
        </div>
      </Toggle>
    </div>
  </div>
</Preview>

## Origins

<Preview>
  <div class="mx-20">
    <div class="grid grid-cols-5">
      <Toggle let:on={open} let:toggle>
        <div class="inline-block text-right col-start-2">
          <Popover
            {open}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            popoverOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          >
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={toggle}>Top Start</Button>
        </div>
      </Toggle>
      <Toggle let:on={open} let:toggle>
        <div class="inline-block text-center col-start-3">
          <Popover
            {open}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            popoverOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={toggle}>Top</Button>
        </div>
      </Toggle>
      <Toggle let:on={open} let:toggle>
        <div class="inline-block text-left col-start-4">
          <Popover
            {open}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            popoverOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={toggle}>Top End</Button>
        </div>
      </Toggle>
      <Toggle let:on={open} let:toggle>
        <div class="inline-block text-right col-start-1">
          <Popover
            {open}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            popoverOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={toggle}>Left Start</Button>
        </div>
      </Toggle>
      <Toggle let:on={open} let:toggle>
        <div class="inline-block text-left col-start-5">
          <Popover
            {open}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            popoverOrigin={{ vertical: 'top', horizontal: 'left' }}
          >
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={toggle}>Right Start</Button>
        </div>
      </Toggle>
      <Toggle let:on={open} let:toggle>
        <div class="inline-block text-right col-start-1">
          <Popover
            {open}
            anchorOrigin={{ vertical: 'center', horizontal: 'left' }}
            popoverOrigin={{ vertical: 'center', horizontal: 'right' }}
          >
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={toggle}>Left</Button>
        </div>
      </Toggle>
      <Toggle let:on={open} let:toggle>
        <div class="inline-block text-left col-start-5">
          <Popover
            {open}
            anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
            popoverOrigin={{ vertical: 'center', horizontal: 'left' }}
          >
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={toggle}>Right</Button>
        </div>
      </Toggle>
      <Toggle let:on={open} let:toggle>
        <div class="inline-block text-right col-start-1">
          <Popover
            {open}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            popoverOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={toggle}>Left End</Button>
        </div>
      </Toggle>
      <Toggle let:on={open} let:toggle>
        <div class="inline-block text-left col-start-5">
          <Popover
            {open}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            popoverOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          >
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={toggle}>Right End</Button>
        </div>
      </Toggle>
      <Toggle let:on={open} let:toggle>
        <div class="inline-block text-right col-start-2">
          <Popover
            {open}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            popoverOrigin={{ vertical: 'top', horizontal: 'left' }}
          >
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={toggle}>Bottom Start</Button>
        </div>
      </Toggle>
      <Toggle let:on={open} let:toggle>
        <div class="inline-block text-center col-start-3">
          <Popover
            {open}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            popoverOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={toggle}>Bottom</Button>
        </div>
      </Toggle>
      <Toggle let:on={open} let:toggle>
        <div class="inline-block text-left col-start-4">
          <Popover
            {open}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            popoverOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={toggle}>Bottom End</Button>
        </div>
      </Toggle>
    </div>
  </div>
</Preview>

## Custom origins

### Overlap popover on top of anchor

<Preview>
  <Toggle let:on={open} let:toggle>
    <div class="inline-block">
      <Popover
        {open}
        on:close={toggle}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        popoverOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <div class="px-8 py-8 bg-white border shadow">Contents</div>
      </Popover>
      <Button on:click={toggle}>Click me</Button>
    </div>
  </Toggle>
</Preview>

# API

<ApiDocs {api} />
