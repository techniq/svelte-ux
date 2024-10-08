<script lang="ts">
  import { z } from 'zod';

  import { Button, Form, TextField } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';

  let data = {
    name: 'Sean Lynch',
  };

  const schema = z.object({
    firstName: z.string().nonempty('First name is required').max(10),
    lastName: z.string().nonempty('Last name is required').max(10),
  });

  let schemaData = {
    firstName: '',
    lastName: '',
  };
</script>

<h1>Examples</h1>

<h2>Basic</h2>

<Preview>
  <Form
    initial={data}
    on:change={(e) => (data = e.detail)}
    let:draft
    let:state
    let:commit
    let:revert
    let:revertAll
    let:undo
    let:current
    let:refresh
  >
    <TextField
      label="Name"
      value={draft.name}
      on:change={(e) => {
        draft.name = e.detail.value;
        // Call "refresh" as often as you want "current" updated (on:blur, etc)
        refresh();
      }}
    />
    <Button on:click={() => commit()} disabled={current.name == null}>Apply</Button>
    <Button on:click={() => revert()}>Cancel</Button>
    <Button on:click={() => undo()}>Undo</Button>
    <Button on:click={() => revertAll()}>Reset</Button>
    <div class="mt-2">
      <div>current: {JSON.stringify(current)}</div>
      <div>state: {JSON.stringify(state)}</div>
    </div>
  </Form>
</Preview>

<h2>Form submit button</h2>

<Preview>
  <Form initial={data} on:change={(e) => (data = e.detail)} let:draft let:state>
    <TextField
      label="Name"
      value={draft.name}
      on:change={(e) => {
        draft.name = e.detail.value;
      }}
    />
    <Button type="submit">Apply</Button>
    <Button type="reset">Cancel</Button>
    <div class="mt-2">
      <div>state: {JSON.stringify(state)}</div>
    </div>
  </Form>
</Preview>

<h2>Form submit with method</h2>

<Preview>
  <Form method="post" initial={data} on:change={(e) => (data = e.detail)} let:draft let:state>
    <TextField
      label="Name"
      value={draft.name}
      on:change={(e) => {
        draft.name = e.detail.value;
      }}
    />
    <Button type="submit">Apply</Button>
    <Button type="reset">Cancel</Button>
    <div class="mt-2">
      <div>state: {JSON.stringify(state)}</div>
    </div>
  </Form>
</Preview>

<!-- <h2>Form submit with action</h2>

<Preview>
  <Form action="?/example" initial={data} on:change={(e) => (data = e.detail)} let:draft let:state>
    <TextField
      label="Name"
      value={draft.name}
      on:change={(e) => {
        draft.name = e.detail.value;
      }}
    />
    <Button type="submit">Apply</Button>
    <Button type="reset">Cancel</Button>
    <div class="mt-2">
      <div>state: {JSON.stringify(state)}</div>
    </div>
  </Form>
</Preview> -->

<h2>zod schema</h2>

<Preview>
  <Form
    initial={schemaData}
    {schema}
    on:change={(e) => (schemaData = e.detail)}
    let:draft
    let:state
    let:errors
  >
    <div class="grid gap-2">
      <TextField
        label="First Name"
        value={draft.firstName}
        on:change={(e) => {
          draft.firstName = e.detail.value;
        }}
        error={errors.firstName}
      />
      <TextField
        label="Last Name"
        value={draft.lastName}
        on:change={(e) => {
          draft.lastName = e.detail.value;
        }}
        error={errors.lastName}
      />
    </div>
    <Button type="submit">Apply</Button>
    <Button type="reset">Cancel</Button>
    <div class="mt-2">
      <div>state: {JSON.stringify(state)}</div>
      <div>errors: {JSON.stringify(errors)}</div>
    </div>
  </Form>
</Preview>

<h2>zod schema with server submit</h2>

<Preview>
  <Form
    method="post"
    initial={schemaData}
    {schema}
    on:change={(e) => (schemaData = e.detail)}
    let:draft
    let:state
    let:errors
  >
    <div class="grid gap-2">
      <TextField
        label="First Name"
        value={draft.firstName}
        on:change={(e) => {
          draft.firstName = e.detail.value;
        }}
        error={errors.firstName}
      />
      <TextField
        label="Last Name"
        value={draft.lastName}
        on:change={(e) => {
          draft.lastName = e.detail.value;
        }}
        error={errors.lastName}
      />
    </div>
    <Button type="submit">Apply</Button>
    <Button type="reset">Cancel</Button>
    <div class="mt-2">
      <div>state: {JSON.stringify(state)}</div>
      <div>errors: {JSON.stringify(errors)}</div>
    </div>
  </Form>
</Preview>
