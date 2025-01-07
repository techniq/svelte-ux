<script lang="ts">
  import { mdiAlertCircle } from '@mdi/js';

  import Button from './Button.svelte';
  import Dialog from './Dialog.svelte';
  import Icon from './Icon.svelte';
  import Notification from './Notification.svelte';
  import Toggle from './Toggle.svelte';
  import type { ComponentProps } from 'svelte';

  interface Props {
    title: string;
    description: string;
    message?: string;
    stackTrace?: string;
    onClose: ComponentProps<typeof Notification>['onClose'];
  }

  let {
    title: titleString,
    description: descriptionString,
    message = '',
    stackTrace = '',
    onClose,
  }: Props = $props();

  let hasDetails = $derived(message || stackTrace);
</script>

<Toggle>
  {#snippet children({ on: open, toggle })}
    <Notification actionsPlacement="below" closeIcon {onClose}>
      {#snippet icon()}
        <div class="self-start">
          <Icon data={mdiAlertCircle} class="text-danger" />
        </div>
      {/snippet}
      {#snippet title()}
        <div>{titleString}</div>
      {/snippet}

      {#snippet description()}
        <div class="max-w-3xl max-h-64 overflow-auto whitespace-pre">
          {#if descriptionString}
            <div class="grid gap-2">
              {#each descriptionString.split('\n') as line}
                <div>{line}</div>
              {/each}
            </div>
          {/if}
        </div>
      {/snippet}

      {#snippet actions()}
        <div>
          {#if hasDetails}
            <Button
              onclick={(e) => {
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
      {/snippet}
    </Notification>

    <Dialog {open} style="max-width: 90vw">
      {#snippet title()}
        <div>
          {#if message}
            {#each message.split('\n') as msg}
              <div>{msg}</div>
            {/each}
          {/if}
        </div>
      {/snippet}

      <div class="grid gap-4 p-6">
        {#if stackTrace}
          <div>
            <div class="text-xs text-surface-content/50 mb-1">Stacktrace:</div>
            <pre class="bg-gray-100 border rounded p-2 text-xs">
              {stackTrace ?? '<Empty>'}
            </pre>
          </div>
        {/if}
      </div>

      {#snippet actions()}
        <div>
          <Button color="primary" onclick={toggle}>Close</Button>
        </div>
      {/snippet}
    </Dialog>
  {/snippet}
</Toggle>
