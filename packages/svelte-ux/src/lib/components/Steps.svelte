<script lang="ts" module>
  import { type ComponentProps, setContext, getContext, type Snippet } from 'svelte';

  type StepsContext = {
    vertical: boolean;
  };

  const stepsKey = Symbol();

  export function setSteps(value: StepsContext | undefined) {
    setContext(stepsKey, value);
  }

  export function getSteps() {
    return getContext<StepsContext | undefined>(stepsKey);
  }
</script>

<script lang="ts">
  import Step from './Step.svelte';
  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';

  import Icon from './Icon.svelte';

  type StepData = {
    label: string;
    content?: string;
    icon?: ComponentProps<typeof Icon>['data'];
    completed?: boolean;
  };

  interface Props {
    data?: StepData[];
    /** Align vertically (default: horizontal) */
    vertical?: boolean;
    classes?: {
      root?: string;
      item?: ComponentProps<typeof Step>['classes'];
    };
    class?: string;
    children?: Snippet<[{ data: StepData[] }]>;
  }

  let { data = [], vertical = false, classes = {}, class: className, children }: Props = $props();
  const settingsClasses = getComponentClasses('Steps');

  setSteps({
    vertical,
  });
</script>

<ul
  class={cls(
    'Steps',
    'inline-grid grid-flow-col overflow-hidden overflow-x-auto auto-cols-fr [counter-reset:step]',
    vertical ? 'grid-flow-row' : 'grid-flow-col',
    settingsClasses.root,
    classes.root,
    className
  )}
>
  {#if children}
    {@render children({ data })}
  {:else}
    {#each data as item}
      <Step classes={classes.item} {...item}>
        {item.label}
      </Step>
    {/each}
  {/if}
</ul>
