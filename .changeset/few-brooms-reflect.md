---
"svelte-ux": minor
---

Breaking change: Simplify Table ordering by passing instance of `tableOrderStore` instead of `orderBy`, `orderDirection`, and handling `on:headerClick`.  Also fixes display of clickable headers when order is not used, and improves sort arrow size.

## Before

```svelte
<script>
  const order = tableOrderStore();
</script>

<Table
  orderBy={$order.by}
  orderDirection={$order.direction}
  on:headerClick={order.onHeaderClick}
/>
```

## After

```svelte
<script>
  const order = tableOrderStore();
</script>

<Table {order} />
```