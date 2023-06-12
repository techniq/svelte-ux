<script lang="ts">
  import {
    mdiChevronDown,
    mdiFormatAlignLeft,
    mdiFormatAlignCenter,
    mdiFormatAlignRight,
    mdiBookmark,
  } from '@mdi/js';

  import api from '$lib/components/Button.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Button from '$lib/components/Button.svelte';
  import ButtonGroup from '$lib/components/ButtonGroup.svelte';
  import Menu from '$lib/components/Menu.svelte';
  import MenuItem from '$lib/components/MenuItem.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import Toggle from '$lib/components/Toggle.svelte';
  import Tooltip from '$lib/components/Tooltip.svelte';
</script>

<h1>Examples</h1>

<h2>Basic</h2>

<Preview>
  <div class="grid gap-2">
    <ButtonGroup variant="text" color="accent">
      <Button>Left</Button>
      <Button>Center</Button>
      <Button>Right</Button>
    </ButtonGroup>

    <ButtonGroup variant="outline">
      <Button>Left</Button>
      <Button>Center</Button>
      <Button>Right</Button>
    </ButtonGroup>

    <ButtonGroup variant="fill" color="accent">
      <Button>Left</Button>
      <Button>Center</Button>
      <Button>Right</Button>
    </ButtonGroup>

    <ButtonGroup variant="fill-light" color="accent">
      <Button>Left</Button>
      <Button>Center</Button>
      <Button>Right</Button>
    </ButtonGroup>

    <ButtonGroup variant="fill-outline" color="accent">
      <Button>Left</Button>
      <Button>Center</Button>
      <Button>Right</Button>
    </ButtonGroup>
  </div>
</Preview>

<h2>Icons</h2>

<Preview>
  <div class="grid gap-2">
    <ButtonGroup variant="text" color="accent">
      <Button icon={mdiFormatAlignLeft} />
      <Button icon={mdiFormatAlignCenter} />
      <Button icon={mdiFormatAlignRight} />
    </ButtonGroup>

    <ButtonGroup variant="outline">
      <Button icon={mdiFormatAlignLeft} />
      <Button icon={mdiFormatAlignCenter} />
      <Button icon={mdiFormatAlignRight} />
    </ButtonGroup>

    <ButtonGroup variant="fill" color="accent">
      <Button icon={mdiFormatAlignLeft} />
      <Button icon={mdiFormatAlignCenter} />
      <Button icon={mdiFormatAlignRight} />
    </ButtonGroup>

    <ButtonGroup variant="fill-light" color="accent">
      <Button icon={mdiFormatAlignLeft} />
      <Button icon={mdiFormatAlignCenter} />
      <Button icon={mdiFormatAlignRight} />
    </ButtonGroup>

    <ButtonGroup variant="fill-outline" color="accent">
      <Button icon={mdiFormatAlignLeft} />
      <Button icon={mdiFormatAlignCenter} />
      <Button icon={mdiFormatAlignRight} />
    </ButtonGroup>
  </div>
</Preview>

<h2>Icons (partially rounded)</h2>

<Preview>
  <div class="grid gap-2">
    <ButtonGroup variant="text" color="accent">
      <Button icon={mdiFormatAlignLeft} iconOnly={false} />
      <Button icon={mdiFormatAlignCenter} iconOnly={false} />
      <Button icon={mdiFormatAlignRight} iconOnly={false} />
    </ButtonGroup>

    <ButtonGroup variant="outline">
      <Button icon={mdiFormatAlignLeft} iconOnly={false} />
      <Button icon={mdiFormatAlignCenter} iconOnly={false} />
      <Button icon={mdiFormatAlignRight} iconOnly={false} />
    </ButtonGroup>

    <ButtonGroup variant="fill" color="accent">
      <Button icon={mdiFormatAlignLeft} iconOnly={false} />
      <Button icon={mdiFormatAlignCenter} iconOnly={false} />
      <Button icon={mdiFormatAlignRight} iconOnly={false} />
    </ButtonGroup>

    <ButtonGroup variant="fill-light" color="accent">
      <Button icon={mdiFormatAlignLeft} iconOnly={false} />
      <Button icon={mdiFormatAlignCenter} iconOnly={false} />
      <Button icon={mdiFormatAlignRight} iconOnly={false} />
    </ButtonGroup>

    <ButtonGroup variant="fill-outline" color="accent">
      <Button icon={mdiFormatAlignLeft} iconOnly={false} />
      <Button icon={mdiFormatAlignCenter} iconOnly={false} />
      <Button icon={mdiFormatAlignRight} iconOnly={false} />
    </ButtonGroup>
  </div>
</Preview>

<h2>Selected</h2>

