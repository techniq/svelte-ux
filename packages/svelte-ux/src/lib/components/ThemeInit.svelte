<script lang="ts">
  import { createHeadSnippet } from '@layerstack/tailwind';
  import { getSettings } from './settings.js';

  const darkThemes = getSettings().themes?.dark ?? [];

  let headSnippet = createHeadSnippet(darkThemes);
</script>

<svelte:head>
  {@html headSnippet}
</svelte:head>
