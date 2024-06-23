<script lang="ts">
  import { Shine, Tilt } from 'svelte-ux';

  import Preview from '$lib/components/Preview.svelte';
  import Blockquote from '$docs/Blockquote.svelte';

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

<Preview>
  <div class="flex items-center justify-center content-center gap-6">
    {#each images as image, i}
      <Tilt class="hover:scale-110 transition duration-500">
        <img src={image} width="180px" class="transition ease-out" alt="example {i}" />
      </Tilt>
    {/each}
  </div>
</Preview>

<h2>Set brightness</h2>

<Preview>
  <div class="flex items-center justify-center content-center gap-6">
    {#each images as image, i}
      <Tilt class="hover:scale-110 transition duration-500" setBrightness>
        <img src={image} width="180px" class="transition ease-out" alt="example {i}" />
      </Tilt>
    {/each}
  </div>
</Preview>

<h2>with Shine</h2>

<Preview>
  <Shine>
    <div class="flex items-center justify-center content-center gap-6">
      {#each images as image, i}
        <Tilt class="hover:scale-110 transition duration-500">
          <img src={image} width="180px" class="transition ease-out" alt="example {i}" />
        </Tilt>
      {/each}
    </div>
  </Shine>
</Preview>

<h2>Change perspective amount</h2>

<Preview>
  <div class="flex items-center justify-center content-center gap-6">
    {#each images as image, i}
      <Tilt class="hover:scale-110 transition duration-500 [perspective:300px]">
        <img src={image} width="180px" class="transition ease-out" alt="example {i}" />
      </Tilt>
    {/each}
  </div>
</Preview>

<h2>maxRotation</h2>

<Preview>
  <div class="flex items-center justify-center content-center gap-6">
    {#each images as image, i}
      <Tilt class="hover:scale-110 transition duration-500" maxRotation={40}>
        <img src={image} width="180px" class="transition ease-out" alt="example {i}" />
      </Tilt>
    {/each}
  </div>
</Preview>

<h2>flex-wrap</h2>

<Preview>
  <div class="flex flex-wrap items-center justify-center content-center gap-6">
    {#each images as image, i}
      <Tilt class="hover:scale-110 transition duration-500">
        <img src={image} width="180px" class="transition ease-out" alt="example {i}" />
      </Tilt>
    {/each}
  </div>
</Preview>

<Blockquote>Magic: The Gathering card images are copyright Wizards of the Coast, LLC.</Blockquote>
