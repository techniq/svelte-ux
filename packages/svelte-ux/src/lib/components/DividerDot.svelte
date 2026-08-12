<script lang="ts">
  import { cls } from '@layerstack/tailwind';
  import { getComponentClasses } from './theme.js';

  let className: string | undefined = undefined;
  export { className as class };

  const settingsClasses = getComponentClasses('DividerDot');
</script>

<span class={cls('DividerDot mx-1', settingsClasses.root, className)}> • </span>
