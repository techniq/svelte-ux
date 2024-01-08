export type DictionaryMessagesOptions = {
  Ok?: string;
  Cancel?: string;

  Date?: {
    Day?: string;
    Week?: string;
    BiWeek?: string;
    Month?: string;
    Quarter?: string;
    CalendarYear?: string;
    FiscalYearOct?: string;
  };
};

type DeepRequired<T> = Required<{
  [K in keyof T]: T[K] extends Required<T[K]> ? Required<T[K]> : DeepRequired<T[K]>;
}>;

export type DictionaryMessages = DeepRequired<DictionaryMessagesOptions>;
