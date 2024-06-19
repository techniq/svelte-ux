<script lang="ts">
  import {
    mdiChevronDown,
    mdiFormatAlignLeft,
    mdiFormatAlignCenter,
    mdiFormatAlignRight,
    mdiBookmark,
  } from '@mdi/js';

  import { Button, ButtonGroup, Menu, MenuItem, Toggle, Tooltip } from 'svelte-ux';

  import Preview from '$lib/components/Preview.svelte';
</script>

<h1>Examples</h1>

<h2>Basic</h2>

<Preview>
  <div class="grid gap-2">
    <ButtonGroup color="primary">
      <Button>Left</Button>
      <Button>Center</Button>
      <Button>Right</Button>
    </ButtonGroup>

    <ButtonGroup variant="outline">
      <Button>Left</Button>
      <Button>Center</Button>
      <Button>Right</Button>
    </ButtonGroup>

    <ButtonGroup variant="fill" color="primary">
      <Button>Left</Button>
      <Button>Center</Button>
      <Button>Right</Button>
    </ButtonGroup>

    <ButtonGroup variant="fill-light" color="primary">
      <Button>Left</Button>
      <Button>Center</Button>
      <Button>Right</Button>
    </ButtonGroup>

    <ButtonGroup variant="fill-outline" color="primary">
      <Button>Left</Button>
      <Button>Center</Button>
      <Button>Right</Button>
    </ButtonGroup>
  </div>
</Preview>

<h2>Icons</h2>

<Preview>
  <div class="grid gap-2">
    <ButtonGroup color="primary">
      <Button icon={mdiFormatAlignLeft} />
      <Button icon={mdiFormatAlignCenter} />
      <Button icon={mdiFormatAlignRight} />
    </ButtonGroup>

    <ButtonGroup variant="outline">
      <Button icon={mdiFormatAlignLeft} />
      <Button icon={mdiFormatAlignCenter} />
      <Button icon={mdiFormatAlignRight} />
    </ButtonGroup>

    <ButtonGroup variant="fill" color="primary">
      <Button icon={mdiFormatAlignLeft} />
      <Button icon={mdiFormatAlignCenter} />
      <Button icon={mdiFormatAlignRight} />
    </ButtonGroup>

    <ButtonGroup variant="fill-light" color="primary">
      <Button icon={mdiFormatAlignLeft} />
      <Button icon={mdiFormatAlignCenter} />
      <Button icon={mdiFormatAlignRight} />
    </ButtonGroup>

    <ButtonGroup variant="fill-outline" color="primary">
      <Button icon={mdiFormatAlignLeft} />
      <Button icon={mdiFormatAlignCenter} />
      <Button icon={mdiFormatAlignRight} />
    </ButtonGroup>
  </div>
</Preview>

<h2>Icons (partially rounded)</h2>

<Preview>
  <div class="grid gap-2">
    <ButtonGroup color="primary">
      <Button icon={mdiFormatAlignLeft} iconOnly={false} />
      <Button icon={mdiFormatAlignCenter} iconOnly={false} />
      <Button icon={mdiFormatAlignRight} iconOnly={false} />
    </ButtonGroup>

    <ButtonGroup variant="outline">
      <Button icon={mdiFormatAlignLeft} iconOnly={false} />
      <Button icon={mdiFormatAlignCenter} iconOnly={false} />
      <Button icon={mdiFormatAlignRight} iconOnly={false} />
    </ButtonGroup>

    <ButtonGroup variant="fill" color="primary">
      <Button icon={mdiFormatAlignLeft} iconOnly={false} />
      <Button icon={mdiFormatAlignCenter} iconOnly={false} />
      <Button icon={mdiFormatAlignRight} iconOnly={false} />
    </ButtonGroup>

    <ButtonGroup variant="fill-light" color="primary">
      <Button icon={mdiFormatAlignLeft} iconOnly={false} />
      <Button icon={mdiFormatAlignCenter} iconOnly={false} />
      <Button icon={mdiFormatAlignRight} iconOnly={false} />
    </ButtonGroup>

    <ButtonGroup variant="fill-outline" color="primary">
      <Button icon={mdiFormatAlignLeft} iconOnly={false} />
      <Button icon={mdiFormatAlignCenter} iconOnly={false} />
      <Button icon={mdiFormatAlignRight} iconOnly={false} />
    </ButtonGroup>
  </div>
</Preview>

<h2>Selected</h2>

<Preview>
  <div class="grid gap-2">
    <ButtonGroup color="primary">
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
        color="primary"
        class="z-10"
      />
      <Button icon={mdiFormatAlignRight} iconOnly={false} />
    </ButtonGroup>

    <ButtonGroup variant="fill" color="primary">
      <Button icon={mdiFormatAlignLeft} iconOnly={false} />
      <Button icon={mdiFormatAlignCenter} iconOnly={false} />
      <Button
        icon={mdiFormatAlignRight}
        iconOnly={false}
        class="bg-primary-700 hover:bg-primary-900"
      />
    </ButtonGroup>

    <ButtonGroup variant="fill-light" color="primary">
      <Button icon={mdiFormatAlignLeft} iconOnly={false} />
      <Button icon={mdiFormatAlignCenter} iconOnly={false} variant="fill" />
      <Button icon={mdiFormatAlignRight} iconOnly={false} />
    </ButtonGroup>

    <ButtonGroup variant="fill-outline" color="primary">
      <Button icon={mdiFormatAlignLeft} iconOnly={false} variant="fill" />
      <Button icon={mdiFormatAlignCenter} iconOnly={false} />
      <Button icon={mdiFormatAlignRight} iconOnly={false} />
    </ButtonGroup>
  </div>
