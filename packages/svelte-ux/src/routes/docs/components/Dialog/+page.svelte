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
  <Toggle let:on={open} let:toggle let:toggleOff>
    <Button on:click={toggle}>Show Dialog</Button>
    <Dialog {open} on:close={toggleOff}>
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
  <Toggle let:on={open} let:toggle let:toggleOff>
    <Button icon={mdiTrashCan} on:click={toggle} color="danger">Delete</Button>
    <Dialog {open} on:close={toggleOff}>
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
  <Toggle let:on={open} let:toggleOn={toggleDeleteOn} let:toggleOff={toggleDeleteOff}>
    <Button icon={mdiTrashCan} on:click={toggleDeleteOn} color="danger">Delete</Button>
    <Dialog {open} on:close={toggleDeleteOff}>
      <div slot="title">Delete this item ?</div>
      <div class="px-6 py-3">This will permanently delete the item</div>
      <div slot="actions">
        <Toggle let:on={openSecond} let:toggle={toggleConfirm} let:toggleOff={toggleConfirmOff}>
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
          <Dialog open={openSecond} on:close={toggleConfirmOff}>
            <div slot="title">Are you <b>REALLY</b> sure?</div>
            <div class="px-6 py-3">
              This will permanently delete the item and can not be undone.
            </div>
            <div slot="actions">
              <Button
                on:click={(e) => {
                  console.log('Deleting item...');
                  toggleConfirmOff();
                  toggleDeleteOff();
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
  <Toggle let:on={open} let:toggle let:toggleOff>
    <Button on:click={toggle}>Show Dialog</Button>
    <Dialog {open} on:close={toggleOff} loading>
      <div slot="title">Are you sure you want to do that?</div>
      <div slot="actions">
        <Button variant="fill" color="primary">Close</Button>
      </div>
    </Dialog>
  </Toggle>
</Preview>

<h2>Persistent</h2>

<Preview>
  <Toggle let:on={open} let:toggle let:toggleOff>
    <Button on:click={toggle}>Show Dialog</Button>
    <Dialog {open} persistent>
      <div slot="title">Are you sure you want to do that?</div>
      <div slot="actions">
        <Button variant="fill" color="primary" on:click={toggleOff}>Yes, close this dialog</Button>
        <Button>No, keep this dialog open</Button>
      </div>
    </Dialog>
  </Toggle>
</Preview>

<h2>With close slot prop</h2>

<Preview>
  <Toggle let:on={open} let:toggle let:toggleOff>
    <Button on:click={toggle}>Show Dialog</Button>
    <Dialog
      {open}
      persistent
      let:close
      on:close={() => {
        if (open) {
          alert(
            "Persistent Dialog forced close via 'close({ force: true })'.\n\nDialog will close."
          );
        }
        toggleOff();
      }}
      on:closeAttempt={() => {
        alert(
          "Attempted to close persistent Dialog without using 'force'\n\nUse 'close({ force: true })' instead of Use 'close()' to close.\n\nDialog will remain open."
        );
      }}
    >
      <div class="p-5">
        <div class="mb-4">
          The <span
            class="font-mono bg-primary-700/20 text-primary-500 font-medium px-1 py-0.5 rounded"
            >close</span
          > method is available on every slot.
        </div>
        <div class="grid gap-2">
          <Button variant="fill" color="primary" on:click={() => close()}
            >Attempt close: <code>close()</code></Button
          >
          <Button variant="fill" color="primary" on:click={() => close({ force: true })}
            >Force close: <code>close({'{ force: true }'})</code></Button
          >
        </div>
      </div>
    </Dialog>
  </Toggle>
</Preview>

<h2>With autofocus TextField</h2>

<Preview>
  <Toggle let:on={open} let:toggle let:toggleOff>
    <Button on:click={toggle}>Show Dialog</Button>
    <Dialog {open} on:close={toggleOff}>
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
  <Toggle let:on={open} let:toggle let:toggleOff>
    <Button on:click={toggle}>Show Dialog</Button>
    <Dialog {open} on:close={toggleOff}>
      <div slot="title">Are you sure you want to do that?</div>
      <div slot="actions">
        <Button variant="fill" color="primary" disabled>Don't touch</Button>
        <Button>Close</Button>
      </div>
    </Dialog>
  </Toggle>
</Preview>
