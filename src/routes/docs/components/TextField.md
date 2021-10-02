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

  import Button from '$lib/components/Button.svelte';
  import Grid from '$lib/components/Grid.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import SectionDivider from '$lib/components/SectionDivider.svelte';
  import TextField from '$lib/components/TextField.svelte';

  import { autoHeight } from '$lib/actions/input';

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

<SectionDivider>Basic</SectionDivider>

## Label

<Preview>
  <Grid columns={2} gap={8}>
    <TextField label="First Name" />
    <TextField label="Last Name" />
  </Grid>
</Preview>

## Placeholder only

<Preview>
  <Grid columns={2} gap={8}>
    <TextField placeholder="First Name" />
    <TextField placeholder="Last Name" />
  </Grid>
</Preview>

## Label w/ with placeholder

<Preview>
  <Grid columns={2} gap={8}>
    <TextField
      label="First Name"
      placeholder="Please enter your first name"
    />
    <TextField label="Last Name" placeholder="Please enter your last name" />
  </Grid>
</Preview>

## Always shrink label

<Preview>
  <Grid columns={2} gap={8}>
    <TextField label="First Name" shrinkLabel />
    <TextField label="Last Name" shrinkLabel />
  </Grid>
</Preview>

## Always shrink label w/ with placeholder

<Preview>
  <Grid columns={2} gap={8}>
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
  </Grid>
</Preview>

## Dense

<Preview>
  <Grid columns={2} gap={8}>
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
  </Grid>
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

<SectionDivider>Type</SectionDivider>

## Examples

### Sets input type and add prefix/suffix when appropriate

<Preview>
  <Grid columns={2} gap={8}>
    <TextField label="default" />
    <div />
    <TextField label="text" type="text" />
    <TextField label="password" type="password" />
    <TextField label="integer" type="integer" />
    <TextField label="decimal" type="decimal" />
    <TextField label="currency" type="currency" />
    <TextField label="percent" type="percent" />
  </Grid>
</Preview>

<SectionDivider>Adornments</SectionDivider>

<Grid columns={2} gap={8} items="end">
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
</Grid>

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

<Grid columns={2} gap={8} items="end">
  <div>
    <div class="text-lg font-semibold mt-8 ml-2">Suffix</div>
    <Preview>
      <TextField label="Weight">
        <div slot="suffix" class="text-black/50">lbs</div>
      </TextField>
    </Preview>
  </div>

  <div>
    <div class="text-lg font-semibold mt-8 ml-2">Suffix w/ with align right</div>
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
</Grid>

## Icon w/ convienent prepend

<Preview>
  <TextField label="Search" icon={mdiMagnify} />
</Preview>

## Clearable w/ convienent append

<Preview>
  <TextField label="Search" clearable />
</Preview>

## Clearable w/ with additional append

<Preview>
  <TextField label="Search" clearable>
    <span slot="append">
      <Button icon={mdiArrowRight} class="text-black/50 p-2" />
    </span>
  </TextField>
</Preview>

## Operators w/ number

<Preview>
  <TextField label="Search" operators={numberOperators} bind:value />
</Preview>

## Operators w/ string

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
    <div slot="prepend">
      <Button icon={mdiChevronLeft} class="text-black/50 p-2" />
      <Icon path={mdiCalendar} class="text-black/50 mr-2" />
    </div>
    <div slot="append">
      <Icon path={mdiRefresh} class="text-black/50 mr-2" />
      <Button icon={mdiChevronRight} class="text-black/50 p-2" />
    </div>
  </TextField>
</Preview>

<SectionDivider>Type</SectionDivider>

## Multiline

<Preview>
  <TextField label="Comment" multiline />
</Preview>

## Multiline w/ with placeholder

<Preview>
  <TextField label="Comment" multiline placeholder="Please leave a comment" />
</Preview>

## Multiline w/ with autoHeight

<Preview>
  <TextField
    label="Comment"
    multiline
    actions={(node) => [autoHeight(node)]}
  />
</Preview>

<SectionDivider>Style</SectionDivider>

## Rounded

<Preview>
  <TextField label="Search" rounded />
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
    <div slot="prepend">
      <Button icon={mdiMinus} on:click={() => (numberValue -= 1)} />
    </div>
    <div slot="append">
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
