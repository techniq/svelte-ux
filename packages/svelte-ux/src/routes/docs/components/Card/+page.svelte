<script lang="ts">
  import { Avatar, Button, Card, getSettings, Header, Settings } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';

  const { icons } = getSettings();
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
    <Header title="Title" subheading="Subheading" slot="header">
      <div slot="avatar">
        <Avatar class="bg-primary text-primary-content font-bold">A</Avatar>
      </div>
    </Header>
  </Card>
</Preview>

<h2>Header with Actions</h2>

<Preview>
  <Card>
    <Header title="Title" subheading="Subheading" slot="header">
      <div slot="actions">
        <Button icon={icons.ellipsisVertical} class="w-12 h-12" />
      </div>
    </Header>
  </Card>
</Preview>

<h2>Header with Avatar & Actions</h2>

<Preview>
  <Card>
    <Header title="Title" subheading="Subheading" slot="header">
      <div slot="avatar">
        <Avatar class="bg-primary text-primary-content font-bold">A</Avatar>
      </div>
      <div slot="actions">
        <Button icon={icons.ellipsisVertical} class="w-12 h-12" />
      </div>
    </Header>
  </Card>
</Preview>

<h2>Contents slot</h2>

<Preview>
  <Card title="Title" subheading="Subheading">
    <div slot="contents">Contents</div>
  </Card>
</Preview>

<h2>Actions slot</h2>

<Preview>
  <Card title="Title" subheading="Subheading">
    <div slot="actions">
      <Button>Action 1</Button>
      <Button>Action 2</Button>
    </div>
  </Card>
</Preview>

<h2>Actions slot alignment (always bottom)</h2>

<Preview>
  <div class="grid grid-cols-3 gap-3">
    <Card title="Title" subheading="with actions">
      <div slot="actions">
        <Button>Action 1</Button>
        <Button>Action 2</Button>
      </div>
    </Card>
    <Card title="Title" subheading="with content">
      <div slot="contents" class="bg-danger/10">Contents</div>
    </Card>
    <Card title="Title" subheading="with tall content">
      <div slot="contents" class="bg-danger/10 h-40">Contents</div>
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

<h2>Settings</h2>

<Settings
  components={{
    Card: {
      classes: { headerContainer: 'bg-surface-300 border-b', header: { title: 'text-3xl' } },
    },
  }}
>
  <Card title="Title" subheading="Subheading">
    <div slot="contents">Contents</div>
  </Card>
</Settings>
