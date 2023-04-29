<script lang="ts">
  import { mdiGithub } from '@mdi/js';

  import AppBar from '$lib/components/AppBar.svelte';
  import Button from '$lib/components/Button.svelte';
  import Tooltip from '$lib/components/Tooltip.svelte';
</script>

<AppBar title="svelte-ux">
  <div slot="actions">
    <Tooltip title="View repository" placement="left" offset={2}>
      <Button
        icon={mdiGithub}
        href="https://github.com/techniq/svelte-ux"
        class="p-2"
        target="_blank"
      />
    </Tooltip>
  </div>
</AppBar>

<main class="scroll-smooth">
  <slot />
</main>
