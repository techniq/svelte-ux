<script lang="ts">
  import type { ComponentProps, Snippet } from 'svelte';
  import Button from './Button.svelte';
  import { cls } from '../utils/styles.js';
  import {
    scrollIntoView as scrollIntoViewAction,
    type ScrollIntoViewOptions,
  } from '../actions/scroll.js';
  import { setButtonGroup } from './ButtonGroup.svelte';
  import { getComponentClasses } from './theme.js';
  import { settings, getSettings } from './settings.js';

  type ButtonProps = ComponentProps<typeof Button>;

  interface Props {
    icon?: ButtonProps['icon'];
    scrollIntoView?: ScrollIntoViewOptions | boolean;
    disabled?: boolean;
    selected?: boolean;
    classes?: ButtonProps['classes'] & { selected?: string };
    class?: string;
    children?: Snippet;
  }

  let {
    icon,
    scrollIntoView = false,
    disabled = false,
    selected = false,
    classes = {
      root: 'text-sm gap-3',
      icon: 'text-surface-content/50',
      selected: 'font-semibold [:not(.group:hover)>&]:bg-surface-content/5',
    },
    class: className,
    children,
    ...restProps
  }: Props & Omit<ButtonProps, keyof Props> = $props();
  const settingsClasses = getComponentClasses('MenuItem');

  let scrollOptions: ScrollIntoViewOptions = $derived(
    typeof scrollIntoView === 'boolean'
      ? ({ condition: scrollIntoView } as ScrollIntoViewOptions)
      : scrollIntoView
  );

  // Clear ButtonGroup if set
  setButtonGroup(undefined);

  // Clear theme to not expose to Button
  settings({ ...getSettings(), components: {} });
</script>

<Button
  variant="none"
  {icon}
  {classes}
  fullWidth
  actions={(node) => [scrollIntoViewAction(node, scrollOptions)]}
  {disabled}
  {...restProps}
  class={cls(
    'MenuItem',
    'text-left items-center p-2 hover:bg-surface-content/5 rounded duration-75',
    selected && classes?.selected,
    settingsClasses.root,
    classes?.root,
    className
  )}
>
  {@render children?.()}
</Button>
