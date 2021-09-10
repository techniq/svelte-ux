<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Grid from '$lib/components/Grid.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import Popover from '$lib/components/Popover.svelte';
  import Toggle from '$lib/components/Toggle.svelte';

  let open = false;

  let placementOpen = {
    topStart: false,
    top: false,
    topEnd: false,
    leftStart: false,
    rightStart: false,
    left: false,
    right: false,
    leftEnd: false,
    rightEnd: false,
    bottomStart: false,
    bottom: false,
    bottomEnd: false,
  };

  let originOpen = {
    topStart: false,
    top: false,
    topEnd: false,
    leftStart: false,
    rightStart: false,
    left: false,
    right: false,
    leftEnd: false,
    rightEnd: false,
    bottomStart: false,
    bottom: false,
    bottomEnd: false,
  };

  function onPopoverClick() {
    console.log('onPopoverClick');
  }
</script>

## Inferred anchor w/ uses parent

<Preview>
  <div class="inline-block">
    <Popover bind:open on:click={onPopoverClick}>
      <div class="p-2 bg-white border shadow">Example contents</div>
    </Popover>
    <Button on:click={() => (open = true)}>Show</Button>
  </div>
</Preview>

## Placement

<Preview>
  <div class="mx-20">
    <Grid columns={5}>
      <div class="text-right" style="grid-column: 2">
        <div class="inline-block">
          <Popover bind:open={placementOpen.topStart} placement="top-start">
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={() => (placementOpen.topStart = true)}>
            Top Start
          </Button>
        </div>
      </div>
      <div class="text-center" style="grid-column: 3">
        <div class="inline-block">
          <Popover bind:open={placementOpen.top} placement="top">
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={() => (placementOpen.top = true)}>Top</Button>
        </div>
      </div>
      <div class="text-left" style="grid-column: 4">
        <div class="inline-block">
          <Popover bind:open={placementOpen.topEnd} placement="top-end">
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={() => (placementOpen.topEnd = true)}>Top End</Button>
        </div>
      </div>
      <div class="text-right" style="grid-column: 1">
        <div class="inline-block">
          <Popover bind:open={placementOpen.leftStart} placement="left-start">
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={() => (placementOpen.leftStart = true)}>
            Left Start
          </Button>
        </div>
      </div>
      <div class="text-left" style="grid-column: 5">
        <div class="inline-block">
          <Popover bind:open={placementOpen.rightStart} placement="right-start">
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={() => (placementOpen.rightStart = true)}>
            Right Start
          </Button>
        </div>
      </div>
      <div class="text-right" style="grid-column: 1">
        <div class="inline-block">
          <Popover bind:open={placementOpen.left} placement="left">
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={() => (placementOpen.left = true)}>Left</Button>
        </div>
      </div>
      <div class="text-left" style="grid-column: 5">
        <div class="inline-block">
          <Popover bind:open={placementOpen.right} placement="right">
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={() => (placementOpen.right = true)}>Right</Button>
        </div>
      </div>
      <div class="text-right" style="grid-column: 1">
        <div class="inline-block">
          <Popover bind:open={placementOpen.leftEnd} placement="left-end">
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={() => (placementOpen.leftEnd = true)}
            >Left End</Button
          >
        </div>
      </div>
      <div class="text-left" style="grid-column: 5">
        <div class="inline-block">
          <Popover bind:open={placementOpen.rightEnd} placement="right-end">
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={() => (placementOpen.rightEnd = true)}>
            Right End
          </Button>
        </div>
      </div>
      <div class="text-right" style="grid-column: 2">
        <div class="inline-block">
          <Popover
            bind:open={placementOpen.bottomStart}
            placement="bottom-start"
          >
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={() => (placementOpen.bottomStart = true)}>
            Bottom Start
          </Button>
        </div>
      </div>
      <div class="text-center" style="grid-column: 3">
        <div class="inline-block">
          <Popover bind:open={placementOpen.bottom} placement="bottom">
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={() => (placementOpen.bottom = true)}>Bottom</Button>
        </div>
      </div>
      <div class="text-left" style="grid-column: 4">
        <div class="inline-block">
          <Popover bind:open={placementOpen.bottomEnd} placement="bottom-end">
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={() => (placementOpen.bottomEnd = true)}>
            Bottom End
          </Button>
        </div>
      </div>
    </Grid>
  </div>
