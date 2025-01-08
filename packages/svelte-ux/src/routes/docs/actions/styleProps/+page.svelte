<script lang="ts">
  import { TextField, styleProps } from 'svelte-ux';

  import Preview from '$lib/components/Preview.svelte';
  import Code from '$lib/components/Code.svelte';

  let background = $state('#ddd');
  let border = $state('1px solid #aaa');
</script>

<h1>Usage</h1>

<Code source={`import { styleProps } from 'svelte-ux';`} language="javascript" class="mb-4" />

<Preview>
  {@const styles = { '--background': background, '--border': border }}
  <div class="grid gap-4" use:styleProps={styles}>
    <div
      class="w-10 h-10 rounded"
      style:background-color="var(--background)"
      style:border="var(--border)"
    ></div>
    <div class="grid grid-flow-col gap-2">
      <TextField label="Background" bind:value={background} />
      <TextField label="Border" bind:value={border} />
    </div>
  </div>
</Preview>
