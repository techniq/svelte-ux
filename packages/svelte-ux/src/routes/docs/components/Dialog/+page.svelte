<script lang="ts">
  import { mdiTrashCan } from '@mdi/js';

  import { Button, Dialog, TextField, Toggle } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';

  let open = $state(false);
  let openAsync = $state(false);
  let loading = $state(false);
</script>

<h1>Examples</h1>

<h2>Basic</h2>

<Preview>
  <Button onclick={() => (open = true)}>Show Dialog</Button>
  <Dialog bind:open>
    {#snippet title()}
      <div>Are you sure you want to do that?</div>
    {/snippet}
    {#snippet actions()}
      <div>
        <Button variant="fill" color="primary">Close</Button>
      </div>
    {/snippet}
  </Dialog>
</Preview>

<h2>Basic (with Toggle)</h2>

<Preview>
  <Toggle>
    {#snippet children({ on: open, toggle, toggleOff })}
      <Button onclick={toggle}>Show Dialog</Button>
      <Dialog {open} onClose={toggleOff}>
        {#snippet title()}
          <div>Are you sure you want to do that?</div>
        {/snippet}
        {#snippet actions()}
          <div>
            <Button variant="fill" color="primary">Close</Button>
          </div>
        {/snippet}
      </Dialog>
    {/snippet}
  </Toggle>
</Preview>

<h2>Async</h2>

<Preview>
  <Button onclick={() => (openAsync = true)}>Show Dialog</Button>
  <Dialog bind:open={openAsync} {loading} persistent={loading}>
    {#snippet title()}
      <div>Are you sure you want to do that?</div>
    {/snippet}
    {#snippet actions()}
      <div>
        <Button
          onclick={(e) => {
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
    {/snippet}
  </Dialog>
</Preview>

<h2>Async (with Toggle)</h2>

<Preview>
  <Toggle>
    {#snippet children({ on: open, toggleOn, toggleOff })}
      <Button onclick={toggleOn}>Show Dialog</Button>
      <Dialog {open} onClose={toggleOff} {loading} persistent={loading}>
        {#snippet title()}
          <div>Are you sure you want to do that?</div>
        {/snippet}
        {#snippet actions()}
          <div>
            <Button
              onclick={(e) => {
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
        {/snippet}
      </Dialog>
    {/snippet}
  </Toggle>
</Preview>

<h2>Confirmation dialog</h2>

<Preview>
  <Toggle>
    {#snippet children({ on: open, toggle, toggleOff })}
      <Button icon={mdiTrashCan} onclick={toggle} color="danger">Delete</Button>
      <Dialog {open} onClose={toggleOff}>
        {#snippet title()}
          <div>Are you sure?</div>
        {/snippet}
        <div class="px-6 py-3">This will permanently delete the item and can not be undone.</div>
        {#snippet actions()}
          <div>
            <Button
              onclick={() => {
                console.log('Deleting item...');
              }}
              variant="fill"
              color="danger"
            >
              Yes, delete item
            </Button>
            <Button>Cancel</Button>
          </div>
        {/snippet}
      </Dialog>
    {/snippet}
  </Toggle>
</Preview>

<h2>Dialog in Dialog</h2>

<Preview>
  <Toggle>
    {#snippet children({ on: open, toggleOn: toggleDeleteOn, toggleOff: toggleDeleteOff })}
      <Button icon={mdiTrashCan} onclick={toggleDeleteOn} color="danger">Delete</Button>
      <Dialog {open} onClose={toggleDeleteOff}>
        {#snippet title()}
          <div>Delete this item ?</div>
        {/snippet}
        <div class="px-6 py-3">This will permanently delete the item</div>
        {#snippet actions()}
          <div>
            <Toggle>
              {#snippet children({
                on: openSecond,
                toggle: toggleConfirm,
                toggleOff: toggleConfirmOff,
              })}
                <Button
                  icon={mdiTrashCan}
                  onclick={(e) => {
                    e.stopPropagation();
                    toggleConfirm();
                  }}
                  color="danger"
                  variant="fill"
                >
                  Yes
                </Button>
                <Dialog open={openSecond} onClose={toggleConfirmOff}>
                  {#snippet title()}
                    <div>Are you <b>REALLY</b> sure?</div>
                  {/snippet}
                  <div class="px-6 py-3">
                    This will permanently delete the item and can not be undone.
                  </div>
                  {#snippet actions()}
                    <div>
                      <Button
                        onclick={(e) => {
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
                  {/snippet}
                </Dialog>
              {/snippet}
            </Toggle>

            <Button>Cancel</Button>
          </div>
        {/snippet}
      </Dialog>
    {/snippet}
  </Toggle>
</Preview>

<h2>Loading</h2>

<Preview>
  <Toggle>
    {#snippet children({ on: open, toggle, toggleOff })}
      <Button onclick={toggle}>Show Dialog</Button>
      <Dialog {open} onClose={toggleOff} loading>
        {#snippet title()}
          <div>Are you sure you want to do that?</div>
        {/snippet}
        {#snippet actions()}
          <div>
            <Button variant="fill" color="primary">Close</Button>
          </div>
        {/snippet}
      </Dialog>
    {/snippet}
  </Toggle>
</Preview>

<h2>Persistent</h2>

<Preview>
  <Toggle>
    {#snippet children({ on: open, toggle, toggleOff })}
      <Button onclick={toggle}>Show Dialog</Button>
      <Dialog {open} persistent>
        {#snippet title()}
          <div>Are you sure you want to do that?</div>
        {/snippet}
        {#snippet actions()}
          <div>
            <Button variant="fill" color="primary" onclick={toggleOff}
              >Yes, close this dialog</Button
            >
            <Button>No, keep this dialog open</Button>
          </div>
        {/snippet}
      </Dialog>
    {/snippet}
  </Toggle>
</Preview>

<h2>With close slot prop</h2>

<Preview>
  <Toggle>
    {#snippet children({ on: open, toggle, toggleOff })}
      <Button onclick={toggle}>Show Dialog</Button>
      <Dialog
        {open}
        persistent
        onClose={() => {
          if (open) {
            alert(
              "Persistent Dialog forced close via 'close({ force: true })'.\n\nDialog will close."
            );
          }
          toggleOff();
        }}
        onCloseAttempt={() => {
          alert(
            "Attempted to close persistent Dialog without using 'force'\n\nUse 'close({ force: true })' instead of Use 'close()' to close.\n\nDialog will remain open."
          );
        }}
      >
        {#snippet children({ close })}
          <div class="p-5">
            <div class="mb-4">
              The <span
                class="font-mono bg-primary-700/20 text-primary-500 font-medium px-1 py-0.5 rounded"
                >close</span
              > method is available on every slot.
            </div>
            <div class="grid gap-2">
              <Button variant="fill" color="primary" onclick={() => close()}
                >Attempt close: <code>close()</code></Button
              >
              <Button variant="fill" color="primary" onclick={() => close({ force: true })}
                >Force close: <code>close({'{ force: true }'})</code></Button
              >
            </div>
          </div>
        {/snippet}
      </Dialog>
    {/snippet}
  </Toggle>
</Preview>

<h2>With autofocus TextField</h2>

<Preview>
  <Toggle>
    {#snippet children({ on: open, toggle, toggleOff })}
      <Button onclick={toggle}>Show Dialog</Button>
      <Dialog {open} onClose={toggleOff}>
        {#snippet title()}
          <div>How old are you?</div>
        {/snippet}
        <div class="p-2">
          <TextField label="Age" autofocus />
        </div>
        {#snippet actions()}
          <div>
            <Button variant="fill" color="primary">OK</Button>
            <Button>Cancel</Button>
          </div>
        {/snippet}
      </Dialog>
    {/snippet}
  </Toggle>
</Preview>

<h2>Disabled action</h2>

<Preview>
  <Toggle>
    {#snippet children({ on: open, toggle, toggleOff })}
      <Button onclick={toggle}>Show Dialog</Button>
      <Dialog {open} onClose={toggleOff}>
        {#snippet title()}
          <div>Are you sure you want to do that?</div>
        {/snippet}
        {#snippet actions()}
          <div>
            <Button variant="fill" color="primary" disabled>Don't touch</Button>
            <Button>Close</Button>
          </div>
        {/snippet}
      </Dialog>
    {/snippet}
  </Toggle>
</Preview>
