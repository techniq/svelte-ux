<script>
  import AppBar from '../components/AppBar.svelte';
  import Avatar from '../components/Avatar.svelte';
  import Preview from '../components/Preview.svelte';
</script>

## Default

<Preview>
  <Avatar>A</Avatar>
</Preview>

## Color

<Preview>
  <Avatar class="bg-blue-500 text-white font-bold">A</Avatar>
</Preview>

## Border

<Preview>
  <Avatar class="border">A</Avatar>
</Preview>

## Size

<Preview>
  <Avatar class="bg-blue-500 text-white font-bold" size="sm">sm</Avatar>
  <Avatar class="bg-blue-500 text-white font-bold" size="md">md</Avatar>
  <Avatar class="bg-blue-500 text-white font-bold" size="lg">lg</Avatar>
</Preview>
