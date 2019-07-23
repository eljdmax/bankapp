// @flow

export const isObject = (toValidate: any) => !!(toValidate && typeof toValidate === 'object');

export const isString = (toValidate: any) => typeof toValidate === 'string';

export const isNumber = (toValidate: any) => typeof toValidate === 'number';

export const isLengthGreaterThan = (length: number) => (toValidate: string) => toValidate.length > length;

export const isGreaterThan = (value: number) => (toValidate: number) => toValidate > value;
