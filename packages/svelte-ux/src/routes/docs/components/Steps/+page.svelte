<script lang="ts">
  import { range } from 'd3-array';

  import LucideClipboardList from '~icons/lucide/clipboard-list';
  import LucideCreditCard from '~icons/lucide/credit-card';
  import LucideTruck from '~icons/lucide/truck';

  import { Button, Paginate, Steps, Step, getSettings } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';

  const { icons } = getSettings();

  const steps = [
    { label: 'Register', completed: true },
    { label: 'Choose plan', completed: true },
    { label: 'Purchase', completed: false },
    { label: 'Receive product', completed: false },
  ];

  const stepsWithPoint = [
    { label: 'Register', completed: true, point: '✓' },
    { label: 'Choose plan', completed: true, point: '✓' },
    { label: 'Purchase', completed: false, point: '' },
    { label: 'Receive product', completed: false, point: '' },
  ];

  const stepsWithIcon = [
    { label: 'Register', completed: true, icon: icons.check },
    { label: 'Choose plan', completed: true, icon: LucideClipboardList },
    { label: 'Purchase', completed: false, icon: LucideCreditCard },
    { label: 'Receive product', completed: false, icon: LucideTruck },
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

<h2>Custom point content (step data)</h2>

<Preview>
  <Steps data={stepsWithPoint} />
</Preview>

<h2>Custom point (Step component)</h2>

<Preview>
  <Steps>
    <Step point="?">Step 1</Step>
    <Step point="!">Step 2</Step>
    <Step point="✓">Step 3</Step>
    <Step point="✕">Step 4</Step>
    <Step point="★">Step 5</Step>
    <Step point="">Step 6</Step>
    <Step point="●">Step 7</Step>
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
    <Step icon={icons.check} completed>Register</Step>
    <Step icon={LucideClipboardList} completed>Choose plan</Step>
    <Step icon={LucideCreditCard}>Purchase</Step>
    <Step icon={LucideTruck}>Receive product</Step>
  </Steps>
</Preview>

<h2>Custom point content and completed colors</h2>

<Preview>
  <Steps>
    <Step point="?">Step 1</Step>
    <Step point="!" classes={{ completed: 'bg-secondary text-secondary-content' }} completed>
      Step 2
    </Step>
    <Step point="✓" classes={{ completed: 'bg-secondary text-secondary-content' }} completed>
      Step 3
    </Step>
    <Step point="✕" classes={{ completed: 'bg-secondary text-secondary-content' }} completed>
      Step 4
    </Step>
    <Step point="★">Step 5</Step>
    <Step point="" classes={{ completed: 'bg-info text-info-content' }} completed>Step 6</Step>
    <Step point="●" classes={{ completed: 'bg-success text-success-content' }} completed>
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
    <Step point="?" classes={{ point: 'bg-danger text-danger-content' }}>Sit on the toilet</Step>
  </Steps>
</Preview>

<h2>Change line and point size</h2>

<Preview>
  <Steps data={stepsWithIcon} classes={{ item: { point: 'size-6 text-xs', line: 'h-1' } }} />
</Preview>

<h2>Add line gap</h2>

<Preview>
  <div class="inline-grid gap-2 justify-items-center">
    <Steps data={stepsWithIcon} classes={{ item: { line: 'h-1 w-1/2 rounded-sm' } }} />
    <div>or</div>
    <Steps
      data={stepsWithIcon}
      classes={{
        item: { label: 'z-1', point: 'outline outline-[20px] outline-surface-100', line: 'h-1' },
      }}
    />
  </div>
</Preview>

<h2>Remove point background</h2>

<Preview>
  <Steps
    data={stepsWithIcon}
    classes={{
      item: {
        point: 'bg-surface-100 size-12',
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
        point: 'bg-surface-100 size-10',
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
        point: 'size-10',
        completed: 'bg-linear-to-br from-primary to-secondary text-primary-content',
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
        point: 'size-10',
        completed: 'bg-linear-to-br from-primary to-secondary text-primary-content',
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
