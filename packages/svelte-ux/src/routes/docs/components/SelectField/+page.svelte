<script lang="ts">
  import { mdiMagnify, mdiPlus, mdiPencil, mdiAccount } from '@mdi/js';

  import Button from '$lib/components/Button.svelte';
  import Dialog from '$lib/components/Dialog.svelte';
  import Drawer from '$lib/components/Drawer.svelte';
  import Form from '$lib/components/Form.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import MenuItem from '$lib/components/MenuItem.svelte';
  import SelectField from '$lib/components/SelectField.svelte';
  import TextField from '$lib/components/TextField.svelte';
  import Toggle from '$lib/components/Toggle.svelte';

  import { delay } from '$lib/utils/promise';
  import { cls } from '$lib/utils/styles';
  import Icon from '$lib/components/Icon.svelte';

  let options = [
    { name: 'One', value: 1, icon: mdiMagnify },
    { name: 'Two', value: 2, icon: mdiPlus },
    { name: 'Three', value: 3, icon: mdiPencil },
    { name: 'Four', value: 4, icon: mdiAccount },
  ];
  const optionsWithGroup = [
    { name: 'One', value: 1, group: 'First' },
    { name: 'Two', value: 2, group: 'First' },
    { name: 'Three', value: 3, group: 'Second' },
    { name: 'Four', value: 4, group: 'Second' },
    { name: 'Five', value: 5, group: 'Second' },
    { name: 'Six', value: 6, group: 'Third' },
    { name: 'Seven', value: 7, group: 'Third' },
  ];

  const manyOptions = Array.from({ length: 100 }).map((_, i) => ({
    name: `${i + 1}`,
    value: i + 1,
  }));

  const newOptions = [
    { name: 'Empty', value: null },
    { name: 'Foo', value: 1 },
    { name: 'Bar', value: 2 },
    { name: 'Baz', value: 3 },
  ];

  let value = 3;
</script>

<h1>Examples</h1>

<h2>Basic</h2>

<Preview>
  <SelectField {options} on:change={(e) => console.log('on:change', e.detail)} />
</Preview>

<h2>bind:value</h2>

<Preview>
  <SelectField {options} bind:value />
  <Button on:click={() => (value = 1)}>Pick 1</Button>
  <Button on:click={() => (value = 2)}>Pick 2</Button>
  <Button on:click={() => (value = 3)}>Pick 3</Button>
  <Button on:click={() => (value = 4)}>Pick 4</Button>
</Preview>

<h2>clearable=false</h2>

<Preview>
  <SelectField {options} bind:value clearable={false} />
</Preview>

<h2>clearSearchOnFocus=false</h2>

<Preview>
  <SelectField {options} bind:value clearSearchOnOpen={false} />
</Preview>

<h2>Grouped options</h2>

<Preview>
  <SelectField options={optionsWithGroup} on:change={(e) => console.log('on:change', e.detail)} />
</Preview>

<h2>Many options</h2>

<Preview>
  <SelectField options={manyOptions} clearSearchOnOpen />
</Preview>

<h2>Update options</h2>

<Preview>
  <Toggle let:on let:toggle>
    <SelectField options={on ? newOptions : options} bind:value clearSearchOnOpen />
    <Button on:click={toggle}>Toggle Options</Button>
  </Toggle>
</Preview>

<h2>loading</h2>

<Preview>
  <SelectField {options} loading />
</Preview>

<h2>disabled</h2>

<Preview>
  <SelectField {options} disabled />
</Preview>

<h2>readonly</h2>

<Preview>
  <SelectField {options} value={1} readonly />
</Preview>

<h2>option slot</h2>

<Preview>
  <SelectField {options} on:change={(e) => console.log('on:change', e.detail)}>
    <div slot="option" let:option let:index let:selected let:highlightIndex>
      <MenuItem
        class={cls(
          index === highlightIndex && 'bg-black/5',
          option === selected && 'font-semibold',
          option.group ? 'px-4' : 'px-2'
        )}
        scrollIntoView={index === highlightIndex}
      >
        <div>
          <div>{option.name}</div>
          <div class="text-sm text-black/50">{option.value}</div>
        </div>
      </MenuItem>
    </div>
  </SelectField>
</Preview>

<h2>option slot with icon</h2>

<Preview>
  <SelectField
    {options}
    bind:value
    icon={options.find((c) => c.value === value)?.icon}
    on:change={(e) => console.log('on:change', e.detail)}
  >
    <div slot="option" let:option let:index let:selected let:highlightIndex>
      <MenuItem
        class={cls(
          index === highlightIndex && 'bg-black/5',
          option === selected && 'font-semibold',
          option.group ? 'px-4' : 'px-2'
        )}
        scrollIntoView={index === highlightIndex}
      >
        <div class="flex gap-2">
          <Icon path={option.icon} />
          <div>{option.name}</div>
        </div>
      </MenuItem>
    </div>
  </SelectField>
</Preview>

<h2>option with action</h2>

