<script>
  import { mdiFilterVariant, mdiPlus, mdiMinus } from '@mdi/js';

  import api from '$lib/components/Badge.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Badge from '$lib/components/Badge.svelte';
  import Button from '$lib/components/Button.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import SectionDivider from '$lib/components/SectionDivider.svelte';
  import Stack from '$lib/components/Stack.svelte';
  import TextField from '$lib/components/TextField.svelte';

  let value = 1;
</script>

# Examples

<TextField type="integer" bind:value align="center" class="w-24">
  <div slot="prepend" class="flex">
    <Button icon={mdiMinus} on:click={() => (value -= 1)} />
  </div>
  <div slot="append" class="flex">
    <Button icon={mdiPlus} on:click={() => (value += 1)} />
  </div>
</TextField>

## Button

<Preview>
  <Badge {value}>
    <Button variant="outlined">Example</Button>
  </Badge>
</Preview>

## Button w/ small

<Preview>
  <Badge {value} small>
    <Button variant="outlined">Example</Button>
  </Badge>
</Preview>

## Icon Button

<Preview>
  <Badge {value} circle>
    <Button icon={mdiFilterVariant} variant="outlined" class="p-3" />
  </Badge>
</Preview>

## Icon Button w/ small

<Preview>
  <Badge {value} circle small>
    <Button icon={mdiFilterVariant} variant="outlined" class="p-3" />
  </Badge>
</Preview>

## Dot

<Preview>
  <Badge {value} dot>
    <Button icon={mdiFilterVariant} variant="outlined" class="p-3" />
  </Badge>
</Preview>

## Dot w/ small

<Preview>
  <Badge {value} dot small>
    <Button icon={mdiFilterVariant} variant="outlined" class="p-3" />
  </Badge>
</Preview>

<SectionDivider>Value slot</SectionDivider>

<Preview>
  <Badge {value} circle>
    <Button icon={mdiFilterVariant} variant="outlined" class="p-3" />
    <div slot="value" class="bg-green-500 text-white rounded-full">
      <Icon path={mdiPlus} />
    </div>
  </Badge>
</Preview>

<!-- ## Corner (multi) w/ Icon Button
<Preview>
<Stack stack inline>
  <Button icon={mdiFilterVariant} variant="outlined" class="p-3" />
  <div
    class="bg-red-500 rounded-full h-4 w-4 -mt-1 text-xs flex items-center justify-center self-start justify-self-end border border-white"
  />
  <div
    class="bg-green-500 rounded-full h-4 w-4 text-xs flex items-center justify-center self-end justify-self-end border border-white"
  />
</Stack>
</Preview> -->

<SectionDivider>Placement</SectionDivider>

<div class="grid grid-cols-5 gap-4">
  <div>
    <div class="text-sm text-black/50">Button w/ default</div>
    <Preview>
      <Badge {value}>
        <Button variant="outlined">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    <span class="text-sm text-black/50">Button w/ top-left</span>
    <Preview>
      <Badge {value} placement="top-left">
        <Button variant="outlined">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    <span class="text-sm text-black/50">Button w/ top-right</span>
    <Preview>
      <Badge {value} placement="top-right">
        <Button variant="outlined">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    <span class="text-sm text-black/50">Button w/ bottom-left</span>
    <Preview>
      <Badge {value} placement="bottom-left">
        <Button variant="outlined">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    <span class="text-sm text-black/50">Button w/ bottom-right</span>
    <Preview>
      <Badge {value} placement="bottom-right">
        <Button variant="outlined">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    <span class="text-sm text-black/50">Button w/ default</span>
    <Preview>
      <Badge {value} small>
        <Button variant="outlined">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    <span class="text-sm text-black/50">Button w/ top-left</span>
    <Preview>
      <Badge {value} small placement="top-left">
        <Button variant="outlined">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    <span class="text-sm text-black/50">Button w/ top-right</span>
    <Preview>
      <Badge {value} small placement="top-right">
        <Button variant="outlined">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    <span class="text-sm text-black/50">Button w/ bottom-left</span>
    <Preview>
      <Badge {value} small placement="bottom-left">
        <Button variant="outlined">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    <span class="text-sm text-black/50">Button w/ bottom-right</span>
    <Preview>
      <Badge {value} small placement="bottom-right">
        <Button variant="outlined">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    <span class="text-sm text-black/50">Icon Button w/ default</span>
    <Preview>
      <Badge {value} circle>
        <Button icon={mdiFilterVariant} class="border p-3" />
      </Badge>
    </Preview>
  </div>

  <div>
    <span class="text-sm text-black/50">Icon Button w/ top-left</span>
    <Preview>
      <Badge {value} circle placement="top-left">
        <Button icon={mdiFilterVariant} class="border p-3" />
      </Badge>
    </Preview>
  </div>

  <div>
    <span class="text-sm text-black/50">Icon Button w/ top-right</span>
    <Preview>
      <Badge {value} circle placement="top-right">
        <Button icon={mdiFilterVariant} class="border p-3" />
      </Badge>
    </Preview>
  </div>

  <div>
    <span class="text-sm text-black/50">Icon Button w/ bottom-left</span>
    <Preview>
      <Badge {value} circle placement="bottom-left">
        <Button icon={mdiFilterVariant} class="border p-3" />
      </Badge>
    </Preview>
  </div>

  <div>
    <span class="text-sm text-black/50">Icon Button w/ bottom-right</span>
    <Preview>
      <Badge {value} circle placement="bottom-right">
        <Button icon={mdiFilterVariant} class="border p-3" />
      </Badge>
    </Preview>
  </div>

  <div>
    <span class="text-sm text-black/50">Icon Button w/ default</span>
    <Preview>
      <Badge {value} circle small>
        <Button icon={mdiFilterVariant} class="border p-3" />
      </Badge>
    </Preview>
  </div>

  <div>
    <span class="text-sm text-black/50">Icon Button w/ top-left</span>
    <Preview>
      <Badge {value} circle small placement="top-left">
        <Button icon={mdiFilterVariant} class="border p-3" />
      </Badge>
    </Preview>
  </div>

  <div>
    <span class="text-sm text-black/50">Icon Button w/ top-right</span>
    <Preview>
      <Badge {value} circle small placement="top-right">
        <Button icon={mdiFilterVariant} class="border p-3" />
      </Badge>
    </Preview>
  </div>

  <div>
    <span class="text-sm text-black/50">Icon Button w/ bottom-left</span>
    <Preview>
      <Badge {value} circle small placement="bottom-left">
        <Button icon={mdiFilterVariant} class="border p-3" />
      </Badge>
    </Preview>
  </div>

  <div>
    <span class="text-sm text-black/50">Icon Button w/ bottom-right</span>
    <Preview>
      <Badge {value} circle small placement="bottom-right">
        <Button icon={mdiFilterVariant} class="border p-3" />
      </Badge>
    </Preview>
  </div>
</div>

# API

<ApiDocs {api} />
