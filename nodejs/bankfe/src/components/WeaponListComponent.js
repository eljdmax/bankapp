// @flow

import React from 'react';


import type {Weapon} from "../domain/Weapon";
import {WeaponContainer} from "./WeaponContainer";
import * as weaponUiService from "../services/WeaponUiService";

type Props = {
  weapons: Weapon[]
}


export const WeaponListComponent = (props: Props) => {
  const {weapons} = props;
  
  //weapons.sort( weaponUiService.compareWeaponBy(['id'],true) );
  weapons.sort( weaponUiService.compareWeaponBy() );
  
  return (
    <div>
      {

        weapons.map((weapon: Weapon, index) => (
          <WeaponContainer
            weapon={weapon}
            key={index}
          />
        ))

      }
    </div>
  )
};