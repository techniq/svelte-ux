<script lang="ts">
  import { mdiInbox, mdiCheckCircleOutline } from '@mdi/js';

  import AppBar from '../components/AppBar.svelte';
  import Button from '../components/Button.svelte';
  import Icon from '../components/Icon.svelte';
  import Preview from '../components/Preview.svelte';
  import Notification from '../components/Notification.svelte';
  import Stack from '../components/Stack.svelte';
</script>

## Basic

<Preview>
  <Stack vertical class="w-100">
    <Notification open closeIcon>
      <div slot="icon">
        <Icon path={mdiCheckCircleOutline} class="text-green-500" />
      </div>
      <div slot="title">Successfully Saved!</div>
      <div slot="description">Anyone with a link can now view this file.</div>
    </Notification>
  </Stack>
</Preview>

## Condensed

<Preview>
  <Stack vertical class="w-100">
    <Notification open actions="right" closeIcon>
      <div slot="title">Discussion archived</div>
      <div slot="actions">
        <Button class="text-blue-500 hover:bg-blue-50 ">Undo</Button>
      </div>
    </Notification>
  </Stack>
</Preview>

## Actions below

<Preview>
  <Stack vertical class="w-100">
    <Notification actions="below" closeIcon>
      <div slot="icon" class="self-start">
        <Icon path={mdiInbox} />
      </div>
      <div slot="title">Discussion moved</div>
      <div slot="description" class="w-80">
        Lorem ipsum dolor sit amet consectetur adipisicing elit oluptatum
        tenetur.
      </div>
      <div slot="actions">
        <Button class="text-blue-500 hover:bg-blue-50">Undo</Button>
        <Button>Dismiss</Button>
      </div>
    </Notification>
  </Stack>
</Preview>

## Actions split

<Preview>
  <Stack vertical class="w-160">
    <Notification actions="split">
      <div slot="title">Receive notifications</div>
      <div slot="description">
        Notifications may include alerts, sounds, and badges
      </div>
      <div slot="actions" class="h-full">
        <Stack vertical class="border-l divide-y h-full">
          <Button class="text-blue-500 hover:bg-blue-50">Reply</Button>
          <Button>Don't Allow</Button>
        </Stack>
      </div>
    </Notification>
  </Stack>
</Preview>
