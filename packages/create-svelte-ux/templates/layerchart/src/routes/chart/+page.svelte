<script lang="ts">
	import { AreaChart } from 'layerchart';

	import { data } from './data';
</script>

<main class="p-2">
	<h1 class="text-xl font-semibold mb-1">Area example</h1>
	<div class="h-[300px] p-4 border rounded">
		<AreaChart {data} x="date" y="value" />
	</div>
</main>
