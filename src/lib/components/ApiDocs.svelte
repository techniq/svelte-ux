<script lang="ts">
  import DividerDot from './DividerDot.svelte';
  import ListItem from './ListItem.svelte';

  export let api: SveldJson;

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
      <ListItem list="type">
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
    {/each}
  </div>

  <div>
    <div
      id="slots"
      class="text-xs uppercase text-secondary leading-8 tracking-widest text-black/50"
    >
      Slots
    </div>
    {#each api.slots as slot}
      <ListItem list="type">
        <div slot="title">{slot.name}</div>

        <!-- <div slot="actions">
          {#if slot.slot_props != null}
            {#each Object.entries(slot.slot_props) as [key, value]}
              <div
                class="inline-block border bg-gray-100 border-gray-500 text-gray-600 px-2 rounded-full text-xs"
              >
                {key}: {value}
              </div>
            {/each}
          {/if}
        </div> -->
      </ListItem>
    {/each}
  </div>

  <div>
    <div
      id="events"
      class="text-xs uppercase text-secondary leading-8 tracking-widest text-black/50"
    >
      Events
    </div>
    {#each api.events as event}
      <ListItem list="type">
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
