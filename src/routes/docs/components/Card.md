<script lang="ts">
  import { mdiDotsVertical } from '@mdi/js';

  import AppBar from '../components/AppBar.svelte';
  import Avatar from '../components/Avatar.svelte';
  import Button from '../components/Button.svelte';
  import Card from '../components/Card.svelte';
  import Header from '../components/Header.svelte';
  import Preview from '../components/Preview.svelte';
</script>

## Usage

```js
import { Card } from 'svelte-ux';
```

## Default

<Preview>
  <Card>Contents</Card>
</Preview>

## Title

<Preview>
  <Card title="Title" />
</Preview>

## Title with subheading

<Preview>
  <Card title="Title" subheading="Subheading" />
</Preview>

## Header with Avatar

<Preview>
  <Card>
    <Header title="Title" subheading="Subheading" slot="header">
      <div slot="avatar">
        <Avatar class="bg-blue-500 text-white font-bold">A</Avatar>
      </div>
    </Header>
  </Card>
</Preview>

## Header with Actions

<Preview>
  <Card>
    <Header title="Title" subheading="Subheading" slot="header">
      <div slot="actions">
        <Button icon={mdiDotsVertical} class="w-12 h-12" />
      </div>
    </Header>
  </Card>
</Preview>

## Header with Avatar & Actions

<Preview>
  <Card>
    <Header title="Title" subheading="Subheading" slot="header">
      <div slot="avatar">
        <Avatar class="bg-blue-500 text-white font-bold">A</Avatar>
      </div>
      <div slot="actions">
        <Button icon={mdiDotsVertical} class="w-12 h-12" />
      </div>
    </Header>
  </Card>
</Preview>

## Contents slot

<Preview>
  <Card title="Title" subheading="Subheading">
    <div slot="contents">Contents</div>
  </Card>
</Preview>

## Actions slot

<Preview>
  <Card title="Title" subheading="Subheading">
    <div slot="actions">
      <Button>Action 1</Button>
      <Button>Action 2</Button>
    </div>
  </Card>
</Preview>

## Loading

<Preview>
  <Card title="Title" loading />
</Preview>
