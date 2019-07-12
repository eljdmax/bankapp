// @flow

import React, { Component } from 'react';
import * as R from 'ramda';

import { GearLeftMenuComponent } from './GearLeftMenuComponent';
import { WeaponLeftMenuComponent } from './WeaponLeftMenuComponent';
import { leftMenuFilterStore } from '../store/NameIdStore';

type Props = { type: Number };

export class LeftMenuContainer extends Component<Props> {
  constructor(props: Props) {
    super(props);

    this.state = {
      type: props.type ? props.type : 0,
      visibleMenu: 0,
    };

    leftMenuFilterStore.replaceNameId({ id: 1 });

  }

  selectMenu(v: number) {
    if (this.state.visibleMenu !== v) {
      this.setState(R.assocPath(['visibleMenu'], v));
      leftMenuFilterStore.replaceNameId({ id: v + 1 });
    }
  }

  render() {
    if (this.state.type === 0) {
      return (
        <GearLeftMenuComponent
          data={this.state}
          selectMenu={v => this.selectMenu(v)}
        />
      );
    } else {
      return (
        <WeaponLeftMenuComponent
          data={this.state}
          selectMenu={v => this.selectMenu(v)}
        />
      );
    }
  }
}
