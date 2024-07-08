<script lang="ts">
  import {
    mdiBullhorn,
    mdiCodeBraces,
    mdiGoogleCirclesGroup,
    mdiInformationOutline,
  } from '@mdi/js';

  import Button from './Button.svelte';
  import EmptyMessage from './EmptyMessage.svelte';
  import Icon from './Icon.svelte';
  import ListItem from './ListItem.svelte';
  import Tooltip from './Tooltip.svelte';

  export let api: SveldJson;

  function parseSlotProps(slot_props: string) {
    return slot_props
      .slice(1, slot_props.length - 1) // remove '{' and '}'
      .split(',')
      .map((x) => x.split(':').map((x) => x.trim()))
      .map((x) => ({ key: x[0], value: x[1] }));
  }
</script>

<div class="ApiDocs grid gap-8">
  <div>
    <h2 id="props" class="text-xs uppercase leading-8 tracking-widest text-surface-content/50">
      Props
    </h2>
    <div>
      {#each api.props ?? [] as prop}
        <ListItem
          list="type"
          icon={mdiCodeBraces}
          avatar={{ size: 'sm', class: 'text-xs text-white bg-blue-500' }}
        >
          <div slot="title">{prop.name}</div>

          <div slot="subheading" class="text-surface-content/50 text-xs">
            {#if prop.description}
              <span class="whitespace-pre-line">
                {prop.description}
              </span>
            {/if}
          </div>

          <div slot="actions" class="flex flex-wrap justify-end gap-1">
            {#if prop.isRequired}
              <div
                class="inline-block border bg-danger/10 border-danger text-danger-600 px-2 rounded-full text-xs"
              >
                Required
              </div>
            {/if}

            <Tooltip title="default" offset={2}>
              <div
                class="inline-block border bg-gray-500/5 border-gray-500 text-gray-600 px-2 rounded-full text-xs cursor-help"
              >
                {prop.value}
              </div>
            </Tooltip>

            <Tooltip title="type" offset={2}>
              <div
                class="inline-block border bg-orange-500/10 border-orange-500 text-orange-600 px-2 rounded-full text-xs cursor-help"
              >
                {prop.type ?? 'unknown'}
              </div>
            </Tooltip>
          </div>
        </ListItem>
      {:else}
        <EmptyMessage>No props</EmptyMessage>
      {/each}
    </div>

    {#if api.rest_props}
      <div class="text-surface-content/50 text-xs flex gap-2 mt-2 ml-4 items-center">
        <Icon data={mdiInformationOutline} />
        <span>
          Remaining props are passed to underlying
          {#if api.rest_props.type === 'InlineComponent'}
            <Button
              href="/docs/components/{api.rest_props.name}#props"
              target="_blank"
              variant="none"
              class="text-xs font-semibold bg-surface-100 border px-2 rounded-full"
            >
              &lt;{api.rest_props.name}&gt;
            </Button>
            component
          {:else}
            <Button
              href="https://developer.mozilla.org/docs/Web/HTML/Element/{api.rest_props
                .name}#attributes"
              target="_blank"
              variant="none"
              class="text-xs font-semibold bg-surface-100 border px-2 rounded-full"
            >
              &lt;{api.rest_props.name}&gt;
            </Button>
            element
          {/if}
        </span>
      </div>
    {/if}
  </div>

  <div>
    <h2 id="slots" class="text-xs uppercase leading-8 tracking-widest text-surface-content/50">
      Slots
    </h2>
    <div>
      {#each api.slots ?? [] as slot}
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

          <div slot="subheading" class="text-surface-content/50 text-xs">
            {slot.description ?? ''}
          </div>

          <div slot="actions" class="flex flex-wrap justify-end gap-1">
            {#if slot.slot_props != '{}'}
              {#each parseSlotProps(slot.slot_props ?? '') as { key, value }}
                <Tooltip title="slot prop" offset={2}>
                  <div
                    class="inline-block border bg-orange-500/10 border-orange-500 text-orange-600 px-2 rounded-full text-xs cursor-help"
                  >
                    {key}: {value}
                  </div>
                </Tooltip>
              {/each}
            {/if}
          </div>
        </ListItem>
      {:else}
        <EmptyMessage>No slots</EmptyMessage>
      {/each}
    </div>
  </div>

  <div>
    <h2 id="events" class="text-xs uppercase leading-8 tracking-widest text-surface-content/50">
      Events
    </h2>
    <div>
      {#each api.events ?? [] as event}
        <ListItem
          list="type"
          icon={mdiBullhorn}
          avatar={{ size: 'sm', class: 'text-xs text-white bg-success-500' }}
        >
          <div slot="title">{event.name}</div>

          <div slot="actions" class="flex flex-wrap justify-end gap-1">
            {#if event.element != null}
              <div
                class="inline-block border bg-gray-500/5 border-gray-500 text-gray-600 px-2 rounded-full text-xs"
              >
                {event.element}
              </div>
            {/if}
            <div
              class="inline-block border bg-orange-500/10 border-orange-500 text-orange-600 px-2 rounded-full text-xs"
            >
              {event.type}
            </div>
          </div>
        </ListItem>
      {:else}
        <EmptyMessage>No events</EmptyMessage>
      {/each}
    </div>
  </div>

  <div>
    <h2
      id="module_exports"
      class="text-xs uppercase leading-8 tracking-widest text-surface-content/50"
    >
      Module Exports
    </h2>
    <div>
      {#each api.moduleExports ?? [] as prop}
        <ListItem
          list="type"
          icon={mdiCodeBraces}
          avatar={{ size: 'sm', class: 'text-xs text-white bg-blue-500' }}
        >
          <div slot="title">{prop.name}</div>

          <div slot="subheading" class="text-surface-content/50 text-xs">
            {#if prop.description}
              <span class="whitespace-pre-line">
                {prop.description}
              </span>
            {/if}
          </div>

          <div slot="actions" class="flex flex-wrap justify-end gap-1">
            {#if prop.isRequired}
              <div
                class="inline-block border bg-danger/10 border-danger text-danger-600 px-2 rounded-full text-xs"
              >
                Required
              </div>
            {/if}

            <Tooltip title="value" offset={2}>
              <div
                class="inline-block border bg-gray-500/5 border-gray-500 text-gray-600 px-2 rounded-full text-xs cursor-help"
              >
                {prop.value}
              </div>
            </Tooltip>

            <Tooltip title="type" offset={2}>
              <div
                class="inline-block border bg-orange-500/10 border-orange-500 text-orange-600 px-2 rounded-full text-xs cursor-help"
              >
                {prop.type ?? 'unknown'}
              </div>
            </Tooltip>
          </div>
        </ListItem>
      {:else}
        <EmptyMessage>No exports</EmptyMessage>
      {/each}
    </div>
  </div>
</div>
