<script lang="ts">
  import { mdiHome, mdiMagnify, mdiMenu, mdiTrashCan } from '@mdi/js';
  import { faUser } from '@fortawesome/free-solid-svg-icons';

  import {
    Button,
    Field,
    SectionDivider,
    Tooltip,
    Toggle,
    ToggleGroup,
    ToggleOption,
  } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';

  let size: 'sm' | 'md' | 'lg' = 'md';

  const variants = ['default', 'outline', 'fill', 'fill-light', 'fill-outline', 'text'] as const;
</script>

<h1>Examples</h1>

<h2>Basic</h2>

<Preview>
  <Button on:click={() => alert('Why did you do that?')}>Click me</Button>
</Preview>

<h2>Link</h2>

<Preview>
  <Button href="https://www.google.com" target="_blank">Open Google</Button>
</Preview>

<h2>Disabled</h2>

<Preview>
  <Button disabled>Click me</Button>
</Preview>

<h2>Loading</h2>

<Preview>
  <Button loading>Loading...</Button>
  <Button variant="outline" color="primary" loading>Loading...</Button>
  <Button variant="fill" color="primary" loading>Loading...</Button>
  <Button variant="fill-light" color="primary" loading>Loading...</Button>
  <Button variant="fill-outline" color="primary" loading>Loading...</Button>
  <Button variant="text" color="primary" loading>Loading...</Button>

  <div class="mt-2">
    <Toggle let:on={loading} let:toggle>
      <Button {loading} on:click={toggle}>Click me</Button>
    </Toggle>
    <Toggle let:on={loading} let:toggle>
      <Button variant="outline" color="primary" {loading} on:click={toggle}>Click me</Button>
    </Toggle>
    <Toggle let:on={loading} let:toggle>
      <Button variant="fill" color="primary" {loading} on:click={toggle}>Click me</Button>
    </Toggle>
    <Toggle let:on={loading} let:toggle>
      <Button variant="fill-light" color="primary" {loading} on:click={toggle}>Click me</Button>
    </Toggle>
    <Toggle let:on={loading} let:toggle>
      <Button variant="fill-outline" color="primary" {loading} on:click={toggle}>Click me</Button>
    </Toggle>
    <Toggle let:on={loading} let:toggle>
      <Button variant="text" color="primary" {loading} on:click={toggle}>Click me</Button>
    </Toggle>
  </div>

  <div class="mt-2">
    <Toggle let:on={loading} let:toggle>
      <Button icon={faUser} {loading} on:click={toggle}>Click me</Button>
    </Toggle>
    <Toggle let:on={loading} let:toggle>
      <Button icon={faUser} variant="outline" color="primary" {loading} on:click={toggle}
        >Click me</Button
      >
    </Toggle>
    <Toggle let:on={loading} let:toggle>
      <Button icon={faUser} variant="fill" color="primary" {loading} on:click={toggle}
        >Click me</Button
      >
    </Toggle>
    <Toggle let:on={loading} let:toggle>
      <Button icon={faUser} variant="fill-light" color="primary" {loading} on:click={toggle}
        >Click me</Button
      >
    </Toggle>
    <Toggle let:on={loading} let:toggle>
      <Button icon={faUser} variant="fill-outline" color="primary" {loading} on:click={toggle}
        >Click me</Button
      >
    </Toggle>
    <Toggle let:on={loading} let:toggle>
      <Button icon={faUser} variant="text" color="primary" {loading} on:click={toggle}
        >Click me</Button
      >
    </Toggle>
  </div>
</Preview>

<div class="grid grid-cols-[1fr_auto] gap-2 items-end">
  <h2>Variants, Color & Size</h2>
  <Field label="size: " labelPlacement="left" class="mb-1">
    <ToggleGroup bind:value={size} size="sm">
      <ToggleOption value="sm">sm</ToggleOption>
      <ToggleOption value="md">md</ToggleOption>
      <ToggleOption value="lg">lg</ToggleOption>
    </ToggleGroup>
  </Field>
</div>

