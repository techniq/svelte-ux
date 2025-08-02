<script lang="ts">
  import { Button, getSettings, Icon, Switch } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';

  const { icons } = getSettings();

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
  <!-- svelte-ignore a11y-label-has-associated-control -->
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
        <Icon data={icons.check} class="size-3 text-primary" />
      {/if}
    </Switch>
    <Switch let:checked>
      {#if checked}
        <Icon data={icons.check} class="size-3 text-primary" />
      {:else}
        <Icon data={icons.close} class="size-3 text-surface-content" />
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
      <Icon data={icons.check} class="size-3 text-surface-content/50" />
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
  <div class="inline-grid grid-cols-[auto_auto] gap-2">
    <Switch color="primary" />
    <Switch checked color="primary" />
    <Switch color="secondary" />
    <Switch checked color="secondary" />
    <Switch color="accent" />
    <Switch checked color="accent" />
    <Switch color="neutral" />
    <Switch checked color="neutral" />
    <Switch color="success" />
    <Switch checked color="success" />
    <Switch color="danger" />
    <Switch checked color="danger" />
  </div>
</Preview>

<h2>Custom classes</h2>

<Preview>
  <div class="grid gap-2">
    <Switch
      color="success"
      classes={{ switch: 'data-[checked=false]:bg-danger data-[checked=false]:border-danger' }}
    />
    <Switch
      classes={{
        switch: 'bg-surface-100 border-surface-content/50',
        toggle: 'data-[checked=false]:bg-danger data-[checked=true]:bg-success',
      }}
    />
  </div>
</Preview>
