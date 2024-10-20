<script lang="ts">
  import { blur } from 'svelte/transition';
  import { circIn, circOut } from 'svelte/easing';

  import { Gooey, RangeField } from 'svelte-ux';
  import { cls } from '@layerstack/tailwind';
  import { mouseCoords } from '@layerstack/svelte-actions';
  import { timerStore } from '@layerstack/svelte-stores';

  import Preview from '$lib/components/Preview.svelte';
  import Blockquote from '$docs/Blockquote.svelte';

  export let gooeyBlur = 5;

  const indexTimer = timerStore({
    initial: 0,
    delay: 1400,
    onTick: (value) => (value ?? 0) + 1,
  });
</script>

<h1>Examples</h1>

<h2>Morphing text</h2>

<Preview class="text-center">
  <Gooey blur={4} alphaPixel={255} alphaShift={-144}>
    {@const words = ['Why', 'is', 'this', 'so', 'satisfying', 'to', 'watch?']}
    <div
      class={cls('grid grid-stack place-items-center', 'w-[500px] text-8xl text-center font-bold')}
    >
      {#key $indexTimer}
        <span
          in:blur={{ amount: '10px', duration: 1000, easing: circOut }}
          out:blur={{ amount: '100px', duration: 1000, easing: circIn }}
        >
          {words[($indexTimer ?? 0) % words.length]}
        </span>
      {/key}
    </div>
  </Gooey>
</Preview>

<Blockquote>
  Inspiration: <a href="https://codepen.io/Valgo/pen/PowZaNY" target="_blank"> Text Morph </a>
  by
  <a href="https://codepen.io/Valgo" target="_blank">Valgo</a>
</Blockquote>

<h2>Morphing emoji</h2>

<Preview class="text-center">
  <Gooey blur={4} alphaPixel={255} alphaShift={-144} composite="atop">
    {@const words = ['🚀', '🍩', '🍔', '🥨', '🥓']}
    <div
      class={cls('grid grid-stack place-items-center', 'w-[500px] text-8xl text-center font-bold')}
    >
      {#key $indexTimer}
        <span
          in:blur={{ amount: '10px', duration: 1000, easing: circOut }}
          out:blur={{ amount: '100px', duration: 1000, easing: circIn }}
        >
          {words[($indexTimer ?? 0) % words.length]}
        </span>
      {/key}
    </div>
  </Gooey>
</Preview>

<div class="grid grid-cols-[1fr,auto] gap-2 items-end">
  <h2>Rounded text background</h2>
  <RangeField label="blur: " labelPlacement="left" bind:value={gooeyBlur} max={13} class="mb-1" />
</div>

<Preview class="bg-primary">
  <Gooey blur={gooeyBlur} alphaPixel={19} alphaShift={-9} composite="atop">
    <div
      contenteditable="true"
      class="inline bg-surface-100 box-decoration-clone text-xl leading-7 px-2 py-1 outline-none"
    >
      This is an example of a simple headline<br />or text with rounded corners<br />using a gooey
      SVG filter.<br />You can edit me!
    </div>
  </Gooey>
</Preview>

<Blockquote>
  Inspiration: <a href="https://codepen.io/ines/pen/NXbmRO" target="_blank">
    Gooey text background with SVG filters
  </a>
  by
  <a href="https://codepen.io/ines" target="_blank">Ines Montani</a>
</Blockquote>

<div class="grid grid-cols-[1fr,auto] gap-2 items-end">
  <h2>Orbiting glowing dot</h2>
  <RangeField label="blur: " labelPlacement="left" bind:value={gooeyBlur} max={13} class="mb-1" />
</div>

<Preview class="bg-gradient-radial from-neutral-600 to-neutral-800">
  <div class="grid grid-stack place-items-center" style:--orbit-radius="75px">
    <Gooey blur={gooeyBlur} alphaPixel={19} alphaShift={-9}>
      <div class="w-[300px] h-[300px] grid grid-stack place-items-center">
        <!-- Fixed dots -->
        {#each { length: 8 } as _, i}
          <div
            class="w-[30px] h-[30px] bg-sky-500 rounded-full"
            style:transform="rotate({(360 / 8) * i}deg) translateX(var(--orbit-radius))"
          ></div>
        {/each}

        <!-- Moving dot -->
        <div class="orbit w-[26px] h-[26px] bg-cyan-300 rounded-full"></div>
      </div>
    </Gooey>
    <!-- glow -->
    <div class="orbit w-[26px] h-[26px] bg-cyan-300 rounded-full blur-lg"></div>
  </div>
</Preview>

<Blockquote>
  Inspiration: <a href="https://codepen.io/hostsamurai/pen/bodZvR" target="_blank">
    Spinner with Glowing, Gooey Effect
  </a>
  by
  <a href="https://codepen.io/hostsamurai" target="_blank">Lou</a>
</Blockquote>

<div class="grid grid-cols-[1fr,auto] gap-2 items-end">
  <h2>Scanning glowing dot</h2>
  <RangeField label="blur: " labelPlacement="left" bind:value={gooeyBlur} max={13} class="mb-1" />
</div>

<Preview class="bg-gradient-radial from-neutral-600 to-neutral-800 text-center">
  <div class="relative inline-block">
    <Gooey blur={gooeyBlur} alphaPixel={19} alphaShift={-9}>
      <div class="flex gap-8">
        <!-- Fixed dots -->
        {#each { length: 4 } as _, i}
          <div class="w-[30px] h-[30px] bg-sky-500 rounded-full"></div>
        {/each}

        <!-- Moving dot -->
        <div class="scanning absolute top-[2px] left-0 w-full">
          <div class=" w-[26px] h-[26px] bg-cyan-300 rounded-full"></div>
        </div>
      </div>
    </Gooey>
    <!-- glow -->
    <div class="scanning absolute top-[2px] left-0 w-full">
      <div class="w-[26px] h-[26px] bg-cyan-300 rounded-full blur-lg"></div>
    </div>
  </div>
</Preview>

<Blockquote>
  Inspiration: <a href="https://codepen.io/hostsamurai/pen/qPENyb" target="_blank">
    Loader/Scanner with Gooey Effect
  </a>
  by
  <a href="https://codepen.io/hostsamurai" target="_blank">Lou</a>
</Blockquote>

<div class="grid grid-cols-[1fr,auto] gap-2 items-end">
  <h2>Converging dots</h2>
  <RangeField label="blur: " labelPlacement="left" bind:value={gooeyBlur} max={10} class="mb-1" />
</div>

<Preview class="text-center">
  <Gooey blur={gooeyBlur} alphaPixel={19} alphaShift={-9}>
    <div class="w-40 h-40 grid grid-stack place-items-center animate-spin [animation-duration:3s]">
      {#each { length: 6 } as _, i}
        <div
          class="orbit-converge w-6 h-6 rounded-full"
          style:--orbit-radius="60px"
          style:--orbit-start="{35 * i}deg"
          style:background-color="hsl({180 + i * 5}, 80%, 50%)"
        ></div>
      {/each}
    </div>
  </Gooey>
</Preview>

<div class="grid grid-cols-[1fr,auto] gap-2 items-end">
  <h2>Gooey mouse</h2>
  <RangeField label="blur: " labelPlacement="left" bind:value={gooeyBlur} max={10} class="mb-1" />
</div>

<Preview class="relative overflow-hidden">
  <div class="h-[200px]" use:mouseCoords>
    <Gooey blur={gooeyBlur} alphaPixel={18} alphaShift={-7} class="h-full w-full">
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-blue-500 blur-md"
      ></div>
      <div
        class="absolute left-[--x] top-[--y] -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-cyan-300 blur-md"
      ></div>
    </Gooey>
  </div>
</Preview>

<style>
  .orbit {
    animation: orbit 3s linear infinite;
  }
  @keyframes orbit {
    from {
      transform: rotate(var(--orbit-start, 0deg)) translateX(var(--orbit-radius));
    }
    to {
      transform: rotate(calc(var(--orbit-start, 0deg) + 360deg)) translateX(var(--orbit-radius));
    }
  }

  .orbit-converge {
    animation: orbit-converge 2.5s ease-in-out infinite;
  }
  @keyframes orbit-converge {
    0% {
      transform: rotate(var(--orbit-start, 0deg)) translateX(var(--orbit-radius));
    }
    50% {
      transform: rotate(360deg) translateX(var(--orbit-radius));
    }
    100% {
      transform: rotate(calc(var(--orbit-start, 0deg) + 360deg)) translateX(var(--orbit-radius));
    }
  }

  .scanning {
    animation: scanning 2.5s ease-in-out infinite;
  }
  @keyframes scanning {
    0%,
    100% {
      transform: translateX(-12%);
    }
    50% {
      transform: translateX(100%);
    }
  }
</style>
