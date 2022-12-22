---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script lang="ts">
  import api from '$lib/components/Form.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Button from '$lib/components/Button.svelte';
  import Form from '$lib/components/Form.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import TextField from '$lib/components/TextField.svelte';

  let data = {
    name: 'Sean Lynch'
  }
</script>

# Examples

## Basic

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
    <TextField label="Name" value={draft.name} on:change={(e) => {
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

## Form submit button

<Preview>
  <Form
    initial={data}
    on:change={(e) => (data = e.detail)}
    let:draft
    let:state
  >
    <TextField label="Name" value={draft.name} on:change={(e) => {
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

# API

<ApiDocs {api} />
