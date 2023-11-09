<script>
	import { page } from '$app/stores';
	import { PAGES } from '$lib/ROUTES';
	import { AppBar, AppLayout, Button, NavItem } from 'svelte-ux';
	import '../app.postcss';
</script>

<AppLayout areas="'header header' 'aside main'">
	<nav slot="nav" class="h-full">
		<!-- Nav menu -->
		<NavItem text="Home" currentUrl={$page.url} path={PAGES._ROOT()} />
		<NavItem text="Customers" currentUrl={$page.url} path={PAGES.customer()} />
	</nav>

	<AppBar title="Your demo" head>
		<div slot="actions">
			<Button href="https://www.google.com">Open Google</Button>
		</div>
	</AppBar>

	<main>
		<slot />
	</main>
</AppLayout>
