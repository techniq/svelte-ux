import { setContext, getContext } from 'svelte';
import { writable } from 'svelte/store';
import { print } from 'graphql';
import type { DocumentNode } from 'graphql';
import { merge } from 'lodash-es';

import fetchStore from './fetchStore';
import type { FetchConfig } from './fetchStore';

type ClientConfig = {
  url: string;
  config?: FetchConfig;
};

export type GraphQLError = {
  message: string;
  extensions?: any;
};

const CONTEXT_KEY = {};

export function initGraphClient(config: ClientConfig) {
  setContext(CONTEXT_KEY, config);
}

export type QueryConfig = {
  query?: string | DocumentNode;
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
    const queryAsString = typeof query === 'object' ? print(query) : query;

    const options: RequestInit = merge(
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: queryAsString, variables }),
      },
      globalConfig.config?.options?.(),
      config?.options?.()
    );

    const mergedFetchConfig: FetchConfig = merge(
      {},
      globalConfig.config,
      {
        as: async (res) => {
          const body = await res.json();
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
