<script>
  import Field from '$lib/components/Field.svelte';
  import Input from '$lib/components/Input.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import SectionDivider from '$lib/components/SectionDivider.svelte';
</script>

<SectionDivider>Mask examples</SectionDivider>

## Date

<Preview>
	<Input mask="mm/dd/yyyy" replace="dmyh" />
</Preview>

## Date time

<Preview>
	<Input mask="mm/dd/yyyy hh:mm" replace="dmyh" />
</Preview>

## Telephone

<Preview>
	<Input mask="+1 (___) ___-____" replace="_" />
</Preview>

## MAC Address

<Preview>
	<Input mask="XX:XX:XX:XX:XX:XX" replace="X" accept="[\dA-H]" />
</Preview>

## Alphanumeric

<Preview>
	<Input mask="__-__-__-____" replace="_" accept="\w" />
</Preview>

## Credit Card

<Preview>
	<Input mask=".... .... .... ...." replace="." accept="\d" />
</Preview>

<SectionDivider>Props</SectionDivider>

## Value

<Preview>
	<Input mask="mm/dd/yyyy" replace="dmyh" value="03/30/1982" />
</Preview>

## Change event

<Preview>
  <Input
    mask="mm/dd/yyyy"
    replace="dmyh"
    on:change={e => console.log(e.detail)}
  />
</Preview>

## With Field

<Preview>
  <Field label="Birth Date" let:id>
    <Input {id} mask="mm/dd/yyyy" replace="dmyh" />
  </Field>
</Preview>
