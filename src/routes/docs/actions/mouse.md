---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script lang="ts">
  import { spring } from 'svelte/motion';

	import Preview from '$lib/components/Preview.svelte';
	import { pannable, longpress } from '$lib/actions/mouse';

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

## longpress

### Dispatch event after element has been pressed for a duration of time

<Preview>
  <button class="border rounded p-2 text-sm hover:bg-black/5" use:longpress={1000} on:longpress={() => longpressed = !longpressed}>
    Click and hold
  </button>
  {#if longpressed}
    <span class="text-xs text-black/50">Success!  Repeat to hide</span>
  {/if}
</Preview>

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

### With pixel steps / snapping

<Preview>
  <div class="h-40">
    <div class="w-10 h-10 bg-red-500 rounded cursor-move"
      use:pannable={{ step: 25 }}
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

### With percentage of parent steps / snapping

<Preview>
  <div class="h-40">
    <div class="w-10 h-10 bg-red-500 rounded cursor-move"
      use:pannable={{ stepPercent: .10 }}
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

### x-axis only

<Preview>
  <div class="h-40">
    <div class="w-10 h-10 bg-red-500 rounded cursor-move"
      use:pannable={{ axis: 'x' }}
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
        rotate({$coords.x * 0.2}deg)
      "
    />
  </div>
</Preview>
