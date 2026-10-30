---
'svelte-ux': patch
---

fix(SelectField): Only assign `value`, `selected`, and `searchText` when they change, and treat empty values (`''`, `null`, `undefined`) as equal. Prevents `effect_update_depth_exceeded` loops under Svelte 5 when several SelectFields bind into the same object (`bind:value={obj.field}`) or receive a new `options` array on each render, and stops `change` firing on mount for an empty value with no matching option.
