---
'svelte-ux': minor
---

Breaking change: `tableOrderStore` now takes in the full event with `e.detail.column` instead of just `column` to simplify usage.

## Before

```svelte
<Table on:headerClick={(e) => tableOrder.onHeaderClick(e.detail.column)} />
```

## After

```svelte
<Table on:headerClick={tableOrder.onHeaderClick} />
```
