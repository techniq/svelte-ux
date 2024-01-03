<script lang="ts">
  import { mdiInbox, mdiCheckCircleOutline } from '@mdi/js';

  import Button from '$lib/components/Button.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import Notification from '$lib/components/Notification.svelte';
</script>

<h1>Examples</h1>

<h2>Basic</h2>

<Preview>
  <div class="w-[400px]">
    <Notification open closeIcon>
      <div slot="icon">
        <Icon path={mdiCheckCircleOutline} class="text-green-500" />
      </div>
      <div slot="title">Successfully Saved!</div>
      <div slot="description">Anyone with a link can now view this file.</div>
    </Notification>
  </div>
</Preview>

<h2>Condensed</h2>

<Preview>
  <div class="w-[400px]">
    <Notification open actions="right" closeIcon>
      <div slot="title">Discussion archived</div>
      <div slot="actions">
        <Button color="primary">Undo</Button>
      </div>
    </Notification>
  </div>
</Preview>

<h2>Actions below</h2>

<Preview>
  <div class="w-[400px]">
    <Notification actions="below" closeIcon>
      <div slot="icon" class="self-start">
        <Icon path={mdiInbox} />
      </div>
      <div slot="title">Discussion moved</div>
      <div slot="description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit oluptatum tenetur.
      </div>
      <div slot="actions">
        <Button color="primary">Undo</Button>
        <Button>Dismiss</Button>
      </div>
    </Notification>
  </div>
</Preview>

<h2>Actions split</h2>

<Preview>
  <div class="w-[640px]">
    <Notification actions="split">
      <div slot="title">Receive notifications</div>
      <div slot="description">Notifications may include alerts, sounds, and badges</div>
      <div slot="actions" class="h-full">
        <div class="grid border-l divide-y h-full">
          <Button color="primary">Reply</Button>
          <Button>Don't Allow</Button>
        </div>
      </div>
    </Notification>
  </div>
</Preview>
