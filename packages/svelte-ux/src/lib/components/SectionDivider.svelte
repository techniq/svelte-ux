<script lang="ts">
  import { cls } from '@layerstack/tailwind';
  import { getComponentClasses } from './theme.js';

  let className: string | undefined = undefined;
  export { className as class };

  const settingsClasses = getComponentClasses('SectionDivider');
</script>

<div
  {...$$restProps}
  class={cls('SectionDivider', 'flex items-center my-2', settingsClasses.root, className)}
>
  <div class="flex-1 border h-px rounded-full mr-2"></div>
  <div class="font-medium text-surface-content border px-4 rounded-full bg-surface-100 shadow-sm">
    <slot />
  </div>
  <div class="flex-1 border h-px rounded-full ml-2"></div>
</div>
