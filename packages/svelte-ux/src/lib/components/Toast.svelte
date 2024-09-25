<script lang="ts">
  import toastStore from '$lib/stores/toastStore.js';
  import Notification from './Notification.svelte';

  import {cls} from '../utils/styles.js';

  type Placement = 'top' | 'top-right' | 'right' | 'bottom-right' |
                   'bottom' | 'bottom-left' | 'left' | 'top-left';

  const DEFAULT_PLACEMENT: Placement = 'bottom';
  export let placement: Placement = DEFAULT_PLACEMENT;

  const isOnTop = placement.includes('top');
  const isOnBottom = placement.includes('bottom');
  const isOnLeft = placement.includes('left');
  const isOnRight = placement.includes('right');
</script>

<div class={cls(
  'Toast fixed z-50',
  isOnTop ? 'top-0' : isOnBottom ? 'bottom-0' : 'translate-y-[-50%] top-1/2',
  isOnLeft ? 'left-0' : isOnRight ? 'right-0'  : 'translate-x-[-50%] left-1/2'
)}>
  {#each $toastStore as toast}
    <div class="mt-4">
      <Notification open={true} closeIcon>
        <span slot="title">{toast.text}</span>
      </Notification>
    </div>
  {/each}
</div>
