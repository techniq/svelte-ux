<script lang="ts">
  import { cls } from '../utils/styles';
  import { getComponentTheme } from './theme';

  const theme = getComponentTheme('SectionDivider');
</script>

<div
  {...$$props}
  class={cls('SectionDivider', 'flex items-center my-2', theme.root, $$props.class)}
>
  <div class="flex-1 border border-black/50 h-px rounded-full mr-2" />
  <div class="font-medium text-black/80 border border-black/50 px-4 rounded-full bg-black/5 shadow">
    <slot />
  </div>
  <div class="flex-1 border border-black/50 h-px rounded-full ml-2" />
</div>
