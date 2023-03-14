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
    <ButtonGroup variant="filled">
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
    <ButtonGroup>
      <Button>Click me</Button>
      <Toggle let:on={open} let:toggle>
        <span>
          <Button
            icon={mdiChevronDown}
            iconOnly={false}
            on:click={toggle}
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
            iconOnly={false}
            on:click={toggle}
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
            iconOnly={false}
            on:click={toggle}
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
