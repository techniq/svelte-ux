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
    kind: string;
    type?: string;
    isFunction: boolean;
    isFunctionDeclaration: boolean;
    isRequired: boolean;
    constant: boolean;
    reactive: boolean;
  }

  interface SveldSlot {
    name: string;
    default: boolean;
    fallback: string;
    slot_props: string;
    description?: string;
  }

  interface SveldEvent {
    type: string;
    name: string;
    element: string;
    description?: string;
  }

  interface SveldRestProps {
    type: string;
    name: string;
  }

  interface SveldTypedefs {
    type: string;
    name: string;
    ts: string;
  }

  interface SveldModuleExport {
    name: string;
    kind: string;
    type?: string;
    value: string;
    isFunction: boolean;
    isFunctionDeclaration: boolean;
    isRequired: boolean;
    constant: boolean;
    reactive: boolean;
  }

  interface SveldJson {
    props: SveldProp[];
    slots: SveldSlot[];
    events: SveldEvent[];
    typedefs: SveldTypedefs[];
    rest_props: SveldRestProps[];
    moduleExports: SveldModuleExport[];
    componentComment?: string;
    extends?: {
      interface: string;
      import: string;
    };
  }

  const json: SveldJson;

  export default json;
}
