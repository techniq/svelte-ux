<script lang="ts">
  import { mdiMagnify } from '@mdi/js';

  import Button from '$lib/components/Button.svelte';
  import Dialog from '$lib/components/Dialog.svelte';
  import Drawer from '$lib/components/Drawer.svelte';
  import Menu from '$lib/components/Menu.svelte';
  import MenuItem from '$lib/components/MenuItem.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import TextField from '$lib/components/TextField.svelte';
  import Toggle from '$lib/components/Toggle.svelte';
</script>

<h1>Examples</h1>

<h2>Basic</h2>

<Preview>
  <Toggle let:on={open} let:toggle>
    <Button on:click={toggle}>
      Click me
      <Menu {open} on:close={toggle}>
        <MenuItem>Refresh</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem>Help</MenuItem>
        <MenuItem>Sign In</MenuItem>
        <MenuItem disabled>Disabled</MenuItem>
      </Menu>
    </Button>
  </Toggle>
</Preview>

<h2>Explicit close</h2>

<Preview>
  <Toggle let:on={open} let:toggle>
    <Button on:click={toggle}>
      Click me
      <Menu {open} on:close={toggle} explicitClose let:close>
        <div class="p-2">
          <TextField
            icon={mdiMagnify}
            placeholder="Search"
            class="mb-2"
            autofocus={{ delay: 50 }}
          />
          <MenuItem on:click={close}>Refresh</MenuItem>
          <MenuItem on:click={close}>Settings</MenuItem>
          <MenuItem on:click={close}>Help</MenuItem>
          <MenuItem on:click={close}>Sign In</MenuItem>
        </div>
      </Menu>
    </Button>
  </Toggle>
</Preview>

<h2>with Dialog and Drawer</h2>

<Preview>
  <Toggle let:on={open} let:toggle={toggleMenu} let:toggleOff={closeMenu}>
    <Button on:click={toggleMenu}>
      Click me
      <Menu {open} on:close={closeMenu} explicitClose let:close>
        <MenuItem on:click={close}>Normal item</MenuItem>
        <Toggle let:on={open} let:toggle={toggleDialog} on:toggleOff={closeMenu}>
          <MenuItem on:click={toggleDialog}>Open Dialog...</MenuItem>
          <Dialog {open} on:close={toggleDialog}>
            <div slot="title">Are you sure you want to do that?</div>
            <div slot="actions">
              <Button variant="fill" color="primary">Close</Button>
            </div>
          </Dialog>
        </Toggle>

        <Toggle let:on={open} let:toggle={toggleDialog} on:toggleOff={closeMenu}>
          <MenuItem on:click={toggleDialog}>Open Persistent Dialog...</MenuItem>
          <Dialog {open} on:close={toggleDialog} persistent>
            <div slot="title">Are you sure you want to do that?</div>
            <div slot="actions">
              <Button variant="fill" color="primary">Close</Button>
            </div>
          </Dialog>
        </Toggle>

        <Toggle let:on={open} let:toggle={toggleDrawer} let:toggleOff on:toggleOff={closeMenu}>
          <MenuItem on:click={toggleDrawer}>Open Drawer...</MenuItem>
          <Drawer {open} on:close={toggleOff} class="w-[400px]">
            <div slot="actions">
              <Button on:click={toggleOff}>Close</Button>
            </div>
          </Drawer>
        </Toggle>

        <Toggle let:on={open} let:toggle={toggleDrawer} let:toggleOff on:toggleOff={closeMenu}>
          <MenuItem on:click={toggleDrawer}>Open Persistent Drawer...</MenuItem>
          <Drawer {open} on:close={toggleOff} class="w-[400px]" persistent>
            <div slot="actions">
              <Button on:click={toggleOff}>Close</Button>
            </div>
          </Drawer>
        </Toggle>

        <Toggle let:on={open} let:toggle={toggleDrawer} let:toggleOff on:toggleOff={closeMenu}>
          <MenuItem on:click={toggleDrawer}>Open Drawer with another Menu...</MenuItem>
          <Drawer {open} on:close={toggleOff} class="w-[400px]">
            <Toggle let:on={open} let:toggle>
              <span>
                <Button on:click={toggle}>Click me</Button>
                <Menu {open} on:close={toggle}>
                  <MenuItem>Refresh</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuItem>Help</MenuItem>
                  <MenuItem>Sign In</MenuItem>
                </Menu>
              </span>
            </Toggle>
            <div slot="actions">
              <Button on:click={toggleOff}>Close</Button>
            </div>
          </Drawer>
        </Toggle>
      </Menu>
    </Button>
  </Toggle>
</Preview>

<h2>matchWidth</h2>

<Preview>
  <Toggle let:on={open} let:toggle>
    <Button on:click={toggle}>
      Click me
      <Menu {open} on:close={toggle} matchWidth>
        <MenuItem>Refresh</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem>Help</MenuItem>
        <MenuItem>Sign In</MenuItem>
      </Menu>
    </Button>
  </Toggle>
</Preview>

<h2>autoPlacement</h2>

<Preview>
  <Toggle let:on={open} let:toggle>
    <Button on:click={toggle}>
      Click me
      <Menu {open} on:close={toggle} autoPlacement>
        <MenuItem>Refresh</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem>Help</MenuItem>
        <MenuItem>Sign In</MenuItem>
      </Menu>
    </Button>
  </Toggle>
</Preview>

<h2>disableTransition</h2>

<h3>Useful when menu will exceed window and need repositioned.</h3>

<Preview>
  <Toggle let:on={open} let:toggle>
    <Button on:click={toggle}>
      Click me
      <Menu {open} on:close={toggle} disableTransition>
        <MenuItem>Refresh</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem>Help</MenuItem>
        <MenuItem>Sign In</MenuItem>
      </Menu>
    </Button>
  </Toggle>
</Preview>

<h2>transition params</h2>

<Preview>
  <Toggle let:on={open} let:toggle>
    <Button on:click={toggle}>
      Click me
      <Menu {open} on:close={toggle} transitionParams={{ duration: 2000 }}>
        <MenuItem>Refresh</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem>Help</MenuItem>
        <MenuItem>Sign In</MenuItem>
      </Menu>
    </Button>
  </Toggle>
</Preview>
