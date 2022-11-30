---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script lang="ts">
  import { mdiDotsVertical } from '@mdi/js';

  import api from '$lib/components/Card.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import AppBar from '$lib/components/AppBar.svelte';
  import Avatar from '$lib/components/Avatar.svelte';
  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';
  import Header from '$lib/components/Header.svelte';
  import Preview from '$lib/components/Preview.svelte';
</script>

# Usage

```js
import { Card } from 'svelte-ux';
```

# Examples

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

## Title as array

<Preview>
  <Card title={['One', 'Two', 'Three']} />
</Preview>

## Title with subheading as array

<Preview>
  <Card title="Title" subheading={['One', 'Two', 'Three']} />
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

## Actions slot alignment (always bottom)

<Preview>
  <div class="grid grid-cols-3 gap-3">
    <Card title="Title" subheading="with actions">
      <div slot="actions">
        <Button>Action 1</Button>
        <Button>Action 2</Button>
      </div>
    </Card>
    <Card title="Title" subheading="with content">
      <div slot="contents" class="bg-red-500">
        Contents
      </div>
    </Card>
    <Card title="Title" subheading="with tall content">
      <div slot="contents" class="bg-red-500 h-40">
        Contents
      </div>
    </Card>
  </div>
</Preview>

## Loading

<Preview>
  <Card title="Title" loading />
</Preview>

# API

<ApiDocs {api} />
