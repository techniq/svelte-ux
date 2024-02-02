import { describe, it, expect } from 'vitest';

import { sumObjects } from './array';

describe('sumObjects', () => {
  it('Sum array of objects ', () => {
    const values = [
      { one: 1, two: 2, three: 3, extra: 'Hello' },
      { one: 2, two: 4, three: 6 },
      { one: 3, two: 6, four: 4, startDate: new Date() },
    ];

    const actual = sumObjects(values);
    const expected = {
      one: 6,
      two: 12,
      three: 9,
      four: 4,
      extra: 0,
      startDate: 0,
    };

    expect(actual).toEqual(expected);
  });
});
