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
  import Menu from '$lib/components/Menu.svelte';
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
        <div class="p-2 hover:bg-black/5 cursor-pointer">Refresh</div>
        <div class="p-2 hover:bg-black/5 cursor-pointer">Settings</div>
        <div class="p-2 hover:bg-black/5 cursor-pointer">Help</div>
        <div class="p-2 hover:bg-black/5 cursor-pointer">Sign In</div>
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
          <TextField icon={mdiMagnify} placeholder="Search" class="mb-2" />
          <div class="p-2 hover:bg-black/5 cursor-pointer" on:click={close}>Refresh</div>
          <div class="p-2 hover:bg-black/5 cursor-pointer" on:click={close}>Settings</div>
          <div class="p-2 hover:bg-black/5 cursor-pointer" on:click={close}>Help</div>
          <div class="p-2 hover:bg-black/5 cursor-pointer" on:click={close}>Sign In</div>
        </div>
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

## transition params

<Preview>
  <Toggle let:on={open} let:toggle>
    <span>
      <Button on:click={toggle}>Click me</Button>
      <Menu {open} on:close={toggle} matchWidth transitionParams={{ duration: 2000 }}>
        <div class="p-2 hover:bg-black/5 cursor-pointer">Refresh</div>
        <div class="p-2 hover:bg-black/5 cursor-pointer">Settings</div>
        <div class="p-2 hover:bg-black/5 cursor-pointer">Help</div>
        <div class="p-2 hover:bg-black/5 cursor-pointer">Sign In</div>
      </Menu>
    </span>
  </Toggle>
</Preview>

## maxViewportHeight

### Useful for long menus. Resizes (maxHeight w/ overflow) instead of repositioning

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

# API

<ApiDocs {api} />
