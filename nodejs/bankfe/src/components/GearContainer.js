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
  viewFilter: any,
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
    let submitStatus = gearRestService.postUpdateGear(updatedGear.id, {
      score: updatedGear.score,
      armor: updatedGear.armor,
      type: updatedGear.type.id,
      family: updatedGear.family.id,
      trash: updatedGear.trash,
    });

    if (!submitStatus.success) {
      alert('An error occured!');
    }

  }

  removeGear(gear: Gear) {
    gearRestService.deleteGear(gear);
  }

  editGear(gear: Gear) {
    gearEditStore.addGear(gear);
  }

  render() {
    return (
      <GearComponent
        gear={this.props.gear}
        viewFilter={this.props.viewFilter}
        toggleTrash={(gear: Gear) => this.toggleTrash(gear)}
        editGear={(gear: Gear) => this.editGear(gear)}
        deleteGear={(gear: Gear) => this.removeGear(gear)}
      />
    );
  }
}
