<script>
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

  import api from '$lib/components/TextField.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

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

<!--
  TODO:
    - [ ] Add Playground
 -->

# Examples

## Label

<Preview>
  <div class="grid grid-flow-col gap-2">
    <TextField label="First Name" />
    <TextField label="Last Name" />
  </div>
</Preview>

## Placeholder only

<Preview>
  <div class="grid grid-flow-col gap-2">
    <TextField placeholder="First Name" />
    <TextField placeholder="Last Name" />
  </div>
</Preview>

## Label with placeholder

<Preview>
  <div class="grid grid-flow-col gap-2">
    <TextField
      label="First Name"
      placeholder="Please enter your first name"
    />
    <TextField label="Last Name" placeholder="Please enter your last name" />
  </div>
</Preview>

## Always shrink label

<Preview>
  <div class="grid grid-flow-col gap-2">
    <TextField label="First Name" shrinkLabel />
    <TextField label="Last Name" shrinkLabel />
  </div>
</Preview>

## Always shrink label with placeholder

<Preview>
  <div class="grid grid-flow-col gap-2">
    <TextField
      label="First Name"
      shrinkLabel
      placeholder="Please enter your first name"
    />
    <TextField
      label="Last Name"
      shrinkLabel
      placeholder="Please enter your last name"
    />
  </div>
</Preview>

## Dense

<Preview>
  <div class="grid grid-flow-col gap-2">
    <TextField
      label="First Name"
      placeholder="Please enter your first name"
      dense
    />
    <TextField
      label="Last Name"
      placeholder="Please enter your last name"
      dense
    />
  </div>
</Preview>

## Error

<Preview>
  <TextField
    label="Password"
    placeholder="Please enter your password"
    error="This is a required field"
  />
</Preview>

## Hint

<Preview>
  <TextField label="Password" hint="At least 8 characters" />
</Preview>

## Disabled

<Preview>
  <TextField label="Name" disabled />
</Preview>

## on:change event

<Preview>
  <TextField label="Name" on:change={e => console.log(e.detail)} />
</Preview>

## debounceChange

<Preview>
  <div class="grid gap-2">
    <TextField label="Name" on:change={e => console.log(e.detail)} debounceChange />
    <TextField label="Name" on:change={e => console.log(e.detail)} debounceChange={1000} />
  </div>
</Preview>

## Actions

<Preview>
  <TextField
    label="Name"
    actions={(node) => [
      debounceEvent(node, {
        type: 'input',
        listener: e => { console.log(e.target.value) },
        timeout: 500
      })
    ]}
  />
</Preview>

<SectionDivider>Type</SectionDivider>

## Examples

### Sets input type and add prefix/suffix when appropriate

<Preview>
  <div class="grid grid-flow-col gap-2">
    <TextField label="default" on:change={e => console.log(e.detail)}  />
    <div />
    <TextField label="text" type="text" on:change={e => console.log(e.detail)} />
    <TextField label="password" type="password" on:change={e => console.log(e.detail)}  />
    <TextField label="integer" type="integer" on:change={e => console.log(e.detail)}  />
    <TextField label="decimal" type="decimal" on:change={e => console.log(e.detail)}  />
    <TextField label="currency" type="currency" on:change={e => console.log(e.detail)}  />
    <TextField label="percent" type="percent" on:change={e => console.log(e.detail)}  />
    <TextField label="email" type="email" on:change={e => console.log(e.detail)}  />
    <TextField label="search" type="search" on:change={e => console.log(e.detail)}  />
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

## Append

<Preview>
  <TextField label="Name">
    <div slot="append">
      <Button icon={mdiRefresh} class="text-black/50 p-2" />
    </div>
  </TextField>
</Preview>

## Prefix

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
          <Icon
            path={mdiPercent}
            size="1.1em"
            class="text-black/50 -mt-1 ml-1"
          />
        </div>
      </TextField>
    </Preview>
  </div>
</div>

## Icon with convienent prepend

<Preview>
  <TextField label="Search" icon={mdiMagnify} />
</Preview>

## Icon with convienent append

<Preview>
  <TextField label="Search" iconRight={mdiMagnify} />
</Preview>

## Clearable with convienent append

<Preview>
  <TextField label="Search" clearable />
</Preview>

## Clearable with additional append

<Preview>
  <TextField label="Search" clearable>
    <span slot="append">
      <Button icon={mdiArrowRight} class="text-black/50 p-2" />
    </span>
  </TextField>
</Preview>

## Operators with number

<Preview>
  <TextField label="Search" operators={numberOperators} bind:value />
</Preview>

## Operators with string

<Preview>
  <TextField label="Search" operators={stringOperators} />
</Preview>

## All adornments

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

## Multi Prepend/Append

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

## Multiline

<Preview>
  <TextField label="Comment" multiline />
</Preview>

## Multiline with placeholder

<Preview>
  <TextField label="Comment" multiline placeholder="Please leave a comment" />
</Preview>

## Multiline with autoHeight

<Preview>
  <TextField
    label="Comment"
    multiline
    actions={(node) => [autoHeight(node)]}
  />
</Preview>

<SectionDivider>Mask & Accept</SectionDivider>

## Date

<Preview>
  <TextField mask="mm/dd/yyyy" replace="dmyh" />
</Preview>

## Telephone

<Preview>
	<TextField mask="+1 (___) ___-____" replace="_" />
</Preview>

## `accept` without `mask`

<Preview>
  <TextField label="Zip code" accept={/[0-9]{0,5}/} />
</Preview>

> See [Input](./Input) for more mask examples

<SectionDivider>Style</SectionDivider>

## Rounded

<Preview>
  <TextField label="Search" rounded />
</Preview>

## Rounded with icon

<Preview>
  <TextField label="Search" rounded icon={mdiMagnify} />
</Preview>

## Filled

<Preview>
  <TextField label="Search" filled />
</Preview>

## Rounded and Filled

<Preview>
  <TextField label="Search" rounded filled />
</Preview>

<SectionDivider>Examples</SectionDivider>

## Address bar

<Preview>
  <TextField icon={mdiInformationOutline}>
    <div slot="prefix" class="text-black/50">http://</div>
    <div slot="append">
      <Button icon={mdiStarOutline} class="text-black/50 p-2" />
    </div>
  </TextField>
</Preview>

## Number stepper

<Preview>
  <TextField
    type="integer"
    bind:value={numberValue}
    align="center"
    class="w-24"
  >
    <div slot="prepend" class="flex">
      <Button icon={mdiMinus} on:click={() => (numberValue -= 1)} />
    </div>
    <div slot="append" class="flex">
      <Button icon={mdiPlus} on:click={() => (numberValue += 1)} />
    </div>
  </TextField>
</Preview>

<!-- TODO: Determine why some classes are being overridden (Svelte class:rounded-full interfering?) -->
<!--
## Base with Custom classes
<Preview>
  <TextField
    label="Search"
    base
    class="pl-2 text-red-500 bg-red-500/10 rounded-full"
  />
</Preview>
-->

# API

<ApiDocs {api} />
