<script lang="ts">
  import clsx from 'clsx';

  import Avatar from './Avatar.svelte';
  import Icon from './Icon.svelte';

  export let title: string | number | null = null;
  export let subheading: string | number | null = null;
  export let icon: string | null = null;

  /**
   * Wrap icon in Avatar
   */
  export let avatar: Avatar['$$prop_def'] = null;

  /**
   * Support styles to be nested within a wrapping div (useful for `animate:flip`)
   */
  export let nested = false;

  /**
   * Disable shadow (useful when using `ring`)
   */
  export let noShadow = false;

  export let classes: {
    avatar?: string;
    icon?: string;
    title?: string;
    subheading?: string;
  } = {};
</script>

<li
  class={clsx(
    'flex gap-4 items-center bg-white border-t py-2 px-4',
    noShadow !== true && 'elevation-1',
    nested
      ? 'group-first:border-t-0 group-first:rounded-t group-last:rounded-b'
      : 'first-of-type:border-t-0 first-of-type:rounded-t last:rounded-b',
    $$props.class
  )}
  on:click
>
  <slot name="avatar">
    {#if icon != null}
      {#if avatar}
        <Avatar class={classes.avatar} {...avatar}>
          <Icon path={icon} class={classes.icon} />
        </Avatar>
      {:else}
        <Icon path={icon} class={classes.icon} />
      {/if}
    {/if}
  </slot>

  <div class="flex-grow">
    <slot name="title">
      {#if title != null}
        <div class={classes.title}>{title}</div>
      {/if}
    </slot>

    <slot name="subheading">
      {#if subheading != null}
        <div class={clsx('text-sm text-black/50', classes.subheading)}>
          {subheading}
        </div>
      {/if}
    </slot>
  </div>

  <slot name="actions" />
</li>
