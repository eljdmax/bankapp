// @flow

import * as R from 'ramda';

import type {Weapon} from "./Weapon";
import * as validators from "./Validators";


export type WeaponFields = {
  +id: number;
  +score: number;
  +dmg: number;
  +variant: number;
}


export type WeaponService = {
  createWeapon(weaponFields: any): ?Weapon;
  updateTrash(weapon: Weapon, trash: boolean): Weapon;
  isIdValid(id: number): boolean;
  isScoreValid(score: number): boolean;
  isDmgValid(dmg: number): boolean;
  isVariantValid(variant: number): boolean;
}


export const createWeapon = (weaponFields: any): ?Weapon => {
  const {id, score, dmg, variant, activeTalent} = weaponFields;
  return isIdValid(id) && isScoreValid(score) && isDmgValid(dmg) && isVariantValid(variant.id) ?
    Object.freeze({
      id: id,
      score: score,
      dmg: dmg,
      trash: false,
      variant: variant,
	  activeTalent: activeTalent
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
    validators.isNumber
//    validators.isGreaterThan(0)
  ])(dmg);
  
export const isVariantValid = (variantId: number) =>
  R.allPass([
    validators.isNumber,
    validators.isGreaterThan(0)
  ])(variantId);
	

	
export const WeaponServiceFactory = () => ({
  createWeapon,
  updateTrash,
  isIdValid,
  isScoreValid,
  isDmgValid,
  isVariantValid
});
	
export const weaponService = WeaponServiceFactory();