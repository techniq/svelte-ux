<script lang="ts">
  import { z } from 'zod';

  import { Button, Form, TextField } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';

  let data = $state({
    name: 'Sean Lynch',
  });

  const schema = z.object({
    firstName: z.string().nonempty('First name is required').max(10),
    lastName: z.string().nonempty('Last name is required').max(10),
  });

  let schemaData = $state({
    firstName: '',
    lastName: '',
  });
</script>

<h1>Examples</h1>

<h2>Basic</h2>

<Preview>
  <Form initial={data} onChange={(value) => (data = value)}>
    {#snippet children({ draft, state, commit, revert, revertAll, undo, current, refresh })}
      <TextField
        label="Name"
        value={draft.name}
        onChange={({ value }) => {
          draft.name = value;
          // Call "refresh" as often as you want "current" updated (on:blur, etc)
          refresh();
        }}
      />
      <Button onclick={() => commit()} disabled={current.name == null}>Apply</Button>
      <Button onclick={() => revert()}>Cancel</Button>
      <Button onclick={() => undo()}>Undo</Button>
      <Button onclick={() => revertAll()}>Reset</Button>
      <div class="mt-2">
        <div>current: {JSON.stringify(current)}</div>
        <div>state: {JSON.stringify(state)}</div>
      </div>
    {/snippet}
  </Form>
</Preview>

<h2>Form submit button</h2>

<Preview>
  <Form initial={data} onChange={(value) => (data = value)}>
    {#snippet children({ draft, state })}
      <TextField
        label="Name"
        value={draft.name}
        onChange={({ value }) => {
          draft.name = value;
        }}
      />
      <Button type="submit">Apply</Button>
      <Button type="reset">Cancel</Button>
      <div class="mt-2">
        <div>state: {JSON.stringify(state)}</div>
      </div>
    {/snippet}
  </Form>
</Preview>

<h2>Form submit with method</h2>

<Preview>
  <Form method="post" initial={data} onChange={(value) => (data = value)}>
    {#snippet children({ draft, state })}
      <TextField
        label="Name"
        value={draft.name}
        onChange={({ value }) => {
          draft.name = value;
        }}
      />
      <Button type="submit">Apply</Button>
      <Button type="reset">Cancel</Button>
      <div class="mt-2">
        <div>state: {JSON.stringify(state)}</div>
      </div>
    {/snippet}
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
  <Form initial={schemaData} {schema} onChange={(value) => (schemaData = value)}>
    {#snippet children({ draft, state, errors })}
      <div class="grid gap-2">
        <TextField
          label="First Name"
          value={draft.firstName}
          onChange={({ value }) => {
            draft.firstName = value;
          }}
          error={errors.firstName}
        />
        <TextField
          label="Last Name"
          value={draft.lastName}
          onChange={({ value }) => {
            draft.lastName = value;
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
    {/snippet}
  </Form>
</Preview>

<h2>zod schema with server submit</h2>

<Preview>
  <Form method="post" initial={schemaData} {schema} onChange={(value) => (schemaData = value)}>
    {#snippet children({ draft, state, errors })}
      <div class="grid gap-2">
        <TextField
          label="First Name"
          value={draft.firstName}
          onChange={({ value }) => {
            draft.firstName = value;
          }}
          error={errors.firstName}
        />
        <TextField
          label="Last Name"
          value={draft.lastName}
          onChange={({ value }) => {
            draft.lastName = value;
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
    {/snippet}
  </Form>
</Preview>