<Preview>
  <div class="grid gap-2">
    <ButtonGroup variant="text" color="accent">
      <Button icon={mdiFormatAlignLeft} iconOnly={false} variant="fill-light" />
      <Button icon={mdiFormatAlignCenter} iconOnly={false} />
      <Button icon={mdiFormatAlignRight} iconOnly={false} />
    </ButtonGroup>

    <ButtonGroup variant="outline">
      <Button icon={mdiFormatAlignLeft} iconOnly={false} />
      <Button
        icon={mdiFormatAlignCenter}
        iconOnly={false}
        variant="fill-outline"
        color="accent"
        class="z-10"
      />
      <Button icon={mdiFormatAlignRight} iconOnly={false} />
    </ButtonGroup>

    <ButtonGroup variant="fill" color="accent">
      <Button icon={mdiFormatAlignLeft} iconOnly={false} />
      <Button icon={mdiFormatAlignCenter} iconOnly={false} />
      <Button
        icon={mdiFormatAlignRight}
        iconOnly={false}
        class="bg-accent-600 hover:bg-accent-700"
      />
    </ButtonGroup>

    <ButtonGroup variant="fill-light" color="accent">
      <Button icon={mdiFormatAlignLeft} iconOnly={false} />
      <Button icon={mdiFormatAlignCenter} iconOnly={false} variant="fill-outline" />
      <Button icon={mdiFormatAlignRight} iconOnly={false} />
    </ButtonGroup>

    <ButtonGroup variant="fill-outline" color="accent">
      <Button icon={mdiFormatAlignLeft} iconOnly={false} variant="fill" />
      <Button icon={mdiFormatAlignCenter} iconOnly={false} />
      <Button icon={mdiFormatAlignRight} iconOnly={false} />
    </ButtonGroup>
  </div>
</Preview>

<h2>Size</h2>

<Preview>
  <div class="grid gap-2">
    <ButtonGroup variant="text" size="sm" color="accent">
      <Button icon={mdiBookmark}>Bookmark</Button>
      <Button>12k</Button>
    </ButtonGroup>

    <ButtonGroup variant="outline" size="sm">
      <Button icon={mdiBookmark}>Bookmark</Button>
      <Button>12k</Button>
    </ButtonGroup>

    <ButtonGroup variant="fill" size="sm" color="accent">
      <Button icon={mdiBookmark}>Bookmark</Button>
      <Button>12k</Button>
    </ButtonGroup>

    <ButtonGroup variant="fill-light" size="sm" color="accent">
      <Button icon={mdiBookmark}>Bookmark</Button>
      <Button>12k</Button>
    </ButtonGroup>

    <ButtonGroup variant="fill-outline" size="sm" color="accent">
      <Button icon={mdiBookmark}>Bookmark</Button>
      <Button>12k</Button>
    </ButtonGroup>
  </div>
</Preview>

<h2>Disabled</h2>

<Preview>
  <div class="grid gap-2">
    <ButtonGroup variant="text" color="accent" disabled>
      <Button icon={mdiFormatAlignLeft} iconOnly={false} />
      <Button icon={mdiFormatAlignCenter} iconOnly={false} />
      <Button icon={mdiFormatAlignRight} iconOnly={false} />
    </ButtonGroup>

    <ButtonGroup variant="outline" disabled>
      <Button icon={mdiFormatAlignLeft} iconOnly={false} />
      <Button icon={mdiFormatAlignCenter} iconOnly={false} />
      <Button icon={mdiFormatAlignRight} iconOnly={false} />
    </ButtonGroup>

    <ButtonGroup variant="fill" disabled>
      <Button color="accent" icon={mdiFormatAlignLeft} iconOnly={false} />
      <Button color="accent" icon={mdiFormatAlignCenter} iconOnly={false} />
      <Button color="accent" icon={mdiFormatAlignRight} iconOnly={false} />
    </ButtonGroup>

    <ButtonGroup variant="fill-light" disabled>
      <Button color="accent" icon={mdiFormatAlignLeft} iconOnly={false} />
      <Button color="accent" icon={mdiFormatAlignCenter} iconOnly={false} />
      <Button color="accent" icon={mdiFormatAlignRight} iconOnly={false} />
    </ButtonGroup>

    <ButtonGroup variant="fill-outline" disabled>
      <Button color="accent" icon={mdiFormatAlignLeft} iconOnly={false} />
      <Button color="accent" icon={mdiFormatAlignCenter} iconOnly={false} />
      <Button color="accent" icon={mdiFormatAlignRight} iconOnly={false} />
    </ButtonGroup>
  </div>
</Preview>

<h2>with Menu</h2>

