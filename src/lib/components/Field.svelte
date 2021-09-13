<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import clsx from 'clsx';
	import { mdiClose, mdiInformationOutline } from '@mdi/js';
	import { uniqueId } from 'lodash-es';

	import cssVars from '../actions/cssVars';

	import Button from './Button.svelte';
	import Icon from './Icon.svelte';
	import Stack from './Stack.svelte';

	const dispatch = createEventDispatcher<{
		clear: null;
	}>();

	export let label = '';
	export let value: any = null;
	// export let placeholder = '';
	export let error = '';
	export let hint = '';
	// export let autocomplete = 'off'; // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
	// export let multiline = false;
	export let disabled = false;
	export let clearable = false;
	export let base = false;
	export let rounded = false;
	export let filled = false;
	export let dense = false;
	export let icon: string | null = null;
	// export let align: 'left' | 'center' | 'right' = 'left';
	export let shrinkLabel = true; // $$slots.prefix || $$slots.suffix;
	// export let actions: Actions = undefined;
	// export let inputEl: HTMLInputElement | null = null;
	export let center = false;

	$: hasValue =
		(Array.isArray(value) && value.length > 0) || (typeof value === 'string' && value != '');
	$: hasLabel = label !== '';

	$: hasPrepend = $$slots.prepend || icon != null;
	$: hasAppend = $$slots.append || clearable || error;

	$: hStackTemplate = `${hasPrepend ? 'auto' : ''} 1fr ${hasAppend ? ' auto' : ''}`;

	const id = uniqueId('field_');
	let labelEl: HTMLLabelElement | null = null;
</script>

<fieldset
	{disabled}
	use:cssVars={{
		color: error
			? 'var(--color-red-500)'
			: filled
			? 'var(--color-gray-600)'
			: 'var(--color-blue-500)'
	}}
	class={clsx(
		'group',
		disabled && 'opacity-50',
		!base && (rounded ? 'rounded-full' : 'rounded'),
		$$props.class
	)}
>
	<div
		class={clsx(
			'border py-0 transition-shadow',
			disabled ? '' : 'hover:shadow',
			disabled ? '' : error ? 'hover:border-red-700' : 'hover:border-gray-700',
			{
				'px-2': !rounded,
				'px-6': rounded && !hasPrepend
			},
			!base && [rounded ? 'rounded-full' : 'rounded', filled ? 'bg-black/10' : 'bg-white'],
			error ? 'border-red-500' : 'border-black/20',
			'group-focus-within:shadow-md group-focus-within:border-color-var'
		)}
	>
		<Stack horizontal template={hStackTemplate} items="center">
			{#if hasPrepend}
				<div class="prepend whitespace-nowrap">
					<slot name="prepend" />

					{#if icon}
						<span class={clsx('mr-3', rounded && !$$slots.prepend && 'ml-3')}>
							<Icon path={icon} class="text-black/50" />
						</span>
					{/if}
				</div>
			{/if}

			<Stack stack items="initial" justifyItems="initial" on:click>
				<label
					class={clsx(
						'z-[1] flex items-center h-full truncate origin-top-left transition-all duration-200 group-hover:text-gray-700 group-focus-within:text-color-var cursor-pointer',
						center && 'justify-center',
						error ? 'text-red-500/80' : 'text-black/50',
						(shrinkLabel || hasValue) && 'shrink'
					)}
					for={id}
					bind:this={labelEl}
				>
					{label}
				</label>

				<div
					class={clsx(
						'input flex items-center',
						hasLabel && 'pt-4',
						dense ? 'my-1' : 'my-2',
						center && 'text-center'
					)}
				>
					<slot name="prefix" />

					<slot {id} />

					<slot name="suffix" />
				</div>
			</Stack>

			{#if hasAppend}
				<div class="append whitespace-nowrap">
					{#if clearable && hasValue}
						<Button
							icon={mdiClose}
							class="text-black/50 p-1"
							on:click={() => {
								value = Array.isArray(value) ? [] : typeof value === 'string' ? '' : null;
								dispatch('clear');
								labelEl.focus();
							}}
						/>
					{/if}

					<slot name="append" />

					{#if error}
						<Icon path={mdiInformationOutline} class="text-red-500" />
					{/if}
				</div>
			{/if}
		</Stack>
	</div>
	<div
		class={clsx(
			'hint',
			'text-xs ml-2 transition-transform ease-out overflow-hidden origin-top transform group-focus-within:scale-y-100',
			error ? 'text-red-500' : 'text-black/50 scale-y-0'
		)}
	>
		{error || hint}
	</div>
</fieldset>

<style lang="postcss">
	label {
		/* border: 1px solid rgba(255, 0, 0, 0.5); */
		width: 100%;
	}
	fieldset:focus-within label,
	label.shrink {
		transform: scale(0.75);
		width: 133%; /* offset 75% scale */
		height: 32px;
	}

	.prepend {
		/* background: rgba(0, 255, 0, 0.1); */
	}

	.append {
		/* background: rgba(0, 255, 0, 0.1); */
	}

	:global([slot='prefix']) {
		/* background: rgba(0, 255, 0, 0.1); */
	}

	:global([slot='suffix']) {
		/* background: rgba(0, 255, 0, 0.1); */
	}
</style>
