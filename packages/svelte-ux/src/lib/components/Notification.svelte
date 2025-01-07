<script lang="ts">
  import { type ComponentProps, type Snippet } from 'svelte';
  import { fly } from 'svelte/transition';
  import { quadIn } from 'svelte/easing';
  import type { ThemeColors } from '$lib/types/typeHelpers.js';
  import { cls } from '$lib/utils/styles.js';

  import { mdiClose } from '@mdi/js';

  import Button from './Button.svelte';
  import Icon from './Icon.svelte';
  import type { SvelteHTMLElements } from 'svelte/elements';

  interface Props {
    title?: string | Snippet;
    description?: string | Snippet;
    icon?: string | Snippet;
    actions?: Record<string, Function> | Snippet;
    color?: ThemeColors;
    variant?: 'default' | 'fill';
    actionsPlacement?: 'inline' | 'below' | 'split';
    open?: boolean;
    closeIcon?: boolean;
    classes?: {
      root?: string;
      title?: string;
      description?: string;
      icon?: ComponentProps<typeof Icon>['classes'];
      actions?: string;
    };
    class?: string;
    onClose?: () => void;
    onkeypress?: SvelteHTMLElements['div']['onkeypress'];
  }

  let {
    title,
    description,
    icon,
    actions = {},
    color = 'primary',
    variant = 'default',
    actionsPlacement = 'inline',
    open = $bindable(true),
    closeIcon = false,
    classes = {},
    class: className,
    onClose,
    onkeypress,
  }: Props = $props();

  let notificationEl = $state<HTMLDivElement>();
  let actionsEl = $state<HTMLDivElement>();

  function onClick(e: MouseEvent) {
    try {
      // https://stackoverflow.com/questions/28900077/why-is-event-target-not-element-in-typescript
      if (!(e.target instanceof Element)) {
        console.error('Unexpected target');
        return;
      }

      if (e.target != actionsEl && actionsEl?.contains(e.target)) {
        // Close if action button clicked on (but not container).  Can be disabled with `e.stopPropagation()`
        open = false;
      }
    } catch (err) {
      console.error(err);
    }
  }
</script>

