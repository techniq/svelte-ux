---
component: $component
filename: $filename
---

<script>
  import {
    mdiAccount,
    mdiAccountMultipleOutline,
    mdiAccountOutline,
    mdiChevronDown,
  } from '@mdi/js';

  import api from '$lib/components/Field.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Button from '$lib/components/Button.svelte';
  import Field from '$lib/components/Field.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import SectionDivider from '$lib/components/SectionDivider.svelte';
  import Switch from '$lib/components/Switch.svelte';
  import Tab from '$lib/components/Tab.svelte';
  import Tabs from '$lib/components/Tabs.svelte';
</script>

# Examples

## Text (display only)

<Preview>
  <div class="grid grid-flow-col gap-2">
    <Field label="First Name">Sean</Field>
    <Field label="Last Name">Lynch</Field>
  </div>
</Preview>

## Switch

<Preview>
  <Field label="Is Active" let:id>
    <Switch {id} />
  </Field>
</Preview>

<div class="grid grid-cols-2 gap-2">
  <div>
    <div class="text-lg font-semibold mt-8 ml-2">Tabs</div>
    <div class="text-xs font-semibold text-black/50 mb-1 ml-2">full width</div>
    <Preview>
      <Field label="Is Active">
        <Tabs contained class="w-full">
          <div class="tabList w-full border">
            <Tab>Yes</Tab>
            <Tab>No</Tab>
            <Tab>All</Tab>
          </div>
        </Tabs>
      </Field>
    </Preview>
  </div>

  <div>
    <div class="text-lg font-semibold mt-8 ml-2">Tabs</div>
    <div class="text-xs font-semibold text-black/50 mb-1 ml-2">fixed width</div>
    <Preview>
      <Field label="Is Active">
        <Tabs contained class="w-96">
          <div class="tabList w-full border">
            <Tab>Yes</Tab>
            <Tab>No</Tab>
            <Tab>All</Tab>
          </div>
        </Tabs>
      </Field>
    </Preview>
  </div>

  <div>
    <div class="text-lg font-semibold mt-8 mb-1 ml-2">Tabs with icons</div>
    <Preview>
      <Field label="Is Active">
        <Tabs contained circle>
          <div class="tabList h-12 w-32 border rounded-full">
            <Tab>
              <Icon path={mdiAccount} />
            </Tab>
            <Tab>
              <Icon path={mdiAccountOutline} />
            </Tab>
            <Tab>
              <Icon path={mdiAccountMultipleOutline} />
            </Tab>
          </div>
        </Tabs>
      </Field>
    </Preview>
  </div>
</div>

## Button

<Preview>
  <Field label="Action" let:id>
    <Button {id} on:click={() => console.log('clicked')}>Click me</Button>
  </Field>
</Preview>

## Date input

<Preview>
  <Field label="Date of Birth" let:id>
    <input {id} type="date" class="text-sm w-full outline-none" />
  </Field>
</Preview>

## Select

<Preview>
  <Field label="Position" let:id>
    <select {id} class="text-sm w-full outline-none appearance-none cursor-pointer">
      <option value={1}>First</option>
      <option value={2}>Second</option>
      <option value={3}>Third</option>
      <option value={4}>Fourth</option>
    </select>
    <span slot="append">
      <Icon path={mdiChevronDown} />
    </span>
  </Field>
</Preview>

# API

<ApiDocs {api} />
