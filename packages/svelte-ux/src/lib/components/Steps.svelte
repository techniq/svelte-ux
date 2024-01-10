<script lang="ts">
  export let items: any[];
  export let lineGap = 4;

  // binded
  let circleSize = 0;
</script>

<ol
  style:--circleSize={circleSize}
  style:--lineTop="{circleSize + lineGap}px"
  style:--lineBottom="{lineGap}px"
  style:--lineOffset="{circleSize / 2}px"
>
  {#each items as item, index}
    <li class="step relative flex gap-4 pb-10">
      <div bind:clientWidth={circleSize}>
        <slot name="marker" {item} />
      </div>

      {#if index < items.length - 1}
        <div
          class="line absolute top-[var(--lineTop)] bottom-[var(--lineBottom)] left-0 w-[2px] translate-x-[var(--lineOffset)] bg-surface-content/20"
        />
      {/if}

      <slot name="item" {item} />
    </li>
  {/each}
</ol>
