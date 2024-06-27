type EventType = MouseEvent | TouchEvent;

// Generic type guard -  https://stackoverflow.com/a/43423642/191902
export function hasKeyOf<T>(object: any, key: string): object is T {
  if (object) {
    return key in object;
  } else {
    return false;
  }
}

// Similar to Object.hasOwnProperty
// http://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
export function hasProperty<T extends Object>(
  o: T,
  name: string | number | symbol
): name is keyof T {
  return name in o;
}

// Typesafe way to get property names
// https://www.meziantou.net/typescript-nameof-operator-equivalent.htm
// https://schneidenbach.gitbooks.io/typescript-cookbook/nameof-operator.html
export function nameof<T>(key: keyof T, instance?: T): keyof T {
  return key;
}

export function isNumber(val: unknown): val is number {
  return typeof val === 'number';
}

/**
 * Check if value is present (not `null`/`undefined`).  Useful with `arr.filter(notNull)`
 */
export function notNull<T>(value: T | null | undefined): value is T {
  return value != null;
}

export function isElement(elem?: Element | EventType): elem is Element {
  return !!elem && elem instanceof Element;
}

// functional definition of isSVGElement. Note that SVGSVGElements are HTMLElements
export function isSVGElement(elem?: Element): elem is SVGElement {
  return !!elem && (elem instanceof SVGElement || 'ownerSVGElement' in elem);
}

// functional definition of SVGGElement
export function isSVGSVGElement(elem?: Element | null): elem is SVGSVGElement {
  return !!elem && 'createSVGPoint' in elem;
}

export function isSVGGraphicsElement(elem?: Element | null): elem is SVGGraphicsElement {
  return !!elem && 'getScreenCTM' in elem;
}

// functional definition of TouchEvent
export function isTouchEvent(event?: EventType): event is TouchEvent {
  return !!event && 'changedTouches' in event;
}

// functional definition of event
export function isEvent(event?: EventType | Element): event is EventType {
  return (
    !!event &&
    (event instanceof Event || ('nativeEvent' in event && event.nativeEvent instanceof Event))
  );
}
