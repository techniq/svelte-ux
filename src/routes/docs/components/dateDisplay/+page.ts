export async function load() {
  return {
    meta: {
      features: [
        'Pass `periodType` along with `variant` for quick formatting',
        'Pass `format` for <a href="https://date-fns.org/v2.30.0/docs/format" class="underline underline-offset-2 decoration-gray-400">greater control</a>',
        'By default, will be formatted using `date.totoLocaleString()`',
      ],
    },
  };
}
