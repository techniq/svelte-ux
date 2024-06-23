import { setContext, getContext } from 'svelte';
import { writable } from 'svelte/store';
import { merge } from 'lodash-es';

import fetchStore, { initFetchClient } from './fetchStore.js';
import type { FetchConfig } from './fetchStore.js';
import { parse, stringify } from '../utils/json.js';

type ClientConfig = {
  url: string;
  config?: FetchConfig;
};

export type GraphQLError = {
  message: string;
  extensions?: any;
};

const CONTEXT_KEY = Symbol();

export function initGraphClient(config: ClientConfig) {
  setContext(CONTEXT_KEY, config);
  initFetchClient(config.config ?? {});
}

export type QueryConfig = {
  query: string;
  variables?: any;
  config?: FetchConfig;
};

export default function graphStore(baseQueryConfig?: QueryConfig) {
  const globalConfig = getContext<ClientConfig>(CONTEXT_KEY) ?? { url: '/graphql' };
  const { subscribe, fetch, refresh, clear, fetchConfig } = fetchStore();

  // Save for building derived requests (ex. exports)
  const queryConfigStore = writable(baseQueryConfig);

  function doFetch(queryConfig?: QueryConfig) {
    const mergedQueryConfig = merge({}, baseQueryConfig, queryConfig);
    queryConfigStore.set(mergedQueryConfig);

    const { query, variables, config } = mergedQueryConfig;

    // https://github.com/apollographql/graphql-tag/issues/144

    const isMutation = query.toLowerCase().includes('mutation');

    const options: RequestInit = merge(
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json.js',
        },
        body: stringify({ query, variables }),
      },
      globalConfig.config?.options?.(),
      config?.options?.()
    );

    const mergedFetchConfig: FetchConfig = merge(
      { force: isMutation ? true : undefined } as FetchConfig,
      globalConfig.config,
      {
        as: async (res) => {
          // Use custom JSON reviver to convert Date strings to Date objects
          // const body = await res.json();
          const text = await res.text();
          const body = parse(text);
          if (body.errors) {
            throw body.errors;
          } else {
            return body.data;
          }
        },
        options: () => options,
      } as FetchConfig,
      config
    );

    return fetch(globalConfig.url, mergedFetchConfig);
  }

  return {
    subscribe,
    fetch: doFetch,
    refresh,
    clear,
    queryConfig: queryConfigStore,
    fetchConfig,
  };
}

export function gql(strings: TemplateStringsArray, ...args: any[]) {
  return strings.map((s, i) => (i === strings.length - 1 ? `${s}` : `${s}${args[i]}`)).join('');
}
