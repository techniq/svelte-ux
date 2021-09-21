<script lang="ts">
  import { mdiAlertCircle } from '@mdi/js';

  import { Button, Dialog, Icon, Notification, Stack, Toggle } from 'svelte-ux';

  export let title: string;
  export let description: string;

  export let message: string = '';
  export let stackTrace: string = '';

  $: hasDetails = message || stackTrace;
</script>

<Toggle let:on={open} let:toggle>
  <Notification actions="below" closeIcon on:close>
    <div slot="icon" class="self-start">
      <Icon path={mdiAlertCircle} class="text-red-500" />
    </div>
    <div slot="title">{title}</div>

    <div slot="description" class="w-80">
      {#if description}
        <Stack vertical gap={8}>
          {#each description.split('\n') as line}
            <div>{line}</div>
          {/each}
        </Stack>
      {/if}
    </div>

    <div slot="actions">
      {#if hasDetails}
        <Button
          on:click={(e) => {
            e.stopPropagation();
            toggle();
          }}
          class="text-blue-500"
        >
          View Details
        </Button>
      {/if}
      <Button>Dismiss</Button>
    </div>
  </Notification>

  <Dialog {open} clickAway style="max-width: 90vw">
    <div slot="title">
      {#if message}
        {#each message.split('\n') as message}
          <div>{message}</div>
        {/each}
      {/if}
    </div>

    <Stack vertical gap={16} class="p-6">
      {#if stackTrace}
        <div>
          <div class="text-xs text-black/50 mb-1">Stacktrace:</div>
          <pre
            class="bg-gray-100 border rounded p-2 text-xs">
            {stackTrace ?? '<Empty>'}
          </pre>
        </div>
      {/if}
    </Stack>

    <div slot="actions">
      <Button on:click={toggle} class="text-blue-500 hover:bg-blue-500">Close</Button>
    </div>
  </Dialog>
</Toggle>
