<script lang="ts">
  import {
    mdiCurrencyUsd,
    mdiPercent,
    mdiAccountSearch,
    mdiCreditCardOutline,
    mdiArrowRight,
    mdiRefresh,
    mdiMagnify,
    mdiStarOutline,
    mdiInformationOutline,
    mdiChevronLeft,
    mdiChevronRight,
    mdiCalendar,
    mdiMinus,
    mdiPlus,
  } from '@mdi/js';

  import Blockquote from '$docs/Blockquote.svelte';
  import Button from '$lib/components/Button.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import SectionDivider from '$lib/components/SectionDivider.svelte';
  import TextField from '$lib/components/TextField.svelte';

  import { autoHeight, debounceEvent } from '$lib/actions/input';

  const numberOperators = [
    { label: '=', value: 'equal' },
    { label: '!=', value: 'notEqual' },
    { label: '>', value: 'greaterThan' },
    { label: '>=', value: 'greaterThanOrEqual' },
    { label: '<', value: 'lessThan' },
    { label: '<=', value: 'lessThanOrEqual' },
  ];

  const stringOperators = [
    { label: 'equals', value: 'equal' },
    { label: 'starts', value: 'startsWith' },
    { label: 'ends', value: 'endsWith' },
    { label: 'contains', value: 'contains' },
  ];

  let value = '';
  let numberValue = 1;
</script>

<h1>Examples</h1>

<h2>Label only</h2>

<Preview>
  <div class="grid grid-flow-col gap-2">
    <TextField label="First Name" />
    <TextField label="Last Name" />
  </div>
</Preview>

<h2>Placeholder only</h2>

<Preview>
  <div class="grid grid-flow-col gap-2">
    <TextField placeholder="First Name" />
    <TextField placeholder="Last Name" />
  </div>
</Preview>

<h2>Label with placeholder</h2>

<Preview>
  <div class="grid grid-flow-col gap-2">
    <TextField label="First Name" placeholder="Please enter your first name" />
    <TextField label="Last Name" placeholder="Please enter your last name" />
  </div>
</Preview>

<h2>Error</h2>

<Preview>
  <TextField label="Password" placeholder="Please enter your password" error />
</Preview>

<h2>Error message</h2>

<Preview>
  <TextField
    label="Password"
    placeholder="Please enter your password"
    error="This is a required field"
  />
</Preview>

<h2>Dense inline label</h2>

<Preview>
  <div class="grid grid-flow-col gap-2">
    <TextField label="First Name" placeholder="Please enter your first name" dense />
    <TextField label="Last Name" placeholder="Please enter your last name" dense />
  </div>
</Preview>

<h2>Float label</h2>

<Preview>
  <div class="grid grid-flow-col gap-2">
    <TextField label="First Name" labelPlacement="float" />
    <TextField label="Last Name" labelPlacement="float" />
  </div>
</Preview>

<h2>Float label with placeholder</h2>

<Preview>
  <div class="grid grid-flow-col gap-2">
    <TextField
      label="First Name"
      labelPlacement="float"
      placeholder="Please enter your first name"
    />
    <TextField label="Last Name" labelPlacement="float" placeholder="Please enter your last name" />
  </div>
</Preview>

<h2>Top label</h2>

<Preview>
  <div class="grid grid-flow-col gap-2">
    <TextField label="First Name" labelPlacement="top" />
    <TextField label="Last Name" labelPlacement="top" />
  </div>
</Preview>

<h2>Top label with placeholder</h2>

<Preview>
  <div class="grid grid-flow-col gap-2">
    <TextField label="First Name" labelPlacement="top" placeholder="Please enter your first name" />
    <TextField label="Last Name" labelPlacement="top" placeholder="Please enter your last name" />
  </div>
</Preview>

<h2>Top label with error</h2>

<Preview>
  <TextField
    label="Password"
    labelPlacement="top"
    placeholder="Please enter your password"
    error="This is a required field"
  />
</Preview>

<h2>Left label</h2>

<Preview>
  <div class="grid grid-flow-col gap-2">
    <TextField label="First Name" labelPlacement="left" />
    <TextField label="Last Name" labelPlacement="left" />
  </div>
</Preview>

<h2>Left label with placeholder</h2>

