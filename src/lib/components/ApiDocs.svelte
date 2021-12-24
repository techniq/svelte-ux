<script lang="ts">
  import Card from './Card.svelte';
  import Table from './Table.svelte';

  export let api: SveldJson;

  // $: console.log({ api });
</script>

<div class="grid gap-8">
  <Card title="Props" id="props">
    <Table
      columns={[
        // TODO: Determine required
        { name: 'name', align: 'left' },
        { name: 'type', align: 'left' },
        { name: 'value', header: 'default', align: 'left' },
        { name: 'description', align: 'left', class: { data: 'whitespace-pre' } },
        // { name: 'kind', align: 'left' },
        // { name: 'isFunction', align: 'left' },
        // { name: 'isFunctionDeclaration', align: 'left' },
        // { name: 'constant', align: 'left' },
        // { name: 'reactive', align: 'left' },
      ]}
      data={api.props}
      slot="contents"
    />
  </Card>

  <Card title="Slots" id="slots">
    <Table
      columns={[
        { name: 'name', align: 'left' },
        { name: 'default', align: 'left' },
        { name: 'slot_props', header: 'props', align: 'left' },
      ]}
      data={api.slots}
      slot="contents"
    />
  </Card>

  <Card title="Events" id="events">
    <Table
      columns={[
        { name: 'name', align: 'left' },
        { name: 'element', align: 'left' },
        { name: 'type', align: 'left' },
      ]}
      data={api.events}
      slot="contents"
    />
  </Card>

  <!-- <Card title="Types" id="types">
  <Table
    columns={[
      { name: 'TODO', align: 'left' },
    ]}
    data={api.props}
    slot="contents"
  />
</Card>
 -->
</div>
