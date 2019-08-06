// @flow

import React from 'react';

import type { Weapon } from '../domain/Weapon';
import { WeaponContainer } from './WeaponContainer';
import * as weaponUiService from '../services/WeaponUiService';

import { MainMenu, MainRow } from '../styles/MainMenu';

type Props = {
  weapons: Weapon[],
  weaponFamily: number,
  viewFilter: any,
  extraFilter: any,
  orderFilter: any,
  cookies: any,
};

export const WeaponListComponent = (props: Props) => {
  const {
    weapons,
    weaponFamily,
    viewFilter,
    extraFilter,
    orderFilter,
    cookies,
  } = props;

  //weapons.sort( weaponUiService.compareWeaponBy(['id'],true) );
  let filteredWeapons = weapons.filter(
    weaponUiService.filterWeaponBy(weaponFamily.id),
  );

  if (extraFilter.trash !== '') {
    filteredWeapons = filteredWeapons.filter(
      weaponUiService.filterWeaponBy(extraFilter.trash, ['trash']),
    );
  }

  /*
  let orderArray = [];
  if (orderFilter.by !== '') {
    orderArray.push(orderFilter.by);
  }
  if (orderFilter.thenBy !== '') {
    orderArray.push(orderFilter.thenBy);
  }

  if (orderArray.push.length > 0) {
    filteredWeapons.sort(weaponUiService.comparebyDmg(orderArray));
  } else {
    filteredWeapons.sort(weaponUiService.compareWeaponBy());
  }
  */

  filteredWeapons.sort(weaponUiService.compareWeaponBy());

  return (
    <MainMenu>
      {filteredWeapons.map((weapon: Weapon, index) => (
        <MainRow key={index} keyIndex={index}>
          <WeaponContainer
            weapon={weapon}
            key={index}
            viewFilter={viewFilter}
            cookies={cookies}
          />
        </MainRow>
      ))}
    </MainMenu>
  );
};
