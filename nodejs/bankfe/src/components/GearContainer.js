// @flow

import React, { Component } from 'react';

import type { Gear } from '../domain/Gear';
import type { GearService } from '../domain/GearService';
import type { GearStore } from '../store/GearStore';
import { gearService } from '../domain/GearService';
import { gearStore, gearEditStore } from '../store/GearStore';
import { GearComponent } from './GearComponent';
import * as gearRestService from '../services/GearRestService';

type Props = {
  gear: Gear,
};

export class GearContainer extends Component<Props> {
  gearStore: GearStore;
  gearService: GearService;

  constructor(props: Props) {
    super(props);
    this.gearStore = gearStore;
    this.gearService = gearService;
  }

  toggleTrash(gear: Gear) {
    const updatedGear = this.gearService.updateTrash(gear, !gear.trash);
    this.gearStore.updateGear(updatedGear);
  }

  removeGear(gear: Gear) {
    gearRestService.deleteGear(gear);
  }

  editGear(gear: Gear) {
    gearEditStore.addGear(gear);
  }

  render() {
    return (
      <div>
        <GearComponent
          gear={this.props.gear}
          toggleTrash={(gear: Gear) => this.toggleTrash(gear)}
          editGear={(gear: Gear) => this.editGear(gear)}
          deleteGear={(gear: Gear) => this.removeGear(gear)}
        />
      </div>
    );
  }
}
