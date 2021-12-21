---
component: $component
filename: $filename
---

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
        <div class="p-2 hover:bg-black/5 cursor-pointer">Refresh</div>
        <div class="p-2 hover:bg-black/5 cursor-pointer">Settings</div>
        <div class="p-2 hover:bg-black/5 cursor-pointer">Help</div>
        <div class="p-2 hover:bg-black/5 cursor-pointer">Sign In</div>
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
        <div class="p-2 hover:bg-black/5 cursor-pointer">Refresh</div>
        <div class="p-2 hover:bg-black/5 cursor-pointer">Settings</div>
        <div class="p-2 hover:bg-black/5 cursor-pointer">Help</div>
        <div class="p-2 hover:bg-black/5 cursor-pointer">Sign In</div>
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
        <div class="p-2 hover:bg-black/5 cursor-pointer">Refresh</div>
        <div class="p-2 hover:bg-black/5 cursor-pointer">Settings</div>
        <div class="p-2 hover:bg-black/5 cursor-pointer">Help</div>
        <div class="p-2 hover:bg-black/5 cursor-pointer">Sign In</div>
      </Menu>
    </span>
  </Toggle>
</Preview>

## maxViewportHeight

### Useful for long menus. Resizes (maxHeight w/ overflow) instead of repositions

<Preview>
  <Toggle let:on={open} let:toggle>
    <span>
      <Button on:click={toggle}>Click me</Button>
      <Menu {open} on:close={toggle} matchWidth maxViewportHeight>
        <div class="p-2 hover:bg-black/5 cursor-pointer">Refresh</div>
        <div class="p-2 hover:bg-black/5 cursor-pointer">Settings</div>
        <div class="p-2 hover:bg-black/5 cursor-pointer">Help</div>
        <div class="p-2 hover:bg-black/5 cursor-pointer">Sign In</div>
      </Menu>
    </span>
  </Toggle>
</Preview>

### top placement (currently disables transitions by default to allow proper calculation)

<Preview>
  <Toggle let:on={open} let:toggle>
    <span>
      <Button on:click={toggle}>Click me</Button>
      <Menu {open} on:close={toggle} matchWidth maxViewportHeight placement="top">
        <div class="p-2 hover:bg-black/5 cursor-pointer">Refresh</div>
        <div class="p-2 hover:bg-black/5 cursor-pointer">Settings</div>
        <div class="p-2 hover:bg-black/5 cursor-pointer">Help</div>
        <div class="p-2 hover:bg-black/5 cursor-pointer">Sign In</div>
      </Menu>
    </span>
  </Toggle>
</Preview>
