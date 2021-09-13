<script>
  import AppBar from '../components/AppBar.svelte';
  import Checkbox from '../components/Checkbox.svelte';
  import Preview from '../components/Preview.svelte';
  import SectionDivider from '../components/SectionDivider.svelte';
</script>

<SectionDivider>Basic</SectionDivider>

## Default

<Preview>
  <Checkbox />
  <Checkbox checked />
</Preview>

## Label

<Preview>
  <Checkbox>Label</Checkbox>
  <Checkbox checked>Label</Checkbox>
</Preview>

## Disabled

<Preview>
  <Checkbox disabled />
  <Checkbox disabled checked />
  <Checkbox disabled>Label</Checkbox>
  <Checkbox disabled checked>Label</Checkbox>
</Preview>

## Indeterminate

<Preview>
  <Checkbox indeterminate />
  <Checkbox indeterminate checked />
</Preview>

## Dense

<Preview>
  <Checkbox dense />
  <Checkbox dense checked />
</Preview>

<SectionDivider>Default</SectionDivider>

## Default

<Preview>
  <Checkbox circle />
  <Checkbox circle checked />
  <Checkbox circle />
</Preview>

## Label

<Preview>
  <Checkbox circle>First</Checkbox>
  <Checkbox circle>Second</Checkbox>
  <Checkbox circle>Third</Checkbox>
</Preview>

## Disabled

<Preview>
  <Checkbox circle disabled />
  <Checkbox circle disabled checked />
</Preview>

## Indeterminate

<Preview>
  <Checkbox circle indeterminate />
  <Checkbox circle indeterminate checked />
</Preview>

## Dense

<Preview>
  <Checkbox circle dense />
  <Checkbox circle dense checked />
</Preview>
