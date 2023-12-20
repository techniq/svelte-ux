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
  import type { MenuOption } from '$lib/types/options';

  let options: MenuOption[] = [
    { label: 'One', value: 1, icon: mdiMagnify },
    { label: 'Two', value: 2, icon: mdiPlus },
    { label: 'Three', value: 3, icon: mdiPencil },
    { label: 'Four', value: 4, icon: mdiAccount },
  ];

  const optionsWithGroup: MenuOption[] = [
    { label: 'One', value: 1, group: 'First' },
    { label: 'Two', value: 2, group: 'First' },
    { label: 'Three', value: 3, group: 'Second' },
    { label: 'Four', value: 4, group: 'Second' },
    { label: 'Five', value: 5, group: 'Second' },
    { label: 'Six', value: 6, group: 'Third' },
    { label: 'Seven', value: 7, group: 'Third' },
  ];

  const manyOptions: MenuOption[] = Array.from({ length: 100 }).map((_, i) => ({
    label: `${i + 1}`,
    value: i + 1,
  }));

  const newOptions: MenuOption[] = [
    { label: 'Empty', value: null },
    { label: 'Foo', value: 1 },
    { label: 'Bar', value: 2 },
    { label: 'Baz', value: 3 },
  ];

  const newOption: () => MenuOption = () => {
    return { label: '', value: null };
  };

  let optionsAsync: MenuOption[] = [];
  let loading = false;

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

<h2>Async options</h2>

<Preview>
  <SelectField bind:value options={optionsAsync} {loading} />
  <Button
    on:click={() => {
      // simulate async loading of 2 seconds
      if (optionsAsync.length === 0) {
        loading = true;
        setTimeout(() => {
          optionsAsync = options;
          // set a default value after loading
          value = 2;
          loading = false;
        }, 2000);
      } else {
        optionsAsync = [];
      }
    }}
    {loading}
  >
    {optionsAsync.length === 0 ? 'Load options' : 'Unload options'}
  </Button>
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
          index === highlightIndex && 'bg-surface-content/5',
          option === selected && 'font-semibold',
          option.group ? 'px-4' : 'px-2'
        )}
        scrollIntoView={index === highlightIndex}
      >
        <div>
          <div>{option.label}</div>
          <div class="text-sm text-text-surface-content/50">{option.value}</div>
        </div>
      </MenuItem>
    </div>
  </SelectField>
</Preview>

<h2>option slot with icon (field icon updates based on selected option)</h2>

<Preview>
  <SelectField
    {options}
    bind:value
    activeOptionIcon={true}
    on:change={(e) => console.log('on:change', e.detail)}
  >
    <div slot="option" let:option let:index let:selected let:highlightIndex>
      <MenuItem
        class={cls(
          index === highlightIndex && 'bg-surface-content/5',
          option === selected && 'font-semibold',
          option.group ? 'px-4' : 'px-2'
        )}
        scrollIntoView={index === highlightIndex}
        icon={{ data: option.icon, style: 'color: #0000FF;' }}
      >
        {option.label}
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
          index === highlightIndex && 'bg-surface-content/5',
          option === selected && 'font-semibold',
          option.group ? 'px-4' : 'px-2'
        )}
        scrollIntoView={index === highlightIndex}
      >
        <div class="grid grid-cols-[1fr,auto] items-center w-full">
          <div>
            <div>{option.label}</div>
            <div class="text-sm text-surface-content/50">{option.value}</div>
          </div>
          <div on:click|stopPropagation>
            <Toggle let:on={open} let:toggle let:toggleOff>
              <Button
                icon={mdiPencil}
                class="p-1 text-xs text-surface-content/50 z-[9999]"
                on:click={toggle}
              />
              <Drawer {open} on:close={toggleOff} class="w-[400px]">
                <div class="p-4">
                  Editing option: {option.label}
                </div>
                <div slot="actions">
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
          class="appearance-none bg-surface-content/5 border border-surface-content/20 rounded-full mr-2 px-4"
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
        <Button icon={mdiPlus} class="text-surface-content/50 p-2" on:click={toggle} />
      </span>
    </SelectField>
    <Form
      initial={newOption()}
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
            label="Label"
            value={draft.label}
            on:change={(e) => {
              draft.label = e.detail.value;
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
          <Button on:click={() => commit()} color="primary">Add option</Button>
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
        <Button icon={mdiPlus} color="primary" on:click={toggle}>New item</Button>
        <Form
          initial={newOption()}
          on:change={(e) => {
            options = [e.detail, ...options];
          }}
          let:draft
          let:current
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
                label="Label"
                value={current.label}
                on:change={(e) => {
                  draft.label = e.detail.value;
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
              <Button on:click={() => commit()} color="primary">Add option</Button>
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
        class="appearance-none bg-surface-content/5 border border-surface-content/20 rounded-full mr-2 px-4"
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
    classes={{ selected: 'bg-primary text-primary-content' }}
  />
</Preview>

<h2>Inline options with icon (used by search bar dialog in top-right)</h2>

<Preview>
  <SelectField {options} icon={mdiMagnify} bind:value inlineOptions={true} />
</Preview>
