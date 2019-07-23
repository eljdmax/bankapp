// @flow

import React, { Component } from 'react';
import { SubMenuComponent } from './SubMenuComponent';

import { gearEditStore } from '../store/GearStore';
import { weaponEditStore } from '../store/WeaponStore';
import { settingsViewStore } from '../store/NameIdStore';

type Props = {
  type: Number,
};

export class SubMenuContainer extends Component<Props> {
  constructor(props: Props) {
    super(props);

    this.state = {
      type: props.type ? props.type : 0,
    };
  }

  editToggleVisibility() {
    if (this.state.type === 0) {
      gearEditStore.toggleVisibility();
    } else {
      weaponEditStore.toggleVisibility();
    }
  }

  settingsToggleVisibility() {
    settingsViewStore.toggleVisibility();
  }

  render() {
    return (
      <SubMenuComponent
        data={this.state}
        editToggleVisibility={() => this.editToggleVisibility()}
        settingsToggleVisibility={() => this.settingsToggleVisibility()}
      />
    );
  }
}
