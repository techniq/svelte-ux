type PortalOptions = {
	enabled?: boolean;
	target?: HTMLElement | string;
};

/**
 * Render component outside current DOM hierarchy
 * @see:
 *  - https://dev.to/jsmitar/svelte-creating-dialog-component-with-use-portal-3hp4
 *  - https://svelte.dev/repl/79e33c2d7695444b994ba74255bb1387?version=3.24.0
 *  - https://svelte.dev/repl/86ec36c27be2471f86590e0c18c7198c?version=3.23.2
 *  - https://github.com/sveltejs/svelte/issues/3088#issuecomment-505785516
 */
export default function portal(node: HTMLElement, options?: PortalOptions) {
	moveNode(node, options);

	return {
		update(options) {
			moveNode(node, options);
		}
	};
}

function moveNode(node: HTMLElement, options: PortalOptions = {}) {
	let { enabled, target } = options;

	if (enabled === false) return;

	if (typeof target === 'string') {
		target = document.getElementById(target);
	}
	if (!target) target = document.body;

	target.appendChild(node);
}