</Preview>

## Origins

<Preview>
  <div class="mx-20">
    <Grid columns={5}>
      <div class="text-right" style="grid-column: 2">
        <div class="inline-block">
          <Popover
            bind:open={originOpen.topStart}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            popoverOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          >
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={() => (originOpen.topStart = true)}>
            Top Start
          </Button>
        </div>
      </div>
      <div class="text-center" style="grid-column: 3">
        <div class="inline-block">
          <Popover
            bind:open={originOpen.top}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            popoverOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={() => (originOpen.top = true)}>Top</Button>
        </div>
      </div>
      <div class="text-left" style="grid-column: 4">
        <div class="inline-block">
          <Popover
            bind:open={originOpen.topEnd}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            popoverOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={() => (originOpen.topEnd = true)}>Top End</Button>
        </div>
      </div>
      <div class="text-right" style="grid-column: 1">
        <div class="inline-block">
          <Popover
            bind:open={originOpen.leftStart}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            popoverOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={() => (originOpen.leftStart = true)}>
            Left Start
          </Button>
        </div>
      </div>
      <div class="text-left" style="grid-column: 5">
        <div class="inline-block">
          <Popover
            bind:open={originOpen.rightStart}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            popoverOrigin={{ vertical: 'top', horizontal: 'left' }}
          >
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={() => (originOpen.rightStart = true)}>
            Right Start
          </Button>
        </div>
      </div>
      <div class="text-right" style="grid-column: 1">
        <div class="inline-block">
          <Popover
            bind:open={originOpen.left}
            anchorOrigin={{ vertical: 'center', horizontal: 'left' }}
            popoverOrigin={{ vertical: 'center', horizontal: 'right' }}
          >
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={() => (originOpen.left = true)}>Left</Button>
        </div>
      </div>
      <div class="text-left" style="grid-column: 5">
        <div class="inline-block">
          <Popover
            bind:open={originOpen.right}
            anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
            popoverOrigin={{ vertical: 'center', horizontal: 'left' }}
          >
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={() => (originOpen.right = true)}>Right</Button>
        </div>
      </div>
      <div class="text-right" style="grid-column: 1">
        <div class="inline-block">
          <Popover
            bind:open={originOpen.leftEnd}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            popoverOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={() => (originOpen.leftEnd = true)}
            >Left End</Button
          >
        </div>
      </div>
      <div class="text-left" style="grid-column: 5">
        <div class="inline-block">
          <Popover
            bind:open={originOpen.rightEnd}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            popoverOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          >
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={() => (originOpen.rightEnd = true)}>
            Right End
          </Button>
        </div>
      </div>
      <div class="text-right" style="grid-column: 2">
        <div class="inline-block">
          <Popover
            bind:open={originOpen.bottomStart}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            popoverOrigin={{ vertical: 'top', horizontal: 'left' }}
          >
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={() => (originOpen.bottomStart = true)}>
            Bottom Start
          </Button>
        </div>
      </div>
      <div class="text-center" style="grid-column: 3">
        <div class="inline-block">
          <Popover
            bind:open={originOpen.bottom}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            popoverOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={() => (originOpen.bottom = true)}>Bottom</Button>
        </div>
      </div>
      <div class="text-left" style="grid-column: 4">
        <div class="inline-block">
          <Popover
            bind:open={originOpen.bottomEnd}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            popoverOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <div class="px-4 py-8 bg-white border shadow">Contents</div>
          </Popover>
          <Button on:click={() => (originOpen.bottomEnd = true)}>
            Bottom End
          </Button>
        </div>
      </div>
    </Grid>
  </div>
</Preview>

## Origins w/ custom

<Preview>
  <Toggle let:on={open} let:toggle>
    <div class="inline-block">
      <Popover
        {open}
        on:close={toggle}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        popoverOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <div class="px-8 py-8 bg-white border shadow">Contents</div>
      </Popover>
      <Button on:click={toggle}>Click me</Button>
    </div>
  </Toggle>
</Preview>
