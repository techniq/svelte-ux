<script>
  import { mdiTrashCan } from '@mdi/js';

  import Button from '$lib/components/Button.svelte';
  import Dialog from '$lib/components/Dialog.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import Toggle from '$lib/components/Toggle.svelte';

  let open = false;
  let openAsync = false;
  let loading = false;
</script>

## Basic

<Preview>
  <Button on:click={() => open = true}>Show Dialog</Button>
  <Dialog bind:open>
    <div slot="title">Are you sure you want to do that?</div>
    <div slot="actions">
      <Button class="text-blue-500">
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
        <Button class="text-blue-500">
          Close
        </Button>
      </div>
    </Dialog>
  </Toggle>
</Preview>

## Async

<Preview>
  <Button on:click={() => openAsync = true}>Show Dialog</Button>
  <Dialog bind:open={openAsync} {loading}>
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
        class="text-blue-500"
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
    <Dialog {open} on:close={toggleOff} {loading}>
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
          class="text-blue-500"
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
          class="text-red-500"
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
        <Button class="text-blue-500">
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
        <Button class="text-blue-500">Yes</Button>
        <Button>No</Button>
      </div>
    </Dialog>
  </Toggle>
</Preview>
