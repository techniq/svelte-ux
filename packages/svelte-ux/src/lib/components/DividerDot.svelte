<script lang="ts">
  import { cls } from '../utils/styles';
  import { getComponentClasses } from './theme';

  const settingsClasses = getComponentClasses('DividerDot');
</script>

<span class={cls('DividerDot mx-1', settingsClasses.root, $$props.class)}> • </span>
