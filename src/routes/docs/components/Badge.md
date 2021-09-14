<script>
  import { mdiFilterVariant, mdiPlus, mdiMinus } from '@mdi/js';

  import Badge from '$lib/components/Badge.svelte';
  import Button from '$lib/components/Button.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import SectionDivider from '$lib/components/SectionDivider.svelte';
  import Stack from '$lib/components/Stack.svelte';
  import TextField from '$lib/components/TextField.svelte';

  let value = 1;
</script>

<TextField type="integer" bind:value align="center" class="w-24">
  <div slot="prepend">
    <Button icon={mdiMinus} on:click={() => (value -= 1)} />
  </div>
  <div slot="append">
    <Button icon={mdiPlus} on:click={() => (value += 1)} />
  </div>
</TextField>

## Button

<Preview>
  <Badge {value}>
    <Button class="border">Example</Button>
  </Badge>
</Preview>

## Button w/ small

<Preview>
  <Badge {value} small>
    <Button class="border">Example</Button>
  </Badge>
</Preview>

## Icon Button

<Preview>
  <Badge {value} circle>
    <Button icon={mdiFilterVariant} class="border p-3" />
  </Badge>
</Preview>

## Icon Button w/ small

<Preview>
  <Badge {value} circle small>
    <Button icon={mdiFilterVariant} class="border p-3" />
  </Badge>
</Preview>

## Dot

<Preview>
  <Badge dot>
    <Button icon={mdiFilterVariant} class="border p-3" />
  </Badge>
</Preview>

## Dot w/ small

<Preview>
  <Badge dot small>
    <Button icon={mdiFilterVariant} class="border p-3" />
  </Badge>
</Preview>

<!-- ## Corner (multi) w/ Icon Button
<Preview>
<Stack stack inline>
  <Button icon={mdiFilterVariant} class="border p-3" />
  <div
    class="bg-red-500 rounded-full h-4 w-4 -mt-1 text-xs flex items-center justify-center self-start justify-self-end border border-white"
  />
  <div
    class="bg-green-500 rounded-full h-4 w-4 text-xs flex items-center justify-center self-end justify-self-end border border-white"
  />
</Stack>
</Preview> -->

<SectionDivider>Placement</SectionDivider>

<Stack horizontal gap={16}>
  <div>
    ## Button w/ default
    <Preview>
      <Badge {value}>
        <Button class="border">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    ## Button w/ top-left
    <Preview>
      <Badge {value} placement="top-left">
        <Button class="border">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    ## Button w/ top-right
    <Preview>
      <Badge {value} placement="top-right">
        <Button class="border">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    ## Button w/ bottom-left
    <Preview>
      <Badge {value} placement="bottom-left">
        <Button class="border">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    ## Button w/ bottom-right
    <Preview>
      <Badge {value} placement="bottom-right">
        <Button class="border">Example</Button>
      </Badge>
    </Preview>
  </div>
</Stack>

<Stack horizontal gap={16}>
  <div>
    ## Button w/ default
    <Preview>
      <Badge {value} small>
        <Button class="border">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    ## Button w/ top-left
    <Preview>
      <Badge {value} small placement="top-left">
        <Button class="border">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    ## Button w/ top-right
    <Preview>
      <Badge {value} small placement="top-right">
        <Button class="border">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    ## Button w/ bottom-left
    <Preview>
      <Badge {value} small placement="bottom-left">
        <Button class="border">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    ## Button w/ bottom-right
    <Preview>
      <Badge {value} small placement="bottom-right">
        <Button class="border">Example</Button>
      </Badge>
    </Preview>
  </div>
</Stack>

<Stack horizontal gap={16}>
  <div>
    ## Icon Button w/ default
    <Preview>
      <Badge {value} circle>
        <Button icon={mdiFilterVariant} class="border p-3" />
      </Badge>
    </Preview>
  </div>

  <div>
    ## Icon Button w/ top-left
    <Preview>
      <Badge {value} circle placement="top-left">
        <Button icon={mdiFilterVariant} class="border p-3" />
      </Badge>
    </Preview>
  </div>

  <div>
    ## Icon Button w/ top-right
    <Preview>
      <Badge {value} circle placement="top-right">
        <Button icon={mdiFilterVariant} class="border p-3" />
      </Badge>
    </Preview>
  </div>

  <div>
    ## Icon Button w/ bottom-left
    <Preview>
      <Badge {value} circle placement="bottom-left">
        <Button icon={mdiFilterVariant} class="border p-3" />
      </Badge>
    </Preview>
  </div>

  <div>
    ## Icon Button w/ bottom-right
    <Preview>
      <Badge {value} circle placement="bottom-right">
        <Button icon={mdiFilterVariant} class="border p-3" />
      </Badge>
    </Preview>
  </div>
</Stack>

<Stack horizontal gap={16}>
  <div>
    ## Icon Button w/ default
    <Preview>
      <Badge {value} circle small>
        <Button icon={mdiFilterVariant} class="border p-3" />
      </Badge>
    </Preview>
  </div>

  <div>
    ## Icon Button w/ top-left
    <Preview>
      <Badge {value} circle small placement="top-left">
        <Button icon={mdiFilterVariant} class="border p-3" />
      </Badge>
    </Preview>
  </div>

  <div>
    ## Icon Button w/ top-right
    <Preview>
      <Badge {value} circle small placement="top-right">
        <Button icon={mdiFilterVariant} class="border p-3" />
      </Badge>
    </Preview>
  </div>

  <div>
    ## Icon Button w/ bottom-left
    <Preview>
      <Badge {value} circle small placement="bottom-left">
        <Button icon={mdiFilterVariant} class="border p-3" />
      </Badge>
    </Preview>
  </div>

  <div>
    ## Icon Button w/ bottom-right
    <Preview>
      <Badge {value} circle small placement="bottom-right">
        <Button icon={mdiFilterVariant} class="border p-3" />
      </Badge>
    </Preview>
  </div>
</Stack>
