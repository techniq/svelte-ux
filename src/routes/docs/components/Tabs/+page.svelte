<script lang="ts">
  import { max } from 'd3-array';
  import { mdiClose, mdiPlus } from '@mdi/js';

  import Preview from '$lib/components/Preview.svelte';
  import Tabs from '$lib/components/Tabs.svelte';
  import Tab from '$lib/components/Tab.svelte';
  import Icon from '$lib/components/Icon.svelte';

  let options = [
    { label: 'One', value: 1 },
    { label: 'Two', value: 2 },
    { label: 'Three', value: 3 },
    { label: 'Four', value: 4 },
  ];

  let value = 1;
</script>

<h1>Examples</h1>

<h2>options</h2>

<Preview>
  <Tabs {options} bind:value>
    <svelte:fragment slot="content" let:value>
      Page {value}
    </svelte:fragment>
  </Tabs>
</Preview>

<h2>Tab components</h2>

<Preview>
  <Tabs>
    {#each { length: 5 } as _, i}
      {@const v = ++i}
      <Tab on:click={() => (value = v)} selected={value === v}>Tab {v}</Tab>
    {/each}

    <svelte:fragment slot="content">
      Page {value}
    </svelte:fragment>
  </Tabs>
</Preview>

<h2>add / remove</h2>

<Preview>
  <Tabs {options} {value} on:change={(e) => (value = e.detail.value)}>
    {#each options as option (option.value)}
      <Tab on:click={() => (value = option.value)} selected={value === option.value}>
        {option.label}

        <Icon
          data={mdiClose}
          class="rounded-full p-0.5 hover:bg-black/5"
          on:click={(e) => {
            e.stopPropagation();
            options = options.filter((o) => o.value !== option.value);
          }}
        />
      </Tab>
    {/each}

    <Tab
      on:click={() => {
        const newValue = max(options, (d) => d.value) + 1;
        options = [...options, { label: 'New ' + newValue, value: newValue }];
      }}
    >
      <Icon data={mdiPlus} class="rounded-full p-0.5 hover:bg-black/5" />
    </Tab>

    <svelte:fragment slot="content">
      Page {value}
    </svelte:fragment>
  </Tabs>
</Preview>

<h2>vertical</h2>

<Preview>
  <Tabs {options} vertical bind:value>
    <svelte:fragment slot="content" let:value>
      Page {value}
    </svelte:fragment>
  </Tabs>
</Preview>
