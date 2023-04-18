import { derived, get } from 'svelte/store';
import type { Readable } from 'svelte/store';
import type { Page } from '@sveltejs/kit';
import { isEqual } from 'lodash-es';

import * as Serialize from '../utils/serialize';

import rollup from '../utils/rollup';
import type { ValueOf } from '../types/typeHelpers';

export type ParamType =
  | 'string'
  | 'string[]'
  | 'number'
  | 'number[]'
  | 'boolean'
  | 'date'
  | 'datetime'
  | 'json'
  | 'object';

/**
 * Set a single querystring param
 * @param name
 * @param defaultValue
 * @returns
 */
export function queryParamStore<Value>(
  name: string,
  page: Readable<Page>,
  defaultValue?: Value,
  paramType?: ParamType
) {
  const store = derived(page, ($page) => {
    const values = $page.url.searchParams.getAll(name);
    return decodeParam(values, paramType) ?? defaultValue;
  });

  /**
   * Apply new value to existing `URLSearchParams`
   */
  function apply(params: URLSearchParams, newValue: Value) {
    //  Do not update querystring with initialValue..
    if (typeof window !== 'undefined') {
      applyParam(params, name, newValue, defaultValue, paramType);
    }
  }

  return {
    subscribe: store.subscribe,
    apply,
  };
}

/**
 * Set all query string params based on object.  Each object property represents a single query param
 * @param defaultValues
 * @returns
 */
export function queryParamsStore<Values extends { [key: string]: any }>(
  page: Readable<Page>,
  defaultValues?: Values,
  paramTypes?: { [key: string]: ParamType } | ((key: keyof Values) => ParamType),
  goto?: (url: string | URL, opts?: any) => any // Matches $app/navigation's goto without dependency - https://kit.svelte.dev/docs/modules#$app-navigation-goto
) {
  const store = derived(page, ($page) => {
    const state = { ...defaultValues };

    // Group by key
    const groupedParams: Map<keyof Values, ValueOf<Values>> = rollup(
      [...$page.url.searchParams],
      (items) => items.map((x) => x[1]),
      [([key, value]) => key]
    );

    for (const [key, values] of groupedParams) {
      const paramType =
        typeof paramTypes === 'function' ? paramTypes(key as string) : paramTypes?.[key as string];

      state[key] = decodeParam(values, paramType);
    }

    return state;
  });

  /**
   * Create new `URLSearchParams` from values and paramTypes mapping
   */
  function createParams(newValues: Values) {
    //  Do not update querystring with initialValue..
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(); // queryParamsStore controls full params so start fresh

      if (newValues != null) {
        Object.entries(newValues).forEach(([key, value]) => {
          const paramType =
            typeof paramTypes === 'function'
              ? paramTypes(key as string)
              : paramTypes?.[key as string];

          applyParam(params, key, value, defaultValues?.[key], paramType);
        });
      }

      return params;
    }
  }

  function createUrl(newValues: Values) {
    if (typeof window !== 'undefined') {
      const params = createParams(newValues);
      const url = new URL(window.location.href);
      url.search = params.toString();
      return url;
    }
  }

  return {
    subscribe: store.subscribe,
    set: (values: Values) => {
      if (goto === undefined) {
        console.error('`goto` must be passed to allow setting URL via store');
      } else {
        const url = createUrl(values);
        goto(url, get(page));
      }
    },
    createParams,
    createUrl,
  };
}

function applyParam(
  params: URLSearchParams,
  key: string,
  value: any,
  defaultValue: any,
  paramType?: ParamType
) {
  const config = getParamConfig(paramType);

  if (isEqual(defaultValue, value)) {
    // Skip - only update param if different from default
  } else if (value == null || (Array.isArray(value) && value.length === 0)) {
    params.delete(key);
  } else {
    params.set(key, config.encode(value));
  }
}

function decodeParam(values: string[], paramType?: ParamType) {
  const config = getParamConfig(paramType);

  return config.decode(values);
}

function getParamConfig(paramType: ParamType) {
  switch (paramType) {
    case 'string':
      return {
        encode: Serialize.encodeString,
        decode: Serialize.decodeString,
      };
    case 'string[]':
      return {
        encode: Serialize.encodeDelimitedArray,
        decode: Serialize.decodeDelimitedArray,
      };
    case 'number':
      return {
        encode: Serialize.encodeNumber,
        decode: Serialize.decodeNumber,
      };
    case 'number[]':
      return {
        encode: Serialize.encodeDelimitedNumericArray,
        decode: Serialize.decodeDelimitedNumericArray,
      };
    case 'boolean':
      return {
        encode: Serialize.encodeBoolean,
        decode: Serialize.decodeBoolean,
      };
    case 'date':
      return {
        encode: Serialize.encodeDate,
        decode: Serialize.decodeDate,
      };
    case 'datetime':
      return {
        encode: Serialize.encodeDateTime,
        decode: Serialize.decodeDateTime,
      };
    case 'json':
      return {
        encode: Serialize.encodeJson,
        decode: Serialize.decodeJson,
      };
    case 'object':
      return {
        encode: Serialize.encodeObject,
        decode: Serialize.decodeObject,
      };
    default:
      throw new Error('No param config found');
  }
}

/**
 *
 * @param params
 * @returns
 */
function stringify(params: URLSearchParams) {
  // Use `encodeURIComponent` instead of `params.toString()` as is more lenient (doesn't encode `(` or `)` where are used )
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
  // https://stackoverflow.com/a/62969380/191902
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}
