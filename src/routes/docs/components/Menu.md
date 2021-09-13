<script>
  import Button from '../components/Button.svelte';
  import Menu from '../components/Menu.svelte';
  import Preview from '../components/Preview.svelte';
  import Toggle from '../components/Toggle.svelte';
</script>

## Basic

<Preview>
  <Toggle let:on={open} let:toggle>
    <span>
      <Button on:click={toggle}>Click me</Button>
      <Menu {open} on:close={toggle}>
        <div class="p-2 hover:bg-black/5">Refresh</div>
        <div class="p-2 hover:bg-black/5">Settings</div>
        <div class="p-2 hover:bg-black/5">Help</div>
        <div class="p-2 hover:bg-black/5">Sign In</div>
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
        <div class="p-2 hover:bg-black/5">Refresh</div>
        <div class="p-2 hover:bg-black/5">Settings</div>
        <div class="p-2 hover:bg-black/5">Help</div>
        <div class="p-2 hover:bg-black/5">Sign In</div>
      </Menu>
    </span>
  </Toggle>
</Preview>
