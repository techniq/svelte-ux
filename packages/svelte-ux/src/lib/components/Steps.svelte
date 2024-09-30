<script lang="ts" context="module">
  import { type ComponentProps, setContext, getContext } from 'svelte';

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
  import { cls } from '@layerstack/tailwind';
  import { getComponentClasses } from './theme.js';

  import Icon from './Icon.svelte';

  type StepData = {
    label: string;
    content?: string;
    icon?: ComponentProps<Icon>['data'];
    completed?: boolean;
  };

  export let data: StepData[] = [];

  /** Align vertically (default: horizontal) */
  export let vertical: boolean = false;

  export let classes: {
    root?: string;
    item?: ComponentProps<Step>['classes'];
  } = {};
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
    $$props.class
  )}
>
  <slot {data}>
    {#each data as item}
      <Step classes={classes.item} {...item}>
        {item.label}
      </Step>
    {/each}
  </slot>
</ul>
