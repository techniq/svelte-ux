<script lang="ts">
  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';

  interface Props {
    class?: string;
  }

  let { class: className }: Props = $props();

  const settingsClasses = getComponentClasses('DividerDot');
</script>

<span class={cls('DividerDot mx-1', settingsClasses.root, className)}> • </span>
