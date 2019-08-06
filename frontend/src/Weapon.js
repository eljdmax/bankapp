// @flow

import React, { Component } from 'react';
import './App.css';

import { WeaponFormContainer } from './components/WeaponFormContainer';
import { WeaponListContainer } from './components/WeaponListContainer';

import * as weaponRestService from './services/WeaponRestService';
import * as listRestService from './services/ListRestService';

import { Banner } from './styles/Banner';
import { Loading } from './styles/Body';
import { MenuContainer } from './components/MenuContainer';
import { LeftMenuContainer } from './components/LeftMenuContainer';
import { SubMenuContainer } from './components/SubMenuContainer';
import { WeaponSettingsContainer } from './components/WeaponSettingsContainer';
import { LinkWeaponContainer } from './components/LinkWeaponContainer';

import { withCookies, Cookies } from 'react-cookie';

type Props = {};

class Weapon extends Component<Props> {
  constructor(props: Props) {
    super(props);

    this.loadedResources = {};
    this.totalLoaded = 0;

    this.state = {
      ready: false,
    };

    weaponRestService.fetchAllWeapons(this.props.cookies.cookies, r =>
      this.updateLoadedResource(r),
    );
    listRestService.fetchWeaponVariants(this.props.cookies.cookies, r =>
      this.updateLoadedResource(r),
    );
    listRestService.fetchWeaponActiveTalents(this.props.cookies.cookies, r =>
      this.updateLoadedResource(r),
    );
    listRestService.fetchWeaponPassiveTalents(this.props.cookies.cookies, r =>
      this.updateLoadedResource(r),
    );
    listRestService.fetchBuilds(this.props.cookies.cookies, r =>
      this.updateLoadedResource(r),
    );

    listRestService.setYesNoStore();
    listRestService.setFilters();
  }

  updateLoadedResource(resource: String) {
    if (!this.loadedResources[resource]) {
      this.loadedResources[resource] = 1;
      this.totalLoaded += 1;
    }

    if (this.totalLoaded > 4 && !this.state.ready) {
      this.setState({ ready: true });
    }
  }

  render() {
    if (!this.state.ready) {
      return (
        <div className="App">
          <Banner />
          <MenuContainer visibleMenu={2} />
          <SubMenuContainer type={1} />
          <LeftMenuContainer type={1} />
          <Loading />
        </div>
      );
    }

    return (
      <div className="App">
        <Banner />
        <MenuContainer visibleMenu={2} />
        <SubMenuContainer type={1} />
        <LeftMenuContainer type={1} />
        <WeaponListContainer cookies={this.props.cookies} />
        <WeaponFormContainer cookies={this.props.cookies} />
        <WeaponSettingsContainer />
        <LinkWeaponContainer cookies={this.props.cookies} />
      </div>
    );
  }
}

export default withCookies(Weapon);
