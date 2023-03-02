// See: https://github.com/mattjennings/vite-plugin-sveld/blob/main/types.d.ts

interface SveldProp {
  name: string;
  kind: string;
  type: string;
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
}

interface SveldEvent {
  type: string;
  name: string;
  element: string;
}

interface SveldRestProps {
  type: string;
  name: string;
}

interface SveldTypdefs {
  type: string;
  name: string;
  ts: string;
}

interface SveldJson {
  props: SveldProp[];
  slots: SveldSlot[];
  events: SveldEvent[];
  typedefs: SveldTypedefs[];
  moduleExports: SveldProp[];
  rest_props: SveldRestProps[];
}
