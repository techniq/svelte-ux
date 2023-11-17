<script lang="ts">
  import { settings as setSettings, type Settings } from './settings';

  export let settings: Settings;

  setSettings(settings);
</script>

<slot />
