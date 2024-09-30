<script lang="ts">
  import { cls } from '@layerstack/tailwind';
  import { getComponentClasses } from './theme.js';

  const settingsClasses = getComponentClasses('SectionDivider');
</script>

<div
  {...$$props}
  class={cls('SectionDivider', 'flex items-center my-2', settingsClasses.root, $$props.class)}
>
  <div class="flex-1 border h-px rounded-full mr-2"></div>
  <div class="font-medium text-surface-content border px-4 rounded-full bg-surface-100 shadow">
    <slot />
  </div>
  <div class="flex-1 border h-px rounded-full ml-2"></div>
</div>
