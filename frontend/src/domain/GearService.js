// @flow

import * as R from 'ramda';

import type { Gear } from './Gear';
import * as validators from './Validators';

export type GearService = {
  createGear(gearFields: any): ?Gear,
  updateTrash(gear: Gear, trash: boolean): Gear,
  updateStar(gear: Gear, star: boolean): Gear,
  isIdValid(id: number): boolean,
  isScoreValid(score: number): boolean,
  isArmorValid(armor: number): boolean,
  isTypeValid(type: number): boolean,
  isFamilyValid(family: number): boolean,
};

export const createGear = (gearFields: any): ?Gear => {
  const {
    id,
    score,
    armor,
    trash,
    star,
    type,
    family,
    activeTalent,
    passiveTalents,
    gearAttributes,
    gearMods,
    builds,
  } = gearFields;
  return isIdValid(id) &&
    isScoreValid(score) &&
    isArmorValid(armor) &&
    isTypeValid(type.id) &&
    isFamilyValid(family.id)
    ? Object.freeze({
        id: id,
        score: score,
        armor: armor,
        trash: trash,
        star: star,
        type: type,
        family: family,
        activeTalent: activeTalent,
        passiveTalents: passiveTalents,
        gearAttributes: gearAttributes,
        gearMods: gearMods,
        builds: builds,
      })
    : null;
};

export const updateTrash = (gear: Gear, trash: boolean) => {
  const star = trash ? false : gear.star;
  return validators.isObject(gear)
    ? Object.freeze({
        ...gear,
        trash: trash,
        star: star,
      })
    : gear;
};

export const updateStar = (gear: Gear, star: boolean) => {
  const trash = star ? false : gear.trash;
  return validators.isObject(gear)
    ? Object.freeze({
        ...gear,
        star: star,
        trash: trash,
      })
    : gear;
};

export const isIdValid = (id: number) =>
  R.allPass([validators.isNumber, validators.isGreaterThan(0)])(id);

export const isScoreValid = (score: number) =>
  R.allPass([validators.isNumber, validators.isGreaterThan(0)])(score);

export const isArmorValid = (armor: number) =>
  R.allPass([validators.isNumber])(armor);

export const isTypeValid = (typeId: number) =>
  R.allPass([validators.isNumber, validators.isGreaterThan(0)])(typeId);

export const isFamilyValid = (familyId: number) =>
  R.allPass([validators.isNumber, validators.isGreaterThan(0)])(familyId);

export const GearServiceFactory = () => ({
  createGear,
  updateTrash,
  updateStar,
  isIdValid,
  isScoreValid,
  isArmorValid,
  isTypeValid,
  isFamilyValid,
});

export const gearService = GearServiceFactory();
