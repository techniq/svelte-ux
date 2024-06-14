<script lang="ts">
  import { Button, Breadcrumb, DividerDot, Icon } from 'svelte-ux';
  import { mdiArrowRight } from '@mdi/js';

  import Preview from '$lib/components/Preview.svelte';

  let items = ['First', 'Second', 'Third'];

  let labeledItems = [
    { label: 'First', value: 'One' },
    { label: 'Second', value: 'Two' },
    { label: 'Third', value: 'Three' },
  ];
</script>

<h1>Examples</h1>

<h2>Basic</h2>

<Preview>
  <Breadcrumb {items} />
</Preview>

<h2>With gap</h2>

<Preview>
  <Breadcrumb {items} class="gap-1" />
</Preview>

<h2>Custom divider</h2>

<h3>with prop</h3>

<Preview>
  <Breadcrumb {items} divider="/" class="gap-2" />
</Preview>

<h2>Custom divider</h2>

<h3>with slot Icon</h3>

<Preview>
  <Breadcrumb {items} class="gap-2">
    <Icon slot="divider" path={mdiArrowRight} class="text-surface-content/25" />
  </Breadcrumb>
</Preview>

<h2>Custom item</h2>

<h3>with markup</h3>

<Preview>
  <Breadcrumb items={labeledItems} class="gap-2">
    <span slot="item" let:item>
      <div class="text-surface-content/50 text-xs uppercase">{item.label}</div>
      <div>{item.value}</div>
    </span>
  </Breadcrumb>
</Preview>

<h2>Custom item</h2>

<h3>with Button</h3>

<Preview>
  <Breadcrumb items={labeledItems}>
    <Button slot="item" let:item>
      <div>
        <div class="text-surface-content/50 text-xs uppercase">{item.label}</div>
        <div>{item.value}</div>
      </div>
    </Button>
  </Breadcrumb>
</Preview>

<h2>Custom item and divider</h2>

<Preview>
  <Breadcrumb items={labeledItems} class="gap-2">
    <span slot="item" let:item>
      <span class="text-surface-content/50 text-sm font-extrabold">{item.label}:</span>
      <span class="text-surface-content/50 text-sm">{item.value}</span>
    </span>
    <DividerDot slot="divider" class="text-surface-content/50" />
  </Breadcrumb>
</Preview>

<h2>Many items</h2>

<Preview>
  <Breadcrumb items={Array.from({ length: 20 }).map((_, i) => 'Item ' + ++i)} />
</Preview>

<h2>Null items (not displayed)</h2>

<Preview>
  <Breadcrumb items={Array.from({ length: 10 }).map((_, i) => (i % 2 ? null : 'Item ' + ++i))} />
</Preview>

<h2>Color</h2>

<h3>inherit</h3>

<Preview>
  <div class="bg-primary text-primary-content p-2 rounded">
    <Breadcrumb {items} />
  </div>
</Preview>

<h2>Color</h2>

<h3>text class</h3>

<Preview>
  <Breadcrumb {items} class="text-primary" />
</Preview>

<h2>Truncate long text</h2>

<Preview>
  <div class="w-[300px] border">
    <Breadcrumb items={['Example', 'of', 'really really really long text']} class="flex-nowrap">
      <span slot="item" class="last:truncate" let:item title={item}>{item}</span>
    </Breadcrumb>
  </div>
</Preview>
