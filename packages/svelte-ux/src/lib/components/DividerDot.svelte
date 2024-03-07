<script lang="ts">
  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';

  const settingsClasses = getComponentClasses('DividerDot');
</script>

<span class={cls('DividerDot mx-1', settingsClasses.root, $$props.class)}> • </span>
