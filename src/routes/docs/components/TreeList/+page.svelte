<script lang="ts">
  import TreeList from '$lib/components/TreeList.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import Blockquote from '$docs/Blockquote.svelte';
    import Icon from '$lib/components/Icon.svelte';
    import { mdiCircleSmall } from '@mdi/js';
    import { cls } from '$lib';

  type Node = { id: number; name: string; level: number; children: Node[] };


  let nodes: Node[] = [
    {
      id: 1,
      name: 'Node 1',
      level: 1,
      children: [
        {
          id: 2,
          name: 'Node 1.1',
          level: 2,
          children: [
            {
              id: 3,
              name: 'Node 1.1.1',
              level: 3,
              children: []
            },
            {
              id: 4,
              name: 'Node 1.1.2',
              level: 3,
              children: []
            }
          ]
        },
        {
          id: 5,
          name: 'Node 1.2',
          level: 2,
          children: []
        }
      ]
    },
    {
      id: 6,
      name: 'Node 2',
      level: 1,
      children: [
        {
          id: 7,
          name: 'Node 2.1',
          level: 2,
          children: []
        }
      ]
    }
  ];
</script>
<h1>Examples</h1>

Wer're going to use a TreeList to render the following tree using &lt;ul&gt; and &lt;li&gt;:
<br><br>

<Preview code="{JSON.stringify(nodes, null, 2)}">
<pre>
  {JSON.stringify(nodes, null, 2).slice(0, 300)}...
</pre>
</Preview>

<br><br>

<Preview>
  <TreeList nodes="{nodes}" let:node
  classes={{ li: (node) => cls(node.level === 1 ? 'mb-2' : node.level > 2 ? 'ml-3' : '') }}
  >
    <slot {node}>
      {#if node.level > 1}
      <Icon path={mdiCircleSmall} class="-mx-1 text-black/30" />
    {/if}
        {@html node.name}
    </slot>
  </TreeList>
</Preview>
