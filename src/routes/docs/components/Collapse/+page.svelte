<script>
  import { fade } from 'svelte/transition';
  import { mdiArrowRight } from '@mdi/js';

  import api from '$lib/components/Collapse.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';
  import Collapse from '$lib/components/Collapse.svelte';
  import Preview from '$lib/components/Preview.svelte';

  let group = undefined;

  let controlledOpen = [false,true,false,false,false];
</script>

<h1>Examples</h1>

<h2>Separate (no bind:group)</h2>

<Preview>
  <Card>
    {#each Array(5) as _, i}
      <Collapse name="Item {i + 1}">
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quod culpa et, dolores omnis, ipsum in perspiciatis porro ut nihil molestiae molestias tenetur delectus velit! Inventore laborum rerum at id?
        </div>
      </Collapse>
    {/each}
  </Card>
</Preview>

<h2>Accordian (with bind:group)</h2>

<Preview>
  <Card>
    {#each Array(5) as _, i}
      <Collapse name="Item {i + 1}" bind:group value={i}>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quod culpa et, dolores omnis, ipsum in perspiciatis porro ut nihil molestiae molestias tenetur delectus velit! Inventore laborum rerum at id?
        </div>
      </Collapse>
    {/each}
  </Card>
</Preview>

<h2>Controlled</h2>

<Preview>
  <Card>
    {#each Array(5) as _, i}
      <Collapse name="Item {i + 1}" bind:open={controlledOpen[i]}>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quod culpa et, dolores omnis, ipsum in perspiciatis porro ut nihil molestiae molestias tenetur delectus velit! Inventore laborum rerum at id?
        </div>
      </Collapse>
    {/each}
  </Card>
  {#each Array(5) as _, i}
    <Button on:click={() => controlledOpen[i] = !controlledOpen[i]}>Toggle {i + 1}</Button>
  {/each}
  <div>
  </div>
</Preview>

<h2>Expansion Panel</h2>

<Preview>
  <Card class="divide-y">
    {#each Array(5) as _, i}
      <Collapse>
        <div slot="trigger" class="flex-1 px-3 py-3">Item {i + 1}</div>
        <div class="px-3 pb-3 bg-gray-100 border-t">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quod culpa et, dolores omnis, ipsum in perspiciatis porro ut nihil molestiae molestias tenetur delectus velit! Inventore laborum rerum at id?
        </div>
      </Collapse>
    {/each}
  </Card>
</Preview>

<h2>Expansion Panel</h2>

<h3>with popout</h3>

<Preview>
  {#each Array(5) as _, i}
    <Collapse popout class="bg-white elevation-1 border-t first:border-t-0 first:rounded-t last:rounded-b">
      <div slot="trigger" class="flex-1 px-3 py-3">Item {i + 1}</div>
      <div class="px-3 pb-3 bg-gray-100 border-t">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quod culpa et, dolores omnis, ipsum in perspiciatis porro ut nihil molestiae molestias tenetur delectus velit! Inventore laborum rerum at id?
      </div>
    </Collapse>
  {/each}
</Preview>

<h2>Custom transition</h2>

<Preview>
  <Card>
    {#each Array(5) as _, i}
      <Collapse name="Item {i + 1}" transition={fade}>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quod culpa et, dolores omnis, ipsum in perspiciatis porro ut nihil molestiae molestias tenetur delectus velit! Inventore laborum rerum at id?
        </div>
      </Collapse>
    {/each}
  </Card>
</Preview>

<h2>Transition params</h2>

<Preview>
  <Card>
    {#each Array(5) as _, i}
      <Collapse name="Item {i + 1}" transitionParams={{ duration: 2000 }}>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quod culpa et, dolores omnis, ipsum in perspiciatis porro ut nihil molestiae molestias tenetur delectus velit! Inventore laborum rerum at id?
        </div>
      </Collapse>
    {/each}
  </Card>
</Preview>

<h2>Custom icon and transition</h2>

<Preview>
  <Card>
    {#each Array(5) as _, i}
      <Collapse name="Item {i + 1}" icon={mdiArrowRight} classes={{ icon: 'data-[open=true]:rotate-90' }}>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quod culpa et, dolores omnis, ipsum in perspiciatis porro ut nihil molestiae molestias tenetur delectus velit! Inventore laborum rerum at id?
        </div>
      </Collapse>
    {/each}
  </Card>
</Preview>

<h2>Flip icon transition</h2>

<Preview>
  <Card>
    {#each Array(5) as _, i}
      <Collapse name="Item {i + 1}" classes={{ icon: 'data-[open=true]:rotate-0 data-[open=true]:-scale-y-100' }}>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quod culpa et, dolores omnis, ipsum in perspiciatis porro ut nihil molestiae molestias tenetur delectus velit! Inventore laborum rerum at id?
        </div>
      </Collapse>
    {/each}
  </Card>
</Preview>

<h1>API</h1>

<ApiDocs {api} />
