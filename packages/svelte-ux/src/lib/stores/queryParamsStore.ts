import { derived, get } from 'svelte/store';
import type { Readable } from 'svelte/store';
import type { Page } from '@sveltejs/kit';
import { isEqual } from 'lodash-es';

import * as Serialize from '../utils/serialize.js';

import rollup from '../utils/rollup.js';
import { entries, type ValueOf } from '../types/typeHelpers.js';

// Matches $app/navigation's goto without dependency - https://kit.svelte.dev/docs/modules#$app-navigation-goto
type Goto = (url: string | URL, opts?: any) => any;

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

export type QueryParamProps<Value> = {
  name: string;
  page: Readable<Page>;
  default?: Value;
  paramType?: ParamType;
  goto?: Goto;
};

/**
 * Set a single querystring param
 */
export function queryParamStore<Value>(props: QueryParamProps<Value>) {
  const store = derived(props.page, ($page) => {
    const values = $page.url.searchParams.getAll(props.name);
    return decodeParam(values, props.paramType) ?? props.default;
  });

  /**
   * Apply new value to existing `URLSearchParams`
   */
  function apply(params: URLSearchParams, newValue: Value) {
    //  Do not update querystring with initialValue..
    if (typeof window !== 'undefined') {
      applyParam(params, props.name, newValue, props.default, props.paramType);
    }
  }

  return {
    subscribe: store.subscribe,
    set: (value: Value) => {
      if (props.goto === undefined) {
        console.error('`goto` must be passed to allow setting URL via store');
      } else {
        const url = new URL(window.location.href);
        apply(url.searchParams, value);
        props.goto(url, get(props.page));
      }
    },
    apply,
  };
}

export type QueryParamsProps<Values> = {
  page: Readable<Page>;
  defaults?: Values;
  paramTypes?: { [key: string]: ParamType } | ((key: keyof Values) => ParamType);
  goto?: Goto;
};

/**
 * Set all query string params based on object.  Each object property represents a single query param
 */
export function queryParamsStore<Values extends { [key: string]: any }>(
  props: QueryParamsProps<Values>
) {
  const store = derived(props.page, ($page) => {
    const state = { ...props.defaults };

    // Group by key
    const groupedParams: Map<keyof Values, ValueOf<Values>> = rollup(
      [...$page.url.searchParams],
      (items) => items.map((x) => x[1]),
      [([key, value]) => key]
    );

    for (const [key, values] of groupedParams) {
      const paramType =
        typeof props.paramTypes === 'function'
          ? props.paramTypes(key as string)
          : props.paramTypes?.[key as string];

      state[key.toString()] = decodeParam(values, paramType);
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
        entries(newValues).forEach(([key, value]) => {
          const paramType =
            typeof props.paramTypes === 'function'
              ? props.paramTypes(key as string)
              : props.paramTypes?.[key as string];

          applyParam(params, key as string, value, props.defaults?.[key], paramType);
        });
      }

      return params;
    }
  }

  function createUrl(newValues: Values) {
    if (typeof window !== 'undefined') {
      const params = createParams(newValues);
      const url = new URL(window.location.href);
      url.search = params?.toString() ?? '';
      return url;
    }
  }

  return {
    subscribe: store.subscribe,
    set: (values: Values) => {
      if (props.goto === undefined) {
        console.error('`goto` must be passed to allow setting URL via store');
      } else {
        const url = createUrl(values);
        if (url) {
          props.goto(url, get(props.page));
        }
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
  if (
    isEqual(defaultValue, value) ||
    value == null ||
    (Array.isArray(value) && value.length === 0)
  ) {
    params.delete(key);
  } else if (paramType) {
    const config = getParamConfig(paramType);
    if (config) {
      // TODO: Add `ParamType` which calls `params.append()` for each value instead of encoding together
      params.set(key, config.encode(value) ?? '');
    }
  }
}

function decodeParam(values: string[], paramType?: ParamType) {
  if (paramType) {
    const config = getParamConfig(paramType);
    return config.decode(values);
  } else {
    return null;
  }
}

export function getParamConfig(paramType: ParamType) {
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
