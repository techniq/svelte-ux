<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import immerStore from '../stores/immerStore';

	const dispatch = createEventDispatcher();

	export let initial: any = null;

	const [state, draft] = immerStore(initial);

	$: dispatch('change', $state);
</script>

<!-- Expose directly since can not subscribe at call site -->
<slot state={$state} draft={$draft} commit={draft.commit} revert={draft.revert} />
