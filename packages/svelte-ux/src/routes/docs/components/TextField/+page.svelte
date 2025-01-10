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

  import { Button, Icon, SectionDivider, TextField, autoHeight, debounceEvent } from 'svelte-ux';

  import Preview from '$lib/components/Preview.svelte';
  import Blockquote from '$docs/Blockquote.svelte';

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

  let value = $state('');
  let numberValue = $state(1);
  let multilineValue = $state('one\ntwo\nthree');
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
  <TextField label="Name" onChange={(value) => console.log(value)} />
</Preview>

<h2>debounceChange</h2>

<Preview>
  <div class="grid gap-2">
    <TextField label="Name" onChange={(value) => console.log(value)} debounceChange />
    <TextField label="Name" onChange={(value) => console.log(value)} debounceChange={1000} />
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
          // @ts-expect-error
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
    <TextField label="default" onChange={(value) => console.log(value)} />
    <TextField label="text" type="text" onChange={(value) => console.log(value)} />
    <TextField label="password" type="password" onChange={(value) => console.log(value)} />
    <TextField label="integer" type="integer" onChange={(value) => console.log(value)} />
    <TextField label="decimal" type="decimal" onChange={(value) => console.log(value)} />
    <TextField label="currency" type="currency" onChange={(value) => console.log(value)} />
    <TextField label="percent" type="percent" onChange={(value) => console.log(value)} />
    <TextField label="email" type="email" onChange={(value) => console.log(value)} />
    <TextField label="search" type="search" onChange={(value) => console.log(value)} />
  </div>
</Preview>

<SectionDivider>Adornments</SectionDivider>

<div class="grid grid-flow-col gap-2">
  <div>
    <div class="text-lg font-semibold mt-8 ml-2">Prepend</div>
    <Preview>
      <TextField label="User Search">
        {#snippet prepend()}
                <div >
            <Icon data={mdiAccountSearch} class="text-surface-content/50 mr-2" />
          </div>
              {/snippet}
      </TextField>
    </Preview>
  </div>

  <div>
    <div class="text-lg font-semibold mt-8 ml-2">Prepend with select</div>
    <Preview>
      <TextField label="Start Date">
        {#snippet prepend()}
                <div >
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
      </TextField>
    </Preview>
  </div>
</div>

<h2>Append</h2>

<Preview>
  <TextField label="Name">
    {#snippet append()}
        <span >
        <Button icon={mdiRefresh} class="text-surface-content/50 p-2" />
      </span>
      {/snippet}
  </TextField>
</Preview>

<h2>Prefix</h2>

<Preview>
  <TextField label="Amount">
    {#snippet prefix()}
        <div >
        <Icon data={mdiCurrencyUsd} size="1.1em" class="text-surface-content/50 -mt-1" />
      </div>
      {/snippet}
  </TextField>
</Preview>

<div class="grid grid-flow-col gap-2">
  <div>
    <div class="text-lg font-semibold mt-8 ml-2">Suffix</div>
    <Preview>
      <TextField label="Weight">
        {#snippet suffix()}
                <div  class="text-surface-content/50">lbs</div>
              {/snippet}
      </TextField>
    </Preview>
  </div>

  <div>
    <div class="text-lg font-semibold mt-8 ml-2">Suffix with align right</div>
    <Preview>
      <TextField label="Ratio" align="right">
        {#snippet suffix()}
                <div >
            <Icon data={mdiPercent} size="1.1em" class="text-surface-content/50 -mt-1 ml-1" />
          </div>
              {/snippet}
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
    {#snippet append()}
        <span >
        <Button icon={mdiArrowRight} class="text-surface-content/50 p-2" />
      </span>
      {/snippet}
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
    {#snippet prepend()}
        <div >
        <Icon data={mdiCreditCardOutline} class="text-surface-content/50 mr-2" />
      </div>
      {/snippet}
    {#snippet append()}
        <div >
        <Button icon={mdiArrowRight} class="text-surface-content/50 p-2" />
      </div>
      {/snippet}
    {#snippet prefix()}
        <div >
        <Icon data={mdiCurrencyUsd} size="1.1em" class="text-surface-content/50 -mt-1" />
      </div>
      {/snippet}
    {#snippet suffix()}
        <div  class="text-surface-content/50">usd</div>
      {/snippet}
  </TextField>
</Preview>

<h2>Multi Prepend/Append</h2>

<Preview>
  <TextField label="Date Range">
    {#snippet prepend()}
        <div >
        <Button icon={mdiChevronLeft} class="text-surface-content/50 p-2" />
        <Icon data={mdiCalendar} class="text-surface-content/50 mr-2" />
      </div>
      {/snippet}
    {#snippet append()}
        <div >
        <Icon data={mdiRefresh} class="text-surface-content/50 mr-2" />
        <Button icon={mdiChevronRight} class="text-surface-content/50 p-2" />
      </div>
      {/snippet}
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
  <TextField
    label="Comment"
    multiline
    bind:value={multilineValue}
    actions={(node) => {
      // @ts-expect-error
      return [autoHeight(node)];
    }}
  />
</Preview>

<h2>Multiline with fixed height</h2>

<Preview>
  <TextField label="Comment" multiline classes={{ input: 'h-[100px]' }} />
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
    {#snippet prefix()}
        <div  class="text-surface-content/50">http://</div>
      {/snippet}
    {#snippet append()}
        <div >
        <Button icon={mdiStarOutline} class="text-surface-content/50 p-2" />
      </div>
      {/snippet}
  </TextField>
</Preview>

<h2>Number stepper</h2>

<Preview>
  <TextField type="integer" bind:value={numberValue} align="center" class="w-24">
    {#snippet prepend()}
        <div  class="flex">
        <Button icon={mdiMinus} onclick={() => (numberValue -= 1)} size="sm" />
      </div>
      {/snippet}
    {#snippet append()}
        <div  class="flex">
        <Button icon={mdiPlus} onclick={() => (numberValue += 1)} size="sm" />
      </div>
      {/snippet}
  </TextField>
</Preview>

<!-- TODO: Determine why some classes are being overridden (Svelte class:rounded-full interfering?) -->
<!--
<h2>Base with Custom classes</h2>
<Preview>
  <TextField
    label="Search"
    base
    class="pl-2 text-danger bg-danger/10 rounded-full"
  />
</Preview>
-->
