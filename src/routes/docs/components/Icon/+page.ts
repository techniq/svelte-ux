export async function load() {
  return {
    meta: {
      features: [
        'Supports loading icons as path data, SVG as string, SVG from URL, or as an SVG element via slot',
        'Convenient `data` prop to support most of the above use cases via a single prop through introspection',
        'Supports most icon collections.  Verified with Material Design Icons and Font Awesome',
        'Simple in-memory cache when loaded via URL and only fetches once',
      ],
    },
  };
}
