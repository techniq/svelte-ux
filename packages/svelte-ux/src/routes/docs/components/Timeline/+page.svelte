<script lang="ts">
  import {
    mdiCheck,
    mdiCheckCircle,
    mdiClockOutline,
    mdiClose,
    mdiMapMarker,
    mdiTruck,
  } from '@mdi/js';

  import { Icon, Timeline, TimelineEvent, getSettings } from 'svelte-ux';
  import { cls } from '@layerstack/tailwind';
  import { PeriodType } from '@layerstack/utils';

  import Preview from '$lib/components/Preview.svelte';

  const { format } = getSettings();

  const customData = [
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
  ];

  const appleHistory = [
    { start: 1984, end: 'First Macintosh computer' },
    { start: 1998, end: 'iMac' },
    { start: 2001, end: 'iPod' },
    { start: 2007, end: 'iPhone' },
    { start: 2015, end: 'Apple Watch' },
  ];

  const appleHistoryAlternating = [
    { start: 'First Macintosh computer' },
    { end: 'iMac' },
    { start: 'iPod' },
    { end: 'iPhone' },
    { start: 'Apple Watch' },
  ];

  const appleHistoryAlternatingWithCompleted = [
    { start: 'First Macintosh computer', completed: true },
    { end: 'iMac', completed: true },
    { start: 'iPod', completed: true },
    { end: 'iPhone' },
    { start: 'Apple Watch' },
  ];

  const appleHistoryDetails = [
    {
      date: 1984,
      title: 'First Macintosh computer',
      description:
        'The Apple Macintosh—later rebranded as the Macintosh 128K—is the original Apple Macintosh personal computer. It played a pivotal role in establishing desktop publishing as a general office function. The motherboard, a 9 in (23 cm) CRT monitor, and a floppy drive were housed in a beige case with integrated carrying handle; it came with a keyboard and single-button mouse.',
    },
    {
      date: 1998,
      title: 'iMac',
      description:
        "iMac is a family of all-in-one Mac desktop computers designed and built by Apple Inc. It has been the primary part of Apple's consumer desktop offerings since its debut in August 1998, and has evolved through seven distinct forms",
    },
    {
      date: 2001,
      title: 'iPod',
      description:
        'The iPod is a discontinued series of portable media players and multi-purpose mobile devices designed and marketed by Apple Inc. The first version was released on October 23, 2001, about 8+1⁄2 months after the Macintosh version of iTunes was released. Apple sold an estimated 450 million iPod products as of 2022. Apple discontinued the iPod product line on May 10, 2022. At over 20 years, the iPod brand is the oldest to be discontinued by Apple',
    },
    {
      date: 2007,
      title: 'iPhone',
      description:
        "iPhone is a line of smartphones produced by Apple Inc. that use Apple's own iOS mobile operating system. The first-generation iPhone was announced by then-Apple CEO Steve Jobs on January 9, 2007. Since then, Apple has annually released new iPhone models and iOS updates. As of November 1, 2018, more than 2.2 billion iPhones had been sold. As of 2022, the iPhone accounts for 15.6% of global smartphone market share",
    },
    {
      date: 2015,
      title: 'Apple Watch',
      description:
        'The Apple Watch is a line of smartwatches produced by Apple Inc. It incorporates fitness tracking, health-oriented capabilities, and wireless telecommunication, and integrates with iOS and other Apple products and services',
    },
  ];
</script>

<h1>Examples</h1>

<h2>Basic</h2>

<Preview>
  <Timeline data={appleHistory} />
</Preview>

<h2>Icon</h2>

<Preview>
  <Timeline data={appleHistory} icon={mdiCheckCircle} />
</Preview>

<h2>Icon with classes</h2>

<Preview>
  <Timeline
    data={appleHistory}
    icon={mdiCheckCircle}
    classes={{
      event: {
        start: 'text-sm font-semibold',
        end: 'border rounded-lg text-sm p-2',
        icon: 'size-5',
      },
    }}
  />
</Preview>

<h2>Alternating sides</h2>

<Preview>
  <Timeline
    data={appleHistoryAlternating}
    icon={mdiCheckCircle}
    classes={{
      event: {
        start: 'border rounded-lg text-sm p-2',
        end: 'border rounded-lg text-sm p-2',
        icon: 'size-5',
      },
    }}
  />
</Preview>

<h2>Snap icon</h2>

<Preview>
  <Timeline
    data={appleHistoryAlternating}
    icon={mdiCheckCircle}
    snapPoint
    classes={{
      event: {
        start: 'border rounded-lg text-sm p-2',
        end: 'border rounded-lg text-sm p-2',
        icon: 'size-5',
      },
    }}
  />
</Preview>

<h2>Completed events</h2>

<Preview>
  <Timeline
    data={appleHistoryAlternatingWithCompleted}
    icon={mdiCheckCircle}
    classes={{
      event: {
        start: 'border rounded-lg text-sm p-2 m-1',
        end: 'border rounded-lg text-sm p-2 m-1',
        icon: 'size-5',
      },
    }}
  />
