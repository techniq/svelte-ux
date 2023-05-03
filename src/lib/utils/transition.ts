import { cubicOut } from 'svelte/easing';

/**
 * Drop in replacement for built-in fly with support for declaring units for `x` and `y` (ex. `100%` or `2em`)
 * @deprecated: built-in fly now supports units (x: '100vw" or `y: '50%')
 */
export function fly(
  node,
  {
    delay = 0,
    duration = 400,
    easing = cubicOut,
    x = 0 as number | string,
    y = 0 as number | string,
    opacity = 0,
  } = {}
) {
  const style = getComputedStyle(node);
  const target_opacity = +style.opacity;
  const transform = style.transform === 'none' ? '' : style.transform;

  const od = target_opacity * (1 - opacity);

  let xValue = x;
  let xUnit = 'px';
  if (typeof x === 'string') {
    const xMatch = x.match(/([-\d.]+)(\D+)/);
    xValue = Number(xMatch[1]);
    xUnit = xMatch[2];
  }

  let yValue = y;
  let yUnit = 'px';
  if (typeof y === 'string') {
    const yMatch = y.match(/([-\d.]+)(\D+)/);
    yValue = Number(yMatch[1]);
    yUnit = yMatch[2];
  }

  return {
    delay,
    duration,
    easing,
    css: (t, u) => `
				transform: ${transform} translate(${(1 - t) * xValue}${xUnit}, ${(1 - t) * yValue}${yUnit});
				opacity: ${target_opacity - od * u}`,
  };
}

/**
 * Slide for horizontal (left/right) instead of vertical (top/bottom)
 * @deprecated: built-in `slide` now axis ('x' or `y`)
 */
export function horizontalSlide(node, { delay = 0, duration = 400, easing = cubicOut } = {}) {
  // https://github.com/sveltejs/svelte/blob/master/src/runtime/transition/index.ts#L103
  const style = getComputedStyle(node);
  const opacity = +style.opacity;
  const width = parseFloat(style.width);
  const padding_left = parseFloat(style.paddingLeft);
  const padding_right = parseFloat(style.paddingRight);
  const margin_left = parseFloat(style.marginLeft);
  const margin_right = parseFloat(style.marginRight);
  const border_left_width = parseFloat(style.borderLeftWidth);
  const border_right_width = parseFloat(style.borderRightWidth);
  return {
    delay,
    duration,
    easing,
    css: (t) =>
      'overflow: hidden;' +
      `opacity: ${Math.min(t * 20, 1) * opacity};` +
      `width: ${t * width}px;` +
      `padding-left: ${t * padding_left}px;` +
      `padding-right: ${t * padding_right}px;` +
      `margin-left: ${t * margin_left}px;` +
      `margin-right: ${t * margin_right}px;` +
      `border-left-width: ${t * border_left_width}px;` +
      `border-right-width: ${t * border_right_width}px;`,
  };
}
