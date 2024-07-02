// https://basarat.gitbooks.io/typescript/docs/types/never.html#use-case-exhaustive-checks

import type { colors } from '../styles/theme.js';
import type { ComponentProps as SvelteComponentProps, SvelteComponent } from 'svelte';
import type { derived, Readable } from 'svelte/store';
import type {
  FlyParams,
  SlideParams,
  BlurParams,
  FadeParams,
  ScaleParams,
} from 'svelte/transition';

// https://www.typescriptlang.org/docs/handbook/basic-types.html#never
export function fail(message: string): never {
  throw new Error(message);
}

/**
 * Omit properties in `T` defined in `K`
 * included with Typescript 3.5 - https://devblogs.microsoft.com/typescript/announcing-typescript-3-5-rc/#the-omit-helper-type
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 *
 * see: https://stackoverflow.com/a/53936938/191902
 */
export type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

// Get values of object (similar to Object.values())
export type ValueOf<T> = T[keyof T];

// Get keys of object (strongly-typed)
// Reason Object.keys() isn't like this by default due to runtime properties: https://github.com/Microsoft/TypeScript/pull/12253#issuecomment-263132208
export function keys<T extends object>(o: T) {
  return Object.keys(o) as (keyof T)[];
}
// export const keys = Object.keys as <T>(obj: T) => (Extract<keyof T, string>)[];

export type ObjectKey = string | number | symbol;

// Get entries (array of [key, value] arrays) of object (strongly-typed)
export function entries<K extends ObjectKey, V>(
  o: Record<K, V>
): [`${Extract<K, string | number>}`, V][];
export function entries<K, V>(o: Map<K, V>): [K, V][];
// @ts-expect-error
export function entries<K extends ObjectKey | unknown, V>(o: Record<K, V> | Map<K, V>) {
  if (o instanceof Map) return Array.from(o.entries()) as unknown as [K, V][];
  return Object.entries(o) as unknown as [K, V][]; // TODO: Improve based on key/value pair - https://stackoverflow.com/questions/60141960/typescript-key-value-relation-preserving-object-entries-type
}

// Get object from entries (array of [key, value] arrays) (strongly-typed)
export function fromEntries<K extends ObjectKey, V>(entries: [K, V][] | Map<K, V>): Record<K, V> {
  return Object.fromEntries(entries) as Record<K, V>;
}

// https://github.com/Microsoft/TypeScript/issues/17198#issuecomment-315400819
export function enumKeys(E: any) {
  return keys(E).filter((k) => typeof E[k as any] === 'number'); // ["A", "B"]
}
export function enumValues(E: any) {
  const keys = enumKeys(E);
  return keys.map((k) => E[k as any]); // [0, 1]
}

// Recursive Map
// https://github.com/Microsoft/TypeScript/issues/3496#issuecomment-128553540
// https://stackoverflow.com/a/49021046/191902
export interface TreeMap<K = string, V = null> extends Map<K, TreeMap | V> {}

/**
 * Constructs a type consisting of all properties of T set to required and non-nullable (combination of Required<T> and NonNullable<T>)
 * https://www.typescriptlang.org/docs/handbook/utility-types.html#requiredt
 */
export type RequiredNonNullable<T> = { [P in keyof T]-?: NonNullable<T[P]> };

/**
 * Make all properties partial (full tree unlike Partial<T>)
 * see: https://stackoverflow.com/questions/47914536/use-partial-in-nested-property-with-typescript
 */
export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

// Filter properties of T that value matches type of Match
// example: export type SomeType = FilterPropKeys<Variables, (number[] | null | undefined)>
// export type StringProps<T> = ({ [P in keyof T]: T[P] extends string ? P : never })[keyof T];
// https://github.com/microsoft/TypeScript/issues/18211#issuecomment-380862426
export type FilterPropKeys<T, Match> = {
  [P in keyof T]: T[P] extends Match ? P : never;
}[keyof T];

/**
 * @deprecated ComponentProps should be imported from 'svelte' instead of 'svelte-ux', as it is now included in the main 'svelte' package. This export may be removed in a future release.
 * @see https://svelte.dev/docs/svelte#types-componentprops
 * @example
 * ```ts
 * import { ComponentProps } from 'svelte';
 * import MyComponent from './MyComponent.svelte';
 *
 * type MyComponentProps = ComponentProps<typeof MyComponent>;
 * ```
 */
export type ComponentProps<T extends SvelteComponent> = SvelteComponentProps<T>;
export type ComponentEvents<T> = T extends SvelteComponent<any, infer E, any> ? E : never;
export type ComponentSlots<T> = T extends SvelteComponent<any, any, infer S> ? S : never;

// Export until `Stores` and `StoresValues` are exported from svelte -  https://github.com/sveltejs/svelte/blob/master/src/runtime/store/index.ts#L111-L112
export type Stores = Parameters<typeof derived>[0];
export type StoresValues<T> =
  T extends Readable<infer U>
    ? U
    : {
        [K in keyof T]: T[K] extends Readable<infer U> ? U : never;
      };

export type TransitionParams = BlurParams | FadeParams | FlyParams | SlideParams | ScaleParams;

export type TailwindColors =
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose'
  | 'gray';

export type ThemeColors = (typeof colors)[number];

export type EventWithTarget = Partial<Pick<Event, 'currentTarget' | 'target'>>;

// Matt Pocock tips //https://www.youtube.com/watch?v=2lCCKiWGlC0
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

/**
 * util to make sure we have handled all enum cases in a switch statement
 * Just add at the end of the switch statement a `default` like this:
 *
 * ```ts
 * switch (periodType) {
 *   case xxx:
 *     ...
 *
 *   default:
 *     assertNever(periodType); // This will now report unhandled cases
 * }
 * ```
 */
export function assertNever(x: never): never {
  throw new Error(`Unhandled enum case: ${x}`);
}
