<script lang="ts">
  import { mdiAccount, mdiChevronRight } from '@mdi/js';

  import Button from '$lib/components/Button.svelte';
  import Checkbox from '$lib/components/Checkbox.svelte';
  import ListItem from '$lib/components/ListItem.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import Radio from '$lib/components/Radio.svelte';
  import { cls } from '$lib/utils/styles';

  let selectedId = 1;
  const choices = [
    {
      id: 1,
      name: 'Allow all actions',
      description: 'Any action can be used, regardless of who authored it or where it is defined.',
    },
    {
      id: 2,
      name: 'Disable actions',
      description: 'The Actions tab is hidden and no workflows can run.',
    },
    {
      id: 3,
      name: 'Allow local actions only',
      description: 'Only actions defined in a repository within techniq can be used.',
    },
    {
      id: 4,
      name: 'Allow select actions',
      description:
        'Only actions that match specified criteria, plus actions defined in a repository within techniq, can be used.',
    },
  ];
</script>

<h1>Examples</h1>

<h2>Title only</h2>

<Preview>
  <ListItem title="Title" />
</Preview>

<h2>Title with subheading</h2>

<Preview>
  <ListItem title="Title" subheading="Subheading" />
</Preview>

<h2>Icon</h2>

<Preview>
  <ListItem title="Title" icon={mdiAccount} />
</Preview>

<h2>Icon with subheading</h2>

<Preview>
  <ListItem title="Title" subheading="Subheading" icon={mdiAccount} />
</Preview>

<h2>Icon with classes</h2>

<Preview>
  <ListItem
    title="Title"
    subheading="Subheading"
    icon={mdiAccount}
    avatar={{ class: 'bg-gray-400 text-white/90' }}
  />
</Preview>

<h2>Actions</h2>

<Preview>
  <ListItem title="Title">
    <div slot="actions">
      <Button icon={mdiChevronRight} class="p-2 text-black/50" />
    </div>
  </ListItem>
</Preview>

<h2>Multiple</h2>

<Preview>
  <ListItem title="Title" />
  <ListItem title="Title" />
  <ListItem title="Title" />
  <ListItem title="Title" />
</Preview>

<h2>Loading</h2>

<Preview>
  <ListItem title="Title" subheading="Subheading" />
  <ListItem title="Title" subheading="Subheading" />
  <ListItem title="Title" subheading="Subheading" loading />
  <ListItem title="Title" subheading="Subheading" />
</Preview>

<h2>Radio Group</h2>

<h3>example 1</h3>

<Preview>
  <div class="rounded border">
    {#each choices as choice}
      <ListItem
        title={choice.name}
        subheading={choice.description}
        on:click={() => (selectedId = choice.id)}
        class={cls(
          'cursor-pointer',
          'hover:bg-accent-50',
          selectedId == choice.id ? 'bg-accent-50' : ''
        )}
      >
        <div slot="avatar" class="contents">
          <Radio checked={selectedId === choice.id} />
        </div>
      </ListItem>
    {/each}
  </div>
</Preview>

<h2>Radio Group</h2>

<h3>example 2</h3>

<Preview>
  <div class="grid gap-4">
    {#each choices as choice}
      <div class="elevation-1 rounded">
        <ListItem
          title={choice.name}
          subheading={choice.description}
          on:click={() => (selectedId = choice.id)}
          class={cls(
            'px-8 py-4',
            'cursor-pointer ring ring-inset ring-accent-500 transition-shadow duration-100',
            'hover:bg-accent-50',
            selectedId == choice.id ? 'ring-1 bg-accent-50' : 'ring-0'
          )}
          noShadow
        />
      </div>
    {/each}
  </div>
</Preview>

<h3>example 3</h3>

<Preview>
  <div class="grid gap-4 bg-gray-100 p-4">
    {#each choices as choice}
      <div>
        <ListItem
          title={choice.name}
          subheading={choice.description}
          on:click={() => (selectedId = choice.id)}
          class={cls(
            'px-8 py-4',
            'cursor-pointer transition-shadow duration-100 border',
            'hover:bg-white',
            selectedId == choice.id ? 'bg-white shadow-md' : ''
          )}
          noBackground
          noShadow
        >
          <div slot="actions">
            <Checkbox circle dense checked={selectedId == choice.id} />
          </div>
        </ListItem>
      </div>
    {/each}
  </div>
</Preview>
