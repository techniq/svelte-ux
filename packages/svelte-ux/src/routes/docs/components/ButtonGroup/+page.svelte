<script lang="ts">
  import LucideAlignLeft from '~icons/lucide/align-left';
  import LucideAlignCenter from '~icons/lucide/align-center';
  import LucideAlignRight from '~icons/lucide/align-right';
  import LucideChevronDown from '~icons/lucide/chevron-down';
  import LucideBookmark from '~icons/lucide/bookmark';

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
      <Button icon={LucideAlignLeft} />
      <Button icon={LucideAlignCenter} />
      <Button icon={LucideAlignRight} />
    </ButtonGroup>

    <ButtonGroup variant="outline">
      <Button icon={LucideAlignLeft} />
      <Button icon={LucideAlignCenter} />
      <Button icon={LucideAlignRight} />
    </ButtonGroup>

    <ButtonGroup variant="fill" color="primary">
      <Button icon={LucideAlignLeft} />
      <Button icon={LucideAlignCenter} />
      <Button icon={LucideAlignRight} />
    </ButtonGroup>

    <ButtonGroup variant="fill-light" color="primary">
      <Button icon={LucideAlignLeft} />
      <Button icon={LucideAlignCenter} />
      <Button icon={LucideAlignRight} />
    </ButtonGroup>

    <ButtonGroup variant="fill-outline" color="primary">
      <Button icon={LucideAlignLeft} />
      <Button icon={LucideAlignCenter} />
      <Button icon={LucideAlignRight} />
    </ButtonGroup>
  </div>
</Preview>

<h2>Icons (partially rounded)</h2>

<Preview>
  <div class="grid gap-2">
    <ButtonGroup color="primary">
      <Button icon={LucideAlignLeft} iconOnly={false} />
      <Button icon={LucideAlignCenter} iconOnly={false} />
      <Button icon={LucideAlignRight} iconOnly={false} />
    </ButtonGroup>

    <ButtonGroup variant="outline">
      <Button icon={LucideAlignLeft} iconOnly={false} />
      <Button icon={LucideAlignCenter} iconOnly={false} />
      <Button icon={LucideAlignRight} iconOnly={false} />
    </ButtonGroup>

    <ButtonGroup variant="fill" color="primary">
      <Button icon={LucideAlignLeft} iconOnly={false} />
      <Button icon={LucideAlignCenter} iconOnly={false} />
      <Button icon={LucideAlignRight} iconOnly={false} />
    </ButtonGroup>

    <ButtonGroup variant="fill-light" color="primary">
      <Button icon={LucideAlignLeft} iconOnly={false} />
      <Button icon={LucideAlignCenter} iconOnly={false} />
      <Button icon={LucideAlignRight} iconOnly={false} />
    </ButtonGroup>

    <ButtonGroup variant="fill-outline" color="primary">
      <Button icon={LucideAlignLeft} iconOnly={false} />
      <Button icon={LucideAlignCenter} iconOnly={false} />
      <Button icon={LucideAlignRight} iconOnly={false} />
    </ButtonGroup>
  </div>
</Preview>

<h2>Selected</h2>

<Preview>
  <div class="grid gap-2">
    <ButtonGroup color="primary">
      <Button icon={LucideAlignLeft} iconOnly={false} variant="fill-light" />
      <Button icon={LucideAlignCenter} iconOnly={false} />
      <Button icon={LucideAlignRight} iconOnly={false} />
    </ButtonGroup>

    <ButtonGroup variant="outline">
      <Button icon={LucideAlignLeft} iconOnly={false} />
      <Button
        icon={LucideAlignCenter}
        iconOnly={false}
        variant="fill-outline"
        color="primary"
        class="z-10"
      />
      <Button icon={LucideAlignRight} iconOnly={false} />
    </ButtonGroup>

    <ButtonGroup variant="fill" color="primary">
      <Button icon={LucideAlignLeft} iconOnly={false} />
      <Button icon={LucideAlignCenter} iconOnly={false} />
      <Button
        icon={LucideAlignRight}
        iconOnly={false}
        class="bg-primary-700 hover:bg-primary-900"
      />
    </ButtonGroup>

    <ButtonGroup variant="fill-light" color="primary">
      <Button icon={LucideAlignLeft} iconOnly={false} />
      <Button icon={LucideAlignCenter} iconOnly={false} variant="fill" />
      <Button icon={LucideAlignRight} iconOnly={false} />
    </ButtonGroup>

    <ButtonGroup variant="fill-outline" color="primary">
      <Button icon={LucideAlignLeft} iconOnly={false} variant="fill" />
      <Button icon={LucideAlignCenter} iconOnly={false} />
      <Button icon={LucideAlignRight} iconOnly={false} />
    </ButtonGroup>
  </div>
</Preview>

<h2>Size</h2>

