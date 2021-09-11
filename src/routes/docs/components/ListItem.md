<script lang="ts">
	import { mdiAccount, mdiChevronRight } from '@mdi/js';

	import Button from '$lib/components/Button.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import ListItem from '$lib/components/ListItem.svelte';
	import Preview from '$lib/components/Preview.svelte';
</script>

## Title only

<Preview>
	<ListItem title="Title" />
</Preview>

## Title with subheading

<Preview>
	<ListItem title="Title" subheading="Subheading" />
</Preview>

## Icon

<Preview>
	<ListItem title="Title" icon={mdiAccount} />
</Preview>

## Icon with subheading

<Preview>
	<ListItem title="Title" subheading="Subheading" icon={mdiAccount} />
</Preview>

## Icon with classes

<Preview>
  <ListItem
    title="Title"
    subheading="Subheading"
    icon={mdiAccount}
    avatar={{ class: 'bg-gray-400 text-white/90' }}
  />
</Preview>

## Actions

<Preview>
  <ListItem title="Title">
    <div slot="actions">
      <Button icon={mdiChevronRight} class="p-2 text-black/50" />
    </div>
  </ListItem>
</Preview>

## Multiple

<Preview>
	<ListItem title="Title" />
	<ListItem title="Title" />
	<ListItem title="Title" />
	<ListItem title="Title" />
</Preview>
