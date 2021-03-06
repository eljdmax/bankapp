// @flow

import type { Weapon, ActiveWeaponTalent } from '../domain/Weapon';
import * as R from 'ramda';

export const displayVariant = (variant: string) => variant.toUpperCase();

export const displayTrash = (trash: boolean) => {
  return trash ? 'Is trash' : 'Not trash';
};

export const displayActiveTalent = (activeWeaponTalent: ActiveWeaponTalent) => {
  return activeWeaponTalent ? activeWeaponTalent.name : 'No Talent';
};

export const compareWeaponBy = (
  f: string[] = ['dmg'],
  asc: boolean = false,
) => {
  return (a: Weapon, b: Weapon) => {
    let order = asc ? -1 : 1;

    if (R.path(f, a) < R.path(f, b)) {
      return order;
    }
    if (R.path(f, a) > R.path(f, b)) {
      return -1 * order;
    }
    return 0;
  };
};

export const filterWeaponBy = (
  value: number,
  f: string[] = ['variant', 'family'],
) => {
  return (item: any) => {
    return R.path(f, item) === value;
  };
};
