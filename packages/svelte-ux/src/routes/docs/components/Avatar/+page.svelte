<script lang="ts">
  import { Avatar, Icon } from 'svelte-ux';
  import LucideUserRound from '~icons/lucide/user-round';

  import Preview from '$lib/components/Preview.svelte';
</script>

<h1>Examples</h1>

<h2>Default</h2>

<Preview>
  <Avatar>A</Avatar>
</Preview>

<h2>Color</h2>

<Preview>
  <Avatar class="bg-primary text-primary-content font-bold">A</Avatar>
</Preview>

<h2>Border</h2>

<Preview>
  <Avatar class="border">A</Avatar>
</Preview>

<h2>Size</h2>

<Preview>
  <Avatar class="bg-primary text-primary-content font-bold text-xs" size="sm">sm</Avatar>
  <Avatar class="bg-primary text-primary-content font-bold" size="md">md</Avatar>
  <Avatar class="bg-primary text-primary-content font-bold" size="lg">lg</Avatar>
</Preview>

<h2>Icon (prop)</h2>

<Preview>
  <Avatar class="bg-primary text-primary-content" icon={LucideUserRound} />
</Preview>

<h2>Icon (slot)</h2>

<Preview>
  <Avatar class="bg-primary">
    <Icon data={LucideUserRound} class="text-primary-content" />
  </Avatar>
</Preview>
