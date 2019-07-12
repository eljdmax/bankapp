// @flow

import React, { Component } from 'react';

import type { Weapon } from '../domain/Weapon';
import type { WeaponService } from '../domain/WeaponService';
import type { WeaponStore } from '../store/WeaponStore';
import { weaponService } from '../domain/WeaponService';
import { weaponStore, weaponEditStore } from '../store/WeaponStore';
import { WeaponComponent } from './WeaponComponent';
import * as weaponRestService from '../services/WeaponRestService';

type Props = {
  weapon: Weapon,
  viewFilter: any,
};

export class WeaponContainer extends Component<Props> {
  weaponStore: WeaponStore;
  weaponService: WeaponService;

  constructor(props: Props) {
    super(props);
    this.weaponStore = weaponStore;
    this.weaponService = weaponService;
  }

  toggleTrash(weapon: Weapon) {
    const updatedWeapon = this.weaponService.updateTrash(weapon, !weapon.trash);
    this.weaponStore.updateWeapon(updatedWeapon);
  }

  removeWeapon(weapon: Weapon) {
    weaponRestService.deleteWeapon(weapon);
  }

  editWeapon(weapon: Weapon) {
    weaponEditStore.addWeapon(weapon);
  }

  render() {
    return (
      <WeaponComponent
        weapon={this.props.weapon}
        viewFilter={this.props.viewFilter}
        toggleTrash={(weapon: Weapon) => this.toggleTrash(weapon)}
        editWeapon={(weapon: Weapon) => this.editWeapon(weapon)}
        deleteWeapon={(weapon: Weapon) => this.removeWeapon(weapon)}
      />
    );
  }
}