</Preview>

<h2>TimelineEvent component with custom point</h2>

<Preview>
  <Timeline>
    {#each appleHistory as item, i}
      <TimelineEvent icon={mdiCheckCircle} start={i % 2 === 0} end={i % 2 !== 0}>
        <div class="font-semibold px-2">{item.end}</div>

        <div slot="point" class="border rounded-full px-2 text-xs">
          {item.start}
        </div>
      </TimelineEvent>
    {/each}
  </Timeline>
</Preview>

<h2>Vertical</h2>

<Preview>
  <Timeline
    data={appleHistory}
    icon={mdiCheckCircle}
    vertical
    classes={{
      event: {
        start: 'text-sm font-semibold',
        end: 'border rounded-lg text-sm p-2 m-1',
        icon: 'size-5',
      },
    }}
  />
</Preview>

<h2>Vertical / Alternating sides</h2>

<Preview>
  <Timeline
    data={appleHistoryAlternating}
    icon={mdiCheckCircle}
    vertical
    classes={{
      event: {
        start: 'border rounded-lg text-sm p-2 m-1',
        end: 'border rounded-lg text-sm p-2 m-1',
        icon: 'size-5',
      },
    }}
  />
</Preview>

<h2>Completed events</h2>

<Preview>
  <Timeline
    data={appleHistoryAlternatingWithCompleted}
    icon={mdiCheckCircle}
    vertical
    classes={{
      event: {
        start: 'border rounded-lg text-sm p-2 m-1',
        end: 'border rounded-lg text-sm p-2 m-1',
        icon: 'size-5',
      },
    }}
  />
</Preview>

<h2>Vertical (fixed width start)</h2>

<Preview>
  <Timeline
    data={appleHistory}
    icon={mdiCheckCircle}
    vertical
    classes={{
      event: {
        root: 'grid-cols-[40px,auto,1fr]',
        start: 'text-sm font-semibold mr-1',
        end: 'border rounded-lg text-sm p-2 m-1',
        icon: 'size-5',
      },
    }}
  />
</Preview>

<h2>Vertical / Alternating (using TimelineEvent component)</h2>

<Preview>
  <Timeline vertical snapPoint>
    {#each appleHistoryDetails as item, i}
      <TimelineEvent
        icon={mdiCheckCircle}
        start={i % 2 === 0}
        end={i % 2 !== 0}
        classes={{
          root: cls(i % 2 === 0 && 'text-end'),
          icon: 'size-5',
        }}
      >
        <div class="mt-0.5 mb-10 mx-2">
          <time class="font-mono italic">{item.date}</time>
          <div class="text-lg font-black">{item.title}</div>
          <div class="text-surface-content/70 text-sm">
            {item.description}
          </div>
        </div>
      </TimelineEvent>
    {/each}
  </Timeline>
</Preview>

<h2>Vertical / Compact (using TimelineEvent component)</h2>

<Preview>
  <Timeline vertical compact snapPoint>
    {#each appleHistoryDetails as item, i}
      <TimelineEvent
        icon={mdiCheckCircle}
        start={i % 2 === 0}
        end={i % 2 !== 0}
        classes={{
          icon: 'size-5',
        }}
        completed={i < 3}
      >
        <div class="-mt-0.5 mb-10 mx-2">
          <time class="font-mono italic">{item.date}</time>
          <div class="text-lg font-black">{item.title}</div>
          <div class="text-surface-content/70 text-sm">
            {item.description}
          </div>
        </div>
      </TimelineEvent>
    {/each}
  </Timeline>
</Preview>

<h2>Custom data and display</h2>

<Preview>
  <Timeline vertical compact snapPoint>
    {#each customData as item, i}
      <TimelineEvent
        icon={{
          'in-progress': mdiTruck,
          completed: mdiCheck,
          failed: mdiClose,
        }[item.status]}
        start={i % 2 === 0}
        end={i % 2 !== 0}
        completed={i < 4}
        classes={{
          root: cls(
            {
              completed: '[--color-completed:theme(colors.success)]',
              failed: '[--color-completed:theme(colors.danger)]',
              'in-progress': '[--color-completed:theme(colors.info)]',
            }[item.status]
          ),
          line: 'w-0.5',
          icon: cls('size-5 rounded-full p-0.5 text-surface-100 bg-[--color-completed]'),
        }}
      >
        <div class="-mt-1 mb-5 mx-2">
          <div class="font-bold">{item.title}</div>
          <div class="text-sm text-surface-content/70">
            <Icon data={mdiMapMarker} size="1rem" />
            {item.location}
          </div>
          <div class="text-sm text-surface-content/70">
            <Icon data={mdiClockOutline} size=".9rem" />
            {$format(item.date, PeriodType.DayTime)}
          </div>
        </div>
      </TimelineEvent>
    {/each}
  </Timeline>
</Preview>
