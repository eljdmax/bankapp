// @flow

import v1 from 'uuid';
import * as R from 'ramda';

import type { InternalGearAttribute } from './InternalGearAttribute';
import * as validators from './Validators';

export type InternalGearAttributeService = {
  createInternalGearAttribute(gearAttribute: any): ?InternalGearAttribute,
  updateValue(
    internalGearAttribute: InternalGearAttribute,
    value: number,
  ): InternalGearAttribute,
  isIdValid(id: number): boolean,
};

export const createInternalGearAttribute = (
  gearAttribute: any,
): ?InternalGearAttribute => {
  return isIdValid(gearAttribute.attribute.id)
    ? Object.freeze({
        iid: v1(),
        ga: gearAttribute,
      })
    : null;
};

export const updateValue = (
  internalGearAttribute: InternalGearAttribute,
  value: number,
): InternalGearAttribute => {
  internalGearAttribute.ga.value = value;
  return internalGearAttribute;
};

export const isIdValid = (id: number) =>
  R.allPass([validators.isNumber, validators.isGreaterThan(0)])(id);

export const InternalGearAttributeFactory = () => ({
  createInternalGearAttribute,
  updateValue,
  isIdValid,
});

export const internalGearAttributeService = InternalGearAttributeFactory();
