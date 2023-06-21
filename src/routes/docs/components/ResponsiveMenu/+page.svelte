<script lang="ts">
  import { mdiMagnify } from '@mdi/js';

  import api from '$lib/components/ResponsiveMenu.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Button from '$lib/components/Button.svelte';
  import Dialog from '$lib/components/Dialog.svelte';
  import Drawer from '$lib/components/Drawer.svelte';
  import MenuItem from '$lib/components/MenuItem.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import ResponsiveMenu from '$lib/components/ResponsiveMenu.svelte';
  import TextField from '$lib/components/TextField.svelte';
  import Toggle from '$lib/components/Toggle.svelte';
  import Theme from '$lib/components/Theme.svelte';
  import Blockquote from '$docs/Blockquote.svelte';
</script>

<h1>Examples</h1>

<h2>Basic</h2>

<Preview>
  <Toggle let:on={open} let:toggle let:toggleOff>
    <Button on:click={toggle}>
      Click me
      <ResponsiveMenu {open} on:close={toggleOff}>
        <MenuItem on:click={toggleOff}>Refresh</MenuItem>
        <MenuItem on:click={toggleOff}>Settings</MenuItem>
        <MenuItem on:click={toggleOff}>Help</MenuItem>
        <MenuItem on:click={toggleOff}>Sign In</MenuItem>
        <MenuItem on:click={toggleOff} disabled>Disabled</MenuItem>
      </ResponsiveMenu>
    </Button>
  </Toggle>
</Preview>

<h2>Field within</h2>

<Preview>
  <Toggle let:on={open} let:toggle let:toggleOff>
    <Button on:click={toggle}>
      Click me
      <ResponsiveMenu {open} on:close={toggleOff} menuProps={{ explicitClose: true }}>
        <div class="p-2">
          <TextField
            icon={mdiMagnify}
            placeholder="Search"
            class="mb-2"
            autofocus={{ delay: 50 }}
          />
          <MenuItem on:click={toggle}>Refresh</MenuItem>
          <MenuItem on:click={toggle}>Settings</MenuItem>
          <MenuItem on:click={toggle}>Help</MenuItem>
          <MenuItem on:click={toggle}>Sign In</MenuItem>
        </div>
      </ResponsiveMenu>
    </Button>
  </Toggle>
</Preview>

<h2>with Dialog and Drawer</h2>

<Preview>
  <Toggle let:on={open} let:toggle={toggleMenu} let:toggleOff={closeMenu}>
    <Button on:click={toggleMenu}>
      Click me
      <ResponsiveMenu {open} on:close={closeMenu}>
        <MenuItem on:click={close}>Normal item</MenuItem>
        <Toggle let:on={open} let:toggle={toggleDialog} on:toggleOff={closeMenu}>
          <MenuItem on:click={toggleDialog}>Open Dialog...</MenuItem>
          <Dialog {open} on:close={toggleDialog}>
            <div slot="title">Are you sure you want to do that?</div>
            <div slot="actions">
              <Button variant="fill" color="blue">Close</Button>
            </div>
          </Dialog>
        </Toggle>

        <Toggle let:on={open} let:toggle={toggleDialog} on:toggleOff={closeMenu}>
          <MenuItem on:click={toggleDialog}>Open Persistent Dialog...</MenuItem>
          <Dialog {open} on:close={toggleDialog} persistent>
            <div slot="title">Are you sure you want to do that?</div>
            <div slot="actions">
              <Button variant="fill" color="blue">Close</Button>
            </div>
          </Dialog>
        </Toggle>

        <Toggle let:on={open} let:toggle={toggleDrawer} let:toggleOff on:toggleOff={closeMenu}>
          <MenuItem on:click={toggleDrawer}>Open Drawer...</MenuItem>
          <Drawer {open} on:close={toggleOff} class="w-[400px]">
            <div
              class="fixed bottom-0 w-full flex justify-center bg-gray-500/25 p-1 border-t border-gray-400"
            >
              <Button on:click={toggleOff}>Close</Button>
            </div>
          </Drawer>
        </Toggle>

        <Toggle let:on={open} let:toggle={toggleDrawer} let:toggleOff on:toggleOff={closeMenu}>
          <MenuItem on:click={toggleDrawer}>Open Persistent Drawer...</MenuItem>
          <Drawer {open} on:close={toggleOff} class="w-[400px]" persistent>
            <div
              class="fixed bottom-0 w-full flex justify-center bg-gray-500/25 p-1 border-t border-gray-400"
            >
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
                <ResponsiveMenu {open} on:close={toggle}>
                  <MenuItem>Refresh</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuItem>Help</MenuItem>
                  <MenuItem>Sign In</MenuItem>
                </ResponsiveMenu>
              </span>
            </Toggle>
            <div
              class="fixed bottom-0 w-full flex justify-center bg-gray-500/25 p-1 border-t border-gray-400"
            >
              <Button on:click={toggleOff}>Close</Button>
            </div>
          </Drawer>
        </Toggle>
      </ResponsiveMenu>
    </Button>
  </Toggle>
</Preview>

<h2>menuProps</h2>

<Preview>
  <Toggle let:on={open} let:toggle>
    <Button on:click={toggle}>
      Click me
      <ResponsiveMenu
        {open}
        on:close={toggle}
        menuProps={{ autoPlacement: true, matchWidth: true }}
      >
        <MenuItem>Refresh</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem>Help</MenuItem>
        <MenuItem>Sign In</MenuItem>
      </ResponsiveMenu>
    </Button>
  </Toggle>
</Preview>

<h2>drawerProps</h2>

<Preview>
  <Toggle let:on={open} let:toggle>
    <Button on:click={toggle}>
      Click me
      <ResponsiveMenu
        {open}
        on:close={toggle}
        drawerProps={{ class: 'rounded-t-lg pb-[env(safe-area-inset-bottom)]' }}
      >
        <MenuItem>Refresh</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem>Help</MenuItem>
        <MenuItem>Sign In</MenuItem>
      </ResponsiveMenu>
    </Button>
  </Toggle>
</Preview>

<Blockquote>
  `env()`
  <a
    href="https://developer.mozilla.org/en-US/docs/Web/CSS/env#usage"
    target="_blank"
    class="font-semibold text-blue-500">requires</a
  >
  setting `viewport-fit=cover` within `viewport` meta tag
</Blockquote>

See also
<a
  href="https://github.com/mvllow/tailwindcss-safe-area"
  target="_blank"
  class="font-semibold text-blue-500">tailwind-css-safe-area</a
>
to add `pb-safe` util class

<h2>Theme example</h2>

<Preview>
  <Theme
    theme={{
      Drawer:
        '[&.ResponsiveMenu]:rounded-t-xl [&.ResponsiveMenu]:py-2 [&.ResponsiveMenu]:pb-[env(safe-area-inset-bottom)]',
    }}
  >
    <Toggle let:on={open} let:toggle let:toggleOff>
      <Button on:click={toggle}>
        Click me
        <ResponsiveMenu {open} on:close={toggleOff}>
          <MenuItem on:click={toggleOff}>Refresh</MenuItem>
          <MenuItem on:click={toggleOff}>Settings</MenuItem>
          <MenuItem on:click={toggleOff}>Help</MenuItem>
          <MenuItem on:click={toggleOff}>Sign In</MenuItem>
          <MenuItem on:click={toggleOff} disabled>Disabled</MenuItem>
        </ResponsiveMenu>
      </Button>
    </Toggle>
  </Theme>
</Preview>

<h1>API</h1>

<ApiDocs {api} />
