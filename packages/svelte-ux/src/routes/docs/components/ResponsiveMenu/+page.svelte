<script lang="ts">
  import { mdiMagnify } from '@mdi/js';

  import {
    Button,
    Dialog,
    Drawer,
    MenuItem,
    ResponsiveMenu,
    TextField,
    Toggle,
    Settings,
  } from 'svelte-ux';

  import Preview from '$lib/components/Preview.svelte';
  import Blockquote from '$docs/Blockquote.svelte';
</script>

<h1>Examples</h1>

<h2>Basic</h2>

<Preview>
  <Toggle>
    {#snippet children({ on: open, toggle, toggleOff })}
      <Button onclick={toggle}>
        Click me
        <ResponsiveMenu {open} onClose={toggleOff}>
          <MenuItem onclick={toggleOff}>Refresh</MenuItem>
          <MenuItem onclick={toggleOff}>Settings</MenuItem>
          <MenuItem onclick={toggleOff}>Help</MenuItem>
          <MenuItem onclick={toggleOff}>Sign In</MenuItem>
          <MenuItem onclick={toggleOff} disabled>Disabled</MenuItem>
        </ResponsiveMenu>
      </Button>
    {/snippet}
  </Toggle>
</Preview>

<h2>Field within</h2>

<Preview>
  <Toggle>
    {#snippet children({ on: open, toggle, toggleOff })}
      <Button onclick={toggle}>
        Click me
        <ResponsiveMenu {open} onClose={toggleOff} menuProps={{ explicitClose: true }}>
          <div class="p-2">
            <!-- Add autofocus delay to keep the opening transition smooth  -->
            <TextField
              icon={mdiMagnify}
              placeholder="Search"
              class="mb-2"
              autofocus={{ delay: 50 }}
            />
            <MenuItem onclick={toggle}>Refresh</MenuItem>
            <MenuItem onclick={toggle}>Settings</MenuItem>
            <MenuItem onclick={toggle}>Help</MenuItem>
            <MenuItem onclick={toggle}>Sign In</MenuItem>
          </div>
        </ResponsiveMenu>
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
        <ResponsiveMenu {open} onClose={closeMenu}>
          <MenuItem onclick={close}>Normal item</MenuItem>
          <Toggle onToggleOff={closeMenu}>
            {#snippet children({ on: open, toggle: toggleDialog })}
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

          <Toggle onToggleOff={closeMenu}>
            {#snippet children({ on: open, toggle: toggleDialog })}
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
                      <ResponsiveMenu {open} onClose={toggleOff}>
                        <MenuItem>Refresh</MenuItem>
                        <MenuItem>Settings</MenuItem>
                        <MenuItem>Help</MenuItem>
                        <MenuItem>Sign In</MenuItem>
                      </ResponsiveMenu>
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
        </ResponsiveMenu>
      </Button>
    {/snippet}
  </Toggle>
</Preview>

<h2>menuProps</h2>

<Preview>
  <Toggle>
    {#snippet children({ on: open, toggle, toggleOff })}
      <Button onclick={toggle}>
        Click me
        <ResponsiveMenu
          {open}
          onClose={toggleOff}
          menuProps={{ autoPlacement: true, matchWidth: true }}
        >
          <MenuItem>Refresh</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Help</MenuItem>
          <MenuItem>Sign In</MenuItem>
        </ResponsiveMenu>
      </Button>
    {/snippet}
  </Toggle>
</Preview>

<h2>drawerProps</h2>

<Preview>
  <Toggle>
    {#snippet children({ on: open, toggle, toggleOff })}
      <Button onclick={toggle}>
        Click me
        <ResponsiveMenu
          {open}
          onClose={toggleOff}
          drawerProps={{ class: 'rounded-t-lg pb-[env(safe-area-inset-bottom)]' }}
        >
          <MenuItem>Refresh</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Help</MenuItem>
          <MenuItem>Sign In</MenuItem>
        </ResponsiveMenu>
      </Button>
    {/snippet}
  </Toggle>
</Preview>

<Blockquote>
  `env()`
  <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/env#usage" target="_blank">requires</a>
  setting `viewport-fit=cover` within `viewport` meta tag
</Blockquote>

See also
<Button
  variant="text"
  color="primary"
  href="https://github.com/mvllow/tailwindcss-safe-area"
  target="_blank">tailwind-css-safe-area</Button
>
to add `pb-safe` util class

<h2>Settings example</h2>

<Preview>
  <Settings
    components={{
      Drawer: {
        classes:
          '[&.ResponsiveMenu]:rounded-t-xl [&.ResponsiveMenu]:py-2 [&.ResponsiveMenu]:pb-[env(safe-area-inset-bottom)]',
      },
    }}
  >
    <Toggle>
      {#snippet children({ on: open, toggle, toggleOff })}
        <Button onclick={toggle}>
          Click me
          <ResponsiveMenu {open} onClose={toggleOff}>
            <MenuItem onclick={toggleOff}>Refresh</MenuItem>
            <MenuItem onclick={toggleOff}>Settings</MenuItem>
            <MenuItem onclick={toggleOff}>Help</MenuItem>
            <MenuItem onclick={toggleOff}>Sign In</MenuItem>
            <MenuItem onclick={toggleOff} disabled>Disabled</MenuItem>
          </ResponsiveMenu>
        </Button>
      {/snippet}
    </Toggle>
  </Settings>
</Preview>
