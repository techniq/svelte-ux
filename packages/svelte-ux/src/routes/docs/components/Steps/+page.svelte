<script lang="ts">
  import { format } from 'date-fns';
  import { mdiCheck, mdiClockOutline, mdiClose, mdiMapMarker, mdiTruck } from '@mdi/js';

  import Icon from '$lib/components/Icon.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import Steps from '$lib/components/Steps.svelte';

  import { cls } from '$lib/utils/styles.js';

  const data = [
    {
      title: 'Label Created',
      location: 'United States',
      date: new Date('2021-06-04T16:53:00-04:00'),
      status: 'completed',
    },
    {
      title: 'Departure scan',
      location: 'Carlisle, PA',
      date: new Date('2021-06-04T16:53:00-04:00'),
      status: 'completed',
    },
    {
      title: 'Arrival scan',
      location: 'Huntington, WV',
      date: new Date('2021-06-04T16:53:00-04:00'),
      status: 'completed',
    },
    {
      title: 'Out for delivery',
      location: 'Lavalette, WV',
      date: new Date('2021-06-04T16:53:00-04:00'),
      status: 'in-progress',
    },
    {
      title: 'Delivery attempt failed',
      location: 'Lavalette, WV',
      date: new Date('2021-06-04T16:53:00-04:00'),
      status: 'failed',
    },
    {
      title: 'Delivered',
      location: 'Lavalette, WV',
      date: new Date('2021-06-04T16:53:00-04:00'),
      status: 'completed',
    },
  ];
</script>

<h1>Examples</h1>

<h2>Basic</h2>

<Preview>
  <Steps {data}>
    <div slot="item" let:item>
      <div class="text-lg font-bold">{item.title}</div>
      <div class="text-sm text-surface-content/50">
        <Icon data={mdiMapMarker} size="1rem" />
        {item.location}
      </div>
      <div class="text-sm text-surface-content/50">
        <Icon data={mdiClockOutline} size=".9rem" />
        {format(item.date, 'M/d/yyyy @ h:mm aa')}
      </div>
    </div>
    <div slot="marker" let:item>
      <div
        class={cls('w-4 h-4 flex-shrink-0 rounded-full flex items-center', {
          'bg-success': item.status === 'completed',
          'bg-info': item.status === 'in-progress',
          'bg-danger': item.status === 'failed',
        })}
      >
        {#if item.status === 'completed'}
          <Icon data={mdiCheck} size="1rem" class="text-success-content" />
        {:else if item.status === 'in-progress'}
          <Icon data={mdiTruck} size="1rem" class="text-info-content p-[2px]" />
        {:else if item.status === 'failed'}
          <Icon data={mdiClose} size="1rem" class="text-danger-content" />
        {/if}
      </div>
    </div>
  </Steps>
</Preview>
