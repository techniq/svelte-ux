<script lang="ts">
  import LucideArrowUpRight from '~icons/lucide/arrow-up-right';
  import LucideCircleSmall from '~icons/lucide/circle-small';
  import LucideDownload from '~icons/lucide/download';
  import LucideHeart from '~icons/lucide/heart';
  import LucideRefreshCw from '~icons/lucide/refresh-cw';
  import LucideUser from '~icons/lucide/user.svelte';
  import LucideUserRaw from '~icons/lucide/user.svelte?raw';

  const LucideUserSvg = LucideUserRaw as unknown as string;

  import { faUser } from '@fortawesome/free-solid-svg-icons';

  import { Button, ButtonGroup, getSettings, Icon, Tooltip } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';
  import Blockquote from '$docs/Blockquote.svelte';

  const { icons } = getSettings();

  // path examples
  const userPath = 'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8';
  const decagramOutline =
    'm23 12l-2.44 2.78l.34 3.68l-3.61.82l-1.89 3.18L12 21l-3.4 1.47l-1.89-3.18l-3.61-.82l.34-3.69L1 12l2.44-2.79l-.34-3.68l3.61-.81L8.6 1.54L12 3l3.4-1.46l1.89 3.18l3.61.82l-.34 3.68zm-2.67 0L18.5 9.89l.24-2.79L16 6.5l-1.42-2.43L12 5.18L9.42 4.07L8 6.5l-2.74.59l.24 2.79L3.67 12l1.83 2.1l-.24 2.8l2.74.6l1.42 2.43L12 18.81l2.58 1.11L16 17.5l2.74-.61l-.24-2.79z';
  const check = 'M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59z';
  const menuDown = 'm7 10l5 5l5-5z';
  const menuUp = 'm7 15l5-5l5 5z';
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
  <Icon data={userPath} />
  <Icon data={userPath} classes={{ path: 'fill-none stroke-current stroke-2' }} />
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
  <Icon>{@html LucideUserSvg}</Icon>
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
  <h2>Font Awesome icons</h2>
  <ButtonGroup variant="fill-light" color="primary" size="sm">
    <Button
      href="https://fontawesome.com/icons"
      target="_blank"
      class="flex-row-reverse"
      icon={LucideArrowUpRight}
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
      icon={LucideArrowUpRight}
    >
      Icons
    </Button>
    <Button
      href="https://developers.google.com/fonts/docs/material_symbols"
      target="_blank"
      class="flex-row-reverse"
      icon={LucideArrowUpRight}
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
    path={[decagramOutline, check]}
    classes={{ path: ['', 'text-primary scale-50 origin-center'] }}
  />
  <Icon
    path={[menuUp, menuDown]}
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
  <Tooltip title="User" offset={2}>
    <Icon data={userPath} />
  </Tooltip>
  <Tooltip title="User" offset={2}>
    <Icon svgUrl="https://api.iconify.design/lucide:user-round.svg" />
  </Tooltip>
  <Tooltip title="User" offset={2}>
    <Icon svg={LucideUserSvg} />
  </Tooltip>
  <Tooltip title="User" offset={2}>
    <Icon>{@html LucideUserSvg}</Icon>
  </Tooltip>
</Preview>
