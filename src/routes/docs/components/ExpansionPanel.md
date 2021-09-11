<script>
  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';
  import ExpansionPanel from '$lib/components/ExpansionPanel.svelte';
  import Preview from '$lib/components/Preview.svelte';
</script>

## Simple

<Preview>
  <Card>
    {#each Array(5) as _, i}
      <ExpansionPanel>
        <div slot="trigger" class="flex-1 p-3">Item {i + 1}</div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          quod culpa et, dolores omnis, ipsum in perspiciatis porro ut nihil
          molestiae molestias tenetur delectus velit! Inventore laborum rerum
          at id?
        </div>
      </ExpansionPanel>
    {/each}
  </Card>
</Preview>

## Actions

<Preview>
  <Card>
    {#each Array(5) as _, i}
      <ExpansionPanel>
        <div slot="trigger" class="flex-1 p-3">Item {i + 1}</div>
        <div slot="actions">
          <Button>Action 1</Button>
          <Button>Action 2</Button>
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          quod culpa et, dolores omnis, ipsum in perspiciatis porro ut nihil
          molestiae molestias tenetur delectus velit! Inventore laborum rerum
          at id?
        </div>
      </ExpansionPanel>
    {/each}
  </Card>
</Preview>
