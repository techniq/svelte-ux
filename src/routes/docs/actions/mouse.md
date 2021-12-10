<script lang="ts">
  import { spring } from 'svelte/motion';

	import Preview from '$lib/components/Preview.svelte';
	import { pannable } from '$lib/actions/mouse';

	const coords = spring({ x: 0, y: 0 }, {
		stiffness: 0.2,
		damping: 0.4
	});

	function handlePanEnd(event) {
		coords.stiffness = 0.2;
		coords.damping = 0.4;
		coords.set({ x: 0, y: 0 });
	}
</script>

## pannable

### Track mouse position changes from mouse down on node to mouse up

<Preview>
  <div class="h-40">
    <div class="w-10 h-10 bg-red-500 rounded cursor-move"
      use:pannable
      on:panstart={() => {
        coords.stiffness = 1;
        coords.damping = 1;
      }}
      on:panmove={(e) => {
        $coords.x += e.detail.dx;
        $coords.y += e.detail.dy;
      }}
      on:panend={() => {
        coords.stiffness = 0.2;
        coords.damping = 0.4;
        coords.set({ x: 0, y: 0 });
      }}
      style="transform:
        translate({$coords.x}px,{$coords.y}px)
        rotate({$coords.x * 0.2}deg)"
    />
  </div>
</Preview>
