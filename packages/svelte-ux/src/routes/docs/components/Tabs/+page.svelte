<script lang="ts">
  import { max } from 'd3-array';
  import { mdiClose, mdiPlus } from '@mdi/js';

  import { Icon, Tab, Tabs } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';

  let options = $state([
    { label: 'One', value: 1 },
    { label: 'Two', value: 2 },
    { label: 'Three', value: 3 },
    { label: 'Four', value: 4 },
  ]);

  let value = $state(1);
</script>

<h1>Examples</h1>

<h2>options</h2>

<Preview>
  <Tabs {options} bind:value>
    {#snippet content({ value })}
      Page {value}
    {/snippet}
  </Tabs>
</Preview>

<h2>Tab components</h2>

<Preview>
  <Tabs>
    {#each { length: 5 } as _, i}
      {@const v = i + 1}
      <Tab onclick={() => (value = v)} selected={value === v}>Tab {v}</Tab>
    {/each}

    {#snippet content()}
      Page {value}
    {/snippet}
  </Tabs>
</Preview>

<h2>placement</h2>

<Preview>
  <div class="grid grid-cols-2 gap-4">
    <Tabs {options} placement="top" bind:value>
      {#snippet content({ value })}
        Page {value}
      {/snippet}
    </Tabs>

    <Tabs {options} placement="bottom" bind:value>
      {#snippet content({ value })}
        Page {value}
      {/snippet}
    </Tabs>

    <Tabs {options} placement="left" bind:value>
      {#snippet content({ value })}
        Page {value}
      {/snippet}
    </Tabs>

    <Tabs {options} placement="right" bind:value>
      {#snippet content({ value })}
        Page {value}
      {/snippet}
    </Tabs>
  </div>
</Preview>

<h2>rounded and contained</h2>

<Preview>
  <div class="grid grid-cols-2 gap-4">
    <Tabs
      {options}
      placement="top"
      bind:value
      classes={{ content: 'border px-4 py-2 rounded-b rounded-tr', tab: { root: 'rounded-t' } }}
    >
      {#snippet content({ value })}
        Page {value}
      {/snippet}
    </Tabs>

    <Tabs
      {options}
      placement="bottom"
      bind:value
      classes={{ content: 'border px-4 py-2  rounded-t rounded-br', tab: { root: 'rounded-b' } }}
    >
      {#snippet content({ value })}
        Page {value}
      {/snippet}
    </Tabs>

    <Tabs
      {options}
      placement="left"
      bind:value
      classes={{ content: 'border px-4 py-2  rounded-r', tab: { root: 'rounded-l' } }}
    >
      {#snippet content({ value })}
        Page {value}
      {/snippet}
    </Tabs>

    <Tabs
      {options}
      placement="right"
      bind:value
      classes={{ content: 'border px-4 py-2 rounded-l', tab: { root: 'rounded-r' } }}
    >
      {#snippet content({ value })}
        Page {value}
      {/snippet}
    </Tabs>
  </div>
</Preview>

<h2>add / remove</h2>

<Preview>
  <Tabs {options} {value}>
    {#each options as option (option.value)}
      <Tab onclick={() => (value = option.value)} selected={value === option.value}>
        {option.label}

        <Icon
          data={mdiClose}
          class="rounded-full p-0.5 hover:bg-surface-content/5"
          onclick={(e) => {
            e.stopPropagation();
            options = options.filter((o) => o.value !== option.value);
          }}
        />
      </Tab>
    {/each}

    <Tab
      onclick={() => {
        const newValue = max(options, (d) => d.value) ?? 0 + 1;
        options = [...options, { label: 'New ' + newValue, value: newValue }];
      }}
    >
      <Icon data={mdiPlus} class="rounded-full p-0.5 hover:bg-surface-content/5" />
    </Tab>

    {#snippet content({ value })}
      Page {value}
    {/snippet}
  </Tabs>
</Preview>
