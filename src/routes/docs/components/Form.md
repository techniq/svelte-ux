---
component: $component
filename: $filename
---

<script lang="ts">
  import api from '$lib/components/Form.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Button from '$lib/components/Form.svelte';
</script>

# Examples

```svelte
<Form
  initial={{ example }}
  on:change={(e) => (example = e.detail.example)}
  let:draft
  let:commit
  let:revert
>
  <TextField label="Name" value={draft.name} on:change={(e) => (draft.name = e.detail.value)} />

  <Button on:click={() => commit()}>Apply</Button>
  <Button on:click={() => revert()}>Cancel</Button>
</Form>
```

# API

<ApiDocs {api} />