<Preview>
  <div class="grid grid-flow-col gap-2">
    <TextField
      label="First Name"
      labelPlacement="left"
      placeholder="Please enter your first name"
    />
    <TextField label="Last Name" labelPlacement="left" placeholder="Please enter your last name" />
  </div>
</Preview>

<h2>Left label with error</h2>

<Preview>
  <TextField
    label="Password"
    labelPlacement="left"
    placeholder="Please enter your password"
    error="This is a required field"
  />
</Preview>

<h2>Hint</h2>

<Preview>
  <TextField label="Password" hint="At least 8 characters" />
</Preview>

<h2>Disabled</h2>

<Preview>
  <TextField label="Name" disabled />
</Preview>

<h2>on:change event</h2>

<Preview>
  <TextField label="Name" on:change={(e) => console.log(e.detail)} />
</Preview>

<h2>debounceChange</h2>

<Preview>
  <div class="grid gap-2">
    <TextField label="Name" on:change={(e) => console.log(e.detail)} debounceChange />
    <TextField label="Name" on:change={(e) => console.log(e.detail)} debounceChange={1000} />
  </div>
</Preview>

<h2>Actions</h2>

<Preview>
  <TextField
    label="Name"
    actions={(node) => [
      debounceEvent(node, {
        type: 'input',
        listener: (e) => {
          console.log(e.target.value);
        },
        timeout: 500,
      }),
    ]}
  />
</Preview>

<SectionDivider>Type</SectionDivider>

<h2>Input types</h2>

<h3>Sets input type and add prefix/suffix when appropriate</h3>

<Preview>
  <div class="grid grid-cols-3 gap-2">
    <TextField label="default" on:change={(e) => console.log(e.detail)} />
    <TextField label="text" type="text" on:change={(e) => console.log(e.detail)} />
    <TextField label="password" type="password" on:change={(e) => console.log(e.detail)} />
    <TextField label="integer" type="integer" on:change={(e) => console.log(e.detail)} />
    <TextField label="decimal" type="decimal" on:change={(e) => console.log(e.detail)} />
    <TextField label="currency" type="currency" on:change={(e) => console.log(e.detail)} />
    <TextField label="percent" type="percent" on:change={(e) => console.log(e.detail)} />
    <TextField label="email" type="email" on:change={(e) => console.log(e.detail)} />
    <TextField label="search" type="search" on:change={(e) => console.log(e.detail)} />
  </div>
</Preview>

<SectionDivider>Adornments</SectionDivider>

<div class="grid grid-flow-col gap-2">
  <div>
    <div class="text-lg font-semibold mt-8 ml-2">Prepend</div>
    <Preview>
      <TextField label="User Search">
        <div slot="prepend">
          <Icon path={mdiAccountSearch} class="text-black/50 mr-2" />
        </div>
      </TextField>
    </Preview>
  </div>

  <div>
    <div class="text-lg font-semibold mt-8 ml-2">Prepend with select</div>
    <Preview>
      <TextField label="Start Date">
        <div slot="prepend">
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
      </TextField>
    </Preview>
  </div>
</div>

<h2>Append</h2>

<Preview>
  <TextField label="Name">
    <span slot="append">
      <Button icon={mdiRefresh} class="text-black/50 p-2" />
    </span>
  </TextField>
</Preview>

<h2>Prefix</h2>

<Preview>
  <TextField label="Amount">
    <div slot="prefix">
      <Icon path={mdiCurrencyUsd} size="1.1em" class="text-black/50 -mt-1" />
    </div>
  </TextField>
</Preview>

<div class="grid grid-flow-col gap-2">
  <div>
    <div class="text-lg font-semibold mt-8 ml-2">Suffix</div>
    <Preview>
      <TextField label="Weight">
        <div slot="suffix" class="text-black/50">lbs</div>
      </TextField>
    </Preview>
  </div>

  <div>
    <div class="text-lg font-semibold mt-8 ml-2">Suffix with align right</div>
    <Preview>
      <TextField label="Ratio" align="right">
        <div slot="suffix">
          <Icon path={mdiPercent} size="1.1em" class="text-black/50 -mt-1 ml-1" />
        </div>
      </TextField>
    </Preview>
  </div>
</div>

<h2>Icon with convienent prepend</h2>

<Preview>
  <TextField label="Search" icon={mdiMagnify} />
</Preview>