{#if open}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class={cls(
      'Notification rounded-lg border bg-surface-100 shadow-lg z-10',
      {
        fill: {
          primary: 'bg-primary text-primary-content',
          secondary: 'bg-secondary text-secondary-content',
          accent: 'bg-accent text-accent-content',
          neutral: 'bg-neutral text-neutral-content',
          info: 'bg-info text-info-content',
          success: 'bg-success text-success-content',
          warning: 'bg-warning text-warning-content',
          danger: 'bg-danger text-danger-content',
        }[color],
        default: {},
      }[variant],
      classes.root,
      className
    )}
    transition:fly={{ duration: 200, easing: quadIn, x: 100 }}
    onoutroend={() => onClose?.()}
    onclick={onClick}
    {onkeypress}
    bind:this={notificationEl}
  >
    <div class="flex">
      <div class="flex-1 flex items-center gap-4 p-4">
        {#if icon}
          {#if typeof icon === 'function'}
            {@render icon()}
          {:else}
            <Icon
              data={icon}
              class={cls(
                actionsPlacement === 'below' && 'self-start mt-0.5',
                variant === 'default' &&
                  {
                    primary: 'text-primary',
                    secondary: 'text-secondary',
                    accent: 'text-accent',
                    neutral: 'text-neutral',
                    info: 'text-info',
                    success: 'text-success',
                    warning: 'text-warning',
                    danger: 'text-danger',
                  }[color]
              )}
              classes={classes.icon}
            />
          {/if}
        {/if}

        <div class="flex-1 grid gap-1">
          {#if title}
            <div class={cls('font-medium', classes.title)}>
              {#if typeof title === 'function'}
                {@render title()}
              {:else}
                {title}
              {/if}
            </div>
          {/if}

          {#if description}
            <div
              class={cls(
                'text-sm',
                {
                  fill: {
                    primary: 'text-primary-content/50',
                    secondary: 'text-secondary-content/50',
                    accent: 'text-accent-content/50',
                    neutral: 'text-neutral-content/50',
                    info: 'text-info-content/50',
                    success: 'text-success-content/50',
                    warning: 'text-warning-content/50',
                    danger: 'text-danger-content/50',
                  }[color],
                  default: 'text-surface-content/50',
                }[variant],
                classes.description
              )}
            >
              {#if typeof description === 'function'}
                {@render description()}
              {:else}
                {description}
              {/if}
            </div>
          {/if}

          {#if actions && actionsPlacement === 'below'}
            <div bind:this={actionsEl} class={cls('mt-2 -ml-4 -mb-2', classes.actions)}>
              {#if typeof actions === 'function'}
                {@render actions()}
              {:else}
                {#each Object.entries(actions) as [name, fn], i}
                  <Button
                    color={i === 0 && variant === 'default' ? 'primary' : 'default'}
                    class={cls(
                      i === 0 &&
                        variant === 'default' &&
                        {
                          primary: 'text-primary',
                          secondary: 'text-secondary',
                          accent: 'text-accent',
                          neutral: 'text-neutral',
                          info: 'text-info',
                          success: 'text-success',
                          warning: 'text-warning',
                          danger: 'text-danger',
                        }[color]
                    )}
                    onclick={() => fn()}
                  >
                    {name}
                  </Button>
                {/each}
              {/if}
            </div>
          {/if}
        </div>

        {#if actions && actionsPlacement === 'inline'}
          <div bind:this={actionsEl} class={cls('-my-2 -mr-2', classes.actions)}>
            {#if typeof actions === 'function'}
              {@render actions()}
            {:else}
              {#each Object.entries(actions) as [name, fn], i}
                <Button
                  color={i === 0 && variant === 'default' ? 'primary' : 'default'}
                  onclick={() => fn()}
                >
                  {name}
                </Button>
              {/each}
            {/if}
          </div>
        {/if}

        {#if closeIcon}
          <Button
            icon={mdiClose}
            onclick={() => (open = false)}
            class={cls(
              'self-start',
              {
                fill: {
                  primary: 'text-primary-content/25',
                  secondary: 'text-secondary-content/25',
                  accent: 'text-accent-content/25',
                  neutral: 'text-neutral-content/25',
                  info: 'text-info-content/25',
                  success: 'text-success-content/25',
                  warning: 'text-warning-content/25',
                  danger: 'text-danger-content/25',
                }[color],
                default: 'text-surface-content/25',
              }[variant]
            )}
          />
        {/if}
      </div>

      {#if actions && actionsPlacement === 'split'}
        <div
          bind:this={actionsEl}
          class={cls(
            'grid border-l divide-y',
            {
              fill: {
                primary: 'border-primary-content/25 divide-primary-content/25',
                secondary: 'border-secondary-content/25 divide-secondary-content/25',
                accent: 'border-accent-content/25 divide-accent-content/25',
                neutral: 'border-neutral-content/25 divide-neutral-content/25',
                info: 'border-info-content/25 divide-info-content/25',
                success: 'border-success-content/25 divide-success-content/25',
                warning: 'border-warning-content/25 divide-warning-content/25',
                danger: 'border-danger-content/25 divide-danger-content/25',
              }[color],
              default: 'border-surface-content/25',
            }[variant],
            classes.actions
          )}
        >
          {#if typeof actions === 'function'}
            {@render actions()}
          {:else}
            {#each Object.entries(actions) as [name, fn], i}
              <Button
                class={cls('rounded-none', variant === 'default' && i === 0 && 'text-primary')}
                onclick={() => fn()}
              >
                {name}
              </Button>
            {/each}
          {/if}
        </div>
      {/if}
    </div>
  </div>
{/if}
