// @flow

import React, { Component } from 'react';

import type { Weapon } from '../domain/Weapon';
import type { WeaponService } from '../domain/WeaponService';
import type { WeaponStore } from '../store/WeaponStore';
import { weaponService } from '../domain/WeaponService';
import {
  weaponStore,
  weaponEditStore,
  weaponLinkStore,
} from '../store/WeaponStore';
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
    weaponRestService.postUpdateWeapon(
      this.props.cookies.cookies,
      updatedWeapon.id,
      {
        score: updatedWeapon.score,
        dmg: updatedWeapon.dmg,
        variant: updatedWeapon.variant.id,
        trash: updatedWeapon.trash,
        star: updatedWeapon.star,
      },
    );
  }

  toggleStar(weapon: Weapon) {
    const updatedWeapon = this.weaponService.updateStar(weapon, !weapon.star);
    weaponRestService.postUpdateWeapon(
      this.props.cookies.cookies,
      updatedWeapon.id,
      {
        score: updatedWeapon.score,
        dmg: updatedWeapon.dmg,
        variant: updatedWeapon.variant.id,
        trash: updatedWeapon.trash,
        star: updatedWeapon.star,
      },
    );
  }

  removeWeapon(weapon: Weapon) {
    weaponRestService.deleteWeapon(this.props.cookies.cookies, weapon);
  }

  editWeapon(weapon: Weapon) {
    weaponEditStore.addWeapon(weapon);
  }

  linkWeapon(weapon: Weapon) {
    weaponLinkStore.addWeapon(weapon);
  }

  render() {
    return (
      <WeaponComponent
        weapon={this.props.weapon}
        viewFilter={this.props.viewFilter}
        toggleTrash={(weapon: Weapon) => this.toggleTrash(weapon)}
        toggleStar={(weapon: Weapon) => this.toggleStar(weapon)}
        editWeapon={(weapon: Weapon) => this.editWeapon(weapon)}
        deleteWeapon={(weapon: Weapon) => this.removeWeapon(weapon)}
        linkWeapon={(weapon: Weapon) => this.linkWeapon(weapon)}
      />
    );
  }
}
