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

    PeriodeDay?: PeriodeDayMsg;
    PeriodeWeek?: PeriodeDayMsg;
    PeriodeBiWeek?: PeriodeDayMsg;
    PeriodeMonth?: PeriodeDayMsg;
    PeriodeQuarter?: PeriodeDayMsg;
    PeriodeQuarterSameLastyear?: string;
    PeriodeYear?: PeriodeDayMsg;
    PeriodeFiscalYear?: PeriodeDayMsg;
  };
};

export type PeriodeDayMsg = {
  Current?: string;
  Last?: string;
  LastX?: string;
};

type DeepRequired<T> = Required<{
  [K in keyof T]: T[K] extends Required<T[K]> ? Required<T[K]> : DeepRequired<T[K]>;
}>;

export type DictionaryMessages = DeepRequired<DictionaryMessagesOptions>;
