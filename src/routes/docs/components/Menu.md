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

## disableTransition

### Useful when menu will exceed window and need repositioned. Applies immediate without initial render offscreen

<Preview>
  <Toggle let:on={open} let:toggle>
    <span>
      <Button on:click={toggle}>Click me</Button>
      <Menu {open} on:close={toggle} matchWidth disableTransition>
        <div class="p-2 hover:bg-black/5">Refresh</div>
        <div class="p-2 hover:bg-black/5">Settings</div>
        <div class="p-2 hover:bg-black/5">Help</div>
        <div class="p-2 hover:bg-black/5">Sign In</div>
      </Menu>
    </span>
  </Toggle>
</Preview>

## maxViewportHeight

### Useful for long menus. Currently not compatible when menu initially rendered out of viewport (i.e. need to scroll into view)

<Preview>
  <Toggle let:on={open} let:toggle>
    <span>
      <Button on:click={toggle}>Click me</Button>
      <Menu {open} on:close={toggle} matchWidth maxViewportHeight>
        <div class="p-2 hover:bg-black/5">Refresh</div>
        <div class="p-2 hover:bg-black/5">Settings</div>
        <div class="p-2 hover:bg-black/5">Help</div>
        <div class="p-2 hover:bg-black/5">Sign In</div>
      </Menu>
    </span>
  </Toggle>
</Preview>
