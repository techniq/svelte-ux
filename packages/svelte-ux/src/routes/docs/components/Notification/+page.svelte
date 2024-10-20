<script lang="ts">
  import { Notification } from 'svelte-ux';
  import { colors } from '@layerstack/tailwind';
  import { toTitleCase } from '@layerstack/utils';

  import {
    mdiInbox,
    mdiCheckCircleOutline,
    mdiInformationOutline,
    mdiAlertOutline,
    mdiAlertOctagonOutline,
  } from '@mdi/js';

  import Preview from '$lib/components/Preview.svelte';

  function themeColorIcon(color: (typeof colors)[number]) {
    switch (color) {
      case 'accent':
        return mdiInformationOutline;
      case 'success':
        return mdiCheckCircleOutline;
      case 'neutral':
        return mdiInformationOutline;
      case 'danger':
        return mdiAlertOctagonOutline;
      case 'primary':
        return mdiInformationOutline;
      case 'secondary':
        return mdiInformationOutline;
      case 'info':
        return mdiInformationOutline;
      case 'warning':
        return mdiAlertOutline;
    }
  }
</script>

<h1>Examples</h1>

<h2>Basic</h2>

<Preview>
  <div class="w-[400px]">
    <Notification title="New software update available." closeIcon />
  </div>
</Preview>

<h2>Description</h2>

<Preview>
  <div class="w-[400px]">
    <Notification
      title="Successfully Saved!"
      description="Anyone with a link can now view this file."
      closeIcon
    />
  </div>
</Preview>

<h2>Icon</h2>

<Preview>
  <div class="w-[400px]">
    <Notification
      title="Successfully Saved!"
      icon={mdiCheckCircleOutline}
      color="success"
      closeIcon
    />
  </div>
</Preview>

<h2>Icon with description</h2>

<Preview>
  <div class="w-[400px]">
    <Notification
      title="Successfully Saved!"
      description="Anyone with a link can now view this file."
      icon={mdiCheckCircleOutline}
      color="success"
      closeIcon
    />
  </div>
</Preview>

<h2>Actions (inline / default)</h2>

<Preview>
  <div class="w-[400px]">
    <Notification title="Discussion archived" actions={{ Undo: () => alert('Undo') }} closeIcon />
  </div>
</Preview>

<h2>Actions (below)</h2>

<Preview>
  <div class="w-[400px]">
    <Notification
      title="Discussion moved"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit oluptatum tenetur."
      icon={mdiInbox}
      actions={{ Undo: () => alert('Undo'), Dismiss: () => {} }}
      actionsPlacement="below"
      closeIcon
    />
  </div>
</Preview>

<h2>Actions (split)</h2>

<Preview>
  <div class="w-[600px]">
    <Notification
      title="Receive notifications"
      description="Notifications may include alerts, sounds, and badges"
      actions={{ Allow: () => alert('Allow'), "Don't Allow": () => alert("Don't Allow") }}
      actionsPlacement="split"
      classes={{ actions: 'w-40' }}
    />
  </div>
</Preview>

<h2>Color</h2>

<Preview>
  <div class="grid gap-2 w-[400px]">
    {#each colors as color}
      <Notification
        title={toTitleCase(color)}
        description="An example using {color} color"
        icon={themeColorIcon(color)}
        {color}
        closeIcon
      />
    {/each}
  </div>
</Preview>

<h2>Variant (fill)</h2>

<Preview>
  <div class="grid gap-2 w-[400px]">
    {#each colors as color}
      <Notification
        title={toTitleCase(color)}
        description="An example using {color} color"
        icon={themeColorIcon(color)}
        {color}
        variant="fill"
        closeIcon
      />
    {/each}
  </div>
</Preview>

<h2>Variant (fill) with inline actions</h2>

<Preview>
  <div class="grid gap-2 w-[400px]">
    {#each colors as color}
      <Notification
        title="Example using {color} color"
        {color}
        variant="fill"
        actions={{ Undo: () => alert('Undo') }}
        closeIcon
      />
    {/each}
  </div>
</Preview>

<h2>Variant (fill) with actions below</h2>

<Preview>
  <div class="grid gap-2 w-[400px]">
    {#each colors as color}
      <Notification
        title={toTitleCase(color)}
        description="An example using {color} color"
        icon={themeColorIcon(color)}
        {color}
        variant="fill"
        actions={{ Allow: () => alert('Allow'), "Don't Allow": () => alert("Don't Allow") }}
        actionsPlacement="below"
      />
    {/each}
  </div>
</Preview>

<h2>Variant (fill) with split actions</h2>

<Preview>
  <div class="grid gap-2 w-[600px]">
    {#each colors as color}
      <Notification
        title={toTitleCase(color)}
        description="An example using {color} color"
        icon={themeColorIcon(color)}
        {color}
        variant="fill"
        actions={{ Allow: () => alert('Allow'), "Don't Allow": () => alert("Don't Allow") }}
        actionsPlacement="split"
        classes={{ actions: 'w-40' }}
      />
    {/each}
  </div>
</Preview>