<h2>Icon with convienent append</h2>

<Preview>
  <TextField label="Search" iconRight={mdiMagnify} />
</Preview>

<h2>Clearable with convienent append</h2>

<Preview>
  <TextField label="Search" clearable />
</Preview>

<h2>Clearable with additional append</h2>

<Preview>
  <TextField label="Search" clearable>
    <span slot="append">
      <Button icon={mdiArrowRight} class="text-black/50 p-2" />
    </span>
  </TextField>
</Preview>

<h2>Operators with number</h2>

<Preview>
  <TextField label="Search" operators={numberOperators} bind:value />
</Preview>

<h2>Operators with string</h2>

<Preview>
  <TextField label="Search" operators={stringOperators} />
</Preview>

<h2>All adornments</h2>

<Preview>
  <TextField label="Transfer amount">
    <div slot="prepend">
      <Icon path={mdiCreditCardOutline} class="text-black/50 mr-2" />
    </div>
    <div slot="append">
      <Button icon={mdiArrowRight} class="text-black/50 p-2" />
    </div>
    <div slot="prefix">
      <Icon path={mdiCurrencyUsd} size="1.1em" class="text-black/50 -mt-1" />
    </div>
    <div slot="suffix" class="text-black/50">usd</div>
  </TextField>
</Preview>

<h2>Multi Prepend/Append</h2>

<Preview>
  <TextField label="Date Range">
    <div slot="prepend" class="flex items-center">
      <Button icon={mdiChevronLeft} class="text-black/50 p-2" />
      <Icon path={mdiCalendar} class="text-black/50 mr-2" />
    </div>
    <div slot="append" class="flex items-center">
      <Icon path={mdiRefresh} class="text-black/50 mr-2" />
      <Button icon={mdiChevronRight} class="text-black/50 p-2" />
    </div>
  </TextField>
</Preview>

<SectionDivider>Multiline</SectionDivider>

<h2>Multiline</h2>

<Preview>
  <TextField label="Comment" multiline />
</Preview>

<h2>Multiline with placeholder</h2>

<Preview>
  <TextField label="Comment" multiline placeholder="Please leave a comment" />
</Preview>

<h2>Multiline with autoHeight</h2>

<Preview>
  <TextField label="Comment" multiline actions={(node) => [autoHeight(node)]} />
</Preview>

<SectionDivider>Mask & Accept</SectionDivider>

<h2>Date</h2>

<Preview>
  <TextField mask="mm/dd/yyyy" replace="dmyh" />
</Preview>

<h2>Telephone</h2>

<Preview>
  <TextField mask="+1 (___) ___-____" replace="_" />
</Preview>

<h2>`accept` without `mask`</h2>

<Preview>
  <TextField label="Zip code" accept={/[0-9]{0,5}/} />
</Preview>

<Blockquote>See <a href="./Input" class="font-semibold">Input</a> for more mask examples</Blockquote
>

<SectionDivider>Style</SectionDivider>

<h2>Rounded</h2>

<Preview>
  <TextField label="Search" rounded />
</Preview>

<h2>Rounded with icon</h2>

<Preview>
  <TextField label="Search" rounded icon={mdiMagnify} />
</Preview>

<SectionDivider>Examples</SectionDivider>

<h2>Address bar</h2>

<Preview>
  <TextField icon={mdiInformationOutline}>
    <div slot="prefix" class="text-black/50">http://</div>
    <div slot="append">
      <Button icon={mdiStarOutline} class="text-black/50 p-2" />
    </div>
  </TextField>
</Preview>

<h2>Number stepper</h2>

<Preview>
  <TextField type="integer" bind:value={numberValue} align="center" class="w-24">
    <div slot="prepend" class="flex">
      <Button icon={mdiMinus} on:click={() => (numberValue -= 1)} size="sm" />
    </div>
    <div slot="append" class="flex">
      <Button icon={mdiPlus} on:click={() => (numberValue += 1)} size="sm" />
    </div>
  </TextField>
</Preview>

<!-- TODO: Determine why some classes are being overridden (Svelte class:rounded-full interfering?) -->
<!--
<h2>Base with Custom classes</h2>
<Preview>
  <TextField
    label="Search"
    base
    class="pl-2 text-red-500 bg-red-500/10 rounded-full"
  />
</Preview>
-->