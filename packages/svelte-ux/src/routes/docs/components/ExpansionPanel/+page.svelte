<script lang="ts">
  import { mdiAccount } from '@mdi/js';

  import { Button, ExpansionPanel, ListItem } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';
</script>

<h1>Examples</h1>

<h2>Simple</h2>

<Preview>
  {#each Array(5) as _, i}
    <ExpansionPanel>
      {#snippet trigger()}
            <div  class="flex-1 p-3">Item {i + 1}</div>
          {/snippet}
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quod culpa et, dolores
        omnis, ipsum in perspiciatis porro ut nihil molestiae molestias tenetur delectus velit!
        Inventore laborum rerum at id?
      </div>
    </ExpansionPanel>
  {/each}
</Preview>

<h2>Actions</h2>

<Preview>
  {#each Array(5) as _, i}
    <ExpansionPanel classes={{ toggle: 'bg-surface-200 border-t' }}>
      {#snippet trigger()}
            <div  class="flex-1 p-3">Item {i + 1}</div>
          {/snippet}
      {#snippet actions()}
            <div  class="p-2">
          <Button>Action 1</Button>
          <Button>Action 2</Button>
        </div>
          {/snippet}
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quod culpa et, dolores
        omnis, ipsum in perspiciatis porro ut nihil molestiae molestias tenetur delectus velit!
        Inventore laborum rerum at id?
      </div>
    </ExpansionPanel>
  {/each}
</Preview>

<h2>Disabled items</h2>

<Preview>
  {#each Array(5) as _, i}
    <ExpansionPanel disabled={i % 2 > 0}>
      {#snippet trigger()}
            <div  class="flex-1 p-3">Item {i + 1}</div>
          {/snippet}
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quod culpa et, dolores
        omnis, ipsum in perspiciatis porro ut nihil molestiae molestias tenetur delectus velit!
        Inventore laborum rerum at id?
      </div>
    </ExpansionPanel>
  {/each}
</Preview>

<h2>ListItem trigger</h2>

<Preview>
  {#each Array(5) as _, i}
    <ExpansionPanel>
      {#snippet trigger()}
            <ListItem
          
          title="Item {i + 1}"
          subheading="List Item"
          icon={mdiAccount}
          avatar={{ class: 'bg-surface-content/50 text-surface-100/90' }}
          class="flex-1"
          noShadow
        />
          {/snippet}
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quod culpa et, dolores
        omnis, ipsum in perspiciatis porro ut nihil molestiae molestias tenetur delectus velit!
        Inventore laborum rerum at id?
      </div>
    </ExpansionPanel>
  {/each}
</Preview>

<h2>Mix ExpansionPanel with ListItem</h2>

<h3>first and last items</h3>

<Preview>
  <ExpansionPanel>
    {#snippet trigger()}
        <ListItem
        
        title="Item 1"
        subheading="Expansion Panel"
        icon={mdiAccount}
        avatar={{ class: 'bg-surface-content/50 text-surface-100/90' }}
        class="flex-1"
        noShadow
      />
      {/snippet}
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quod culpa et, dolores
      omnis, ipsum in perspiciatis porro ut nihil molestiae molestias tenetur delectus velit!
      Inventore laborum rerum at id?
    </div>
  </ExpansionPanel>
  <ListItem
    title="Item 2"
    subheading="List Item"
    icon={mdiAccount}
    avatar={{ class: 'bg-surface-content/50 text-surface-100/90' }}
  />
  <ExpansionPanel>
    {#snippet trigger()}
        <ListItem
        
        title="Item 3"
        subheading="Expansion Panel"
        icon={mdiAccount}
        avatar={{ class: 'bg-surface-content/50 text-surface-100/90' }}
        class="flex-1"
        noShadow
      />
      {/snippet}
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quod culpa et, dolores
      omnis, ipsum in perspiciatis porro ut nihil molestiae molestias tenetur delectus velit!
      Inventore laborum rerum at id?
    </div>
  </ExpansionPanel>
</Preview>

<h2>Mix ExpansionPanel with ListItem</h2>

<h3>middle item</h3>

<Preview>
  <ListItem
    title="Item 1"
    subheading="List Item"
    icon={mdiAccount}
    avatar={{ class: 'bg-surface-content/50 text-surface-100/90' }}
  />
  <ExpansionPanel>
    {#snippet trigger()}
        <ListItem
        
        title="Item 2"
        subheading="Expansion Panel"
        icon={mdiAccount}
        avatar={{ class: 'bg-surface-content/50 text-surface-100/90' }}
        class="flex-1"
        noShadow
      />
      {/snippet}
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quod culpa et, dolores
      omnis, ipsum in perspiciatis porro ut nihil molestiae molestias tenetur delectus velit!
      Inventore laborum rerum at id?
    </div>
  </ExpansionPanel>
  <ListItem
    title="Item 3"
    subheading="List Item"
    icon={mdiAccount}
    avatar={{ class: 'bg-surface-content/50 text-surface-100/90' }}
  />
</Preview>
