// @flow

import React, { Component } from 'react';

import './App.css';

import { GearFormContainer } from './components/GearFormContainer';
import { GearListContainer } from './components/GearListContainer';

import * as gearRestService from './services/GearRestService';
import * as listRestService from './services/ListRestService';

import { Banner } from './styles/Banner';
import { MenuContainer } from './components/MenuContainer';
import { LeftMenuContainer } from './components/LeftMenuContainer';
import { SubMenuContainer } from './components/SubMenuContainer';
import { GearSettingsContainer } from './components/GearSettingsContainer';

gearRestService.fetchAllGears();
listRestService.fetchGearTypes();
listRestService.fetchGearFamilies();
listRestService.fetchGearAttributeTypes();
listRestService.fetchGearAttributes();
listRestService.fetchGearActiveTalents();
listRestService.fetchGearPassiveTalents();
listRestService.setYesNoStore();
listRestService.setFilters();

type Props = {};

class Gear extends Component<Props> {
  render() {

    return (
      <div className="App">
        <Banner />
        <MenuContainer />
        <SubMenuContainer />
        <LeftMenuContainer />
        <GearListContainer />
        <GearFormContainer />
        <GearSettingsContainer />
      </div>
    );
  }
}

export default Gear;
