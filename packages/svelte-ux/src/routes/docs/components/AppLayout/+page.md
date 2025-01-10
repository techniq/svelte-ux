<h1>Example</h1>

<h2>Basic (full height nav)</h2>

```svelte
<AppLayout>
  {#snippet nav()}
    <!-- Nav menu -->
  {/snippet}

  <AppBar title="Example">
    {#snippet actions()}
      <div>
        <!-- App actions -->
      </div>
    {/snippet}
  </AppBar>

  <main>
    {@render children?.()}
  </main>
</AppLayout>
```
