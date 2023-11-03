<script lang="ts">
  import TreeList from '$lib/components/TreeList.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import Blockquote from '$docs/Blockquote.svelte';
    import Icon from '$lib/components/Icon.svelte';
    import { mdiCircleSmall } from '@mdi/js';
    import { cls } from '$lib';

  type Node = { name: string; level: number; children: Node[] };


  let nodes: Node[] = [
    {
      name: 'Node 1',
      level: 1,
      children: [
        {
          name: 'Node 1.1',
          level: 2,
          children: [
            {
              name: 'Node 1.1.1',
              level: 3,
              children: []
            },
            {
              name: 'Node 1.1.2',
              level: 3,
              children: []
            }
          ]
        },
        {
          name: 'Node 1.2',
          level: 2,
          children: []
        }
      ]
    },
    {
      name: 'Node 2',
      level: 1,
      children: [
        {
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

<Preview language="typescript" code="{"type Node = { name: string; level: number; children: Node[] };\n\nconst nodes =" + JSON.stringify(nodes, null, 2)}">
<pre>
  type Node = &lbrace; name: string; level: number; children: Node[] &rbrace;;
  const nodes = {JSON.stringify(nodes, null, 2).slice(0, 300)}...
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
