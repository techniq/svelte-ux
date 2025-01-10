<script lang="ts">
  import { mdiDotsVertical } from '@mdi/js';

  import { Avatar, Button, Card, Header } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';
</script>

<h1>Examples</h1>

<h2>Default</h2>

<Preview>
  <Card>Contents</Card>
</Preview>

<h2>Title</h2>

<Preview>
  <Card title="Title" />
</Preview>

<h2>Title with subheading</h2>

<Preview>
  <Card title="Title" subheading="Subheading" />
</Preview>

<h2>Title as array</h2>

<Preview>
  <Card title={['One', 'Two', 'Three']} />
</Preview>

<h2>Title with subheading as array</h2>

<Preview>
  <Card title="Title" subheading={['One', 'Two', 'Three']} />
</Preview>

<h2>Header with Avatar</h2>

<Preview>
  <Card>
    {#snippet header()}
      <Header title="Title" subheading="Subheading">
        {#snippet avatar()}
          <div>
            <Avatar class="bg-primary text-primary-content font-bold">A</Avatar>
          </div>
        {/snippet}
      </Header>
    {/snippet}
  </Card>
</Preview>

<h2>Header with Actions</h2>

<Preview>
  <Card>
    {#snippet header()}
      <Header title="Title" subheading="Subheading">
        {#snippet actions()}
          <div>
            <Button icon={mdiDotsVertical} class="w-12 h-12" />
          </div>
        {/snippet}
      </Header>
    {/snippet}
  </Card>
</Preview>

<h2>Header with Avatar & Actions</h2>

<Preview>
  <Card>
    {#snippet header()}
      <Header title="Title" subheading="Subheading">
        {#snippet avatar()}
          <div>
            <Avatar class="bg-primary text-primary-content font-bold">A</Avatar>
          </div>
        {/snippet}
        {#snippet actions()}
          <div>
            <Button icon={mdiDotsVertical} class="w-12 h-12" />
          </div>
        {/snippet}
      </Header>
    {/snippet}
  </Card>
</Preview>

<h2>Contents slot</h2>

<Preview>
  <Card title="Title" subheading="Subheading">
    {#snippet contents()}
      <div>Contents</div>
    {/snippet}
  </Card>
</Preview>

<h2>Actions slot</h2>

<Preview>
  <Card title="Title" subheading="Subheading">
    {#snippet actions()}
      <div>
        <Button>Action 1</Button>
        <Button>Action 2</Button>
      </div>
    {/snippet}
  </Card>
</Preview>

<h2>Actions slot alignment (always bottom)</h2>

<Preview>
  <div class="grid grid-cols-3 gap-3">
    <Card title="Title" subheading="with actions">
      {#snippet actions()}
        <div>
          <Button>Action 1</Button>
          <Button>Action 2</Button>
        </div>
      {/snippet}
    </Card>
    <Card title="Title" subheading="with content">
      {#snippet contents()}
        <div class="bg-danger/10">Contents</div>
      {/snippet}
    </Card>
    <Card title="Title" subheading="with tall content">
      {#snippet contents()}
        <div class="bg-danger/10 h-40">Contents</div>
      {/snippet}
    </Card>
  </div>
</Preview>

<h2>Loading</h2>

<Preview>
  <Card title="Title" loading />
</Preview>

<h2>remove shadow</h2>

<Preview>
  <Card class="elevation-none">Contents</Card>
</Preview>
