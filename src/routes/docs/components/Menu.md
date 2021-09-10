<script>
  import Button from '$lib/components/Button.svelte';
  import Menu from '$lib/components/Menu.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import Toggle from '$lib/components/Toggle.svelte';
</script>

## Basic

<Preview>
  <Toggle let:on={open} let:toggle>
    <span>
      <Button on:click={toggle}>Click me</Button>
      <Menu {open} on:close={toggle}>
        <div class="p-2 hover:bg-black/4">Refresh</div>
        <div class="p-2 hover:bg-black/4">Settings</div>
        <div class="p-2 hover:bg-black/4">Help</div>
        <div class="p-2 hover:bg-black/4">Sign In</div>
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
        <div class="p-2 hover:bg-black/4">Refresh</div>
        <div class="p-2 hover:bg-black/4">Settings</div>
        <div class="p-2 hover:bg-black/4">Help</div>
        <div class="p-2 hover:bg-black/4">Sign In</div>
      </Menu>
    </span>
  </Toggle>
</Preview>
