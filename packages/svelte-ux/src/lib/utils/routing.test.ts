import { describe, it, expect } from 'vitest';

import { isActive } from './routing.js';

describe('isActive()', () => {
  it('identifical path', () => {
    const currentUrl = new URL('http://localhost/foo');
    const path = '/foo';
    expect(isActive(currentUrl, path)).true;
  });

  it('identifical path with query string', () => {
    const currentUrl = new URL('http://localhost/foo?one=1');
    const path = '/foo';
    expect(isActive(currentUrl, path)).true;
  });

  it('nested path', () => {
    const currentUrl = new URL('http://localhost/foo/bar');
    const path = '/foo';
    expect(isActive(currentUrl, path)).true;
  });

  it('same prefix but different path', () => {
    const currentUrl = new URL('http://localhost/fo');
    const path = '/foo';
    expect(isActive(currentUrl, path)).false;
  });
});
