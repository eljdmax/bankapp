// @flow

import React from 'react';


import type {Weapon} from "../domain/Weapon";
import type {WeaponStore} from "../store/WeaponStore";
import {weaponStore} from "../store/WeaponStore";
import {WeaponListComponent} from "./WeaponListComponent";


type State = {
  weapons: Weapon[]
}

type Props = {};


export class WeaponListContainer extends React.Component<Props, State> {
  subscriber: Function;
  weaponStore: WeaponStore;

  constructor(props: Props) {
    super(props);
    this.weaponStore = weaponStore;
    this.state = {
      weapons: []
    };
    this.subscriber = this.weaponStore.subscribe((weapons: Weapon[]) => {
      this.setState({weapons});
    });
  }
  
  
  componentWillUnmount() {
    this.weaponStore.unsubscribe(this.subscriber);
  }
  
  render() {
    return <WeaponListComponent {...this.state}/>;
  }
}