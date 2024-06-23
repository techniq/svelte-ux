import { getContext, setContext } from 'svelte';
import { get, writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { merge } from 'lodash-es';

type BodyMethods = 'arrayBuffer' | 'blob' | 'formData' | 'json' | 'text';

type ResponseMapping = { [mimeType: string]: (res: Response) => Promise<any> };

export type FetchConfig<TData = any> = {
  options?: () => RequestInit;
  disabled?: boolean;
  force?: boolean;
  as?: 'auto' | BodyMethods | ((response: Response) => Promise<any>) | ResponseMapping;
  onDataChange?: (newData: TData, data: TData) => any;
  onResponseChange?: (response: Response, state: FetchState) => any;
  once?: boolean;

  /**
   * Writable store used to track all errors.  Useful to handle all errors consistently.  Typically passed via initFetchClient
   */
  errors?: Writable<any[]>;
  /**
   * Do not pass errors up to context
   */
  suppressErrors?: boolean;
};

const CONTEXT_KEY = Symbol();

export function initFetchClient(config: FetchConfig<any>) {
  setContext(CONTEXT_KEY, config);
}

export type FetchState = {
  loading: boolean | undefined;
  data: any;
  error: any;
  request: { url: string; options: RequestInit } | undefined;
  response: any;
};

export const defaultOptions: RequestInit = {
  headers: {
    'Content-Type': 'application/json.js',
  },
};

const DEFAULT_STATE = {
  loading: undefined,
  data: undefined,
  error: undefined,
  request: undefined,
  response: undefined,
};

export default function fetchStore() {
  const globalConfig = getContext<FetchConfig>(CONTEXT_KEY);

  const localErrors = writable([]);
  const { subscribe, set, update } = writable<FetchState>({ ...DEFAULT_STATE }, () => {
    return () => {
      // Remove errors from global errors when no longer subscribed (component unmounted which uses store instance)
      removeGlobalErrors(globalConfig?.errors, localErrors);
    };
  });

  // Track first data load for `once`
  let loaded = false;

  const promises: Promise<any>[] = [];

  const fetchConfigStore = writable<{ url: string; config?: FetchConfig }>({
    url: '',
  });

  function doFetch(url: string, config?: FetchConfig) {
    const mergedConfig: FetchConfig = merge({}, globalConfig, config);

    const prevFetchConfig = get(fetchConfigStore);

    // Save for refreshing or other building derived requests (ex. exports)
    fetchConfigStore.set({ url, config: mergedConfig });

    if (
      mergedConfig?.disabled === true ||
      (mergedConfig?.once && loaded && mergedConfig?.force !== true)
    ) {
      // disabled or request already loaded and `once` set (and not forced) - do nothing
    } else if (
      mergedConfig?.force !== true &&
      url === prevFetchConfig.url &&
      mergedConfig?.options?.().body === prevFetchConfig?.config?.options?.().body &&
      mergedConfig?.disabled === prevFetchConfig?.config?.disabled
    ) {
      // skip identifical request as last unless force enabled
    } else {
      const options: RequestInit = merge(
        {},
        defaultOptions,
        globalConfig?.options?.(),
        config?.options?.()
      );

      const request = { url, options };

      // Remove local errors from global errors and clear all local errors when loading new request
      removeGlobalErrors(globalConfig?.errors, localErrors);
      localErrors.set([]);

      update((currentState) =>
        doUpdate(currentState, { request, loading: true }, null, mergedConfig)
      );

      const as = mergedConfig?.as || 'auto';

      const promise = fetch(url, options)
        .then(async (response) => {
          const dataPromise =
            typeof as === 'function'
              ? as(response)
              : typeof as === 'object'
                ? parseBody(response, as)
                : as === 'auto'
                  ? parseBody(response)
                  : response[as]();

          try {
            const data = await dataPromise;

            const newState = {
              request,
              loading: false,
              data: response.ok ? data : undefined, // Clear last response
              error: response.ok ? undefined : data,
              response,
            };
            update((currentState) => doUpdate(currentState, newState, promise, mergedConfig));
            loaded = true;
          } catch (error) {
            const newState = {
              request,
              loading: false,
              data: undefined, // Clear last response
              error: error,
              response,
            };
            update((currentState) => doUpdate(currentState, newState, promise, mergedConfig));
          }
        })
        .catch((error) => {
          // Catch request errors with no response (CORS issues, etc)
          const newState = {
            request,
            data: undefined,
            error,
            loading: false,
          };

          update((currentState) => doUpdate(currentState, newState, promise, mergedConfig));

          // Rethrow so not to swallow errors, especially from errors within handlers (children func / onChange)
          throw error;
        });

      promises.push(promise);

      // TODO: more thought...
      return { subscribe };
    }
  }

  function doUpdate(
    currentState: FetchState,
    nextState: Partial<FetchState>,
    currentPromise: Promise<any> | null,
    config?: FetchConfig
  ) {
    if (currentPromise) {
      // Handle (i.e. ignore) promises resolved out of order from requests
      const index = promises.indexOf(currentPromise);
      if (index === -1) {
        // Ignore update as a later request/promise has already been processed
        return currentState;
      }

      // Remove currently resolved promise and any outstanding promises
      // (which will cause them to be ignored when they do resolve/reject)
      promises.splice(0, index + 1);
    }

    let data = undefined;
    if (nextState.data && nextState.data !== currentState.data && config?.onDataChange) {
      try {
        data = config.onDataChange(nextState.data, currentState.data);
      } catch (err) {
        console.error(err);
      }
    }

    let newState = {
      ...currentState,
      ...nextState,
      ...(data !== undefined && { data }), // If `onDataChange` returned a value, we use it for data passed down to the children function
    };

    if (
      nextState.response &&
      nextState.response !== currentState.response &&
      config?.onResponseChange
    ) {
      try {
        data = config.onResponseChange(nextState.response, newState);
      } catch (err) {
        console.error(err);
      }
    }

    newState = {
      ...newState,
      ...(data !== undefined && { data }), // If `onResponseChange` returned a value, we use it for data passed down to the children function
    };

    // if (isFunction(onChange)) {
    //   // Always call onChange even if unmounted.  Useful for `POST` requests with a redirect
    //   onChange({
    //     ...currentState,
    //     ...nextState,
    //     ...(data !== undefined && { data }),
    //   });
    // }

    if (newState.error && config?.suppressErrors !== true) {
      // Add errors to global `errors` store
      addError(globalConfig?.errors, newState.error);

      // Track errors specific to this store instance as well to support removal from global errors on unsubscribe (component unmount)
      addError(localErrors, newState.error);
    }

    return newState;
  }

  return {
    subscribe,
    fetch: doFetch,
    refresh() {
      const { url, config } = get(fetchConfigStore);
      doFetch(url, { ...config, force: true });
    },
    clear() {
      const { config } = get(fetchConfigStore);
      update((currentState) => doUpdate(currentState, { ...DEFAULT_STATE }, null, config));
    },
    fetchConfig: fetchConfigStore,
  };
}

function addError(store: Writable<any[]> | undefined, error: any) {
  if (store) {
    store.update((current) => {
      const result = [...current];

      if (Array.isArray(error)) {
        error.forEach((e) => result.push(e));
      } else {
        result.push(error);
      }

      return result;
    });
  }
}

function removeGlobalErrors(
  globalErrors: Writable<any[]> | undefined,
  localErrors: Writable<any[]>
) {
  if (globalErrors) {
    const $localErrors = get(localErrors);
    globalErrors.update(($errors) => $errors.filter((e) => !$localErrors.includes(e)));
  }
}

function parseBody(response: Response, mapping: ResponseMapping = {}) {
  const contentType = response.headers.get('Content-Type');

  // Do not attempt to parse empty response
  if (contentType === null) {
    return Promise.resolve(null);
  }

  const mimeType = contentType.split(';')[0].trim();

  if (mimeType in mapping) {
    // Direct mapping of `Content-Type`/`mimeType` to response handler
    return mapping[mimeType](response);
  } else if (
    mimeType === 'application/json.js' ||
    mimeType === 'text/json.js' ||
    /\+json$/.test(mimeType) // ends with "+json"
  ) {
    // https://mimesniff.spec.whatwg.org/#json-mime-type
    return 'json' in mapping ? mapping['json'](response) : response.json();
  } else if (mimeType === 'text/html') {
    // https://mimesniff.spec.whatwg.org/#html-mime-type
    return 'html' in mapping ? mapping['html'](response) : response.text();
  } else if (
    mimeType === 'application/xml' ||
    mimeType === 'text/xml' ||
    /\+xml$/.test(mimeType) // ends with "+xml"
  ) {
    // https://mimesniff.spec.whatwg.org/#xml-mime-type
    return 'xml' in mapping ? mapping['xml'](response) : response.text();
  } else {
    return 'other' in mapping ? mapping['other'](response) : response.arrayBuffer();
  }
}
