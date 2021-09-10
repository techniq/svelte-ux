import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { addHours, subHours } from 'date-fns';

import { expireObject } from './object';

const expireObjectTest = suite('expireObject');

expireObjectTest('simple value not expired', () => {
  const original = 123;
  const expiry = addHours(new Date(), 1);

  const actual = expireObject(original, expiry);
  assert.equal(actual, original);
});

expireObjectTest('simple value expired', () => {
  const original = 123;
  const expiry = subHours(new Date(), 1);

  const actual = expireObject(original, expiry);
  assert.equal(actual, null);
});

expireObjectTest('Date not expired', () => {
  const original = new Date();
  const expiry = addHours(new Date(), 1);

  const actual = expireObject(original, expiry);
  assert.equal(actual, original);
});

expireObjectTest('Date expired', () => {
  const original = new Date();
  const expiry = subHours(new Date(), 1);

  const actual = expireObject(original, expiry);
  assert.equal(actual, null);
});

expireObjectTest('full object not expired', () => {
  const original = {
    one: 1,
    two: 2,
    three: 3,
  };
  const expiry = addHours(new Date(), 1);

  const actual = expireObject(original, expiry);
  assert.equal(actual, original);
});

expireObjectTest('full object expired', () => {
  const original = {
    one: 1,
    two: 2,
    three: 3,
  };
  const expiry = subHours(new Date(), 1);

  const actual = expireObject(original, expiry);
  assert.equal(actual, null);
});

expireObjectTest('partial object expired', () => {
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
  assert.equal(actual, expected);

  // Test cleaning up expiry
  const expiryActual = expireObject(expiry, expiry);
  assert.equal(expiryActual, null);
});

expireObjectTest('partial object expired with default', () => {
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
  assert.equal(actual, expected);

  // Test cleaning up expiry
  const expiryActual = expireObject(expiry, expiry);
  assert.equal(expiryActual, {
    two: expiry.two,
  });
});

expireObjectTest('extra property expiry not in object', () => {
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
  assert.equal(actual, expected);

  // Test cleaning up expiry
  const expiryActual = expireObject(expiry, expiry);
  assert.equal(expiryActual, {
    two: expiry.two,
  });
});

expireObjectTest('expired object property', () => {
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
  assert.equal(actual, expected);

  // Test cleaning up expiry
  const expiryActual = expireObject(expiry, expiry);
  assert.equal(expiryActual, {
    two: expiry.two,
  });
});

expireObjectTest('expired nested object property', () => {
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
  assert.equal(actual, expected);

  // Test cleaning up expiry
  const expiryActual = expireObject(expiry, expiry);
  assert.equal(expiryActual, {
    two: expiry.two,
  });
});

expireObjectTest('removes $default expiry if expired', () => {
  const expiry = {
    one: addHours(new Date(), 1),
    $default: subHours(new Date(), 1),
  };

  // Test cleaning up expiry
  const expiryActual = expireObject(expiry, expiry);
  assert.equal(expiryActual, {
    one: expiry.one,
  });
});

expireObjectTest.run();
