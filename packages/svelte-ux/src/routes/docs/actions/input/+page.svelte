<script lang="ts">
  import Preview from '$lib/components/Preview.svelte';
  import Code from '$lib/components/Code.svelte';

  import {
    autoFocus,
    autoHeight,
    blurOnEscape,
    selectOnFocus,
    debounceEvent,
  } from '$lib/actions/input.js';
</script>

<h1>Usage</h1>

<Code
  source={`import { autoFocus, autoHeight, blurOnEscape, selectOnFocus, debounceEvent } from 'svelte-ux';`}
  language="javascript"
/>

<h2>autoFocus <small>Auto focus node when rendered</small></h2>

<Preview>
  <input value="Example text" use:autoFocus class="border" />
</Preview>

<h2>selectOnFocus <small>Selects the text inside a text node when the node is focused</small></h2>

<Preview>
  <input value="Example text" use:selectOnFocus class="border" />
</Preview>

<h2>blurOnEscape <small>Blurs the node when Escape is pressed</small></h2>

<Preview>
  <input value="Example text" use:blurOnEscape class="border" />
</Preview>

<h2>autoHeight <small>Automatically resize textarea based on content</small></h2>

<Preview>
  <textarea value="Example text" use:autoHeight class="border" />
</Preview>

<h2>debounceEvent <small>Debounce any event (input, change, etc)</small></h2>

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
