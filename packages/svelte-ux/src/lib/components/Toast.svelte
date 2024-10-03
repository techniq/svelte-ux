<script lang="ts">
  import toastStore, { removeToast } from '$lib/stores/toastStore.js';
  import Notification from './Notification.svelte';
  import {portal} from '../actions/portal.js';

  import {cls} from '../utils/styles.js';
  import Button from './Button.svelte';

  type Placement = 'top' | 'top-right' | 'right' | 'bottom-right' |
                   'bottom' | 'bottom-left' | 'left' | 'top-left';

  const DEFAULT_PLACEMENT: Placement = 'bottom';
  export let placement: Placement = DEFAULT_PLACEMENT;
  export const classes: string = '';

  const isOnTop = placement.includes('top');
  const isOnBottom = placement.includes('bottom');
  const isOnLeft = placement.includes('left');
  const isOnRight = placement.includes('right');
</script>

<div class={cls(
  'Toast fixed z-50 portal-content',
  isOnTop ? 'top-0' : isOnBottom ? 'bottom-0' : 'translate-y-[-50%] top-1/2',
  isOnLeft ? 'left-0' : isOnRight ? 'right-0'  : 'translate-x-[-50%] left-1/2',
  classes
)}
 use:portal={true}
>
  {#each $toastStore as toast}
    <div class="mt-4">
      <Notification open={true}
                    closeIcon
                    actions={toast.actionPlacement}
                    onClose={() => {
                      removeToast(toast);
                    }}
      >
        <span slot="title">{toast.text}</span>
        <div slot="actions">
          {#each toast.actions || [] as action}
            <Button
              icon={action.icon}
              variant={action.variant}
              rounded={action.rounded}
              color={action.color}
              on:click={action.onClick}
            >
              {action.children}
            </Button>
          {/each}
        </div>
      </Notification>
    </div>
  {/each}
</div>
