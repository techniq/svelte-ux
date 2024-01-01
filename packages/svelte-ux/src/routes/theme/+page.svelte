<script lang="ts">
  //
</script>

<main class="p-4">
  <h2 class="mb-4">Semantic colors</h2>

  <div class="grid grid-cols-12 text-xs">
    <div class="colorName">primary</div>
    <div class="bg-primary swatch">default</div>
    <div class="bg-primary-content swatch">content</div>
    <div class="bg-primary-100 swatch">100</div>
    <div class="bg-primary-200 swatch">200</div>
    <div class="bg-primary-300 swatch">300</div>
    <div class="bg-primary-400 swatch">400</div>
    <div class="bg-primary-500 swatch">500</div>
    <div class="bg-primary-600 swatch">600</div>
    <div class="bg-primary-700 swatch">700</div>
    <div class="bg-primary-800 swatch">800</div>
    <div class="bg-primary-900 swatch">900</div>

    <div class="colorName">secondary</div>
    <div class="bg-secondary swatch">default</div>
    <div class="bg-secondary-content swatch">content</div>
    <div class="bg-secondary-100 swatch">100</div>
    <div class="bg-secondary-200 swatch">200</div>
    <div class="bg-secondary-300 swatch">300</div>
    <div class="bg-secondary-400 swatch">400</div>
    <div class="bg-secondary-500 swatch">500</div>
    <div class="bg-secondary-600 swatch">600</div>
    <div class="bg-secondary-700 swatch">700</div>
    <div class="bg-secondary-800 swatch">800</div>
    <div class="bg-secondary-900 swatch">900</div>

    <div class="colorName">accent</div>
    <div class="bg-accent swatch">default</div>
    <div class="bg-accent-content swatch">content</div>
    <div class="bg-accent-100 swatch">100</div>
    <div class="bg-accent-200 swatch">200</div>
    <div class="bg-accent-300 swatch">300</div>
    <div class="bg-accent-400 swatch">400</div>
    <div class="bg-accent-500 swatch">500</div>
    <div class="bg-accent-600 swatch">600</div>
    <div class="bg-accent-700 swatch">700</div>
    <div class="bg-accent-800 swatch">800</div>
    <div class="bg-accent-900 swatch">900</div>

    <div class="colorName">neutral</div>
    <div class="bg-neutral swatch">default</div>
    <div class="bg-neutral-content swatch">content</div>
    <div class="bg-neutral-100 swatch">100</div>
    <div class="bg-neutral-200 swatch">200</div>
    <div class="bg-neutral-300 swatch">300</div>
    <div class="bg-neutral-400 swatch">400</div>
    <div class="bg-neutral-500 swatch">500</div>
    <div class="bg-neutral-600 swatch">600</div>
    <div class="bg-neutral-700 swatch">700</div>
    <div class="bg-neutral-800 swatch">800</div>
    <div class="bg-neutral-900 swatch">900</div>
  </div>

  <h2 class="mb-4">State colors</h2>

  <div class="grid grid-cols-12 text-xs">
    <div class="colorName">info</div>
    <div class="bg-info swatch">default</div>
    <div class="bg-info-content swatch">content</div>
    <div class="bg-info-100 swatch">100</div>
    <div class="bg-info-200 swatch">200</div>
    <div class="bg-info-300 swatch">300</div>
    <div class="bg-info-400 swatch">400</div>
    <div class="bg-info-500 swatch">500</div>
    <div class="bg-info-600 swatch">600</div>
    <div class="bg-info-700 swatch">700</div>
    <div class="bg-info-800 swatch">800</div>
    <div class="bg-info-900 swatch">900</div>

    <div class="colorName">success</div>
    <div class="bg-success swatch">default</div>
    <div class="bg-success-content swatch">content</div>
    <div class="bg-success-100 swatch">100</div>
    <div class="bg-success-200 swatch">200</div>
    <div class="bg-success-300 swatch">300</div>
    <div class="bg-success-400 swatch">400</div>
    <div class="bg-success-500 swatch">500</div>
    <div class="bg-success-600 swatch">600</div>
    <div class="bg-success-700 swatch">700</div>
    <div class="bg-success-800 swatch">800</div>
    <div class="bg-success-900 swatch">900</div>

    <div class="colorName">warning</div>
    <div class="bg-warning swatch">default</div>
    <div class="bg-warning-content swatch">content</div>
    <div class="bg-warning-100 swatch">100</div>
    <div class="bg-warning-200 swatch">200</div>
    <div class="bg-warning-300 swatch">300</div>
    <div class="bg-warning-400 swatch">400</div>
    <div class="bg-warning-500 swatch">500</div>
    <div class="bg-warning-600 swatch">600</div>
    <div class="bg-warning-700 swatch">700</div>
    <div class="bg-warning-800 swatch">800</div>
    <div class="bg-warning-900 swatch">900</div>

    <div class="colorName">danger</div>
    <div class="bg-danger swatch">default</div>
    <div class="bg-danger-content swatch">content</div>
    <div class="bg-danger-100 swatch">100</div>
    <div class="bg-danger-200 swatch">200</div>
    <div class="bg-danger-300 swatch">300</div>
    <div class="bg-danger-400 swatch">400</div>
    <div class="bg-danger-500 swatch">500</div>
    <div class="bg-danger-600 swatch">600</div>
    <div class="bg-danger-700 swatch">700</div>
    <div class="bg-danger-800 swatch">800</div>
    <div class="bg-danger-900 swatch">900</div>
  </div>
</main>

<style lang="postcss">
  .colorName {
    @apply grid items-center font-semibold;
  }
  .swatch {
    @apply grid place-items-center h-8;
  }
</style>
