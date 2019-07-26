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

export const getStatus = (gear: Gear) => {
  if (gear.trash === true) {
    return 'trash';
  }
  if (gear.star === true) {
    return 'star';
  }
  return '';
};

export const displayStatus = (gear: Gear) => {
  let status: String = '';
  status =
    gear.type.name +
    ' ' +
    gear.family.name +
    ' ' +
    gear.score +
    ' ' +
    gear.armor;

  if (gear.builds.length > 0) {
    status +=
      ' [' +
      gear.builds
        .map(build => {
          return build.name;
        })
        .join(' / ') +
      ']';
  }

  return status;
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

export const filterGearArrayBy = (
  value: number,
  f: string[] = ['builds'],
  sf: string = 'id',
) => {
  if (value === 0) {
    return (item: any) => {
      return R.path(f, item).length === 0;
    };
  } else {
    return (item: any) => {
      return (
        R.find(R.propSatisfies(x => x === value, sf))(R.path(f, item)) !==
        undefined
      );
    };
  }
};
