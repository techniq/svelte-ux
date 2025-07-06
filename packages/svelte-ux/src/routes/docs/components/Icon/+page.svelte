<script lang="ts">
  import {
    mdiAccount,
    mdiCheck,
    mdiDecagramOutline,
    mdiOpenInNew,
    mdiMenuUp,
    mdiMenuDown,
  } from '@mdi/js';

  import LucideUser from '~icons/lucide/user.svelte';
  import LucideUserRaw from '~icons/lucide/user.svelte?raw';
  import LucideHeart from '~icons/lucide/heart';
  import LucideCircleSmall from '~icons/lucide/circle-small';
  import LucideDownload from '~icons/lucide/download';
  import LucideRefreshCw from '~icons/lucide/refresh-cw';

  const LucideUserSvg = LucideUserRaw as unknown as string;

  import { faUser } from '@fortawesome/free-solid-svg-icons';

  import { Button, ButtonGroup, getSettings, Icon, Tooltip } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';
  import Blockquote from '$docs/Blockquote.svelte';

  const { icons } = getSettings();
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:FILL@0..1"
    rel="stylesheet"
  />
</svelte:head>

<h1>Examples</h1>

<h2>Path data</h2>

<Preview>
  <Icon data="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8" />
  <Icon
    data="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8"
    classes={{ path: 'fill-none stroke-current stroke-2' }}
  />
</Preview>

<h2>Svg string</h2>

<Preview>
  <Icon svg={LucideUserSvg} />
</Preview>

<h2>Svg url</h2>

<Preview>
  <Icon svgUrl="https://api.iconify.design/lucide:user-round.svg" />
</Preview>

<h2>Svg element</h2>

<Preview>
  <Icon>
    <svg viewBox="0 0 24 24" width="1.2em" height="1.2em">
      <g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </g>
    </svg>
  </Icon>
</Preview>

<h2>Component</h2>

<Preview>
  <Icon data={LucideUser} />
</Preview>

<Blockquote
  >Typically you will use the component directly, but it can be helpful when passing as a prop or
  part of a structure, such as a menu item</Blockquote
>

<div class="grid grid-cols-[1fr_auto] items-center gap-2">
  <h2>Material Design icons</h2>

  <ButtonGroup variant="fill-light" color="primary" size="sm">
    <Button
      href="https://pictogrammers.com/library/mdi/"
      target="_blank"
      class="flex-row-reverse"
      icon={mdiOpenInNew}
    >
      Icons
    </Button>
  </ButtonGroup>
</div>

<Preview>
  <Icon data={mdiAccount} />
</Preview>

<div class="grid grid-cols-[1fr_auto] items-center gap-2">
  <h2>Font Awesome icons</h2>
  <ButtonGroup variant="fill-light" color="primary" size="sm">
    <Button
      href="https://fontawesome.com/icons"
      target="_blank"
      class="flex-row-reverse"
      icon={mdiOpenInNew}
    >
      Icons
    </Button>
  </ButtonGroup>
</div>

<Preview>
  <Icon data={faUser} />
</Preview>

<div class="grid grid-cols-[1fr_auto] items-center gap-2">
  <h2>Material Symbols font</h2>

  <ButtonGroup variant="fill-light" color="primary" size="sm">
    <Button
      href="https://fonts.google.com/icons"
      target="_blank"
      class="flex-row-reverse"
      icon={mdiOpenInNew}
    >
      Icons
    </Button>
    <Button
      href="https://developers.google.com/fonts/docs/material_symbols"
      target="_blank"
      class="flex-row-reverse"
      icon={mdiOpenInNew}
    >
      Docs
    </Button>
  </ButtonGroup>
</div>

<Preview>
  <Icon>
    <span class="material-symbols-outlined">person</span>
  </Icon>
  <Icon>
    <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1">
      person
    </span>
  </Icon>
</Preview>

<h2>Sizes</h2>

<Preview>
  <Icon data={LucideUserSvg} size="8px" />
  <Icon data={LucideUserSvg} size="1em" />
  <Icon data={LucideUserSvg} size="1.5em" />
  <Icon data={LucideUserSvg} size="2em" />
  <Icon data={LucideUserSvg} size="2.5em" />
  <Icon data={LucideUserSvg} size="3em" />
  <Icon data={LucideUserSvg} size="64px" />
  <Icon svgUrl="https://api.iconify.design/lucide:user-round.svg" size="64px" />
</Preview>

<h2>Color</h2>

<Preview>
  <Icon data={LucideUserSvg} class="text-danger" />
  <Icon data={LucideUserSvg} class="text-primary" />
  <Icon data={LucideUserSvg} class="text-success" />
  <Icon data={LucideUserSvg} class="text-surface-content/50" />
  <Icon svgUrl="https://api.iconify.design/lucide:user-round.svg" class="text-danger" />
  <Icon svg={LucideUserSvg} class="text-primary" />
  <Icon data={LucideUserSvg} style="color:red" />
</Preview>

<h2>Multiple paths</h2>

<Preview>
  <Icon
    path={[mdiDecagramOutline, mdiCheck]}
    classes={{ path: ['', 'text-primary scale-50 origin-center'] }}
  />
  <Icon
    path={[mdiMenuUp, mdiMenuDown]}
    classes={{ path: ['translate-y-[-4px]', 'translate-y-[4px] text-primary'] }}
  />
</Preview>

<h2>Rotate / Scale / Flip</h2>

<Preview>
  <Icon data={icons.arrowRight} class="-rotate-45" />
  <Icon data={icons.arrowRight} class="scale-75" />
  <Icon data={icons.arrowRight} class="-scale-x-100" />
  <Icon data={LucideUser} class="-scale-y-100" />
  <Icon svgUrl="https://api.iconify.design/lucide:user-round.svg" class="-scale-y-100" />
</Preview>

<h2>Animation</h2>

<Preview>
  <Icon data={LucideRefreshCw} class="animate-spin" />
  <Icon data={LucideHeart} class="animate-pulse" />
  <Icon data={LucideCircleSmall} class="animate-ping" />
  <Icon data={LucideDownload} class="animate-bounce" />
</Preview>

<h2>with Tooltip</h2>

<Preview>
  <Tooltip title="User">
    <Icon data={mdiAccount} />
  </Tooltip>
  <Tooltip title="User">
    <Icon svgUrl="https://api.iconify.design/mdi:account.svg" />
  </Tooltip>
  <Tooltip title="User">
    <Icon
      svg={'<svg width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4Z"/></svg>'}
    />
  </Tooltip>
  <Tooltip title="User">
    <Icon>
      <svg width="32" height="32" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4Z"
        />
      </svg>
    </Icon>
  </Tooltip>
</Preview>
