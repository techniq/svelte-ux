<script lang="ts">
  import { Button, Menu, MenuItem, Settings, Toggle } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';
</script>

<h1>Examples</h1>

<h2>Basic</h2>

<Preview>
  <Settings
    components={{
      Button: { classes: 'border-2 font-bold' },
      Menu: { classes: 'shadow-xl border-gray-500' },
      MenuItem: { classes: 'font-bold' },
    }}
  >
    <Toggle   >
      {#snippet children({ on: open, toggle, toggleOff })}
            <Button onclick={toggle} variant="outline" color="primary">
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
  </Settings>
</Preview>
