// @flow

import v1 from 'uuid';
import * as R from 'ramda';

import type { InternalGearMod } from './InternalGearMod';
import * as validators from './Validators';

export type InternalGearModService = {
  createInternalGearMod(gearMod: any): ?InternalGearMod,
  isIdValid(id: number): boolean,
};

export const createInternalGearMod = (gearMod: any): ?InternalGearMod => {
  return isIdValid(gearMod.id)
    ? Object.freeze({
        iid: v1(),
        mod: gearMod,
      })
    : null;
};

export const isIdValid = (id: number) =>
  R.allPass([validators.isNumber, validators.isGreaterThan(0)])(id);

export const InternalGearModFactory = () => ({
  createInternalGearMod,
  isIdValid,
});

export const internalGearModService = InternalGearModFactory();