<Preview>
  <SelectField {options} on:change={(e) => console.log('on:change', e.detail)}>
    <div slot="option" let:option let:index let:selected let:highlightIndex>
      <MenuItem
        class={cls(
          index === highlightIndex && 'bg-black/5',
          option === selected && 'font-semibold',
          option.group ? 'px-4' : 'px-2'
        )}
        scrollIntoView={index === highlightIndex}
      >
        <div class="grid grid-cols-[1fr,auto] items-center w-full">
          <div>
            <div>{option.name}</div>
            <div class="text-sm text-black/50">{option.value}</div>
          </div>
          <div on:click|stopPropagation>
            <Toggle let:on={open} let:toggle let:toggleOff>
              <Button
                icon={mdiPencil}
                class="p-1 text-xs text-gray-400 z-[9999]"
                on:click={toggle}
              />
              <Drawer {open} on:close={toggleOff} class="w-[400px]">
                <div class="p-4">
                  Editing option: {option.name}
                </div>
                <div
                  class="fixed bottom-0 w-full flex justify-center bg-gray-500/25 p-1 border-t border-gray-400"
                >
                  <Button on:click={toggleOff}>Close</Button>
                </div>
              </Drawer>
            </Toggle>
          </div>
        </div>
      </MenuItem>
    </div>
  </SelectField>
</Preview>

<h2>Prepend slot</h2>

<Preview>
  <Toggle let:on={open} let:toggle>
    <SelectField {options}>
      <div slot="prepend" on:click|stopPropagation class="flex items-center">
        <select
          class="appearance-none bg-black/5 border rounded-full mr-2 px-4"
          style="text-align-last: center;"
        >
          <!-- <option /> -->
          <option>{'='}</option>
          <option>{'!='}</option>
          <option>{'>'}</option>
          <option>{'>='}</option>
          <option>{'<'}</option>
          <option>{'<='}</option>
        </select>
      </div>
    </SelectField>
  </Toggle>
</Preview>

<h2>`append` slot (field actions)</h2>

<Preview>
  <Toggle let:on={open} let:toggle>
    <SelectField {options}>
      <span slot="append" on:click|stopPropagation>
        <Button icon={mdiPlus} class="text-black/50 p-2" on:click={toggle} />
      </span>
    </SelectField>
    <Form
      initial={{ name: null, value: null }}
      on:change={(e) => {
        options = [e.detail, ...options];
      }}
      let:draft
      let:commit
      let:revert
    >
      <Dialog {open} on:close={toggle}>
        <div slot="title">Create new option</div>
        <div class="px-6 py-3 w-96 grid gap-2">
          <TextField
            label="Name"
            value={draft.name}
            on:change={(e) => {
              draft.name = e.detail.value;
            }}
            autofocus
          />
          <TextField
            label="Value"
            value={draft.value}
            on:change={(e) => {
              draft.value = e.detail.value;
            }}
          />
        </div>
        <div slot="actions">
          <Button on:click={() => commit()} color="accent">Add option</Button>
          <Button on:click={() => revert()}>Cancel</Button>
        </div>
      </Dialog>
    </Form>
  </Toggle>
</Preview>

<h2>`actions` slot (menu)</h2>

<Preview>
  <SelectField {options} bind:value>
    <div slot="actions" class="p-2 border-t" on:click|stopPropagation let:hide>
      <Toggle let:on={open} let:toggle>
        <Button icon={mdiPlus} color="blue" on:click={toggle}>New item</Button>
        <Form
          initial={{ name: null, value: null }}
          on:change={(e) => {
            options = [e.detail, ...options];
          }}
          let:draft
          let:commit
          let:revert
        >
          <Dialog
            {open}
            on:close={() => {
              toggle();
              hide();
            }}
          >
            <div slot="title">Create new option</div>
            <div class="px-6 py-3 w-96 grid gap-2">
              <TextField
                label="Name"
                value={draft.name}
                on:change={(e) => {
                  draft.name = e.detail.value;
                }}
                autofocus
              />
              <TextField
                label="Value"
                value={draft.value}
                on:change={(e) => {
                  draft.value = e.detail.value;
                }}
              />
            </div>
            <div slot="actions">
              <Button on:click={() => commit()} color="accent">Add option</Button>
              <Button on:click={() => revert()}>Cancel</Button>
            </div>
          </Dialog>
        </Form>
      </Toggle>
    </div>
  </SelectField>
</Preview>

<h2>Icon</h2>

<Preview>
  <SelectField {options} icon={mdiMagnify} />
</Preview>

<h2>Rounded</h2>

<Preview>
  <SelectField {options} rounded />
</Preview>

<h2>Rounded with icon</h2>

<Preview>
  <SelectField {options} icon={mdiMagnify} rounded />
</Preview>

<h2>Rounded with append slot and icon</h2>

<Preview>
  <SelectField {options} icon={mdiMagnify} rounded>
    <span slot="prepend" on:click|stopPropagation>
      <select
        class="appearance-none bg-black/5 border rounded-full mr-2 px-4"
        style="text-align-last: center;"
      >
        <!-- <option /> -->
        <option>{'='}</option>
        <option>{'!='}</option>
        <option>{'>'}</option>
        <option>{'>='}</option>
        <option>{'<'}</option>
        <option>{'<='}</option>
      </select>
    </span>
  </SelectField>
</Preview>

<h2>Search</h2>

<Preview>
  <SelectField
    {options}
    on:change={(e) => console.log('on:change', e.detail)}
    search={async () => {
      console.log('search override...');
      await delay(1000);
      console.log('search override done');
    }}
  />
</Preview>

<h2>Placement</h2>

<Preview>
  <SelectField
    {options}
    on:change={(e) => console.log('on:change', e.detail)}
    placement="top-start"
  />
</Preview>

<h2>Custom selected class</h2>

<Preview>
  <SelectField
    {options}
    bind:value
    clearSearchOnOpen
    classes={{ selected: 'bg-accent-500 text-white' }}
  />
</Preview>