<Preview>
  <div class="grid gap-2">
    <ButtonGroup variant="text">
      <Button>Click me</Button>
      <Toggle let:on={open} let:toggle>
        <span>
          <Button icon={mdiChevronDown} on:click={toggle} rounded class="px-1" />
          <Menu {open} on:close={toggle} placement="bottom-start">
            <MenuItem>Hello</MenuItem>
            <MenuItem>Hello</MenuItem>
            <MenuItem>Hello</MenuItem>
            <MenuItem>Hello</MenuItem>
          </Menu>
        </span>
      </Toggle>
    </ButtonGroup>

    <ButtonGroup variant="outline">
      <Button>Click me</Button>
      <Toggle let:on={open} let:toggle>
        <span>
          <Button icon={mdiChevronDown} on:click={toggle} rounded class="px-1" />
          <Menu {open} on:close={toggle} placement="bottom-start">
            <MenuItem>Hello</MenuItem>
            <MenuItem>Hello</MenuItem>
            <MenuItem>Hello</MenuItem>
            <MenuItem>Hello</MenuItem>
          </Menu>
        </span>
      </Toggle>
    </ButtonGroup>

    <ButtonGroup variant="fill" color="accent">
      <Button>Click me</Button>
      <Toggle let:on={open} let:toggle>
        <span>
          <Button icon={mdiChevronDown} on:click={toggle} rounded class="px-1" />
          <Menu {open} on:close={toggle} placement="bottom-start">
            <MenuItem>Hello</MenuItem>
            <MenuItem>Hello</MenuItem>
            <MenuItem>Hello</MenuItem>
            <MenuItem>Hello</MenuItem>
          </Menu>
        </span>
      </Toggle>
    </ButtonGroup>

    <ButtonGroup variant="fill-light" color="accent">
      <Button>Click me</Button>
      <Toggle let:on={open} let:toggle>
        <span>
          <Button icon={mdiChevronDown} on:click={toggle} rounded class="px-1" />
          <Menu {open} on:close={toggle} placement="bottom-start">
            <MenuItem>Hello</MenuItem>
            <MenuItem>Hello</MenuItem>
            <MenuItem>Hello</MenuItem>
            <MenuItem>Hello</MenuItem>
          </Menu>
        </span>
      </Toggle>
    </ButtonGroup>

    <ButtonGroup variant="fill-outline" color="accent">
      <Button>Click me</Button>
      <Toggle let:on={open} let:toggle>
        <span>
          <Button icon={mdiChevronDown} on:click={toggle} rounded class="px-1" />
          <Menu {open} on:close={toggle} placement="bottom-start">
            <MenuItem>Hello</MenuItem>
            <MenuItem>Hello</MenuItem>
            <MenuItem>Hello</MenuItem>
            <MenuItem>Hello</MenuItem>
          </Menu>
        </span>
      </Toggle>
    </ButtonGroup>
  </div>
</Preview>

<h2>with Tooltip</h2>

<Preview>
  <div class="grid gap-2">
    <ButtonGroup variant="text" color="accent">
      <Tooltip title="left" offset={2}>
        <Button icon={mdiFormatAlignLeft} />
      </Tooltip>
      <Tooltip title="center" offset={2}>
        <Button icon={mdiFormatAlignCenter} />
      </Tooltip>
      <Tooltip title="right" offset={2}>
        <Button icon={mdiFormatAlignRight} />
      </Tooltip>
    </ButtonGroup>

    <ButtonGroup variant="outline">
      <Tooltip title="left" offset={2}>
        <Button icon={mdiFormatAlignLeft} />
      </Tooltip>
      <Tooltip title="center" offset={2}>
        <Button icon={mdiFormatAlignCenter} />
      </Tooltip>
      <Tooltip title="right" offset={2}>
        <Button icon={mdiFormatAlignRight} />
      </Tooltip>
    </ButtonGroup>

    <ButtonGroup variant="fill" color="accent">
      <Tooltip title="left" offset={2}>
        <Button icon={mdiFormatAlignLeft} />
      </Tooltip>
      <Tooltip title="center" offset={2}>
        <Button icon={mdiFormatAlignCenter} />
      </Tooltip>
      <Tooltip title="right" offset={2}>
        <Button icon={mdiFormatAlignRight} />
      </Tooltip>
    </ButtonGroup>

    <ButtonGroup variant="fill-light" color="accent">
      <Tooltip title="left" offset={2}>
        <Button icon={mdiFormatAlignLeft} />
      </Tooltip>
      <Tooltip title="center" offset={2}>
        <Button icon={mdiFormatAlignCenter} />
      </Tooltip>
      <Tooltip title="right" offset={2}>
        <Button icon={mdiFormatAlignRight} />
      </Tooltip>
    </ButtonGroup>

    <ButtonGroup variant="fill-outline" color="accent">
      <Tooltip title="left" offset={2}>
        <Button icon={mdiFormatAlignLeft} />
      </Tooltip>
      <Tooltip title="center" offset={2}>
        <Button icon={mdiFormatAlignCenter} />
      </Tooltip>
      <Tooltip title="right" offset={2}>
        <Button icon={mdiFormatAlignRight} />
      </Tooltip>
    </ButtonGroup>
  </div>
</Preview>

<h1>API</h1>

<ApiDocs {api} />
