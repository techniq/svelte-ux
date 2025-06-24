<script lang="ts">
  import { Card, Icon, TableOfContents } from 'svelte-ux';
  // @ts-expect-error
  import IconChevronRight from '~icons/lucide/chevron-right';
  import Preview from '$lib/components/Preview.svelte';
</script>

<h1>Examples</h1>

Let's build some example TableOfContents for the following masterpiece:

<Card class="p-4 mt-5">
  <div id="epic-novel">
    <h1>The Epic Novel</h1>
    <h2>Chapter 1</h2>
    <h3>New Beginnings</h3>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu ornare purus. Praesent auctor
    tellus leo, ac ornare nisi egestas eu. Nam tincidunt finibus pretium. Pellentesque habitant morbi
    tristique senectus et netus et malesuada fames ac turpis egestas. Praesent dolor urna, congue at
    convallis vel, accumsan ut ante.
    <h4>A Brief Interlude</h4>
    Proin congue augue ex, eget laoreet nisi tempor ac. Sed a sapien convallis, mollis lectus quis, mollis
    lorem.
    <h3>The Journey</h3>
    Donec nec rhoncus libero, ut euismod augue. Curabitur lacus dolor, pellentesque nec suscipit at,
    faucibus id odio. Sed ullamcorper quam nibh, eget hendrerit metus viverra vel. Etiam elementum gravida
    ipsum, eget vestibulum felis vulputate eget. Vivamus at volutpat sapien. Pellentesque lobortis aliquam
    mauris, ac volutpat magna convallis et. Praesent hendrerit finibus dui in ullamcorper.
    <h2>Chapter 2</h2>
    <h2>Chapter 3</h2>
    Donec eget nulla non eros elementum rutrum eu sed nulla. Nam dignissim, neque in elementum vestibulum,
    nisl libero fringilla nunc, et pellentesque ex nibh porta sem. In sed vehicula justo. Etiam non sagittis
    tortor. Pellentesque ut sagittis enim. Nulla eget dictum erat. Mauris eu semper nisl, quis posuere
    arcu. Nunc ut purus quis felis lobortis vehicula. Aliquam varius luctus lectus, in egestas mauris
    sollicitudin eget. Etiam suscipit, nunc vitae blandit convallis, lorem est laoreet ante, sit amet
    gravida arcu ligula vitae ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas
    mattis ac turpis quis luctus.
  </div>
</Card>

<h2>Basic</h2>

<Preview>
  <TableOfContents element="#epic-novel" />
</Preview>

<h2>Limit Max Depth</h2>

<Preview>
  <TableOfContents element="#epic-novel" maxDepth={2} />
</Preview>

<h2>List item indention</h2>

<Preview>
  <TableOfContents element="#epic-novel" itemIndent={12} />
</Preview>

<h2>List item indention with line</h2>

<Preview>
  <TableOfContents element="#epic-novel" itemIndent={12} classes={{ ul: 'border-l' }} />
</Preview>

<h2>Link indention with line</h2>

<Preview>
  <TableOfContents
    element="#epic-novel"
    linkIndent={12}
    classes={{ a: 'border-l data-active:border-primary data-active:text-primary' }}
  />
</Preview>

<h2>Bullet list</h2>

<Preview>
  <TableOfContents element="#epic-novel" itemIndent={12} classes={{ ul: 'list-disc' }} />
</Preview>

<h2>Link slot</h2>

<Preview>
  <TableOfContents element="#epic-novel" itemIndent={12}>
    <div slot="link" class="flex items-center gap-1" let:node>
      <IconChevronRight class="text-surface-content/50 -ml-4" />
      {@html node.name}
    </div>
  </TableOfContents>
</Preview>
