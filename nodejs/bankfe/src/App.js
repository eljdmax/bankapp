// @flow

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {WeaponFormContainer} from "./components/WeaponFormContainer";
import {WeaponListContainer} from "./components/WeaponListContainer";

import * as weaponRestService from "./services/WeaponRestService";
import * as listRestService from "./services/ListRestService";

weaponRestService.fetchAllWeapons();
listRestService.fetchWeaponVariants();
listRestService.fetchWeaponActiveTalents();


type Props = {};

class App extends Component<Props> {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
			  {/* */}
        </header>
		
		<WeaponFormContainer/>
		<WeaponListContainer/>
		
		
      </div>
    );
  }
}

export default App;
