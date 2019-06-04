// @flow

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { GearFormContainer } from './components/GearFormContainer';
import { GearListContainer } from './components/GearListContainer';

import * as gearRestService from './services/GearRestService';
import * as listRestService from './services/ListRestService';

gearRestService.fetchAllGears();
listRestService.fetchGearTypes();
listRestService.fetchGearFamilies();
listRestService.fetchGearAttributeTypes();
listRestService.fetchGearAttributes();
listRestService.fetchGearActiveTalents();
listRestService.fetchGearPassiveTalents();

type Props = {};

class Gear extends Component<Props> {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {/* */}
        </header>
        <GearFormContainer />
        <GearListContainer />
      </div>
    );
  }
}

export default Gear;
