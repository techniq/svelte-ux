<script>
  import { createHeadSnippet } from '../styles/theme';
  import { getSettings } from './settings';

  const darkThemes = getSettings().themes?.dark ?? [];

  let headSnippet = createHeadSnippet(darkThemes);
</script>

<svelte:head>
  {@html headSnippet}
</svelte:head>
