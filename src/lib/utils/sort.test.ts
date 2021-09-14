import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { nestedSort, createPropertySortFunc } from './sort';

const nestedSortTest = suite('nestedSort');

nestedSortTest('basic', async () => {
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

  const actual = nestedSort(data, createPropertySortFunc('key'));
  assert.equal(actual, expected);
});

nestedSortTest('basic', async () => {
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

  const actual = nestedSort(data, createPropertySortFunc('Actual'));
  assert.equal(actual, expected);
});

nestedSortTest.run();
