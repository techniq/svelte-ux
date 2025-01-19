<script lang="ts">
  import { BarStack, Button, Tooltip, TweenedValue } from 'svelte-ux';
  import { format, randomInteger } from '@layerstack/utils';
  import { cls } from '@layerstack/tailwind';

  import Preview from '$lib/components/Preview.svelte';

  const data = [
    { label: 'Chrome', value: 65, classes: { bar: 'bg-warning' } },
    { label: 'Safari', value: 18.55, classes: { bar: 'bg-info' } },
    { label: 'Edge', value: 5.03, classes: { bar: 'bg-success' } },
    { label: 'Firefox', value: 2.8, classes: { bar: 'bg-danger' } },
  ];

  const dataWithColorProp = [
    { label: 'Chrome', value: 65, color: 'yellow' },
    { label: 'Safari', value: 18.55, color: 'blue' },
    { label: 'Edge', value: 5.03, color: 'green' },
    { label: 'Firefox', value: 2.8, color: 'red' },
  ];

  function randomDataGen() {
    return data.map((d) => {
      return {
        ...d,
        value: randomInteger(3, 70),
      };
    });
  }

  let randomData = randomDataGen();

  let duration = 300;
</script>

<h1>Examples</h1>

<h2>Basic</h2>

<Preview>
  <BarStack {data} />
</Preview>

<h2>Larger gap</h2>

<Preview>
  <BarStack {data} class="gap-1" />
</Preview>

<h2>Color via prop</h2>

<Preview>
  <BarStack data={dataWithColorProp} class="gap-1" />
</Preview>

<h2>Bar slot</h2>

<Preview>
  <BarStack {data}>
    <div
      slot="bar"
      class="flex items-center gap-2 truncate py-1 px-2 text-gray-900"
      let:item
      let:total
    >
      <span class="text-sm font-semibold">
        {format(item.value / total, 'percent')}
      </span>

      <span class="text-xs truncate">
        ({format(item.value, 'integer')})
      </span>
    </div>
  </BarStack>
</Preview>

<h2>Label using default slot</h2>

<Preview>
  <BarStack {data} let:item let:total>
    <div class={cls('h-1 group-first:rounded-l group-last:rounded-r', item.classes?.bar)}></div>
    <div class="truncate text-xs font-semibold text-surface-content">
      {item.label}
    </div>
  </BarStack>
</Preview>

<h2>Label with Tooltip</h2>

<Preview>
  <BarStack {data} let:item let:total>
    <Tooltip
      title="{item.label}: {format(item.value / total, 'percent')} ({format(
        item.value,
        'integer'
      )})"
      placement="bottom-start"
      offset={2}
    >
      <div class={cls('h-1 group-first:rounded-l group-last:rounded-r', item.classes?.bar)}></div>
      <div class="truncate text-xs font-semibold text-surface-content">
        {item.label}
      </div>
    </Tooltip>
  </BarStack>
</Preview>

<h2>Tweened values</h2>

<Preview>
  <Button
    on:click={() => (randomData = randomDataGen())}
    variant="outline"
    color="primary"
    class="mb-2"
    size="sm"
  >
    Randomize
  </Button>
  <BarStack data={randomData} let:item let:total>
    <div class={cls('group-first:rounded-l group-last:rounded-r', item.classes?.bar)}>
      <div class="flex items-center gap-1 truncate py-1 px-2">
        <span class="text-sm font-semibold text-gray-900">
          <TweenedValue value={item.value / total} let:value options={{ duration }}>
            {format(value ?? 0, 'percent')}
          </TweenedValue>
        </span>

        <span class="truncate text-xs text-gray-900">
          <TweenedValue value={item.value} let:value options={{ duration }}>
            ({format(value ?? 0, 'integer')})
          </TweenedValue>
        </span>
      </div>
    </div>
    <div class="truncate text-xs font-semibold text-surface-content">
      {item.label}
    </div>
  </BarStack>
</Preview>
