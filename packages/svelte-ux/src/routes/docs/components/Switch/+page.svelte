<script lang="ts">
  import { mdiCheck, mdiClose } from '@mdi/js';

  import Button from '$lib/components/Button.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Switch from '$lib/components/Switch.svelte';
  import Preview from '$lib/components/Preview.svelte';

  let checked: boolean | null = null;
</script>

<h1>Examples</h1>

<h2>Basic</h2>

<Preview>
  <div class="grid gap-2">
    <Switch />
    <Switch checked />
  </div>
</Preview>

<h2>Label</h2>

<Preview>
  <div class="grid gap-2">
    <label class="flex gap-2 items-center text-sm">
      Click me
      <Switch />
    </label>
    <label class="flex gap-2 items-center text-sm">
      <Switch />
      Click me
    </label>
  </div>
</Preview>

<h2>Icons</h2>

<Preview>
  <div class="grid gap-2">
    <Switch let:checked>
      {#if checked}
        <Icon path={mdiCheck} class="text-primary" size=".8em" />
      {/if}
    </Switch>
    <Switch let:checked>
      {#if checked}
        <Icon path={mdiCheck} class="text-primary" size=".8em" />
      {:else}
        <Icon path={mdiClose} class="text-surface-content" size=".8em" />
      {/if}
    </Switch>
  </div>
</Preview>

<h2>Disabled</h2>

<Preview>
  <div class="grid gap-2">
    <Switch disabled />
    <Switch disabled checked />
    <Switch disabled>
      <Icon path={mdiCheck} class="text-surface-content/50" size=".8em" />
    </Switch>
  </div>
</Preview>

<h2>checked={null}</h2>

<Preview>
  <Switch bind:checked />
  <Button on:click={() => (checked = null)} size="sm">reset</Button>
</Preview>

<h2>Size</h2>

<Preview>
  <div class="grid gap-2">
    <Switch size="sm" />
    <Switch size="md" />
    <Switch size="lg" />
  </div>
</Preview>

<h2>Color</h2>

<Preview>
  <div class="inline-grid grid-cols-[auto,auto] gap-2">
    <Switch color="primary" />
    <Switch checked color="primary" />
    <Switch color="secondary" />
    <Switch checked color="secondary" />
    <Switch color="success" />
    <Switch checked color="success" />
    <Switch color="error" />
    <Switch checked color="error" />
  </div>
</Preview>

<h2>Custom classes</h2>

<Preview>
  <div class="grid gap-2">
    <Switch
      color="success"
      classes={{ switch: 'data-[checked=false]:bg-error data-[checked=false]:border-error' }}
    />
    <Switch
      classes={{
        switch: 'bg-surface-100 border-surface-content/50',
        toggle: 'data-[checked=false]:bg-error data-[checked=true]:bg-success',
      }}
    />
  </div>
</Preview>
