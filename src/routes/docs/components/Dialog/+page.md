---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script>
  import { mdiTrashCan } from '@mdi/js';

  import api from '$lib/components/Dialog.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Button from '$lib/components/Button.svelte';
  import Dialog from '$lib/components/Dialog.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import TextField from '$lib/components/TextField.svelte';
  import Toggle from '$lib/components/Toggle.svelte';

  let open = false;
  let openAsync = false;
  let loading = false;
</script>

# Examples

## Basic

<Preview>
  <Button on:click={() => open = true}>Show Dialog</Button>
  <Dialog bind:open>
    <div slot="title">Are you sure you want to do that?</div>
    <div slot="actions">
      <Button variant="filled" color="blue">
        Close
      </Button>
    </div>
  </Dialog>
</Preview>

## Basic (with Toggle)

<Preview>
  <Toggle let:on={open} let:toggle>
    <Button on:click={toggle}>Show Dialog</Button>
    <Dialog {open} on:close={toggle}>
      <div slot="title">Are you sure you want to do that?</div>
      <div slot="actions">
        <Button variant="filled" color="blue">
          Close
        </Button>
      </div>
    </Dialog>
  </Toggle>
</Preview>

## Async

<Preview>
  <Button on:click={() => openAsync = true}>Show Dialog</Button>
  <Dialog bind:open={openAsync} {loading} persistent={loading}>
    <div slot="title">Are you sure you want to do that?</div>
    <div slot="actions">
      <Button
        on:click={(e) => {
            // Wait for response before closing (done explicitly)
          e.stopPropagation();
          loading = true;
          setTimeout(() => {
            loading = false;
            openAsync = false
          }, 1000)
        }}
        variant="filled" color="blue"
      >
        Save
      </Button>
      <Button>Cancel</Button>
    </div>
  </Dialog>
</Preview>

## Async (with Toggle)

<Preview>
  <Toggle let:on={open} let:toggleOn let:toggleOff>
    <Button on:click={toggleOn}>Show Dialog</Button>
    <Dialog {open} on:close={toggleOff} {loading} persistent={loading}>
      <div slot="title">Are you sure you want to do that?</div>
      <div slot="actions">
        <Button
          on:click={(e) => {
            // Wait for response before closing (done explicitly)
            e.stopPropagation();
            loading = true;
            setTimeout(() => {
              loading = false;
              toggleOff();
            }, 1000)
          }}
          variant="filled" color="blue"
        >
          Save
        </Button>
        <Button>Cancel</Button>
      </div>
    </Dialog>
  </Toggle>
</Preview>

## Confirmation dialog

<Preview>
  <Toggle let:on={open} let:toggle>
    <Button icon={mdiTrashCan} on:click={toggle} class="text-red-500">
      Delete
    </Button>
    <Dialog {open} on:close={toggle}>
      <div slot="title">Are you sure?</div>
      <div class="px-6 py-3">
        This will permanently delete the item and can not be undone.
      </div>
      <div slot="actions">
        <Button
          on:click={() => { console.log('Deleting item...') }}
          class="bg-red-500 text-white hover:bg-red-600"
        >
          Yes, delete item
        </Button>
        <Button>Cancel</Button>
      </div>
    </Dialog>
  </Toggle>
</Preview>

## Loading

<Preview>
  <Toggle let:on={open} let:toggle>
    <Button on:click={toggle}>Show Dialog</Button>
    <Dialog {open} on:close={toggle} loading>
      <div slot="title">Are you sure you want to do that?</div>
      <div slot="actions">
        <Button variant="filled" color="blue">
          Close
        </Button>
      </div>
    </Dialog>
  </Toggle>
</Preview>

## Persistent

<Preview>
  <Toggle let:on={open} let:toggle>
    <Button on:click={toggle}>Show Dialog</Button>
    <Dialog {open} on:close={toggle} persistent>
      <div slot="title">Are you sure you want to do that?</div>
      <div slot="actions">
        <Button variant="filled" color="blue">Yes</Button>
        <Button>No</Button>
      </div>
    </Dialog>
  </Toggle>
</Preview>

## With autofocus TextField

<Preview>
  <Toggle let:on={open} let:toggle>
    <Button on:click={toggle}>Show Dialog</Button>
    <Dialog {open} on:close={toggle}>
      <div slot="title">How old are you?</div>
      <div class="p-2">
        <TextField label="Age" autofocus />
      </div>
      <div slot="actions">
        <Button variant="filled" color="blue">OK</Button>
        <Button>Cancel</Button>
      </div>
    </Dialog>
  </Toggle>
</Preview>

## Disabled action

<Preview>
  <Toggle let:on={open} let:toggle>
    <Button on:click={toggle}>Show Dialog</Button>
    <Dialog {open} on:close={toggle}>
      <div slot="title">Are you sure you want to do that?</div>
      <div slot="actions">
        <Button variant="filled" color="blue" disabled>
          Don't touch
        </Button>
        <Button>
          Close
        </Button>
      </div>
    </Dialog>
  </Toggle>
</Preview>

# API

<ApiDocs {api} />
