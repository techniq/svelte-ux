type CSSProps = { [key: string]: string | number | boolean | null | undefined };

export default function cssVars(node: HTMLElement, props: CSSProps): SvelteActionReturnType {
  Object.entries(props).forEach(([key, value]) => {
    // Ignore if null or undefined
    if (value != null) {
      value = typeof value === 'boolean' ? (value ? 1 : 0) : value;
      node.style.setProperty(`--${key}`, `${value}`);
    }
  });

  let lastProps = {};

  return {
    update(newProps: CSSProps) {
      const newKeys = Object.keys(newProps);
      Object.keys(lastProps)
        .filter((name) => !newKeys.includes(name))
        .forEach((name) => node.style.removeProperty(`--${name}`));

      Object.entries(newProps).forEach(([key, value]) => {
        // Ignore if null or undefined
        if (value != null) {
          node.style.setProperty(`--${key}`, `${value}`);
        }
        delete props[key];
      });

      lastProps = newProps;
    },
  };
}
