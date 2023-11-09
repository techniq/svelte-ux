// https://basarat.gitbooks.io/typescript/docs/types/never.html#use-case-exhaustive-checks

import type { SvelteComponentTyped } from 'svelte';
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
export function keys<T>(o: T) {
  return Object.keys(o) as (keyof T)[];
}
// export const keys = Object.keys as <T>(obj: T) => (Extract<keyof T, string>)[];

// Get entries (array of [key, value] arrays) of object (strongly-typed)
export function entries<T>(o: T) {
  return Object.entries(o) as [keyof T, T[keyof T]][]; // TODO: Improve based on key/value pair - https://stackoverflow.com/questions/60141960/typescript-key-value-relation-preserving-object-entries-type
}

// https://github.com/Microsoft/TypeScript/issues/17198#issuecomment-315400819
export function enumKeys(E: any) {
  return Object.keys(E).filter((k) => typeof E[k as any] === 'number'); // ["A", "B"]
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

// https://stackoverflow.com/a/72297256/191902
export type ComponentProps<T> = T extends SvelteComponentTyped<infer P, any, any> ? P : never;
export type ComponentEvents<T> = T extends SvelteComponentTyped<any, infer E, any> ? E : never;
export type ComponentSlots<T> = T extends SvelteComponentTyped<any, any, infer S> ? S : never;

// Export until `Stores` and `StoresValues` are exported from svelte -  https://github.com/sveltejs/svelte/blob/master/src/runtime/store/index.ts#L111-L112
export type Stores = Parameters<typeof derived>[0];
export type StoresValues<T> = T extends Readable<infer U>
  ? U
  : {
      [K in keyof T]: T[K] extends Readable<infer U> ? U : never;
    };

export type TransitionParams = BlurParams | FadeParams | FlyParams | SlideParams | ScaleParams;

export type TailwindColors =
  | 'accent'
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

export type EventWithTarget = Partial<Pick<Event, 'currentTarget' | 'target'>>;
