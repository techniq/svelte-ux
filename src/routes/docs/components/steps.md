---
component: $component
filename: $filename
---

<script lang="ts">
	import clsx from 'clsx';
	import { format } from 'date-fns';
	import { mdiCheck, mdiCircle, mdiClockOutline, mdiClose, mdiMapMarker } from '@mdi/js';

	import Icon from '$lib/components/Icon.svelte';
	import Preview from '$lib/components/Preview.svelte';
	import Steps from '$lib/components/Steps.svelte';

	const items = [
		{
			title: 'Label Created',
			location: 'United States',
			date: new Date('2021-06-04T16:53:00-04:00'),
			status: 'completed'
		},
		{
			title: 'Departure scan',
			location: 'Carlisle, PA',
			date: new Date('2021-06-04T16:53:00-04:00'),
			status: 'completed'
		},
		{
			title: 'Arrival scan',
			location: 'Huntington, WV',
			date: new Date('2021-06-04T16:53:00-04:00'),
			status: 'completed'
		},
		{
			title: 'Out for delivery',
			location: 'Lavalette, WV',
			date: new Date('2021-06-04T16:53:00-04:00'),
			status: 'in-progress'
		},
		{
			title: 'Delivery attempt failed',
			location: 'Lavalette, WV',
			date: new Date('2021-06-04T16:53:00-04:00'),
			status: 'failed'
		},
		{
			title: 'Delivered',
			location: 'Lavalette, WV',
			date: new Date('2021-06-04T16:53:00-04:00'),
			status: 'completed'
		}
	];
</script>

## Basic

<Preview>
	<Steps {items}>
		<div slot="item" let:item>
			<div class="text-lg font-bold">{item.title}</div>
			<div class="text-sm text-black/50">
				<Icon path={mdiMapMarker} size="1rem" />
				{item.location}
			</div>
			<div class="text-sm text-black/50">
				<Icon path={mdiClockOutline} size=".9rem" />
				{format(item.date, 'M/d/yyyy @ h:mm aa')}
			</div>
		</div>
		<div slot="marker" let:item>
			<div
				class={clsx('w-4 h-4 flex-shrink-0 rounded-full flex items-center', {
					'bg-green-500': item.status === 'completed',
					'border-2 border-blue-500 bg-blue-100': item.status === 'in-progress',
					'bg-red-500': item.status === 'failed'
				})}
			>
				{#if item.status === 'completed'}
					<Icon path={mdiCheck} size="1rem" class="text-white" />
				{:else if item.status === 'in-progress'}
					<Icon path={mdiCircle} size="1rem" class="text-blue-500" />
				{:else if item.status === 'failed'}
					<Icon path={mdiClose} size="1rem" class="text-white" />
				{/if}
			</div>
		</div>
	</Steps>
</Preview>
