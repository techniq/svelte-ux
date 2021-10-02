<script lang="ts">
	import clsx from 'clsx';
	import { mdiAccount, mdiFileDocumentEditOutline, mdiChevronRight } from '@mdi/js';

	import Button from '$lib/components/Button.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import ListItem from '$lib/components/ListItem.svelte';
	import Preview from '$lib/components/Preview.svelte';
	import Radio from '$lib/components/Radio.svelte';
	import Stack from '$lib/components/Stack.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';

	let selectedId = 1;
	const choices = [
		{ id: 1, name: 'Allow all actions', description: 'Any action can be used, regardless of who authored it or where it is defined.' },
		{ id: 2, name: 'Disable actions', description: 'The Actions tab is hidden and no workflows can run.' },
		{ id: 3, name: 'Allow local actions only', description: 'Only actions defined in a repository within techniq can be used.' },
		{ id: 4, name: 'Allow select actions', description: 'Only actions that match specified criteria, plus actions defined in a repository within techniq, can be used.' },
	]
</script>

<div class="flex items-center gap-2">
	<span class="text-2xl font-bold">ListItem</span>
	<Tooltip title="Edit this page">
		<Button class="text-black/50" icon={mdiFileDocumentEditOutline} href="https://github.com/techniq/svelte-ux/blob/master/src/routes/docs/components/ListItem.md" target="_blank" />
	</Tooltip>
</div>

A list item that provides a standard layout and works best with multiple instances in the same parent element.

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

## Radio Group

### example 1

<Preview>
	<div class="rounded border">
		{#each choices as choice}
			<ListItem
				title={choice.name}
				subheading={choice.description}
				on:click={() => (selectedId = choice.id)}
				class={clsx(
					'cursor-pointer',
					'hover:bg-blue-50',
					selectedId == choice.id ? 'bg-blue-50' : ''
				)}
			>
				<div slot="avatar" class="contents">
					<Radio checked={selectedId === choice.id} />
				</div>
			</ListItem>
		{/each}
	</div>
</Preview>

## Radio Group

### example 2

<Preview>
	<Stack vertical gap={16}>
		{#each choices as choice}
			<div class="elevation-1 rounded">
				<ListItem
					title={choice.name}
					subheading={choice.description}
					on:click={() => (selectedId = choice.id)}
					class={clsx(
						'px-8 py-4',
						'cursor-pointer ring ring-inset ring-blue-500 transition-shadow duration-100',
						'hover:bg-blue-50',
						selectedId == choice.id ? 'ring-1 bg-blue-50' : 'ring-0'
					)}
					noShadow
				/>
			</div>
		{/each}
	</Stack>
</Preview>
