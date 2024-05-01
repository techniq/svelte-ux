import { describe, it, expect } from 'vitest';
import { addHours, subHours } from 'date-fns';

import { expireObject, omit, omitNil, pick } from './object.js';

describe('expireObject', () => {
  it('simple value not expired', () => {
    const original = 123;
    const expiry = addHours(new Date(), 1);

    const actual = expireObject(original, expiry);
    expect(actual).equal(original);
  });

  it('simple value expired', () => {
    const original = 123;
    const expiry = subHours(new Date(), 1);

    const actual = expireObject(original, expiry);
    expect(actual).toBeNull();
  });

  it('Date not expired', () => {
    const original = new Date();
    const expiry = addHours(new Date(), 1);

    const actual = expireObject(original, expiry);
    expect(actual).equal(original);
  });

  it('Date expired', () => {
    const original = new Date();
    const expiry = subHours(new Date(), 1);

    const actual = expireObject(original, expiry);
    expect(actual).toBeNull();
  });

  it('full object not expired', () => {
    const original = {
      one: 1,
      two: 2,
      three: 3,
    };
    const expiry = addHours(new Date(), 1);

    const actual = expireObject(original, expiry);
    expect(actual).equal(original);
  });

  it('full object expired', () => {
    const original = {
      one: 1,
      two: 2,
      three: 3,
    };
    const expiry = subHours(new Date(), 1);

    const actual = expireObject(original, expiry);
    expect(actual).toBeNull();
  });

  it('partial object expired', () => {
    const original = {
      one: 1,
      two: 2,
      three: 3,
    };
    const expiry = {
      two: subHours(new Date(), 1),
    };

    const actual = expireObject(original, expiry);
    const expected = {
      one: 1,
      three: 3,
    };
    expect(actual).equal(original);

    // Test cleaning up expiry
    const expiryActual = expireObject(expiry, expiry);
    expect(expiryActual).toBeNull();
  });

  it('partial object expired with default', () => {
    const original = {
      one: 1,
      two: 2,
      three: 3,
    };
    const expiry = {
      one: subHours(new Date(), 3),
      two: addHours(new Date(), 1),
      $default: subHours(new Date(), 1),
    };

    const actual = expireObject(original, expiry);
    const expected = {
      two: 2,
    };
    expect(actual).eql(expected);

    // Test cleaning up expiry
    const expiryActual = expireObject(expiry, expiry);
    expect(expiryActual).eql({ two: expiry.two });
  });

  it('extra property expiry not in object', () => {
    const original = {
      one: 1,
      two: 2,
      three: 3,
    };
    const expiry = {
      one: subHours(new Date(), 3),
      two: addHours(new Date(), 1),
      four: subHours(new Date(), 1),
    };

    const actual = expireObject(original, expiry);
    const expected = {
      two: 2,
      three: 3,
    };
    expect(actual).eql(expected);

    // Test cleaning up expiry
    const expiryActual = expireObject(expiry, expiry);
    expect(expiryActual).eql({ two: expiry.two });
  });

  it('expired object property', () => {
    const original = {
      one: {
        foo: 1,
        bar: 2,
      },
      two: 2,
      three: 3,
    };
    const expiry = {
      one: subHours(new Date(), 3),
      two: addHours(new Date(), 1),
    };

    const actual = expireObject(original, expiry);
    const expected = {
      two: 2,
      three: 3,
    };
    expect(actual).eql(expected);

    // Test cleaning up expiry
    const expiryActual = expireObject(expiry, expiry);
    expect(expiryActual).eql({ two: expiry.two });
  });

  it('expired nested object property', () => {
    const original = {
      one: {
        foo: 1,
        bar: 2,
      },
      two: 2,
      three: 3,
    };
    const expiry = {
      one: {
        foo: subHours(new Date(), 3),
      },
      two: addHours(new Date(), 1),
    };

    const actual = expireObject(original, expiry);
    const expected = {
      one: {
        bar: 2,
      },
      two: 2,
      three: 3,
    };
    expect(actual).eql(expected);

    // Test cleaning up expiry
    const expiryActual = expireObject(expiry, expiry);
    expect(expiryActual).eql({ two: expiry.two });
  });

  it('removes $default expiry if expired', () => {
    const expiry = {
      one: addHours(new Date(), 1),
      $default: subHours(new Date(), 1),
    };

    // Test cleaning up expiry
    const expiryActual = expireObject(expiry, expiry);
    expect(expiryActual).eql({ one: expiry.one });
  });
});

describe('omit', () => {
  it('remove single property', () => {
    const original = { one: 1, two: 2, three: 3 };

    const actual = omit(original, ['three']);
    expect(actual).eql({ one: 1, two: 2 });
  });
});

describe('omitNil', () => {
  it('removes null values', () => {
    const original = { one: 1, two: null, three: 3 };

    const actual = omitNil(original);
    expect(actual).eql({ one: 1, three: 3 });
  });

  it('removes undefined values', () => {
    const original = { one: 1, two: undefined, three: 3 };

    const actual = omitNil(original);
    expect(actual).eql({ one: 1, three: 3 });
  });
});

describe('pick', () => {
  it('pick single property', () => {
    const original = { one: 1, two: 2, three: 3 };

    const actual = pick(original, ['one']);
    expect(actual).eql({ one: 1 });
  });

  it('pick multiple properties', () => {
    const original = { one: 1, two: 2, three: 3 };

    const actual = pick(original, ['two', 'three']);
    expect(actual).eql({ two: 2, three: 3 });
  });
});
