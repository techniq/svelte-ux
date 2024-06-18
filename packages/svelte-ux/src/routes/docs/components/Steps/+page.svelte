<script lang="ts">
  import {
    mdiCheck,
    mdiCreditCardOutline,
    mdiListBoxOutline,
    mdiTruckDeliveryOutline,
  } from '@mdi/js';

  import { Steps, Step } from 'svelte-ux';
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

  const steps2 = ['Fly to moon', 'Shrink the moon', 'Grab the moon', 'Sit on toilet'];
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
