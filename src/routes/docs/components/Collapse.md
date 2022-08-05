---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script>
  import api from '$lib/components/Collapse.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Card from '$lib/components/Card.svelte';
  import Collapse from '$lib/components/Collapse.svelte';
  import Preview from '$lib/components/Preview.svelte';

  let group = 'expansionGroup';
</script>

# Examples

## Simple without bind:group

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

## Separate without bind:group

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

## Accordian with bind:group

<Preview>
  <Card>
    {#each Array(5) as _, i}
      <Collapse name="Item {i + 1}" bind:group>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quod culpa et, dolores omnis, ipsum in perspiciatis porro ut nihil molestiae molestias tenetur delectus velit! Inventore laborum rerum at id?
        </div>
      </Collapse>
    {/each}
  </Card>
</Preview>

## Expansion Panel

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

## Expansion Panel

### with popout

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

# API

<ApiDocs {api} />
