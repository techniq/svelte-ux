import { describe, it, expect } from 'vitest';

import { parse, stringify, reviver } from './json.js';

describe('json', () => {
  it('parse dates', () => {
    expect(reviver('dateOnly', '1982-03-30')).instanceOf(Date);
    expect(reviver('utcDate', '1982-03-30T11:25:59Z')).instanceOf(Date);
    expect(reviver('dateWithOffset', '1982-03-30T11:25:59-04:00')).instanceOf(Date);
    expect(reviver('utcDateWith3Ms', '1982-03-30T11:25:59.123Z')).instanceOf(Date);
    expect(reviver('utcDateWith6Ms', '1982-03-30T11:25:59.1234567Z')).instanceOf(Date);
  });

  it('round trip', () => {
    const original = {
      date: new Date(),
      map: new Map([
        [1, 'one'],
        [2, 'two'],
      ]),
      set: new Set(['one', 'two', 'three']),
      object: {
        one: 1,
        two: 2,
      },
      number: 1234,
      string: 'Hello',
    };
    const actual = parse(stringify(original));

    expect(actual.date).instanceOf(Date);
    expect(actual.date).eql(original.date);

    expect(actual.map).instanceOf(Map);
    expect(actual.map.size).equal(2);
    expect(actual.map).eql(original.map);

    expect(actual.set).instanceOf(Set);
    expect(actual.set.size).equal(3);
    expect(actual.set).eql(original.set);

    expect(actual.object).instanceOf(Object);
    expect(Object.keys(actual.object).length).equal(2);
    expect(actual.object).eql(original.object);

    expect(actual.number).toBeTypeOf('number');
    expect(actual.number).equal(original.number);

    expect(actual.string).toBeTypeOf('string');
    expect(actual.string).equal(original.string);
  });
});
