<script lang="ts">
  import { cls } from '../utils/styles';
  import { getComponentTheme } from './theme';

  const theme = getComponentTheme('DividerDot');
</script>

<span class={cls('DividerDot mx-1', theme.root, $$props.class)}> • </span>
