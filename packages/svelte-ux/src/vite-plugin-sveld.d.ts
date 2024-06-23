// Copied from: https://github.com/mattjennings/vite-plugin-sveld/blob/main/types.d.ts

declare module 'vite-plugin-sveld' {
  export default function sveld(): {
    name: string;
    transform: (
      src: string,
      id: string
    ) => Promise<{
      code: string;
      map: any;
    }>;
  };
}

declare module '*.svelte?raw&sveld' {
  interface SveldProp {
    name: string;
    kind: 'let' | 'const' | 'function';
    constant: boolean;
    type?: string;
    value?: any;
    description?: string;
    isFunction: boolean;
    isFunctionDeclaration: boolean;
    isRequired: boolean;
    reactive: boolean;
  }

  interface SveldSlot {
    name?: string;
    default: boolean;
    fallback?: string;
    slot_props?: string;
    description?: string;
  }

  interface ForwardedEvent {
    type: 'forwarded';
    name: string;
    element: ComponentInlineElement | ComponentElement;
  }

  interface DispatchedEvent {
    type: 'dispatched';
    name: string;
    detail?: any;
    description?: string;
  }

  type SvelteEvent = ForwardedEvent | DispatchedEvent;

  interface SveldRestProps {
    type: 'InlineComponent' | 'Element';
    name: string;
  }

  interface SveldTypedefs {
    type: string;
    name: string;
    description?: string;
    ts: string;
  }

  interface SveldJson {
    props: SveldProp[];
    slots: SveldSlot[];
    events: SveldEvent[];
    typedefs: SveldTypedefs[];
    rest_props: SveldRestProps;
    moduleExports: SveldProp[];
    componentComment?: string;
    extends?: {
      interface: string;
      import: string;
    };
  }

  const json: SveldJson;

  export default json;
}
