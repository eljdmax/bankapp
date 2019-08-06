// @flow

import * as R from 'ramda';

import type { Weapon } from './Weapon';
import * as validators from './Validators';

export type WeaponService = {
  createWeapon(weaponFields: any): ?Weapon,
  updateTrash(weapon: Weapon, trash: boolean): Weapon,
  updateStar(weapon: Weapon, star: boolean): Weapon,
  isIdValid(id: number): boolean,
  isScoreValid(score: number): boolean,
  isDmgValid(dmg: number): boolean,
  isVariantValid(variant: number): boolean,
};

export const createWeapon = (weaponFields: any): ?Weapon => {
  const {
    id,
    score,
    dmg,
    trash,
    star,
    variant,
    activeTalent,
    passiveTalents,
    builds,
  } = weaponFields;
  return isIdValid(id) &&
    isScoreValid(score) &&
    isDmgValid(dmg) &&
    isVariantValid(variant.id)
    ? Object.freeze({
        id: id,
        score: score,
        dmg: dmg,
        trash: trash,
        star: star,
        variant: variant,
        activeTalent: activeTalent,
        passiveTalents: passiveTalents,
        builds: builds,
      })
    : null;
};

export const updateTrash = (weapon: Weapon, trash: boolean) => {
  const star = trash ? false : weapon.star;
  return validators.isObject(weapon)
    ? Object.freeze({
        ...weapon,
        trash: trash,
        star: star,
      })
    : weapon;
};

export const updateStar = (weapon: Weapon, star: boolean) => {
  const trash = star ? false : weapon.trash;
  return validators.isObject(weapon)
    ? Object.freeze({
        ...weapon,
        trash: trash,
        star: star,
      })
    : weapon;
};

export const isIdValid = (id: number) =>
  R.allPass([validators.isNumber, validators.isGreaterThan(0)])(id);

export const isScoreValid = (score: number) =>
  R.allPass([validators.isNumber, validators.isGreaterThan(0)])(score);

export const isDmgValid = (dmg: number) =>
  R.allPass([
    validators.isNumber,
    //    validators.isGreaterThan(0)
  ])(dmg);

export const isVariantValid = (variantId: number) =>
  R.allPass([validators.isNumber, validators.isGreaterThan(0)])(variantId);

export const WeaponServiceFactory = () => ({
  createWeapon,
  updateTrash,
  updateStar,
  isIdValid,
  isScoreValid,
  isDmgValid,
  isVariantValid,
});

export const weaponService = WeaponServiceFactory();
