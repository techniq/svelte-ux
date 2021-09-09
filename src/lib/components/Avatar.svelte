<script lang="ts">
  export let size: 'sm' | 'md' | 'lg' | 'unset' = 'md';
</script>

<div
  class="rounded-full inline-flex items-center justify-center {$$props.class}"
  class:w-6={size === 'sm'}
  class:h-6={size === 'sm'}
  class:w-10={size === 'md'}
  class:h-10={size === 'md'}
  class:w-14={size === 'lg'}
  class:h-14={size === 'lg'}
>
  <slot />
</div>
