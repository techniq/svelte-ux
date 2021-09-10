<script>
  import {
    mdiAccount,
    mdiAccountMultipleOutline,
    mdiAccountOutline,
  } from '@mdi/js';

  import Button from '$lib/components/Button.svelte';
  import Grid from '$lib/components/Grid.svelte';
  import Field from '$lib/components/Field.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import SectionDivider from '$lib/components/SectionDivider.svelte';
  import Switch from '$lib/components/Switch.svelte';
  import Tab from '$lib/components/Tab.svelte';
  import Tabs from '$lib/components/Tabs.svelte';
</script>

<SectionDivider>Basic</SectionDivider>

## Text (display only)

<Preview>
  <Grid columns={2} gap={8}>
    <Field label="First Name">Sean</Field>
    <Field label="Last Name">Lynch</Field>
  </Grid>
</Preview>

## Switch

<Preview>
  <Field label="Is Active" let:id>
    <Switch {id} />
  </Field>
</Preview>

<Grid columns={2} gap={8}>
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
</Grid>

## Button

<Preview>
  <Grid columns={2} gap={8}>
    <Field label="Action" let:id>
      <Button {id} on:click={() => console.log('clicked')}>Click me</Button>
    </Field>
  </Grid>
</Preview>

## Custom input

<Preview>
  <Grid columns={2} gap={8}>
    <Field label="First Name" let:id>
      <input {id} class="bg-black/5 w-full focus:outline-none" />
    </Field>
    <Field label="Last Name" let:id>
      <input {id} class="bg-black/5 w-full focus:outline-none" />
    </Field>
  </Grid>
</Preview>
