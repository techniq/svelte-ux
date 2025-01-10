<script lang="ts">
  import { mdiMagnify, mdiPlus, mdiPencil, mdiAccount } from '@mdi/js';

  import {
    Button,
    Dialog,
    Drawer,
    Form,
    MenuItem,
    SelectField,
    TextField,
    Toggle,
    delay,
    cls,
    type MenuOption,
  } from 'svelte-ux';

  import Preview from '$lib/components/Preview.svelte';

  let options: MenuOption[] = $state([
    { label: 'One', value: 1 },
    { label: 'Two', value: 2 },
    { label: 'Three', value: 3 },
    { label: 'Four', value: 4 },
  ]);

  let optionsWithIcon: MenuOption[] = [
    { label: 'One', value: 1, icon: mdiMagnify },
    { label: 'Two', value: 2, icon: mdiPlus },
    { label: 'Three', value: 3, icon: mdiPencil },
    { label: 'Four', value: 4, icon: mdiAccount },
  ];

  let optionsWithDisabled: MenuOption[] = [
    { label: 'One', value: 1, disabled: true },
    { label: 'Two', value: 2 },
    { label: 'Three', value: 3 },
    { label: 'Four', value: 4, disabled: true },
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

  let optionsAsync: MenuOption[] = $state([]);
  let loading = $state(false);

  let value = $state(3);
</script>

<h1>Examples</h1>

<h2>Basic</h2>

<Preview>
  <SelectField {options} onChange={(value) => console.log('onChange', value)} />
</Preview>

<h2>bind:value</h2>

<Preview>
  <SelectField {options} bind:value />
  <Button onclick={() => (value = 1)}>Pick 1</Button>
  <Button onclick={() => (value = 2)}>Pick 2</Button>
  <Button onclick={() => (value = 3)}>Pick 3</Button>
  <Button onclick={() => (value = 4)}>Pick 4</Button>
</Preview>

<h2>Error</h2>

<Preview>
  <SelectField {options} error />
</Preview>

<h2>Error message</h2>

<Preview>
  <SelectField {options} error="This is a required field" />
</Preview>

<h2>clearable=false</h2>

<Preview>
  <SelectField {options} bind:value clearable={false} />
</Preview>

<h2>clearSearchOnFocus=false</h2>

<Preview>
  <SelectField {options} bind:value clearSearchOnOpen={false} />
</Preview>

<h2>Disabled options</h2>

<Preview>
  <SelectField options={optionsWithDisabled} onChange={(value) => console.log('onChange', value)} />
</Preview>

<h2>Grouped options</h2>

<Preview>
  <SelectField options={optionsWithGroup} onChange={(value) => console.log('onChange', value)} />
</Preview>

<h2>Same option value in different group</h2>

<Preview>
  <SelectField
    options={[
      { label: 'One', value: 1, group: 'Primary' },
      { label: 'Two', value: 2, group: 'Primary' },
      { label: 'One', value: 1, group: 'Additional' },
    ]}
    onChange={(value) => console.log('onChange', value)}
  />
</Preview>

<h2>Object value options</h2>

<Preview>
  <SelectField
    options={[
      { label: 'Empty', value: null },
      { label: 'Foo', value: { id: 1 } },
      { label: 'Bar', value: { id: 2 } },
      { label: 'Baz', value: { id: 3 } },
    ]}
  />
</Preview>

<h2>Options with icons</h2>

<Preview>
  <SelectField options={optionsWithIcon} />
</Preview>

<h2>Many options</h2>

<Preview>
  <SelectField options={manyOptions} clearSearchOnOpen />
</Preview>

<h2>Update options</h2>

<Preview>
  <Toggle>
    {#snippet children({ on, toggle })}
      <SelectField options={on ? newOptions : options} bind:value clearSearchOnOpen />
      <Button onclick={toggle}>Toggle Options</Button>
    {/snippet}
  </Toggle>
</Preview>

<h2>loading</h2>

<Preview>
  <SelectField {options} loading />
</Preview>

<h2>Async options</h2>

<Preview>
  <SelectField value options={optionsAsync} {loading} />
  <Button
    onclick={() => {
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
  <SelectField {options}>
    {#snippet option({ option, index, selected, highlightIndex })}
      <MenuItem
        class={cls(
          index === highlightIndex && 'bg-surface-content/5',
          option === selected && 'font-semibold',
          option.group ? 'px-4' : 'px-2'
        )}
        scrollIntoView={index === highlightIndex}
        disabled={option.disabled}
      >
        <div>
          <div>{option.label}</div>
          <div class="text-sm text-surface-content/50">{option.value}</div>
        </div>
      </MenuItem>
    {/snippet}
  </SelectField>
</Preview>

<h2>option slot with disabled</h2>

<Preview>
  <SelectField options={optionsWithDisabled}>
    {#snippet option({ option, index, selected, highlightIndex })}
      <MenuItem
        class={cls(
          index === highlightIndex && 'bg-surface-content/5',
          option === selected && 'font-semibold',
          option.group ? 'px-4' : 'px-2'
        )}
        scrollIntoView={index === highlightIndex}
        disabled={option.disabled}
      >
        <div>
          <div>{option.label}</div>
          <div class="text-sm text-surface-content/50">{option.value}</div>
        </div>
      </MenuItem>
    {/snippet}
  </SelectField>
</Preview>

<h2>option slot with icon (field icon updates based on selected option)</h2>

<Preview>
  <SelectField options={optionsWithIcon} bind:value activeOptionIcon={true}>
    {#snippet option({ option, index, selected, highlightIndex })}
      <MenuItem
        class={cls(
          index === highlightIndex && 'bg-surface-content/5',
          option === selected && 'font-semibold',
          option.group ? 'px-4' : 'px-2'
        )}
        scrollIntoView={index === highlightIndex}
        icon={{ data: option.icon, class: 'text-danger' }}
      >
        {option.label}
      </MenuItem>
    {/snippet}
  </SelectField>
</Preview>

<h2>option with action</h2>

<Preview>
  <SelectField {options}>
    {#snippet option({ option, index, selected, highlightIndex })}
      <div>
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
            <div onclick={(e) => e.stopPropagation()} role="none">
              <Toggle>
                {#snippet children({ on: open, toggle, toggleOff })}
                  <Button
                    icon={mdiPencil}
                    class="p-1 text-xs text-surface-content/50 z-[9999]"
                    onclick={toggle}
                  />
                  <Drawer {open} onClose={toggleOff} class="w-[400px]">
                    <div class="p-4">
                      Editing option: {option.label}
                    </div>
                    {#snippet actions()}
                      <div>
                        <Button onclick={toggleOff}>Close</Button>
                      </div>
                    {/snippet}
                  </Drawer>
                {/snippet}
              </Toggle>
            </div>
          </div>
        </MenuItem>
      </div>
    {/snippet}
  </SelectField>
</Preview>

<h2>Prepend slot</h2>

<Preview>
  <Toggle>
    {#snippet children({ on: open, toggle })}
      <SelectField {options}>
        {#snippet prepend()}
          <div onclick={(e) => e.stopPropagation()} class="flex items-center" role="none">
            <select
              class="appearance-none bg-surface-content/5 border rounded-full mr-2 px-4"
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
        {/snippet}
      </SelectField>
    {/snippet}
  </Toggle>
</Preview>

<h2>`append` slot (field actions)</h2>

<Preview>
  <Toggle>
    {#snippet children({ on: open, toggle, toggleOff })}
      <SelectField {options}>
        {#snippet append()}
          <span onclick={(e) => e.stopPropagation()} role="none">
            <Button icon={mdiPlus} class="text-surface-content/50 p-2" onclick={toggle} />
          </span>
        {/snippet}
      </SelectField>
      <Form
        initial={newOption()}
        onChange={(value) => {
          options = [value, ...options];
        }}
      >
        {#snippet children({ draft, commit, revert })}
          <Dialog {open} onClose={toggleOff}>
            {#snippet title()}
              <div>Create new option</div>
            {/snippet}
            <div class="px-6 py-3 w-96 grid gap-2">
              <TextField
                label="Label"
                value={draft.label}
                onChange={({ value }) => {
                  draft.label = value;
                }}
                autofocus
              />
              <TextField
                label="Value"
                value={draft.value}
                onChange={({ value }) => {
                  draft.value = value;
                }}
              />
            </div>
            {#snippet actions()}
              <div>
                <Button onclick={() => commit()} color="primary">Add option</Button>
                <Button onclick={() => revert()}>Cancel</Button>
              </div>
            {/snippet}
          </Dialog>
        {/snippet}
      </Form>
    {/snippet}
  </Toggle>
</Preview>

<h2>`actions` slot (menu)</h2>

<Preview>
  <SelectField {options} bind:value>
    {#snippet actions({ hide })}
      <div class="p-2 border-t" onclick={(e) => e.stopPropagation()} role="none">
        <Toggle>
          {#snippet children({ on: open, toggle })}
            <Button icon={mdiPlus} color="primary" onclick={toggle}>New item</Button>
            <Form
              initial={newOption()}
              onChange={(value) => {
                options = [value, ...options];
              }}
            >
              {#snippet children({ draft, current, commit, revert })}
                <Dialog
                  {open}
                  onClose={() => {
                    toggle();
                    hide();
                  }}
                >
                  {#snippet title()}
                    <div>Create new option</div>
                  {/snippet}
                  <div class="px-6 py-3 w-96 grid gap-2">
                    <TextField
                      label="Label"
                      value={current.label}
                      onChange={({ value }) => {
                        draft.label = value;
                      }}
                      autofocus
                    />
                    <TextField
                      label="Value"
                      value={draft.value}
                      onChange={({ value }) => {
                        draft.value = value;
                      }}
                    />
                  </div>
                  {#snippet actions()}
                    <div>
                      <Button onclick={() => commit()} color="primary">Add option</Button>
                      <Button onclick={() => revert()}>Cancel</Button>
                    </div>
                  {/snippet}
                </Dialog>
              {/snippet}
            </Form>
          {/snippet}
        </Toggle>
      </div>
    {/snippet}
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
    {#snippet prepend()}
      <span onclick={(e) => e.stopPropagation()} role="none">
        <select
          class="appearance-none bg-surface-content/5 border rounded-full mr-2 px-4"
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
    {/snippet}
  </SelectField>
</Preview>

<h2>Search</h2>

<Preview>
  <SelectField
    {options}
    search={async () => {
      console.log('search override...');
      await delay(1000);
      console.log('search override done');
    }}
  />
</Preview>

<h2>Placement</h2>

<Preview>
  <SelectField {options} autoPlacement={false} placement="top-start" />
</Preview>

<h2>Stepper</h2>

<Preview>
  <SelectField {options} toggleIcon={null} stepper />
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

<h2>within form</h2>

<Preview>
  <form
    onsubmit={(e) => {
      e.preventDefault();
      // @ts-expect-error
      const formData = new FormData(e.target);
      alert(formData.get('test'));
    }}
  >
    <SelectField {options} name="test" />
    <Button type="submit">Submit</Button>
  </form>
</Preview>
