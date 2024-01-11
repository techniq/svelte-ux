export type DictionaryMessagesOptions = {
  Ok?: string;
  Cancel?: string;

  Date?: {
    Start?: string;
    End?: string;
    Empty?: string;

    Day?: string;
    DayTime?: string;
    Time?: string;
    Week?: string;
    BiWeek?: string;
    Month?: string;
    Quarter?: string;
    CalendarYear?: string;
    FiscalYearOct?: string;

    PeriodDay?: PeriodDayMsg;
    PeriodWeek?: PeriodDayMsg;
    PeriodBiWeek?: PeriodDayMsg;
    PeriodMonth?: PeriodDayMsg;
    PeriodQuarter?: PeriodDayMsg;
    PeriodQuarterSameLastyear?: string;
    PeriodYear?: PeriodDayMsg;
    PeriodFiscalYear?: PeriodDayMsg;
  };
};

export type PeriodDayMsg = {
  Current?: string;
  Last?: string;
  LastX?: string;
};

type DeepRequired<T> = Required<{
  [K in keyof T]: T[K] extends Required<T[K]> ? Required<T[K]> : DeepRequired<T[K]>;
}>;

export type DictionaryMessages = DeepRequired<DictionaryMessagesOptions>;
