// @flow

import React, { Component } from 'react';

import './App.css';

import { GearFormContainer } from './components/GearFormContainer';
import { GearListContainer } from './components/GearListContainer';

import * as gearRestService from './services/GearRestService';
import * as listRestService from './services/ListRestService';

import { Banner } from './styles/Banner';
import { Modal, Loading } from './styles/Body';
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

    this.loadedResources = {};
    this.totalLoaded = 0;

    this.state = {
      ready: false,
    };

    gearRestService.fetchAllGears(this.props.cookies.cookies, r =>
      this.updateLoadedResource(r),
    );
    listRestService.fetchGearTypes(this.props.cookies.cookies, r =>
      this.updateLoadedResource(r),
    );
    listRestService.fetchGearFamilies(this.props.cookies.cookies, r =>
      this.updateLoadedResource(r),
    );
    listRestService.fetchGearAttributeTypes(this.props.cookies.cookies);
    listRestService.fetchGearAttributes(this.props.cookies.cookies);
    listRestService.fetchGearActiveTalents(this.props.cookies.cookies);
    listRestService.fetchGearPassiveTalents(this.props.cookies.cookies);
    listRestService.fetchBuilds(this.props.cookies.cookies);
    listRestService.setYesNoStore();
    listRestService.setFilters();
  }

  updateLoadedResource(resource: String) {
    if (!this.loadedResources[resource]) {
      this.loadedResources[resource] = 1;
      this.totalLoaded += 1;
    }

    if (this.totalLoaded > 2 && !this.state.ready) {
      this.setState({ ready: true });
    }
  }

  render() {
    if (!this.state.ready) {
      return (
        <div className="App">
          <Banner />
          <MenuContainer />
          <SubMenuContainer />
          <LeftMenuContainer />
          <Loading />
        </div>
      );
    }

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
