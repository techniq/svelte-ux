import { describe, it, expect } from 'vitest';

import { getParamConfig } from './queryParamsStore.js';

describe('getParamConfig', () => {
  it('string encode', () => {
    const original = 'example';
    const { encode, decode } = getParamConfig('string');
    const actual = encode(original);
    expect(actual).toEqual(original);
  });

  it('string encode/decode should return same value', () => {
    const original = 'example';
    const { encode, decode } = getParamConfig('string');
    const actual = decode(encode(original));
    expect(actual).toEqual(original);
  });

  it('string[] encode', () => {
    const original = ['one', 'two', 'three'];
    const { encode, decode } = getParamConfig('string[]');
    const actual = encode(original);
    expect(actual).toEqual('one_two_three');
  });

  it('string encode/decode should return same value', () => {
    const original = ['one', 'two', 'three'];
    const { encode, decode } = getParamConfig('string[]');
    const actual = decode(encode(original));
    expect(actual).toEqual(original);
  });

  it('number encode', () => {
    const original = 1234;
    const { encode, decode } = getParamConfig('number');
    const actual = encode(original);
    expect(actual).toEqual('1234');
  });

  it('number encode/decode should return same value', () => {
    const original = 1234;
    const { encode, decode } = getParamConfig('number');
    const actual = decode(encode(original));
    expect(actual).toEqual(original);
  });

  it('number[] encode', () => {
    const original = [1, 2, 3, 4];
    const { encode, decode } = getParamConfig('number[]');
    const actual = encode(original);
    expect(actual).toEqual('1_2_3_4');
  });

  it('number[] encode/decode should return same value', () => {
    const original = [1, 2, 3, 4];
    const { encode, decode } = getParamConfig('number[]');
    const actual = decode(encode(original));
    expect(actual).toEqual(original);
  });

  it('boolean encode', () => {
    const original = true;
    const { encode, decode } = getParamConfig('boolean');
    expect(encode(true)).toEqual('1');
    expect(encode(false)).toEqual('0');
  });

  it('boolean encode/decode should return same value', () => {
    const original = true;
    const { encode, decode } = getParamConfig('boolean');
    const actual = decode(encode(original));
    expect(actual).toEqual(original);
  });

  it('date encode', () => {
    const original = new Date('1982-03-30T00:00:00'); // keep in local time
    const { encode, decode } = getParamConfig('date');
    const actual = encode(original);
    expect(actual).toEqual('1982-03-30');
  });

  it('date encode/decode should return same value', () => {
    const original = new Date('1982-03-30T00:00:00'); // keep in local time
    const { encode, decode } = getParamConfig('date');
    const actual = decode(encode(original));
    expect(actual).toEqual(original);
  });

  it('datetime encode', () => {
    const original = new Date('1982-03-30T00:00:00-05:00');
    const { encode, decode } = getParamConfig('datetime');
    const actual = encode(original);
    expect(actual).toEqual('1982-03-30T05:00:00.000Z');
  });

  it('datetime encode/decode should return same value', () => {
    const original = new Date('1982-03-30T00:00:00-05:00');
    const { encode, decode } = getParamConfig('datetime');
    const actual = decode(encode(original));
    expect(actual).toEqual(original);
  });

  it('json encode', () => {
    const original = {
      number: 1234,
      string: 'example',
      bool: true,
      date: new Date('1982-03-30T00:00:00-05:00'),
    };
    const { encode, decode } = getParamConfig('json');
    const actual = encode(original);
    expect(actual).toEqual(
      '{"number":1234,"string":"example","bool":true,"date":"1982-03-30T05:00:00.000Z"}'
    );
  });

  it('json encode/decode should return same value', () => {
    const original = {
      number: 1234,
      string: 'example',
      bool: true,
      date: new Date('1982-03-30T00:00:00-05:00'),
    };
    const { encode, decode } = getParamConfig('json');
    const actual = decode(encode(original));
    expect(actual).toEqual(original);
  });

  it('object encode', () => {
    const original = {
      number: 1234,
      string: 'example',
      bool: true,
      date: new Date('1982-03-30T00:00:00-05:00'),
    };
    const { encode, decode } = getParamConfig('object');
    const actual = encode(original);
    expect(actual).toEqual(
      'number-1234_string-"example"_bool-true_date-"1982-03-30T05:00:00.000Z"'
    );
  });

  it('object encode/decode should return same value', () => {
    const original = {
      number: 1234,
      string: 'example',
      bool: true,
      date: new Date('1982-03-30T00:00:00-05:00'),
    };
    const { encode, decode } = getParamConfig('object');
    const actual = decode(encode(original));
    expect(actual).toEqual(original);
  });
});