<Preview>
  <div class="grid gap-2">
    <ButtonGroup size="sm" color="primary">
      <Button icon={LucideBookmark}>Bookmark</Button>
      <Button>12k</Button>
    </ButtonGroup>

    <ButtonGroup variant="outline" size="sm">
      <Button icon={LucideBookmark}>Bookmark</Button>
      <Button>12k</Button>
    </ButtonGroup>

    <ButtonGroup variant="fill" size="sm" color="primary">
      <Button icon={LucideBookmark}>Bookmark</Button>
      <Button>12k</Button>
    </ButtonGroup>

    <ButtonGroup variant="fill-light" size="sm" color="primary">
      <Button icon={LucideBookmark}>Bookmark</Button>
      <Button>12k</Button>
    </ButtonGroup>

    <ButtonGroup variant="fill-outline" size="sm" color="primary">
      <Button icon={LucideBookmark}>Bookmark</Button>
      <Button>12k</Button>
    </ButtonGroup>
  </div>
</Preview>

<h2>Disabled</h2>

<Preview>
  <div class="grid gap-2">
    <ButtonGroup color="primary" disabled>
      <Button icon={LucideAlignLeft} iconOnly={false} />
      <Button icon={LucideAlignCenter} iconOnly={false} />
      <Button icon={LucideAlignRight} iconOnly={false} />
    </ButtonGroup>

    <ButtonGroup variant="outline" disabled>
      <Button icon={LucideAlignLeft} iconOnly={false} />
      <Button icon={LucideAlignCenter} iconOnly={false} />
      <Button icon={LucideAlignRight} iconOnly={false} />
    </ButtonGroup>

    <ButtonGroup variant="fill" disabled>
      <Button color="primary" icon={LucideAlignLeft} iconOnly={false} />
      <Button color="primary" icon={LucideAlignCenter} iconOnly={false} />
      <Button color="primary" icon={LucideAlignRight} iconOnly={false} />
    </ButtonGroup>

    <ButtonGroup variant="fill-light" disabled>
      <Button color="primary" icon={LucideAlignLeft} iconOnly={false} />
      <Button color="primary" icon={LucideAlignCenter} iconOnly={false} />
      <Button color="primary" icon={LucideAlignRight} iconOnly={false} />
    </ButtonGroup>

    <ButtonGroup variant="fill-outline" disabled>
      <Button color="primary" icon={LucideAlignLeft} iconOnly={false} />
      <Button color="primary" icon={LucideAlignCenter} iconOnly={false} />
      <Button color="primary" icon={LucideAlignRight} iconOnly={false} />
    </ButtonGroup>
  </div>
</Preview>

<h2>with Menu</h2>

<Preview>
  <div class="grid gap-2">
    <ButtonGroup>
      <Button>Click me</Button>
      <Toggle let:on={open} let:toggle let:toggleOff>
        <span class="flex">
          <Button icon={LucideChevronDown} on:click={toggle} rounded class="px-1" />
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
        <span class="flex">
          <Button icon={LucideChevronDown} on:click={toggle} rounded class="px-1" />
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
        <span class="flex">
          <Button icon={LucideChevronDown} on:click={toggle} rounded class="px-1" />
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
        <span class="flex">
          <Button icon={LucideChevronDown} on:click={toggle} rounded class="px-1" />
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
        <span class="flex">
          <Button icon={LucideChevronDown} on:click={toggle} rounded class="px-1" />
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
        <Button icon={LucideAlignLeft} />
      </Tooltip>
      <Tooltip title="center" offset={2}>
        <Button icon={LucideAlignCenter} />
      </Tooltip>
      <Tooltip title="right" offset={2}>
        <Button icon={LucideAlignRight} />
      </Tooltip>
    </ButtonGroup>

    <ButtonGroup variant="outline">
      <Tooltip title="left" offset={2}>
        <Button icon={LucideAlignLeft} />
      </Tooltip>
      <Tooltip title="center" offset={2}>
        <Button icon={LucideAlignCenter} />
      </Tooltip>
      <Tooltip title="right" offset={2}>
        <Button icon={LucideAlignRight} />
      </Tooltip>
    </ButtonGroup>

    <ButtonGroup variant="fill" color="primary">
      <Tooltip title="left" offset={2}>
        <Button icon={LucideAlignLeft} />
      </Tooltip>
      <Tooltip title="center" offset={2}>
        <Button icon={LucideAlignCenter} />
      </Tooltip>
      <Tooltip title="right" offset={2}>
        <Button icon={LucideAlignRight} />
      </Tooltip>
    </ButtonGroup>

    <ButtonGroup variant="fill-light" color="primary">
      <Tooltip title="left" offset={2}>
        <Button icon={LucideAlignLeft} />
      </Tooltip>
      <Tooltip title="center" offset={2}>
        <Button icon={LucideAlignCenter} />
      </Tooltip>
      <Tooltip title="right" offset={2}>
        <Button icon={LucideAlignRight} />
      </Tooltip>
    </ButtonGroup>

    <ButtonGroup variant="fill-outline" color="primary">
      <Tooltip title="left" offset={2}>
        <Button icon={LucideAlignLeft} />
      </Tooltip>
      <Tooltip title="center" offset={2}>
        <Button icon={LucideAlignCenter} />
      </Tooltip>
      <Tooltip title="right" offset={2}>
        <Button icon={LucideAlignRight} />
      </Tooltip>
    </ButtonGroup>
  </div>
</Preview>
