<script lang="ts">
  import Preview from '$lib/components/Preview.svelte';
  import Button from '$lib/components/Button.svelte';
  import Menu from '$lib/components/Menu.svelte';
  import MenuItem from '$lib/components/MenuItem.svelte';
  import Settings from '$lib/components/Settings.svelte';
  import Toggle from '$lib/components/Toggle.svelte';
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
    <Toggle let:on={open} let:toggle>
      <Button on:click={toggle} variant="outline" color="primary">
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
  </Settings>
</Preview>
