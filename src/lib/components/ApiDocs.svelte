<script lang="ts">
  import {
    mdiBullhorn,
    mdiCodeBraces,
    mdiGoogleCirclesGroup,
    mdiInformationOutline,
  } from '@mdi/js';

  import EmptyMessage from './EmptyMessage.svelte';
  import Icon from './Icon.svelte';
  import ListItem from './ListItem.svelte';

  export let api: SveldJson;

  function parseSlotProps(slot_props: string) {
    return slot_props
      .slice(1, slot_props.length - 1) // remove '{' and '}'
      .split(',')
      .map((x) => x.split(':').map((x) => x.trim()))
      .map((x) => ({ key: x[0], value: x[1] }));
  }

  // $: console.log({ api });
</script>

<div class="grid gap-8">
  <div>
    <div
      id="props"
      class="text-xs uppercase text-secondary leading-8 tracking-widest text-black/50"
    >
      Props
    </div>
    {#each api.props as prop}
      <ListItem
        list="type"
        icon={mdiCodeBraces}
        avatar={{ size: 'sm', class: 'text-xs text-white bg-accent-500' }}
      >
        <div slot="title">{prop.name}</div>

        <div slot="subheading" class="text-black/50 text-xs">
          {#if prop.description}
            <span class="whitespace-pre">
              {prop.description}
            </span>
          {/if}
        </div>

        <div slot="actions">
          {#if prop.value != null && prop.value !== 'null'}
            <div
              class="inline-block border bg-gray-100 border-gray-500 text-gray-600 px-2 rounded-full text-xs"
            >
              {prop.value}
            </div>
          {/if}
          <div
            class="inline-block border bg-orange-100 border-orange-500 text-orange-600 px-2 rounded-full text-xs"
          >
            {prop.type ?? '-'}
          </div>
        </div>
      </ListItem>
    {:else}
      <EmptyMessage>No props</EmptyMessage>
    {/each}

    {#if api.rest_props}
      <div class="text-black/50 text-xs flex gap-2 mt-2 ml-4 items-center">
        <Icon path={mdiInformationOutline} />
        <span>
          Remaining props are passed to underlying
          <div class="inline-block font-semibold bg-white border border-black/30 px-2 rounded-full">
            &lt;{api.rest_props.name}&gt;
          </div>
          {api.rest_props.type === 'InlineComponent' ? 'component' : 'element'}
        </span>
      </div>
    {/if}
  </div>

  <div>
    <div
      id="slots"
      class="text-xs uppercase text-secondary leading-8 tracking-widest text-black/50"
    >
      Slots
    </div>
    {#each api.slots as slot}
      <ListItem
        list="type"
        icon={mdiGoogleCirclesGroup}
        avatar={{ size: 'sm', class: 'text-xs text-white bg-purple-500' }}
      >
        <div slot="title">
          {#if slot.default}
            <i>default</i>
          {:else}
            {slot.name}
          {/if}
        </div>

        <div slot="actions" class="flex gap-1">
          {#if slot.slot_props != '{}'}
            {#each parseSlotProps(slot.slot_props) as { key, value }}
              <div
                class="inline-block border bg-gray-100 border-gray-500 text-gray-600 px-2 rounded-full text-xs"
              >
                {key}: {value}
              </div>
            {/each}
          {/if}
        </div>
      </ListItem>
    {:else}
      <EmptyMessage>No slots</EmptyMessage>
    {/each}
  </div>

  <div>
    <div
      id="events"
      class="text-xs uppercase text-secondary leading-8 tracking-widest text-black/40"
    >
      Events
    </div>
    {#each api.events as event}
      <ListItem
        list="type"
        icon={mdiBullhorn}
        avatar={{ size: 'sm', class: 'text-xs text-white bg-green-500' }}
      >
        <div slot="title">{event.name}</div>

        <div slot="actions">
          {#if event.element != null}
            <div
              class="inline-block border bg-gray-100 border-gray-500 text-gray-600 px-2 rounded-full text-xs"
            >
              {event.element}
            </div>
          {/if}
          <div
            class="inline-block border bg-orange-100 border-orange-500 text-orange-600 px-2 rounded-full text-xs"
          >
            {event.type}
          </div>
        </div>
      </ListItem>
    {:else}
      <EmptyMessage>No events</EmptyMessage>
    {/each}
  </div>

  <!-- <Card title="Types" id="types">
  <Table
    columns={[
      { name: 'TODO', align: 'left' },
    ]}
    data={api.props}
    slot="contents"
  />
</Card>
 -->
</div>
