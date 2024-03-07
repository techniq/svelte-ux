import { describe, it, expect } from 'vitest';

import { nestedSort, sortFunc } from './sort.js';

describe('nestedSort', () => {
  it('basic', () => {
    const data = [
      {
        key: 'Cat1',
        values: [
          {
            key: 'Cat1b',
            values: [
              {
                key: 'Account1b2',
                Actual: 7,
                Budget: 5,
                Variance: 2,
              },
              {
                key: 'Account1b1',
                Actual: 4,
                Budget: 5,
                Variance: -1,
              },
            ],
          },
          {
            key: 'Cat1a',
            values: [
              {
                key: 'Account1a2',
                Actual: 3,
                Budget: 2,
                Variance: 1,
              },
              {
                key: 'Account1a1',
                Actual: 4,
                Budget: 2,
                Variance: 2,
              },
            ],
          },
        ],
      },
    ];

    const expected = [
      {
        key: 'Cat1',
        values: [
          {
            key: 'Cat1a',
            values: [
              {
                key: 'Account1a1',
                Actual: 4,
                Budget: 2,
                Variance: 2,
              },
              {
                key: 'Account1a2',
                Actual: 3,
                Budget: 2,
                Variance: 1,
              },
            ],
          },
          {
            key: 'Cat1b',
            values: [
              {
                key: 'Account1b1',
                Actual: 4,
                Budget: 5,
                Variance: -1,
              },
              {
                key: 'Account1b2',
                Actual: 7,
                Budget: 5,
                Variance: 2,
              },
            ],
          },
        ],
      },
    ];

    const actual = nestedSort(data, sortFunc('key'));
    expect(actual).eql(expected);
  });

  it('basic 2', () => {
    const data = [
      {
        key: 'Cat1',
        values: [
          {
            key: 'Cat1a',
            values: [
              {
                key: 'Account1a1',
                Actual: 4,
                Budget: 2,
                Variance: 2,
              },
              {
                key: 'Account1a2',
                Actual: 3,
                Budget: 2,
                Variance: 1,
              },
            ],
          },
          {
            key: 'Cat1b',
            values: [
              {
                key: 'Account1b1',
                Actual: 4,
                Budget: 5,
                Variance: -1,
              },
              {
                key: 'Account1b2',
                Actual: 7,
                Budget: 5,
                Variance: 2,
              },
            ],
          },
        ],
      },
    ];

    const expected = [
      {
        key: 'Cat1',
        values: [
          {
            key: 'Cat1a',
            values: [
              {
                key: 'Account1a2',
                Actual: 3,
                Budget: 2,
                Variance: 1,
              },
              {
                key: 'Account1a1',
                Actual: 4,
                Budget: 2,
                Variance: 2,
              },
            ],
          },
          {
            key: 'Cat1b',
            values: [
              {
                key: 'Account1b1',
                Actual: 4,
                Budget: 5,
                Variance: -1,
              },
              {
                key: 'Account1b2',
                Actual: 7,
                Budget: 5,
                Variance: 2,
              },
            ],
          },
        ],
      },
    ];

    const actual = nestedSort(data, sortFunc('Actual'));
    expect(actual).eql(expected);
  });
});
