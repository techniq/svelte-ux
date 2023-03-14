---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script lang="ts">
  import { mdiChevronDown, mdiFormatAlignLeft, mdiFormatAlignCenter, mdiFormatAlignRight } from '@mdi/js';

  import api from '$lib/components/Button.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Button from '$lib/components/Button.svelte';
  import ButtonGroup from '$lib/components/ButtonGroup.svelte';
  import Menu from '$lib/components/Menu.svelte';
  import MenuItem from '$lib/components/MenuItem.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import SectionDivider from '$lib/components/SectionDivider.svelte';
  import Toggle from '$lib/components/Toggle.svelte';
  import Tooltip from '$lib/components/Tooltip.svelte';
</script>

## Usage

```js
import { ButtonGroup } from 'svelte-ux';
```

# Examples

## Basic

<Preview>
  <div class="grid gap-2">
    <ButtonGroup variant="text" color="blue">
      <Button>Left</Button>
      <Button>Center</Button>
      <Button>Right</Button>
    </ButtonGroup>
    <ButtonGroup variant="outlined">
      <Button>Left</Button>
      <Button>Center</Button>
      <Button>Right</Button>
    </ButtonGroup>
    <ButtonGroup variant="filled" color="blue">
      <Button>Left</Button>
      <Button>Center</Button>
      <Button>Right</Button>
    </ButtonGroup>
  </div>
</Preview>

## Icons

<Preview>
  <div class="grid gap-2">
    <ButtonGroup variant="text" color="blue">
      <Button icon={mdiFormatAlignLeft} />
      <Button icon={mdiFormatAlignCenter} />
      <Button icon={mdiFormatAlignRight} />
    </ButtonGroup>
    <ButtonGroup variant="outlined">
      <Button icon={mdiFormatAlignLeft} />
      <Button icon={mdiFormatAlignCenter} />
      <Button icon={mdiFormatAlignRight} />
    </ButtonGroup>
    <ButtonGroup variant="filled" color="blue">
      <Button icon={mdiFormatAlignLeft} />
      <Button icon={mdiFormatAlignCenter} />
      <Button icon={mdiFormatAlignRight} />
    </ButtonGroup>
  </div>
</Preview>

## Icons (partially rounded)

<Preview>
  <div class="grid gap-2">
    <ButtonGroup variant="text" color="blue">
      <Button
        icon={mdiFormatAlignLeft}
        iconOnly={false}
      />
      <Button
        icon={mdiFormatAlignCenter}
        iconOnly={false}
      />
      <Button
        icon={mdiFormatAlignRight}
        iconOnly={false}
      />
    </ButtonGroup>
    <ButtonGroup variant="outlined">
      <Button
        icon={mdiFormatAlignLeft}
        iconOnly={false}
      />
      <Button
        icon={mdiFormatAlignCenter}
        iconOnly={false}
      />
      <Button
        icon={mdiFormatAlignRight}
        iconOnly={false}
      />
    </ButtonGroup>
    <ButtonGroup variant="filled" color="blue">
      <Button
        icon={mdiFormatAlignLeft}
        iconOnly={false}
      />
      <Button
        icon={mdiFormatAlignCenter}
        iconOnly={false}
      />
      <Button
        icon={mdiFormatAlignRight}
        iconOnly={false}
      />
    </ButtonGroup>
  </div>
</Preview>

## Selected

<Preview>
  <div class="grid gap-2">
    <ButtonGroup variant="text" color="blue">
      <Button
        icon={mdiFormatAlignLeft}
        iconOnly={false}
        class="bg-blue-50 hover:bg-blue-100 z-10"
      />
      <Button
        icon={mdiFormatAlignCenter}
        iconOnly={false}
      />
      <Button
        icon={mdiFormatAlignRight}
        iconOnly={false}
      />
    </ButtonGroup>
    <ButtonGroup variant="outlined">
      <Button
        icon={mdiFormatAlignLeft}
        iconOnly={false}
      />
      <Button
        icon={mdiFormatAlignCenter}
        iconOnly={false}
        class="text-blue-500 border-blue-500 bg-blue-50 hover:bg-blue-100 z-10"
      />
      <Button
        icon={mdiFormatAlignRight}
        iconOnly={false}
      />
    </ButtonGroup>
    <ButtonGroup variant="filled" color="blue">
      <Button
        icon={mdiFormatAlignLeft}
        iconOnly={false}
      />
      <Button
        icon={mdiFormatAlignCenter}
        iconOnly={false}
      />
      <Button
        icon={mdiFormatAlignRight}
        iconOnly={false}
          class="bg-blue-600 hover:bg-blue-700"
      />
    </ButtonGroup>
  </div>
</Preview>

## with Tooltip

<Preview>
  <div class="grid gap-2">
    <ButtonGroup variant="text" color="blue">
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
    <ButtonGroup variant="outlined">
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
    <ButtonGroup variant="filled" color="blue">
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

## Disabled

<Preview>
  <div class="grid gap-2">
    <ButtonGroup variant="text" color="blue" disabled>
      <Button
        icon={mdiFormatAlignLeft}
        iconOnly={false}
      />
      <Button
        icon={mdiFormatAlignCenter}
        iconOnly={false}
      />
      <Button
        icon={mdiFormatAlignRight}
        iconOnly={false}
      />
    </ButtonGroup>
    <ButtonGroup variant="outlined" disabled>
      <Button
        icon={mdiFormatAlignLeft}
        iconOnly={false}
      />
      <Button
        icon={mdiFormatAlignCenter}
        iconOnly={false}
      />
      <Button
        icon={mdiFormatAlignRight}
        iconOnly={false}
      />
    </ButtonGroup>
    <ButtonGroup variant="filled" disabled>
      <Button
        color="blue"
        icon={mdiFormatAlignLeft}
        iconOnly={false}
      />
      <Button
        color="blue"
        icon={mdiFormatAlignCenter}
        iconOnly={false}
      />
      <Button
        color="blue"
        icon={mdiFormatAlignRight}
        iconOnly={false}
      />
    </ButtonGroup>
  </div>
</Preview>

## with Menu

<Preview>
  <div class="grid gap-2">
    <ButtonGroup variant="text">
      <Button>Click me</Button>
      <Toggle let:on={open} let:toggle>
        <span>
          <Button
            icon={mdiChevronDown}
            on:click={toggle}
            rounded
            class="px-1"
          />
          <Menu {open} on:close={toggle} placement="bottom-start">
            <MenuItem>Hello</MenuItem>
            <MenuItem>Hello</MenuItem>
            <MenuItem>Hello</MenuItem>
            <MenuItem>Hello</MenuItem>
          </Menu>
        </span>
      </Toggle>
    </ButtonGroup>
    <ButtonGroup variant="outlined">
      <Button>Click me</Button>
      <Toggle let:on={open} let:toggle>
        <span>
          <Button
            icon={mdiChevronDown}
            on:click={toggle}
            rounded
            class="px-1"
          />
          <Menu {open} on:close={toggle} placement="bottom-start">
            <MenuItem>Hello</MenuItem>
            <MenuItem>Hello</MenuItem>
            <MenuItem>Hello</MenuItem>
            <MenuItem>Hello</MenuItem>
          </Menu>
        </span>
      </Toggle>
    </ButtonGroup>
    <ButtonGroup variant="filled" color="blue">
      <Button>Click me</Button>
      <Toggle let:on={open} let:toggle>
        <span>
          <Button
            icon={mdiChevronDown}
            on:click={toggle}
            rounded
            class="px-1"
          />
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

# API

<ApiDocs {api} />
