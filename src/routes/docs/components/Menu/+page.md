---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script>
  import { mdiMagnify } from '@mdi/js';

  import api from '$lib/components/Menu.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Button from '$lib/components/Button.svelte';
  import Dialog from '$lib/components/Dialog.svelte';
  import Drawer from '$lib/components/Drawer.svelte';
  import Menu from '$lib/components/Menu.svelte';
  import MenuItem from '$lib/components/MenuItem.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import TextField from '$lib/components/TextField.svelte';
  import Toggle from '$lib/components/Toggle.svelte';
</script>

# Examples

## Basic

<Preview>
  <Toggle let:on={open} let:toggle>
    <span>
      <Button on:click={toggle}>Click me</Button>
      <Menu {open} on:close={toggle}>
        <MenuItem>Refresh</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem>Help</MenuItem>
        <MenuItem>Sign In</MenuItem>
        <MenuItem disabled>Disabled</MenuItem>
      </Menu>
    </span>
  </Toggle>
</Preview>

## Explicit close

<Preview>
  <Toggle let:on={open} let:toggle>
    <span>
      <Button on:click={toggle}>Click me</Button>
      <Menu {open} on:close={toggle} explicitClose let:close>
        <div class="p-2">
          <TextField icon={mdiMagnify} placeholder="Search" class="mb-2" autofocus={{ delay: 50 }} />
          <MenuItem on:click={close}>Refresh</MenuItem>
          <MenuItem on:click={close}>Settings</MenuItem>
          <MenuItem on:click={close}>Help</MenuItem>
          <MenuItem on:click={close}>Sign In</MenuItem>
        </div>
      </Menu>
    </span>
  </Toggle>
</Preview>

## with Dialog and Drawer

<Preview>
  <Toggle let:on={open} let:toggle={toggleMenu} let:toggleOff={closeMenu}>
    <span>
      <Button on:click={toggleMenu}>Click me</Button>
      <Menu {open} on:close={closeMenu} explicitClose let:close>
        <MenuItem on:click={close}>Normal item</MenuItem>
        <Toggle let:on={open} let:toggle={toggleDialog} on:toggleOff={closeMenu}>
          <MenuItem on:click={toggleDialog}>Open Dialog...</MenuItem>
          <Dialog {open} on:close={toggleDialog}>
            <div slot="title">Are you sure you want to do that?</div>
            <div slot="actions">
              <Button variant="filled" color="blue">Close</Button>
            </div>
          </Dialog>
        </Toggle>
        <Toggle let:on={open} let:toggle={toggleDialog} on:toggleOff={closeMenu}>
          <MenuItem on:click={toggleDialog}>Open Persistent Dialog...</MenuItem>
          <Dialog {open} on:close={toggleDialog} persistent>
            <div slot="title">Are you sure you want to do that?</div>
            <div slot="actions">
              <Button variant="filled" color="blue">Close</Button>
            </div>
          </Dialog>
        </Toggle>
        <Toggle let:on={open} let:toggle={toggleDrawer} let:toggleOff on:toggleOff={closeMenu}>
          <MenuItem on:click={toggleDrawer}>Open Drawer...</MenuItem>
          <Drawer {open} on:close={toggleOff} right class="w-[400px]">
            <div class="fixed bottom-0 w-full flex justify-center bg-gray-500/25 p-1 border-t border-gray-400">
              <Button on:click={toggleOff}>Close</Button>
            </div>
          </Drawer>
        </Toggle>
        <Toggle let:on={open} let:toggle={toggleDrawer} let:toggleOff on:toggleOff={closeMenu}>
          <MenuItem on:click={toggleDrawer}>Open Persistent Drawer...</MenuItem>
          <Drawer {open} on:close={toggleOff} right class="w-[400px]" persistent>
            <div class="fixed bottom-0 w-full flex justify-center bg-gray-500/25 p-1 border-t border-gray-400">
              <Button on:click={toggleOff}>Close</Button>
            </div>
          </Drawer>
        </Toggle>
        <Toggle let:on={open} let:toggle={toggleDrawer} let:toggleOff on:toggleOff={closeMenu}>
          <MenuItem on:click={toggleDrawer}>Open Drawer with another Menu...</MenuItem>
          <Drawer {open} on:close={toggleOff} right class="w-[400px]">
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
            <div class="fixed bottom-0 w-full flex justify-center bg-gray-500/25 p-1 border-t border-gray-400">
              <Button on:click={toggleOff}>Close</Button>
            </div>
          </Drawer>
        </Toggle>
      </Menu>
    </span>
  </Toggle>
</Preview>

## matchWidth

<Preview>
  <Toggle let:on={open} let:toggle>
    <span>
      <Button on:click={toggle}>Click me</Button>
      <Menu {open} on:close={toggle} matchWidth>
        <MenuItem>Refresh</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem>Help</MenuItem>
        <MenuItem>Sign In</MenuItem>
      </Menu>
    </span>
  </Toggle>
</Preview>

## autoPlacement

<Preview>
  <Toggle let:on={open} let:toggle>
    <span>
      <Button on:click={toggle}>Click me</Button>
      <Menu {open} on:close={toggle} autoPlacement>
        <MenuItem>Refresh</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem>Help</MenuItem>
        <MenuItem>Sign In</MenuItem>
      </Menu>
    </span>
  </Toggle>
</Preview>

## disableTransition

### Useful when menu will exceed window and need repositioned.

<Preview>
  <Toggle let:on={open} let:toggle>
    <span>
      <Button on:click={toggle}>Click me</Button>
      <Menu {open} on:close={toggle} disableTransition>
        <MenuItem>Refresh</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem>Help</MenuItem>
        <MenuItem>Sign In</MenuItem>
      </Menu>
    </span>
  </Toggle>
</Preview>

## transition params

<Preview>
  <Toggle let:on={open} let:toggle>
    <span>
      <Button on:click={toggle}>Click me</Button>
      <Menu {open} on:close={toggle} transitionParams={{ duration: 2000 }}>
        <MenuItem>Refresh</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem>Help</MenuItem>
        <MenuItem>Sign In</MenuItem>
      </Menu>
    </span>
  </Toggle>
</Preview>

# API

<ApiDocs {api} />
