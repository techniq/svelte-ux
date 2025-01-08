<script lang="ts">
  import { BarStack, Button, Tooltip, TweenedValue, cls, format } from 'svelte-ux';

  import Preview from '$lib/components/Preview.svelte';

  import { randomInteger } from '$lib/utils/number.js';

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

  let randomData = $state(randomDataGen());

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
    {#snippet bar({ item, total })}
      <div class="flex items-center gap-2 truncate py-1 px-2 text-gray-900">
        <span class="text-sm font-semibold">
          {format(item.value / total, 'percent')}
        </span>

        <span class="text-xs truncate">
          ({format(item.value, 'integer')})
        </span>
      </div>
    {/snippet}
  </BarStack>
</Preview>

<h2>Label using default slot</h2>

<Preview>
  <BarStack {data}>
    {#snippet children({ item, total })}
      <div class={cls('h-1 group-first:rounded-l group-last:rounded-r', item.classes?.bar)}></div>
      <div class="truncate text-xs font-semibold text-surface-content">
        {item.label}
      </div>
    {/snippet}
  </BarStack>
</Preview>

<h2>Label with Tooltip</h2>

<Preview>
  <BarStack {data}>
    {#snippet children({ item, total })}
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
    {/snippet}
  </BarStack>
</Preview>

<h2>Tweened values</h2>

<Preview>
  <Button
    onclick={() => (randomData = randomDataGen())}
    variant="outline"
    color="primary"
    class="mb-2"
    size="sm"
  >
    Randomize
  </Button>
  <BarStack data={randomData}>
    {#snippet children({ item, total })}
      <div class={cls('group-first:rounded-l group-last:rounded-r', item.classes?.bar)}>
        <div class="flex items-center gap-1 truncate py-1 px-2">
          <span class="text-sm font-semibold text-gray-900">
            <TweenedValue value={item.value / total} options={{ duration }}>
              {#snippet children({ value })}
                {format(value ?? 0, 'percent')}
              {/snippet}
            </TweenedValue>
          </span>

          <span class="truncate text-xs text-gray-900">
            <TweenedValue value={item.value} options={{ duration }}
              >{#snippet children({ value })}
                ({format(value ?? 0, 'integer')})
              {/snippet}
            </TweenedValue>
          </span>
        </div>
      </div>
      <div class="truncate text-xs font-semibold text-surface-content">
        {item.label}
      </div>
    {/snippet}
  </BarStack>
</Preview>