<Preview>
  <div class="grid gap-3 divide-y">
    {#each variants as variant}
      <div>
        <div class="font-semibold my-2">{variant}</div>
        <div class="grid gap-2 ml-4">
          <!-- Theme colors -->
          <div>
            <Button {variant} {size}>Default</Button>
            <Button {variant} {size} color="primary">Primary</Button>
            <Button {variant} {size} color="secondary">Secondary</Button>
            <Button {variant} {size} color="accent">Accent</Button>
            <Button {variant} {size} color="neutral">Neutral</Button>
          </div>
          <div>
            <!-- State colors -->
            <Button {variant} {size} color="info">Info</Button>
            <Button {variant} {size} color="success">Success</Button>
            <Button {variant} {size} color="warning">Warning</Button>
            <Button {variant} {size} color="danger">Danger</Button>
          </div>
          <div>
            <!-- TODO: CSS variables for each variant -->
            <!-- <Button {variant} {size} class="[--bg-color:var(--color-blue-500)] [--text-color:white]">
              Color Variables
            </Button>
            <Button {variant} {size} class="[--bg-color:var(--color-emerald-500)] [--text-color:white]">
              Color Variables
            </Button> -->
          </div>
        </div>
      </div>
    {/each}
  </div>
</Preview>

<h2>`none` variant</h2>

<Preview>
  <Button variant="none">Click me</Button>
</Preview>

<h2>Rounded</h2>

<Preview>
  <div class="grid gap-2">
    <div>
      <Button>default</Button>
      <Button rounded>rounded</Button>
      <Button rounded="full">full</Button>
      <Button rounded={false}>false</Button>
    </div>
    <div>
      <Button variant="outline" color="primary">default</Button>
      <Button variant="outline" color="primary" rounded>rounded</Button>
      <Button variant="outline" color="primary" rounded-sm="full">full</Button>
      <Button variant="outline" color="primary" rounded={false}>false</Button>
    </div>
    <div>
      <Button variant="fill" color="primary">default</Button>
      <Button variant="fill" color="primary" rounded>rounded</Button>
      <Button variant="fill" color="primary" rounded-sm="full">full</Button>
      <Button variant="fill" color="primary" rounded={false}>false</Button>
    </div>
    <div>
      <Button variant="fill-light" color="primary">default</Button>
      <Button variant="fill-light" color="primary" rounded>rounded</Button>
      <Button variant="fill-light" color="primary" rounded-sm="full">full</Button>
      <Button variant="fill-light" color="primary" rounded={false}>false</Button>
    </div>
    <div>
      <Button variant="fill-outline" color="primary">default</Button>
      <Button variant="fill-outline" color="primary" rounded>rounded</Button>
      <Button variant="fill-outline" color="primary" rounded-sm="full">full</Button>
      <Button variant="fill-outline" color="primary" rounded={false}>false</Button>
    </div>
  </div>
</Preview>

<h2>Uppercase</h2>

<Preview>
  <Button class="uppercase">default</Button>
  <Button class="uppercase" variant="outline" color="primary">outline</Button>
  <Button class="uppercase" variant="fill" color="primary">fill</Button>
  <Button class="uppercase" variant="fill-light" color="primary">fill-light</Button>
  <Button class="uppercase" variant="fill-outline" color="primary">fill-outline</Button>
  <Button class="uppercase" variant="text" color="primary">text</Button>
</Preview>

<h2>Tooltip</h2>

<Preview>
  <Tooltip title="Really, do it!" placement="right" offset={2}>
    <Button>Click me</Button>
  </Tooltip>
</Preview>

<h2>Tooltip (disabled)</h2>

<Preview>
  <Tooltip title="Really, do it!" placement="right" offset={2}>
    <Button disabled>Click me</Button>
  </Tooltip>
</Preview>

<h2>Text with icon</h2>

<Preview>
  <div class="flex items-center">
    <Button icon={mdiTrashCan} color="danger">Delete</Button>
    <Button icon={mdiMagnify} class="flex-row-reverse">Search</Button>
    <Button icon={mdiHome} class="flex-col">Home</Button>
    <Button icon={mdiHome} class="flex-col-reverse">Home</Button>
    <Button icon={faUser}>Profile</Button>
  </div>
</Preview>

<h2>Pass props to Icon</h2>

<Preview>
  <Button icon={{ data: mdiTrashCan, size: '2rem', style: 'color: crimson' }} color="danger">
    Delete
  </Button>
</Preview>

<h2>Pass class to Icon</h2>

<Preview>
  <Button icon={mdiTrashCan} classes={{ icon: 'text-danger-300 text-lg' }} color="danger">
    Delete
  </Button>
</Preview>

<SectionDivider class="mt-12">Icon only</SectionDivider>

<h2>Icon-only button</h2>

<Preview>
  <Button icon={mdiMenu} />
</Preview>

<h2>Icon-only size</h2>

<Preview>
  <Button icon={mdiMenu} size="sm" />
  <Button icon={mdiMenu} size="md" />
  <Button icon={mdiMenu} size="lg" />
</Preview>

<h2>Icon-only button with custom padding</h2>

<Preview>
  <Button icon={mdiMenu} class="p-2" />
</Preview>

<h2>Icon via url</h2>

<Preview>
  <Button icon="https://api.iconify.design/mdi:account.svg" class="p-2" />
</Preview>

<h2>Icon via SVG string</h2>

<Preview>
  <Button
    icon={'<svg width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4Z"/></svg>'}
    class="p-2"
  />
</Preview>

<h2>Icon-only button variants and color</h2>

<Preview>
  <div>
    <Button icon={mdiMenu} />
    <Button icon={mdiMenu} color="primary" />
  </div>
  <div>
    <Button icon={mdiMenu} variant="outline" />
    <Button icon={mdiMenu} variant="outline" color="primary" />
  </div>
  <div>
    <Button icon={mdiMenu} variant="fill" />
    <Button icon={mdiMenu} variant="fill" color="primary" />
  </div>
  <div>
    <Button icon={mdiMenu} variant="fill-light" />
    <Button icon={mdiMenu} variant="fill-light" color="primary" />
  </div>
  <div>
    <Button icon={mdiMenu} variant="fill-outline" />
    <Button icon={mdiMenu} variant="fill-outline" color="primary" />
  </div>
  <div>
    <Button icon={mdiMenu} variant="text" />
    <Button icon={mdiMenu} variant="text" color="primary" />
  </div>
</Preview>
