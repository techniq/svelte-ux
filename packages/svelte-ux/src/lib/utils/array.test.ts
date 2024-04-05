import { describe, it, expect } from 'vitest';

import { sumObjects } from './array.js';

describe('sumObjects', () => {
  it('Sum array of objects ', () => {
    const values = [
      { one: 1, two: 2, three: '3', extra: 'Hello' },
      { one: 2, two: '4', three: 6 },
      { one: null, two: null, three: null, four: null },
      { one: NaN, two: NaN, three: NaN, four: NaN },
      { one: 'NaN', two: 'NaN', three: 'NaN', four: 'NaN' },
      { one: '3', two: 6, four: '4', startDate: new Date('2024-04-05T20:58:04.000Z') },
    ];

    const actual = sumObjects(values);
    const expected = {
      one: 6,
      two: 12,
      three: 9,
      four: 4,
      extra: 0,
      startDate: 1712350684000,
    };

    expect(actual).toEqual(expected);
  });
});
