<script>
	import api from '$lib/components/Input.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Field from '$lib/components/Field.svelte';
  import Input from '$lib/components/Input.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import SectionDivider from '$lib/components/SectionDivider.svelte';
</script>

# Examples

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

## Credit Card

<Preview>
	<Input mask=".... .... .... ...." replace="." accept="\d" />
</Preview>

## MAC Address

<Preview>
	<Input mask="XX:XX:XX:XX:XX:XX" replace="X" accept="[\dA-H]" />
</Preview>

## Alphanumeric

<Preview>
	<Input mask="__-__-__-____" replace="_" accept="\w" />
</Preview>

<SectionDivider>Props</SectionDivider>

## Value

### Formatted

<Preview>
	<Input mask="mm/dd/yyyy" replace="dmyh" value="03/30/1982" />
	<Input mask="+1 (___) ___-____" replace="_" value="+1 (234) 567-8901" />
	<Input mask="+1 (___) ___-____" replace="_" value="(234) 567-8901" />
</Preview>

## Value

### Unformatted

<Preview>
	<Input mask="mm/dd/yyyy" replace="dmyh" value="03301982" />
	<Input mask="+1 (___) ___-____" replace="_" value="2345678901" />
</Preview>

## Value

### Different (but compatible) format

<Preview>
	<Input mask="+1 (___) ___-____" replace="_" value="234-567-8901" />
</Preview>

## Value

### Partial

<Preview>
	<Input mask="mm/dd/yyyy" replace="dmyh" value="03/30" />
	<Input mask="+1 (___) ___-____" replace="_" value="234" />
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

## Placeholder

<Preview>
	<Input placeholder="Please enter your birthday" mask="mm/dd/yyyy" replace="dmyh" />
</Preview>

# API

<ApiDocs {api} />
