<script>
  import { Button, Dialog, TextField, Toggle, createTheme, format } from 'svelte-ux';

  createTheme({
    // Button: 'text-blue-500',
    // Button: {
    // 	root: 'btn btn-primary'
    // },
    TextField: {
      container: 'input input-border',
      // container: 'hover:shadow-none group-focus-within:shadow-none' // same as <TextField classes={{ container: '...' }}>
    },
  });

  let loading = false;

  let open = false;
</script>

<h1 class="text-3xl">Welcome to SvelteKit</h1>

<div class="flex flex-col gap-4 w-fit">
  <div>{format(1234.56, 'currency')}</div>

  <Button {loading} on:click={() => (loading = !loading)} color="accent" variant="fill-light">
    Click To Load!
  </Button>

  <TextField label="Name" placeholder="JYC">
    <svelte:fragment slot="suffix">mm</svelte:fragment>
  </TextField>

  <Toggle let:on={open} let:toggle>
    <Button on:click={toggle} color="red">Delete</Button>
    <Dialog {open} on:close={toggle}>
      <div slot="title">Are you sure?</div>
      <div class="px-6 py-3">This will permanently delete the item and can not be undone.</div>
      <div slot="actions">
        <Button
          on:click={() => {
            console.log('Deleting item...');
          }}
          variant="fill"
          color="red"
        >
          Yes, delete item
        </Button>
        <Button>Cancel</Button>
      </div>
    </Dialog>
  </Toggle>
</div>
