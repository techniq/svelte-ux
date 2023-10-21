<script lang="ts">
  import { mdiHome, mdiMagnify, mdiTrashCan } from '@mdi/js';

  import Button from '$lib/components/Button.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import Shine from '$lib/components/Shine.svelte';
  import Tilt from '$lib/components/Tilt.svelte';

  const images = [
    'https://nelsoncodepen.s3.eu-west-2.amazonaws.com/thb-250-plains.png',
    'https://nelsoncodepen.s3.eu-west-2.amazonaws.com/thb-251-island.png',
    'https://nelsoncodepen.s3.eu-west-2.amazonaws.com/thb-252-swamp.png',
    'https://nelsoncodepen.s3.eu-west-2.amazonaws.com/thb-253-mountain.png',
    'https://nelsoncodepen.s3.eu-west-2.amazonaws.com/thb-254-forest.png',
  ];
</script>

<h1>Examples</h1>

<h2>Basic</h2>

<Preview class="_bg-neutral-700">
  <div class="inline-block bg-accent-100">
    <Shine>
      <div
        class="text-8xl text-accent-500 border-[12px] border-accent-500 py-2 font-semibold rounded-lg text-center w-[500px]"
      >
        Shine
      </div>
    </Shine>
  </div>
</Preview>

<h2>Emoji</h2>

<Preview>
  <Shine depth={3}>
    <div class="text-[9rem] leading-[9rem]">🚀 🧸 🍔 🥨 🍩 🍓 🍒 🪼 🧠 🌎</div>
  </Shine>
</Preview>

<h2>Light color</h2>

<Preview class="bg-neutral-700">
  <Shine depth={3} lightColor="#FF0000">
    <div class="text-[9rem] leading-[9rem] grayscale-[100] brightness-50">👻 💀 🧪</div>
  </Shine>
</Preview>

<h2>Button</h2>

<Preview>
  <Shine>
    <div class="flex items-center gap-2">
      <Button variant="fill" color="blue">Button</Button>
      <Button icon={mdiTrashCan} variant="fill" color="red">Delete</Button>
      <Button icon={mdiMagnify} variant="fill" color="green" class="flex-row-reverse">Search</Button
      >
      <Button icon={mdiHome} variant="fill" color="blue" class="flex-col">Home</Button>
      <Button icon={mdiHome} variant="fill" color="blue" class="flex-col-reverse">Home</Button>
    </div>
  </Shine>
</Preview>

<h2>with Tilt</h2>

<Preview>
  <Shine>
    <div class="flex items-center justify-center content-center gap-6">
      {#each images as image}
        <Tilt class="hover:scale-110 transition duration-500">
          <img src={image} width="180px" class="transition ease-out" />
        </Tilt>
      {/each}
    </div>
  </Shine>
</Preview>
