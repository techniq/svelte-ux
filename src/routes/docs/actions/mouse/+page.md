<script lang="ts">
  import { spring } from 'svelte/motion';

	import Preview from '$lib/components/Preview.svelte';
	import { longpress, movable } from '$lib/actions/mouse';

  let longpressed = false;

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

<h1>Usage</h1>

```js
import { longpress, movable } from 'svelte-ux';
```

<h2>longpress</h2>

<h3>Dispatch event after element has been pressed for a duration of time</h3>

<Preview>
  <button class="border rounded p-2 text-sm hover:bg-black/5" use:longpress={1000} on:longpress={() => longpressed = !longpressed}>
    Click and hold
  </button>
  {#if longpressed}
    <span class="text-xs text-black/50">Success!  Repeat to hide</span>
  {/if}
</Preview>

<h2>movable</h2>

<h3>Track mouse position changes from mouse down on node to mouse up</h3>

<Preview>
  <div class="h-40">
    <div class="w-10 h-10 bg-red-500 rounded cursor-move"
      use:movable
      on:movestart={() => {
        coords.stiffness = 1;
        coords.damping = 1;
      }}
      on:move={(e) => {
        $coords.x += e.detail.dx;
        $coords.y += e.detail.dy;
      }}
      on:moveend={() => {
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

<h3>With pixel steps / snapping</h3>

<Preview>
  <div class="h-40">
    <div class="w-10 h-10 bg-red-500 rounded cursor-move"
      use:movable={{ step: 25 }}
      on:movestart={() => {
        coords.stiffness = 1;
        coords.damping = 1;
      }}
      on:move={(e) => {
        $coords.x += e.detail.dx;
        $coords.y += e.detail.dy;
      }}
      on:moveend={() => {
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

<h3>With percentage of parent steps / snapping</h3>

<Preview>
  <div class="h-40">
    <div class="w-10 h-10 bg-red-500 rounded cursor-move"
      use:movable={{ stepPercent: .10 }}
      on:movestart={() => {
        coords.stiffness = 1;
        coords.damping = 1;
      }}
      on:move={(e) => {
        $coords.x += e.detail.dx;
        $coords.y += e.detail.dy;
      }}
      on:moveend={() => {
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

<h3>x-axis only</h3>

<Preview>
  <div class="h-40">
    <div class="w-10 h-10 bg-red-500 rounded cursor-move"
      use:movable={{ axis: 'x' }}
      on:movestart={() => {
        coords.stiffness = 1;
        coords.damping = 1;
      }}
      on:move={(e) => {
        $coords.x += e.detail.dx;
        $coords.y += e.detail.dy;
      }}
      on:moveend={() => {
        coords.stiffness = 0.2;
        coords.damping = 0.4;
        coords.set({ x: 0, y: 0 });
      }}
      style="transform:
        translate({$coords.x}px,{$coords.y}px)
        rotate({$coords.x * 0.2}deg)
      "
    />
  </div>
</Preview>