</Preview>

<h2>Size</h2>

<Preview>
  <div class="grid gap-2">
    <ButtonGroup size="sm" color="primary">
      <Button icon={mdiBookmark}>Bookmark</Button>
      <Button>12k</Button>
    </ButtonGroup>

    <ButtonGroup variant="outline" size="sm">
      <Button icon={mdiBookmark}>Bookmark</Button>
      <Button>12k</Button>
    </ButtonGroup>

    <ButtonGroup variant="fill" size="sm" color="primary">
      <Button icon={mdiBookmark}>Bookmark</Button>
      <Button>12k</Button>
    </ButtonGroup>

    <ButtonGroup variant="fill-light" size="sm" color="primary">
      <Button icon={mdiBookmark}>Bookmark</Button>
      <Button>12k</Button>
    </ButtonGroup>

    <ButtonGroup variant="fill-outline" size="sm" color="primary">
      <Button icon={mdiBookmark}>Bookmark</Button>
      <Button>12k</Button>
    </ButtonGroup>
  </div>
</Preview>

<h2>Disabled</h2>

<Preview>
  <div class="grid gap-2">
    <ButtonGroup color="primary" disabled>
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
      <Button color="primary" icon={mdiFormatAlignLeft} iconOnly={false} />
      <Button color="primary" icon={mdiFormatAlignCenter} iconOnly={false} />
      <Button color="primary" icon={mdiFormatAlignRight} iconOnly={false} />
    </ButtonGroup>

    <ButtonGroup variant="fill-light" disabled>
      <Button color="primary" icon={mdiFormatAlignLeft} iconOnly={false} />
      <Button color="primary" icon={mdiFormatAlignCenter} iconOnly={false} />
      <Button color="primary" icon={mdiFormatAlignRight} iconOnly={false} />
    </ButtonGroup>

    <ButtonGroup variant="fill-outline" disabled>
      <Button color="primary" icon={mdiFormatAlignLeft} iconOnly={false} />
      <Button color="primary" icon={mdiFormatAlignCenter} iconOnly={false} />
      <Button color="primary" icon={mdiFormatAlignRight} iconOnly={false} />
    </ButtonGroup>
  </div>
</Preview>

<h2>with Menu</h2>

<Preview>
  <div class="grid gap-2">
    <ButtonGroup>
      <Button>Click me</Button>
      <Toggle let:on={open} let:toggle let:toggleOff>
        <span>
          <Button icon={mdiChevronDown} on:click={toggle} rounded class="px-1" />
          <Menu {open} on:close={toggleOff} placement="bottom-start">
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
      <Toggle let:on={open} let:toggle let:toggleOff>
        <span>
          <Button icon={mdiChevronDown} on:click={toggle} rounded class="px-1" />
          <Menu {open} on:close={toggleOff} placement="bottom-start">
            <MenuItem>Hello</MenuItem>
            <MenuItem>Hello</MenuItem>
            <MenuItem>Hello</MenuItem>
            <MenuItem>Hello</MenuItem>
          </Menu>
        </span>
      </Toggle>
    </ButtonGroup>

    <ButtonGroup variant="fill" color="primary">
      <Button>Click me</Button>
      <Toggle let:on={open} let:toggle let:toggleOff>
        <span>
          <Button icon={mdiChevronDown} on:click={toggle} rounded class="px-1" />
          <Menu {open} on:close={toggleOff} placement="bottom-start">
            <MenuItem>Hello</MenuItem>
            <MenuItem>Hello</MenuItem>
            <MenuItem>Hello</MenuItem>
            <MenuItem>Hello</MenuItem>
          </Menu>
        </span>
      </Toggle>
    </ButtonGroup>

    <ButtonGroup variant="fill-light" color="primary">
      <Button>Click me</Button>
      <Toggle let:on={open} let:toggle let:toggleOff>
        <span>
          <Button icon={mdiChevronDown} on:click={toggle} rounded class="px-1" />
          <Menu {open} on:close={toggleOff} placement="bottom-start">
            <MenuItem>Hello</MenuItem>
            <MenuItem>Hello</MenuItem>
            <MenuItem>Hello</MenuItem>
            <MenuItem>Hello</MenuItem>
          </Menu>
        </span>
      </Toggle>
    </ButtonGroup>

    <ButtonGroup variant="fill-outline" color="primary">
      <Button>Click me</Button>
      <Toggle let:on={open} let:toggle let:toggleOff>
        <span>
          <Button icon={mdiChevronDown} on:click={toggle} rounded class="px-1" />
          <Menu {open} on:close={toggleOff} placement="bottom-start">
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
    <ButtonGroup color="primary">
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

    <ButtonGroup variant="fill" color="primary">
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

    <ButtonGroup variant="fill-light" color="primary">
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

    <ButtonGroup variant="fill-outline" color="primary">
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
