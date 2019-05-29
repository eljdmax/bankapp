// @flow

import * as R from 'ramda';

import type {Weapon} from "./Weapon";
import * as validators from "./Validators";


export type WeaponFields = {
  +id: number;
  +score: number;
  +dmg: number;
  +variant: string;
}


export type WeaponService = {
  createWeapon(weaponFields: WeaponFields): ?Weapon;
  updateTrash(weapon: Weapon, trash: boolean): Weapon;
  setId(weapon:Weapon, id: number): Weapon;
  isIdValid(id: number): boolean;
  isScoreValid(score: number): boolean;
  isDmgValid(dmg: number): boolean;
  isVariantValid(variant: string): boolean;
}


export const createWeapon = (weaponFields: WeaponFields): ?Weapon => {
  const {id, score, dmg, variant} = weaponFields;
  return isIdValid(id) && isScoreValid(score) && isDmgValid(dmg) && isVariantValid(variant) ?
    Object.freeze({
      id: id,
      score: score,
      dmg: dmg,
      trash: false,
      variant: variant
    }) :
    null;
};


export const updateTrash = (weapon: Weapon, trash: boolean) =>
  validators.isObject(weapon) ?
    Object.freeze({
      ...weapon,
      trash : trash
    }) :
    weapon;

export const setId = (weapon: Weapon, id: number) =>
  isIdValid(id) ?
    Object.freeze({
      ...weapon,
      id : id
    }) :
    weapon;

export const isIdValid = (id: number) =>
  R.allPass([
    validators.isNumber,
    validators.isGreaterThan(0)
  ])(id);
	
export const isScoreValid = (score: number) =>
  R.allPass([
    validators.isNumber,
    validators.isGreaterThan(0)
  ])(score);

export const isDmgValid = (dmg: number) =>
  R.allPass([
    validators.isNumber,
    validators.isGreaterThan(0)
  ])(dmg);
  
export const isVariantValid = (variant: string) =>
  R.allPass([
    validators.isString,
    validators.isLengthGreaterThan(0)
  ])(variant);
	

	
export const WeaponServiceFactory = () => ({
  createWeapon,
  updateTrash,
  setId,
  isIdValid,
  isScoreValid,
  isDmgValid,
  isVariantValid
});
	
export const weaponService = WeaponServiceFactory();