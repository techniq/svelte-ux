```svelte
<Toggle let:on={open} let:toggle>
	<Button on:click={toggle}>Show dialog</Button>

	<Dialog {open} on:close={toggle}>
		<!-- render contents -->
	</Dialog>
</Toggle>
```
