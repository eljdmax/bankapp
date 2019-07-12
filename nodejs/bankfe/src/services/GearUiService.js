// @flow

import type { Gear, ActiveGearTalent } from '../domain/Gear';
import * as R from 'ramda';

export const displayVariant = (variant: string) => variant.toUpperCase();

export const displayTrash = (trash: boolean) => {
  return trash ? 'Is trash' : 'Not trash';
};

export const displayActiveTalent = (activeGearTalent: ActiveGearTalent) => {
  return activeGearTalent ? activeGearTalent.name : 'No Talent';
};

export const compareGearBy = (
  f: string[] = ['score'],
  asc: boolean = false,
) => {
  return (a: Gear, b: Gear) => {
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

export const compareGearAttributes = (attributeId: Number[]) => {
  return (a: Gear, b: Gear) => {
    for (let i = 0; i < attributeId.length; i++) {
      let curAttributeId = attributeId[i];
      let aAttrib = R.find(
        R.propSatisfies(x => x.id === curAttributeId, 'attribute'),
      )(a.gearAttributes);

      let bAttrib = R.find(
        R.propSatisfies(x => x.id === curAttributeId, 'attribute'),
      )(b.gearAttributes);

      let aValue = aAttrib === undefined ? -1 : Number(aAttrib.value);
      let bValue = bAttrib === undefined ? -1 : Number(bAttrib.value);

      if (aValue < bValue) {
        return 1;
      }
      if (aValue > bValue) {
        return -1;
      }
    }

    return 0;
  };
};

export const filterGearBy = (value: number, f: string[] = ['type', 'id']) => {
  return (item: any) => {
    return R.path(f, item) === value;
  };
};
