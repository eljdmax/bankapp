// @flow

import React, { Component } from 'react';
import './App.css';

import { WeaponFormContainer } from './components/WeaponFormContainer';
import { WeaponListContainer } from './components/WeaponListContainer';

import * as weaponRestService from './services/WeaponRestService';
import * as listRestService from './services/ListRestService';

import { Banner } from './styles/Banner';
import { MenuContainer } from './components/MenuContainer';
import { LeftMenuContainer } from './components/LeftMenuContainer';
import { SubMenuContainer } from './components/SubMenuContainer';
import { WeaponSettingsContainer } from './components/WeaponSettingsContainer';

weaponRestService.fetchAllWeapons();
listRestService.fetchWeaponVariants();
listRestService.fetchWeaponActiveTalents();
listRestService.fetchWeaponPassiveTalents();
listRestService.setYesNoStore();
listRestService.setFilters();

type Props = {};

class Weapon extends Component<Props> {
  render() {
    return (
      <div className="App">
        <Banner />
        <MenuContainer visibleMenu={2} />
        <SubMenuContainer type={1} />
        <LeftMenuContainer type={1} />
        <WeaponFormContainer />
        <WeaponListContainer />
        <WeaponSettingsContainer />
      </div>
    );
  }
}

export default Weapon;
