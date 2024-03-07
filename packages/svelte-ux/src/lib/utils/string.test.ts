import { describe, it, expect } from 'vitest';

import { toTitleCase } from './string.js';

describe('toTitleCase()', () => {
  it('basic', () => {
    const original = 'this is a test';
    const expected = 'This is a Test';
    expect(toTitleCase(original)).equal(expected);
  });

  it('basic', () => {
    const original = 'A long time ago';
    const expected = 'A Long Time Ago';
    expect(toTitleCase(original)).equal(expected);
  });
});
