<script>
	import api from '$lib/components/Input.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Field from '$lib/components/Field.svelte';
  import Input from '$lib/components/Input.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import SectionDivider from '$lib/components/SectionDivider.svelte';
</script>

<h1>Examples</h1>

<h2>Date</h2>

<Preview>
	<Input mask="mm/dd/yyyy" replace="dmyh" />
</Preview>

<h2>Date time</h2>

<Preview>
	<Input mask="mm/dd/yyyy hh:mm" replace="dmyh" />
</Preview>

<h2>Telephone</h2>

<Preview>
	<Input mask="+1 (___) ___-____" replace="_" />
</Preview>

<h2>Credit Card</h2>

<Preview>
	<Input mask=".... .... .... ...." replace="." accept="\d" />
</Preview>

<h2>MAC Address</h2>

<Preview>
	<Input mask="XX:XX:XX:XX:XX:XX" replace="X" accept="[\dA-H]" />
</Preview>

<h2>Alphanumeric</h2>

<Preview>
	<Input mask="__-__-__-____" replace="_" accept="\w" />
</Preview>

<SectionDivider>Props</SectionDivider>

<h2>Value</h2>

<h3>Formatted</h3>

<Preview>
	<Input mask="mm/dd/yyyy" replace="dmyh" value="03/30/1982" />
	<Input mask="+1 (___) ___-____" replace="_" value="+1 (234) 567-8901" />
	<Input mask="+1 (___) ___-____" replace="_" value="(234) 567-8901" />
</Preview>

<h2>Value</h2>

<h3>Unformatted</h3>

<Preview>
	<Input mask="mm/dd/yyyy" replace="dmyh" value="03301982" />
	<Input mask="+1 (___) ___-____" replace="_" value="2345678901" />
</Preview>

<h2>Value</h2>

<h3>Different (but compatible) format</h3>

<Preview>
	<Input mask="+1 (___) ___-____" replace="_" value="234-567-8901" />
</Preview>

<h2>Value</h2>

<h3>Partial</h3>

<Preview>
	<Input mask="mm/dd/yyyy" replace="dmyh" value="03/30" />
	<Input mask="+1 (___) ___-____" replace="_" value="234" />
</Preview>

<h2>Change event</h2>

<Preview>
  <Input
    mask="mm/dd/yyyy"
    replace="dmyh"
    on:change={e => console.log(e.detail)}
  />
</Preview>

<h2>With Field</h2>

<Preview>
  <Field label="Birth Date" let:id>
    <Input {id} mask="mm/dd/yyyy" replace="dmyh" />
  </Field>
</Preview>

<h2>Placeholder</h2>

<Preview>
	<Input placeholder="Please enter your birthday" mask="mm/dd/yyyy" replace="dmyh" />
</Preview>

<h1>API</h1>

<ApiDocs {api} />
