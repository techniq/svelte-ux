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
