<script lang="ts">
  import { mdiTrashCan } from '@mdi/js';

  import { Button, Dialog, TextField, Toggle } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';

  let open = false;
  let openAsync = false;
  let loading = false;
</script>

<h1>Examples</h1>

<h2>Basic</h2>

<Preview>
  <Button on:click={() => (open = true)}>Show Dialog</Button>
  <Dialog bind:open>
    <div slot="title">Are you sure you want to do that?</div>
    <div slot="actions">
      <Button variant="fill" color="primary">Close</Button>
    </div>
  </Dialog>
</Preview>

<h2>Basic (with Toggle)</h2>

<Preview>
  <Toggle let:on={open} let:toggle>
    <Button on:click={toggle}>Show Dialog</Button>
    <Dialog {open} on:close={toggle}>
      <div slot="title">Are you sure you want to do that?</div>
      <div slot="actions">
        <Button variant="fill" color="primary">Close</Button>
      </div>
    </Dialog>
  </Toggle>
</Preview>

<h2>Async</h2>

<Preview>
  <Button on:click={() => (openAsync = true)}>Show Dialog</Button>
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
            openAsync = false;
          }, 1000);
        }}
        variant="fill"
        color="primary"
      >
        Save
      </Button>
      <Button>Cancel</Button>
    </div>
  </Dialog>
</Preview>

<h2>Async (with Toggle)</h2>

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
            }, 1000);
          }}
          variant="fill"
          color="primary"
        >
          Save
        </Button>
        <Button>Cancel</Button>
      </div>
    </Dialog>
  </Toggle>
</Preview>

<h2>Confirmation dialog</h2>

<Preview>
  <Toggle let:on={open} let:toggle>
    <Button icon={mdiTrashCan} on:click={toggle} color="danger">Delete</Button>
    <Dialog {open} on:close={toggle}>
      <div slot="title">Are you sure?</div>
      <div class="px-6 py-3">This will permanently delete the item and can not be undone.</div>
      <div slot="actions">
        <Button
          on:click={() => {
            console.log('Deleting item...');
          }}
          variant="fill"
          color="danger"
        >
          Yes, delete item
        </Button>
        <Button>Cancel</Button>
      </div>
    </Dialog>
  </Toggle>
</Preview>

<h2>Dialog in Dialog</h2>

<Preview>
  <Toggle let:on={open} let:toggle={toggleDelete}>
    <Button icon={mdiTrashCan} on:click={toggleDelete} color="danger">Delete</Button>
    <Dialog {open}>
      <div slot="title">Delete this item ?</div>
      <div class="px-6 py-3">This will permanently delete the item</div>
      <div slot="actions">
        <Toggle let:on={openSecond} let:toggle={toggleConfirm}>
          <Button
            icon={mdiTrashCan}
            on:click={(e) => {
              e.stopPropagation();
              toggleConfirm();
            }}
            color="danger"
            variant="fill"
          >
            Yes
          </Button>
          <Dialog open={openSecond} on:close={toggleConfirm}>
            <div slot="title">Are you <b>REALLY</b> sure?</div>
            <div class="px-6 py-3">
              This will permanently delete the item and can not be undone.
            </div>
            <div slot="actions">
              <Button
                on:click={(e) => {
                  console.log('Deleting item...');
                  toggleConfirm();
                  toggleDelete();
                }}
                variant="fill"
                color="danger"
              >
                Yes, delete item
              </Button>
              <Button>Cancel</Button>
            </div>
          </Dialog>
        </Toggle>

        <Button>Cancel</Button>
      </div>
    </Dialog>
  </Toggle>
</Preview>

<h2>Loading</h2>

<Preview>
  <Toggle let:on={open} let:toggle>
    <Button on:click={toggle}>Show Dialog</Button>
    <Dialog {open} on:close={toggle} loading>
      <div slot="title">Are you sure you want to do that?</div>
      <div slot="actions">
        <Button variant="fill" color="primary">Close</Button>
      </div>
    </Dialog>
  </Toggle>
</Preview>

<h2>Persistent</h2>

<Preview>
  <Toggle let:on={open} let:toggle>
    <Button on:click={toggle}>Show Dialog</Button>
    <Dialog {open} on:close={toggle} persistent>
      <div slot="title">Are you sure you want to do that?</div>
      <div slot="actions">
        <Button variant="fill" color="primary">Yes</Button>
        <Button>No</Button>
      </div>
    </Dialog>
  </Toggle>
</Preview>

<h2>With autofocus TextField</h2>

<Preview>
  <Toggle let:on={open} let:toggle>
    <Button on:click={toggle}>Show Dialog</Button>
    <Dialog {open} on:close={toggle}>
      <div slot="title">How old are you?</div>
      <div class="p-2">
        <TextField label="Age" autofocus />
      </div>
      <div slot="actions">
        <Button variant="fill" color="primary">OK</Button>
        <Button>Cancel</Button>
      </div>
    </Dialog>
  </Toggle>
</Preview>

<h2>Disabled action</h2>

<Preview>
  <Toggle let:on={open} let:toggle>
    <Button on:click={toggle}>Show Dialog</Button>
    <Dialog {open} on:close={toggle}>
      <div slot="title">Are you sure you want to do that?</div>
      <div slot="actions">
        <Button variant="fill" color="primary" disabled>Don't touch</Button>
        <Button>Close</Button>
      </div>
    </Dialog>
  </Toggle>
</Preview>
