import { get, writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { merge } from 'lodash-es';

type BodyMethods = 'arrayBuffer' | 'blob' | 'formData' | 'json' | 'text';

type ResponseMapping = { [mimeType: string]: (res: Response) => Promise<any> };

export type FetchConfig<TData = any> = {
  options?: () => RequestInit;
  disabled?: boolean;
  force?: boolean;
  as?:
    | 'auto'
    | BodyMethods
    | ((response: Response) => Promise<any>)
    | ResponseMapping;
  onDataChange?: (newData: TData, data: TData) => any;
  onResponseChange?: (response: Response) => any;
  once?: boolean;
};

export type FetchState = {
  loading: boolean | undefined;
  data: any;
  error: any;
  request: { url: string; options: RequestInit };
  response: any;
};

export const defaultOptions: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const errors = writable([]);

const DEFAULT_STATE = {
  loading: null,
  data: undefined,
  error: undefined,
  request: undefined,
  response: undefined,
};

export default function fetchStore() {
  const localErrors = writable([]);
  const { subscribe, set, update } = writable<FetchState>(
    { ...DEFAULT_STATE },
    () => {
      return () => {
        // Remove errors from global errors when no longer subscribed (component unmounted which uses store instance)
        removeGlobalErrors(localErrors);
      };
    }
  );

  // Track first data load for `once`
  let loaded = false;

  const promises = [];

  const fetchConfigStore = writable<{ url: string; config?: FetchConfig }>({
    url: '',
  });

  function doFetch(url: string, config?: FetchConfig) {
    const prevFetchConfig = get(fetchConfigStore);

    // Save for refreshing or other building derived requests (ex. exports)
    fetchConfigStore.set({ url, config });

    if (config?.disabled === true || (config?.once && loaded)) {
      // do nothing
    } else if (
      config?.force !== true &&
      url === prevFetchConfig.url &&
      config?.options?.().body === prevFetchConfig?.config?.options?.().body &&
      config?.disabled === prevFetchConfig?.config?.disabled
    ) {
      // skip identifical request as last unless force enabled
      // console.log('skipping...');
    } else {
      const options: RequestInit = merge(defaultOptions, config?.options?.());

      const request = { url, options };

      // Remove local errors from global errors and clear all local errors when loading new request
      removeGlobalErrors(localErrors);
      localErrors.set([]);

      update((currentState) =>
        doUpdate(currentState, { request, loading: true }, null, config)
      );

      const as = config?.as || 'auto';

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
            update((currentState) =>
              doUpdate(currentState, newState, promise, config)
            );
            loaded = true;
          } catch (error) {
            const newState = {
              request,
              loading: false,
              data: response.ok ? error : undefined, // Clear last response
              error: response.ok ? undefined : error,
              response,
            };
            update((currentState) =>
              doUpdate(currentState, newState, promise, config)
            );
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

          update((currentState) =>
            doUpdate(currentState, newState, promise, config)
          );

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
    currentPromise: Promise<any>,
    config?: FetchConfig
  ) {
    if (currentPromise) {
      // Handle (i.e. ignore) promises resolved out of order from requests
      const index = promises.indexOf(currentPromise);
      if (index === -1) {
        // Ignore update as a later request/promise has already been processed
        // console.log('skipping update');
        return currentState;
      }

      // Remove currently resolved promise and any outstanding promises
      // (which will cause them to be ignored when they do resolve/reject)
      promises.splice(0, index + 1);
    }

    let data = undefined;
    if (
      nextState.data &&
      nextState.data !== currentState.data &&
      config?.onDataChange
    ) {
      data = config.onDataChange(nextState.data, currentState.data);
    }

    if (
      nextState.response &&
      nextState.response !== currentState.response &&
      config?.onResponseChange
    ) {
      data = config.onResponseChange(nextState.response);
    }

    // if (isFunction(onChange)) {
    //   // Always call onChange even if unmounted.  Useful for `POST` requests with a redirect
    //   onChange({
    //     ...currentState,
    //     ...nextState,
    //     ...(data !== undefined && { data }),
    //   });
    // }

    const newState = {
      ...currentState,
      ...nextState,
      ...(data !== undefined && { data }), // If `onDataChange` prop returned a value, we use it for data passed down to the children function
    };

    if (newState.error) {
      // Add errors to global `errors` store
      addError(errors, newState.error);

      // Track errors specific to this store instance as well to support removal from global errors on unsubscribe (component unmount)
      addError(localErrors, newState.error);
    }

    // console.log({ newState });
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
      update((currentState) =>
        doUpdate(currentState, { ...DEFAULT_STATE }, null, config)
      );
    },
    fetchConfig: fetchConfigStore,
  };
}

function addError(store: Writable<any[]>, error: any) {
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

function removeGlobalErrors(localErrors: Writable<any[]>) {
  const $localErrors = get(localErrors);
  errors.update(($errors) => $errors.filter((e) => !$localErrors.includes(e)));
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
    mimeType === 'application/json' ||
    mimeType === 'text/json' ||
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
    return 'other' in mapping
      ? mapping['other'](response)
      : response.arrayBuffer();
  }
}
