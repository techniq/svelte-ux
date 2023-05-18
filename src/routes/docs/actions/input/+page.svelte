<script lang="ts">
  import Preview from '$lib/components/Preview.svelte';
  import Code from '$lib/components/Code.svelte';

  import {
    autoFocus,
    autoHeight,
    blurOnEscape,
    selectOnFocus,
    debounceEvent,
  } from '$lib/actions/input';
</script>

<h1>Usage</h1>

<Code
  code={`import { autoFocus, autoHeight, blurOnEscape, selectOnFocus, debounceEvent } from 'svelte-ux';`}
  language="javascript"
/>

<h2>autoFocus</h2>

<h3>Auto focus node when rendered</h3>

<Preview>
  <input value="Example text" use:autoFocus class="border" />
</Preview>

<h2>selectOnFocus</h2>

<h3>Selects the text inside a text node when the node is focused</h3>

<Preview>
  <input value="Example text" use:selectOnFocus class="border" />
</Preview>

<h2>blurOnEscape</h2>

<h3>Blurs the node when Escape is pressed</h3>

<Preview>
  <input value="Example text" use:blurOnEscape class="border" />
</Preview>

<h2>autoHeight</h2>

<h3>Automatically resize textarea based on content</h3>

<Preview>
  <textarea value="Example text" use:autoHeight class="border" />
</Preview>

<h2>debounceEvent</h2>

<h3>Debounce any event (input, change, etc)</h3>

<Preview>
  <input
    value="Example text"
    use:debounceEvent={{
      type: 'input',
      listener: (e) => {
        console.log(e.target.value);
      },
      timeout: 1000,
    }}
    class="border"
  />
</Preview>
