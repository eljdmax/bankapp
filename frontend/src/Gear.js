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
import { LinkEntityContainer } from './components/LinkEntityContainer';

import { withCookies, Cookies } from 'react-cookie';

type Props = {};

class Gear extends Component<Props> {
  constructor(props: Props) {
    super(props);
    gearRestService.fetchAllGears(this.props.cookies.cookies);
    listRestService.fetchGearTypes(this.props.cookies.cookies);
    listRestService.fetchGearFamilies(this.props.cookies.cookies);
    listRestService.fetchGearAttributeTypes(this.props.cookies.cookies);
    listRestService.fetchGearAttributes(this.props.cookies.cookies);
    listRestService.fetchGearActiveTalents(this.props.cookies.cookies);
    listRestService.fetchGearPassiveTalents(this.props.cookies.cookies);
    listRestService.fetchBuilds(this.props.cookies.cookies);
    listRestService.setYesNoStore();
    listRestService.setFilters();
  }
  render() {
    return (
      <div className="App">
        <Banner />
        <MenuContainer />
        <SubMenuContainer />
        <LeftMenuContainer />
        <GearListContainer cookies={this.props.cookies} />
        <GearFormContainer cookies={this.props.cookies} />
        <GearSettingsContainer />
        <LinkEntityContainer cookies={this.props.cookies} />
      </div>
    );
  }
}

export default withCookies(Gear);
