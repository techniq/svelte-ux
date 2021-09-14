<script lang="ts">
	import clsx from 'clsx';
</script>

<div
	class={clsx(
		'grid place-items-center',
		'h-16 bg-black/10 shadow-inner ring-1 ring-black/30',
		'text-black/50 text-xs tracking-wider',
		'border rounded',
		$$props.class
	)}
>
	<slot />
</div>
