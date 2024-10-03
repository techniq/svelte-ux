<script lang="ts">
  import { mdiInbox, mdiCheckCircleOutline } from '@mdi/js';

  import { Notification } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';
</script>

<h1>Examples</h1>

<h2>Basic</h2>

<Preview>
  <div class="w-[400px]">
    <Notification title="New software update available." closeIcon />
  </div>
</Preview>

<h2>Description</h2>

<Preview>
  <div class="w-[400px]">
    <Notification
      title="Successfully Saved!"
      description="Anyone with a link can now view this file."
      closeIcon
    />
  </div>
</Preview>

<h2>Icon</h2>

<Preview>
  <div class="w-[400px]">
    <Notification
      title="Successfully Saved!"
      icon={mdiCheckCircleOutline}
      classes={{ icon: { root: 'text-success' } }}
      closeIcon
    />
  </div>
</Preview>

<h2>Icon with description</h2>

<Preview>
  <div class="w-[400px]">
    <Notification
      title="Successfully Saved!"
      description="Anyone with a link can now view this file."
      icon={mdiCheckCircleOutline}
      classes={{ icon: { root: 'text-success' } }}
      closeIcon
    />
  </div>
</Preview>

<h2>Actions (inline / default)</h2>

<Preview>
  <div class="w-[400px]">
    <Notification title="Discussion archived" actions={{ Undo: () => alert('Undo') }} closeIcon />
  </div>
</Preview>

<h2>Actions (below)</h2>

<Preview>
  <div class="w-[400px]">
    <Notification
      title="Discussion moved"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit oluptatum tenetur."
      icon={mdiInbox}
      actions={{ Undo: () => alert('Undo'), Dismiss: () => {} }}
      variant="below"
      closeIcon
    />
  </div>
</Preview>

<h2>Actions (split)</h2>

<Preview>
  <div class="w-[600px]">
    <Notification
      title="Receive notifications"
      description="Notifications may include alerts, sounds, and badges"
      actions={{ Reply: () => alert('Allow'), "Don't Allow": () => alert("Don't Allow") }}
      variant="split"
      classes={{ actions: 'w-40' }}
    />
  </div>
</Preview>
