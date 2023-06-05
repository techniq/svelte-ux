<script lang="ts">
  import { cssVars } from '../actions/cssVars';

  export let items: any[];

  export let lineGap = 4;

  // binded
  let circleSize = 0;

  $: styleVars = {
    circleSize,
    lineTop: `${circleSize + lineGap}px`,
    lineBottom: `${lineGap}px`,
    lineOffset: `${circleSize / 2}px`,
  };
</script>

<ol use:cssVars={styleVars}>
  {#each items as item, index}
    <li class="step relative flex gap-4 pb-10">
      <div bind:clientWidth={circleSize}>
        <slot name="marker" {item} />
      </div>

      {#if index < items.length - 1}
        <div
          class="line absolute top-[var(--lineTop)] bottom-[var(--lineBottom)] left-0 w-[2px] translate-x-[var(--lineOffset)] bg-gray-300"
        />
      {/if}

      <slot name="item" {item} />
    </li>
  {/each}
</ol>
