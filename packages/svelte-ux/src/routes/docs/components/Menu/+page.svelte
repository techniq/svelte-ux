<script lang="ts">
  import { mdiMagnify } from '@mdi/js';

  import { Button, Dialog, Drawer, Menu, MenuItem, TextField, Toggle } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';
</script>

<h1>Examples</h1>

<h2>Basic</h2>

<Preview>
  <Toggle>
    {#snippet children({ on: open, toggle, toggleOff })}
      <Button onclick={toggle}>
        Click me
        <Menu {open} onClose={toggleOff}>
          <MenuItem>Refresh</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Help</MenuItem>
          <MenuItem>Sign In</MenuItem>
          <MenuItem disabled>Disabled</MenuItem>
        </Menu>
      </Button>
    {/snippet}
  </Toggle>
</Preview>

<h2>Explicit close</h2>

<Preview>
  <Toggle>
    {#snippet children({ on: open, toggle, toggleOff })}
      <Button onclick={toggle}>
        Click me
        <Menu {open} onClose={toggleOff} explicitClose>
          {#snippet children({ close })}
            <div class="p-2">
              <!-- Add autofocus delay to keep the opening transition smooth  -->
              <TextField
                icon={mdiMagnify}
                placeholder="Search"
                class="mb-2"
                autofocus={{ delay: 50 }}
              />
              <MenuItem onclick={close}>Refresh</MenuItem>
              <MenuItem onclick={close}>Settings</MenuItem>
              <MenuItem onclick={close}>Help</MenuItem>
              <MenuItem onclick={close}>Sign In</MenuItem>
            </div>
          {/snippet}
        </Menu>
      </Button>
    {/snippet}
  </Toggle>
</Preview>

<h2>with Dialog and Drawer</h2>

<Preview>
  <Toggle>
    {#snippet children({ on: open, toggle: toggleMenu, toggleOff: closeMenu })}
      <Button onclick={toggleMenu}>
        Click me
        <Menu {open} onClose={closeMenu} explicitClose>
          {#snippet children({ close })}
            <MenuItem onclick={close}>Normal item</MenuItem>
            <Toggle>
              {#snippet children({ on: open, toggle: toggleDialog, toggleOff: closeMenu })}
                <MenuItem onclick={toggleDialog}>Open Dialog...</MenuItem>
                <Dialog {open} onClose={toggleDialog}>
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

            <Toggle>
              {#snippet children({ on: open, toggle: toggleDialog, toggleOff: closeMenu })}
                <MenuItem onclick={toggleDialog}>Open Persistent Dialog...</MenuItem>
                <Dialog {open} onClose={toggleDialog} persistent>
                  {#snippet title()}
                    <div>Are you sure you want to do that?</div>
                  {/snippet}
                  {#snippet actions({ close })}
                    <div>
                      <Button variant="fill" color="primary" onclick={() => close({ force: true })}>
                        Close
                      </Button>
                    </div>
                  {/snippet}
                </Dialog>
              {/snippet}
            </Toggle>

            <Toggle onToggleOff={closeMenu}>
              {#snippet children({ on: open, toggle: toggleDrawer, toggleOff })}
                <MenuItem onclick={toggleDrawer}>Open Drawer...</MenuItem>
                <Drawer {open} onClose={toggleOff} class="w-[400px]">
                  {#snippet actions()}
                    <div>
                      <Button onclick={toggleOff}>Close</Button>
                    </div>
                  {/snippet}
                </Drawer>
              {/snippet}
            </Toggle>

            <Toggle onToggleOff={closeMenu}>
              {#snippet children({ on: open, toggle: toggleDrawer, toggleOff })}
                <MenuItem onclick={toggleDrawer}>Open Persistent Drawer...</MenuItem>
                <Drawer {open} onClose={toggleOff} class="w-[400px]" persistent>
                  {#snippet actions({ close })}
                    <div>
                      <Button onclick={() => close({ force: true })}>Close</Button>
                    </div>
                  {/snippet}
                </Drawer>
              {/snippet}
            </Toggle>

            <Toggle onToggleOff={closeMenu}>
              {#snippet children({ on: open, toggle: toggleDrawer, toggleOff })}
                <MenuItem onclick={toggleDrawer}>Open Drawer with another Menu...</MenuItem>
                <Drawer {open} onClose={toggleOff} class="w-[400px]">
                  <Toggle>
                    {#snippet children({ on: open, toggle, toggleOff })}
                      <span>
                        <Button onclick={toggle}>Click me</Button>
                        <Menu {open} onClose={toggleOff}>
                          <MenuItem>Refresh</MenuItem>
                          <MenuItem>Settings</MenuItem>
                          <MenuItem>Help</MenuItem>
                          <MenuItem>Sign In</MenuItem>
                        </Menu>
                      </span>
                    {/snippet}
                  </Toggle>
                  {#snippet actions()}
                    <div>
                      <Button onclick={toggleOff}>Close</Button>
                    </div>
                  {/snippet}
                </Drawer>
              {/snippet}
            </Toggle>
          {/snippet}
        </Menu>
      </Button>
    {/snippet}
  </Toggle>
</Preview>

<h2>matchWidth</h2>

<Preview>
  <Toggle>
    {#snippet children({ on: open, toggle, toggleOff })}
      <Button onclick={toggle}>
        Click me
        <Menu {open} onClose={toggleOff} matchWidth>
          <MenuItem>Refresh</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Help</MenuItem>
          <MenuItem>Sign In</MenuItem>
        </Menu>
      </Button>
    {/snippet}
  </Toggle>
</Preview>

<h2>autoPlacement</h2>

<Preview>
  <Toggle>
    {#snippet children({ on: open, toggle, toggleOff })}
      <Button onclick={toggle}>
        Click me
        <Menu {open} onClose={toggleOff} autoPlacement>
          <MenuItem>Refresh</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Help</MenuItem>
          <MenuItem>Sign In</MenuItem>
        </Menu>
      </Button>
    {/snippet}
  </Toggle>
</Preview>

<h2>explicit placement</h2>

<Preview>
  <Toggle>
    {#snippet children({ on: open, toggle, toggleOff })}
      <Button onclick={toggle}>
        Click me
        <Menu {open} onClose={toggleOff} placement="right-start">
          <MenuItem>Refresh</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Help</MenuItem>
          <MenuItem>Sign In</MenuItem>
        </Menu>
      </Button>
    {/snippet}
  </Toggle>
</Preview>

<h2>disableTransition</h2>

<h3>Useful when menu will exceed window and need repositioned.</h3>

<Preview>
  <Toggle>
    {#snippet children({ on: open, toggle, toggleOff })}
      <Button onclick={toggle}>
        Click me
        <Menu {open} onClose={toggleOff} disableTransition>
          <MenuItem>Refresh</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Help</MenuItem>
          <MenuItem>Sign In</MenuItem>
        </Menu>
      </Button>
    {/snippet}
  </Toggle>
</Preview>

<h2>transition params</h2>

<Preview>
  <Toggle>
    {#snippet children({ on: open, toggle, toggleOff })}
      <Button onclick={toggle}>
        Click me
        <Menu {open} onClose={toggleOff} transitionParams={{ duration: 2000 }}>
          <MenuItem>Refresh</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Help</MenuItem>
          <MenuItem>Sign In</MenuItem>
        </Menu>
      </Button>
    {/snippet}
  </Toggle>
</Preview>
