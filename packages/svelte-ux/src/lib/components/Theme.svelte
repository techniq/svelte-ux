<script lang="ts">
  import { createTheme, type Theme } from './theme';

  export let theme: Theme;

  createTheme(theme);
</script>

<slot />
