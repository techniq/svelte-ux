<script lang="ts">
  import Button from './Button.svelte';
  import Dialog from './Dialog.svelte';
  import Icon from './Icon.svelte';
  import Notification from './Notification.svelte';
  import { getSettings } from './settings.js';
  import Toggle from './Toggle.svelte';

  export let title: string;
  export let description: string;

  export let message: string = '';
  export let stackTrace: string = '';

  const { icons } = getSettings();

  $: hasDetails = message || stackTrace;
</script>

<Toggle let:on={open} let:toggle>
  <Notification actionsPlacement="below" closeIcon on:close>
    <div slot="icon" class="self-start">
      <Icon data={icons.alert} class="text-danger" />
    </div>
    <div slot="title">{title}</div>

    <div slot="description" class="max-w-3xl max-h-64 overflow-auto whitespace-pre">
      {#if description}
        <div class="grid gap-2">
          {#each description.split('\n') as line}
            <div>{line}</div>
          {/each}
        </div>
      {/if}
    </div>

    <div slot="actions">
      {#if hasDetails}
        <Button
          on:click={(e) => {
            e.stopPropagation();
            toggle();
          }}
          class="primary"
        >
          View Details
        </Button>
      {/if}
      <Button color={hasDetails ? 'default' : 'primary'}>Dismiss</Button>
    </div>
  </Notification>

  <Dialog {open} style="max-width: 90vw">
    <div slot="title">
      {#if message}
        {#each message.split('\n') as msg}
          <div>{msg}</div>
        {/each}
      {/if}
    </div>

    <div class="grid gap-4 p-6">
      {#if stackTrace}
        <div>
          <div class="text-xs text-surface-content/50 mb-1">Stacktrace:</div>
          <pre class="bg-gray-100 border rounded-sm p-2 text-xs">
            {stackTrace ?? '<Empty>'}
          </pre>
        </div>
      {/if}
    </div>

    <div slot="actions">
      <Button color="primary" on:click={toggle}>Close</Button>
    </div>
  </Dialog>
</Toggle>
