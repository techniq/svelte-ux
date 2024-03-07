<script lang="ts">
  import { createHeadSnippet } from '../styles/theme.js';
  import { getSettings } from './settings.js';

  const darkThemes = getSettings().themes?.dark ?? [];

  let headSnippet = createHeadSnippet(darkThemes);
</script>

<svelte:head>
  {@html headSnippet}
</svelte:head>
