<script>
  import { mdiTrashCan } from '@mdi/js';

  import Button from '../components/Button.svelte';
  import Dialog from '../components/Dialog.svelte';
  import Preview from '../components/Preview.svelte';
  import Toggle from '../components/Toggle.svelte';
</script>

## Basic

<Preview>
  <Toggle let:on={open} let:toggle>
    <Button on:click={toggle}>Show Dialog</Button>
    <Dialog {open} on:close={toggle}>
      <div slot="title">Are you sure you want to do that?</div>
      <div slot="actions">
        <Button
          on:click={() => (open = false)}
          class="text-blue-500 hover:bg-blue-50"
        >
          Close
        </Button>
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
          on:click={() => console.log('Deleting item...')}
          class="text-red-500 hover:bg-red-50"
        >
          Yes, delete item
        </Button>
        <Button>Cancel</Button>
      </div>
    </Dialog>
  </Toggle>
</Preview>
