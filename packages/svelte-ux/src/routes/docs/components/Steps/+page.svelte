<script lang="ts">
  import {
    mdiCheck,
    mdiCreditCardOutline,
    mdiListBoxOutline,
    mdiTruckDeliveryOutline,
  } from '@mdi/js';
  import { range } from 'd3-array';

  import { Button, Paginate, Steps, Step } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';

  const steps = [
    { label: 'Register', completed: true },
    { label: 'Choose plan', completed: true },
    { label: 'Purchase', completed: false },
    { label: 'Receive product', completed: false },
  ];

  const stepsWithContent = [
    { label: 'Register', completed: true, content: '✓' },
    { label: 'Choose plan', completed: true, content: '✓' },
    { label: 'Purchase', completed: false, content: '' },
    { label: 'Receive product', completed: false, content: '' },
  ];

  const stepsWithIcon = [
    { label: 'Register', completed: true, icon: mdiCheck },
    { label: 'Choose plan', completed: true, icon: mdiListBoxOutline },
    { label: 'Purchase', completed: false, icon: mdiCreditCardOutline },
    { label: 'Receive product', completed: false, icon: mdiTruckDeliveryOutline },
  ];
</script>

<h1>Examples</h1>

<h2>Basic</h2>

<Preview>
  <Steps data={steps} />
</Preview>

<h2>Vertical</h2>

<Preview>
  <Steps data={steps} vertical />
</Preview>

<h2>Custom content (step data)</h2>

<Preview>
  <Steps data={stepsWithContent} />
</Preview>

<h2>Custom content (Step component)</h2>

<Preview>
  <Steps>
    <Step content="?">Step 1</Step>
    <Step content="!">Step 2</Step>
    <Step content="✓">Step 3</Step>
    <Step content="✕">Step 4</Step>
    <Step content="★">Step 5</Step>
    <Step content="">Step 6</Step>
    <Step content="●">Step 7</Step>
    <Step>Step 8</Step>
    <Step>Step 9</Step>
  </Steps>
</Preview>

<h2>Custom icon (step data)</h2>

<Preview>
  <Steps data={stepsWithIcon} />
</Preview>

<h2>Custom icon (Step component)</h2>

<Preview>
  <Steps>
    <Step icon={mdiCheck} completed>Register</Step>
    <Step icon={mdiListBoxOutline} completed>Choose plan</Step>
    <Step icon={mdiCreditCardOutline}>Purchase</Step>
    <Step icon={mdiTruckDeliveryOutline}>Receive product</Step>
  </Steps>
</Preview>

<h2>Custom content and completed colors</h2>

<Preview>
  <Steps>
    <Step content="?">Step 1</Step>
    <Step content="!" classes={{ completed: 'bg-secondary text-secondary-content' }} completed>
      Step 2
    </Step>
    <Step content="✓" classes={{ completed: 'bg-secondary text-secondary-content' }} completed>
      Step 3
    </Step>
    <Step content="✕" classes={{ completed: 'bg-secondary text-secondary-content' }} completed>
      Step 4
    </Step>
    <Step content="★">Step 5</Step>
    <Step content="" classes={{ completed: 'bg-info text-info-content' }} completed>Step 6</Step>
    <Step content="●" classes={{ completed: 'bg-success text-success-content' }} completed>
      Step 7
    </Step>
    <Step classes={{ completed: 'bg-success text-success-content' }} completed>Step 8</Step>
    <Step classes={{ completed: 'bg-danger text-danger-content' }} completed>Step 9</Step>
  </Steps>
</Preview>

<h2>Custom colors (Step component)</h2>

<Preview>
  <Steps>
    <Step completed classes={{ completed: 'bg-success text-success-content' }}>Fly to moon</Step>
    <Step completed classes={{ completed: 'bg-success text-success-content' }}>Shrink the moon</Step
    >
    <Step completed classes={{ completed: 'bg-success text-success-content' }}>Grab the moon</Step>
    <Step content="?" classes={{ content: 'bg-danger text-danger-content' }}>Sit on the toilet</Step
    >
  </Steps>
</Preview>

<h2>Change line and point size</h2>

<Preview>
  <Steps data={stepsWithIcon} classes={{ item: { content: 'size-6 text-xs', line: 'h-1' } }} />
</Preview>

<h2>Remove point background</h2>

<Preview>
  <Steps
    data={stepsWithIcon}
    classes={{
      item: {
        content: 'bg-surface-100 size-12',
        line: 'h-0.5',
        completed: 'text-primary bg-primary',
      },
    }}
  />
</Preview>

<h2>Remove point background (vertical)</h2>

<Preview>
  <Steps
    data={stepsWithIcon}
    vertical
    classes={{
      item: {
        content: 'bg-surface-100 size-10',
        line: 'w-0.5',
        completed: 'text-primary bg-primary',
      },
    }}
  />
</Preview>

<h2>Gradient</h2>

<Preview>
  <Steps
    data={stepsWithIcon}
    classes={{
      item: {
        content: 'size-10',
        completed: 'bg-gradient-to-br from-primary to-secondary text-primary-content',
      },
    }}
  />
</Preview>

<h2>Gradient (vertical)</h2>

<Preview>
  <Steps
    data={stepsWithIcon}
    vertical
    classes={{
      item: {
        content: 'size-10',
        completed: 'bg-gradient-to-br from-primary to-secondary text-primary-content',
      },
    }}
  />
</Preview>

<h2>Pagination integration</h2>

<Preview>
  <Paginate data={range(4)} perPage={1} let:pagination let:current>
    <div class="inline-grid gap-5">
      <Steps>
        <Step completed={current.page >= 1}>Register</Step>
        <Step completed={current.page >= 2}>Choose plan</Step>
        <Step completed={current.page >= 3}>Purchase</Step>
        <Step completed={current.page >= 4}>Receive product</Step>
      </Steps>

      <div>
        <Button on:click={pagination.prevPage} disabled={current.isFirst}>Previous</Button>
        <Button
          on:click={pagination.nextPage}
          color="primary"
          variant="fill"
          disabled={current.isLast}>Next</Button
        >
      </div>
    </div>
  </Paginate>
</Preview>
