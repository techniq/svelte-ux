<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import { mdiGithub } from '@mdi/js';

  import Button from '../lib/components/Button.svelte';
  import Code from '../lib/components/Code.svelte';
  import Dialog from '../lib/components/Dialog.svelte';
  import Toggle from '../lib/components/Toggle.svelte';
  import Tooltip from '../lib/components/Tooltip.svelte';

  interface Props {
    label: string;
    source?: string;
    href?: string;
    icon: ComponentProps<typeof Button>['icon'];
  }

  let { label, source, href, icon }: Props = $props();
</script>

{#if source}
  <Toggle>
    {#snippet children({ on: open, toggle, toggleOff })}
      <Button {icon} onclick={toggle} variant="fill-light" color="primary" size="sm"
        >{label}</Button
      >
      <Dialog
        {open}
        onClose={toggleOff}
        class="max-h-[98dvh] md:max-h-[90dvh] max-w-[98vw] md:max-w-[90vw] grid grid-rows-[auto,1fr,auto]"
      >
        <div class="grid grid-cols-[1fr,auto] gap-3 items-center p-4">
          <div class="overflow-auto">
            <div class="text-lg font-semibold">{label}</div>
            <div class="text-xs text-surface-content/50 truncate">{href}</div>
          </div>

          {#if href}
            <Button icon={mdiGithub} variant="fill-light" color="primary" {href} target="_blank">
              View on Github
            </Button>
          {/if}
        </div>

        <div class="overflow-auto">
          <Code {source} language={source.startsWith('<script') ? 'svelte' : 'js'} />
        </div>

        {#snippet actions()}
          <div>
            <Button variant="fill" color="primary">Close</Button>
          </div>
        {/snippet}
      </Dialog>
    {/snippet}
  </Toggle>
{:else if href}
  <Tooltip title="Edit this page">
    <Button {icon} {href} target="_blank" variant="fill-light" color="primary" size="sm">
      {label}
    </Button>
  </Tooltip>
{/if}
