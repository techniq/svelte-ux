<script lang="ts">
	export let size = '1.5em';
	export let width = size;
	export let height = size;
	export let color = 'currentColor';
	export let viewBox = '0 0 24 24';
	export let path = '';
</script>

<svg {width} {height} {viewBox} class="inline-block {$$props.class}" style={$$props.style}>
	<path d={path} fill={color} />
</svg>
