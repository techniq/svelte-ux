<script lang="ts">
  import {
    mdiAccount,
    mdiAccountMultipleOutline,
    mdiAccountOutline,
    mdiChevronDown,
  } from '@mdi/js';

  import Button from '$lib/components/Button.svelte';
  import Checkbox from '$lib/components/Checkbox.svelte';
  import Field from '$lib/components/Field.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Input from '$lib/components/Input.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import Switch from '$lib/components/Switch.svelte';
  import ToggleGroup from '$lib/components/ToggleGroup.svelte';
  import ToggleOption from '$lib/components/ToggleOption.svelte';

  let group: string[] = [];
</script>

<h1>Examples</h1>

<h2>Text (display only) as value</h2>

<Preview>
  <div class="grid grid-flow-col gap-2">
    <Field label="First Name" value="Sean" />
    <Field label="Last Name" value="Lynch" />
  </div>
</Preview>

<h2>Text (display only) as slot</h2>

<Preview>
  <div class="grid grid-flow-col gap-2">
    <Field label="First Name">Sean</Field>
    <Field label="Last Name">Lynch</Field>
  </div>
</Preview>

<h2>Empty (null / undefined)</h2>

<Preview>
  <div class="grid grid-flow-col gap-2">
    <Field label="First name" value={null} />
    <Field label="Last name" value={undefined} />
  </div>
</Preview>

<h2>Placeholder</h2>

<Preview>
  <div class="grid grid-flow-col gap-2">
    <Field label="First name" value={null} placeholder="empty" />
    <Field label="Last name" value={undefined} placeholder="empty" />
  </div>
</Preview>

<h2>Switch</h2>

<Preview>
  <Field label="Is Active" let:id>
    <Switch {id} />
  </Field>
</Preview>

<h2>Checkbox</h2>

<Preview>
  <Field label="Fruits" classes={{ input: 'flex flex-col gap-3' }} bind:value={group} clearable>
    <Checkbox bind:group value="apple" class="w-full">Apple</Checkbox>
    <Checkbox bind:group value="banana" class="w-full">Banana</Checkbox>
    <Checkbox bind:group value="strawberry" class="w-full">Strawberry</Checkbox>
  </Field>
</Preview>

<h2>Checkbox w/ error</h2>

<Preview>
  <Field
    label="Fruits"
    classes={{ input: 'flex flex-col gap-3' }}
    bind:value={group}
    clearable
    error
  >
    <Checkbox bind:group value="apple" class="w-full">Apple</Checkbox>
    <Checkbox bind:group value="banana" class="w-full">Banana</Checkbox>
    <Checkbox bind:group value="strawberry" class="w-full">Strawberry</Checkbox>
  </Field>
</Preview>

<div class="grid grid-cols-2 gap-2">
  <div>
    <div class="text-lg font-semibold mt-8 ml-2">ToggleGroup</div>
    <div class="text-xs font-semibold text-surface-content/50 mb-1 ml-2">default width</div>
    <Preview>
      <Field label="Is Active">
        <ToggleGroup variant="outline" inset>
          <ToggleOption value="yes">Yes</ToggleOption>
          <ToggleOption value="no">No</ToggleOption>
          <ToggleOption value="all">All</ToggleOption>
        </ToggleGroup>
      </Field>
    </Preview>
  </div>

  <div>
    <div class="text-lg font-semibold mt-8 ml-2">ToggleGroup</div>
    <div class="text-xs font-semibold text-surface-content/50 mb-1 ml-2">full width</div>
    <Preview>
      <Field label="Is Active">
        <ToggleGroup variant="outline" inset class="w-full">
          <ToggleOption value="yes">Yes</ToggleOption>
          <ToggleOption value="no">No</ToggleOption>
          <ToggleOption value="all">All</ToggleOption>
        </ToggleGroup>
      </Field>
    </Preview>
  </div>

  <div>
    <div class="text-lg font-semibold mt-8 ml-2">ToggleGroup</div>
    <div class="text-xs font-semibold text-surface-content/50 mb-1 ml-2">
      full rounded and small
    </div>
    <Preview>
      <Field label="Is Active">
        <ToggleGroup variant="outline" inset rounded="full" size="sm" class="w-full">
          <ToggleOption value="yes">Yes</ToggleOption>
          <ToggleOption value="no">No</ToggleOption>
          <ToggleOption value="all">All</ToggleOption>
        </ToggleGroup>
      </Field>
    </Preview>
  </div>

  <div>
    <div class="text-lg font-semibold mt-8 ml-2">ToggleGroup</div>
    <div class="text-xs font-semibold text-surface-content/50 mb-1 ml-2">with icons</div>
    <Preview>
      <Field label="Is Active">
        <ToggleGroup variant="outline" inset rounded="full">
          <ToggleOption value="yes">
            <Icon data={mdiAccount} />
          </ToggleOption>
          <ToggleOption value="no">
            <Icon data={mdiAccountOutline} />
          </ToggleOption>
          <ToggleOption value="all">
            <Icon data={mdiAccountMultipleOutline} />
          </ToggleOption>
        </ToggleGroup>
      </Field>
    </Preview>
  </div>
</div>

<h2>Button</h2>

<Preview>
  <Field label="Action" let:id>
    <Button {id} on:click={() => console.log('clicked')}>Click me</Button>
  </Field>
</Preview>

<h2>Date input</h2>

<Preview>
  <Field label="Date of Birth" let:id>
    <input {id} type="date" class="text-sm w-full outline-none bg-surface-100" />
  </Field>
</Preview>

<h2>input type="number"</h2>

<Preview>
  <Field label="Number" let:id>
    <input
      {id}
      type="number"
      min={0}
      max={10}
      step={1}
      class="w-full outline-none bg-surface-100"
    />
  </Field>
</Preview>

<h2>Input</h2>

<Preview>
  <Field label="Phone number" let:id>
    <Input {id} mask="+1 (___) ___-____" replace="_" />
  </Field>
</Preview>

<h2>Select</h2>

<Preview>
  <Field label="Position" let:id>
    <select {id} class="text-sm w-full outline-none appearance-none cursor-pointer bg-surface-100">
      <option value={1}>First</option>
      <option value={2}>Second</option>
      <option value={3}>Third</option>
      <option value={4}>Fourth</option>
    </select>
    <span slot="append">
      <Icon data={mdiChevronDown} />
    </span>
  </Field>
</Preview>

<h2>Label placement</h2>

<Preview>
  <div class="grid gap-4">
    <Field label="Name" labelPlacement="inset">Sean Lynch</Field>
    <Field label="Name" labelPlacement="top">Sean Lynch</Field>
    <Field label="Name" labelPlacement="left">Sean Lynch</Field>
  </div>
</Preview>
