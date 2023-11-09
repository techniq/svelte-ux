<script>
	import { PAGES } from '$lib/ROUTES';
	import { Button } from 'svelte-ux';
</script>

<h2>Customers...</h2>

<Button href={PAGES.customer_id({ id: 3 })}>number 3</Button>
