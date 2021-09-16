export function scrollIntoView(
  node: HTMLElement,
  options: {
    condition: boolean | ((node: HTMLElement) => boolean);
    initial?: boolean;
    delay?: number;
  }
) {
  // TODO: scroll options not supported by Safari or IE: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView

  function update(options: Parameters<typeof scrollIntoView>[1]) {
    if (typeof options.condition === 'boolean' ? options.condition : options.condition(node)) {
      setTimeout(() => {
        node.scrollIntoView({
          block: 'center',
          behavior: 'smooth',
        });
        // node.scrollIntoViewIfNeeded({
        //   block: 'center',
        // });
      }, options.delay ?? 0);
    }
  }

  if (options.initial !== false) {
    update(options);
  }
  return { update };
}
