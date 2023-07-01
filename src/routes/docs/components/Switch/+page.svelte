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

<h2>Icons</h2>

<Preview>
  <div class="grid gap-2">
    <Switch let:checked>
      {#if checked}
        <Icon path={mdiCheck} class="text-blue-500" size=".8em" />
      {/if}
    </Switch>
    <Switch let:checked>
      {#if checked}
        <Icon path={mdiCheck} class="text-blue-500" size=".8em" />
      {:else}
        <Icon path={mdiClose} class="text-gray-400" size=".8em" />
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
      <Icon path={mdiCheck} class="text-black/50" size=".8em" />
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
    <Switch color="red" />
    <Switch checked color="red" />
    <Switch color="green" />
    <Switch checked color="green" />
    <Switch color="purple" />
    <Switch checked color="purple" />
  </div>
</Preview>

<h2>Custom classes</h2>

<Preview>
  <div class="grid gap-2">
    <Switch
      color="green"
      classes={{ switch: 'data-[checked=false]:bg-red-500 data-[checked=false]:border-red-500' }}
    />
    <Switch
      classes={{
        switch: 'bg-white border-gray-400',
        toggle: 'data-[checked=false]:bg-red-500 data-[checked=true]:bg-green-500',
      }}
    />
  </div>
</Preview>
