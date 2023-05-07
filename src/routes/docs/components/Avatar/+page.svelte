<script>
  import { mdiAccount } from '@mdi/js';

  import api from '$lib/components/Avatar.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Avatar from '$lib/components/Avatar.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Preview from '$lib/components/Preview.svelte';
</script>

<h1>Examples</h1>

<h2>Default</h2>

<Preview>
  <Avatar>A</Avatar>
</Preview>

<h2>Color</h2>

<Preview>
  <Avatar class="bg-blue-500 text-white font-bold">A</Avatar>
</Preview>

<h2>Border</h2>

<Preview>
  <Avatar class="border">A</Avatar>
</Preview>

<h2>Size</h2>

<Preview>
  <Avatar class="bg-blue-500 text-white font-bold text-xs" size="sm">sm</Avatar>
  <Avatar class="bg-blue-500 text-white font-bold" size="md">md</Avatar>
  <Avatar class="bg-blue-500 text-white font-bold" size="lg">lg</Avatar>
</Preview>

<h2>Icon (prop)</h2>

<Preview>
  <Avatar class="bg-blue-500 text-white" icon={mdiAccount} />
</Preview>

<h2>Icon (slot)</h2>

<Preview>
  <Avatar class="bg-blue-500">
    <Icon path={mdiAccount} class="text-white" />
  </Avatar>
</Preview>

<h1>API</h1>

<ApiDocs {api} />
