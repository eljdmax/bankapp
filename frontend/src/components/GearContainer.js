// @flow

import React, { Component } from 'react';

import type { Gear } from '../domain/Gear';
import type { GearService } from '../domain/GearService';
import type { GearStore } from '../store/GearStore';
import { gearService } from '../domain/GearService';
import { gearStore, gearEditStore, gearLinkStore } from '../store/GearStore';
import { GearComponent } from './GearComponent';
import * as gearRestService from '../services/GearRestService';

type Props = {
  gear: Gear,
  viewFilter: any,
  cookies: any,
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
    gearRestService.postUpdateGear(this.props.cookies.cookies, updatedGear.id, {
      score: updatedGear.score,
      armor: updatedGear.armor,
      type: updatedGear.type.id,
      family: updatedGear.family.id,
      trash: updatedGear.trash,
      star: updatedGear.star,
    });
  }

  toggleStar(gear: Gear) {
    const updatedGear = this.gearService.updateStar(gear, !gear.star);
    gearRestService.postUpdateGear(this.props.cookies.cookies, updatedGear.id, {
      score: updatedGear.score,
      armor: updatedGear.armor,
      type: updatedGear.type.id,
      family: updatedGear.family.id,
      trash: updatedGear.trash,
      star: updatedGear.star,
    });
  }

  removeGear(gear: Gear) {
    gearRestService.deleteGear(this.props.cookies.cookies, gear);
  }

  editGear(gear: Gear) {
    gearEditStore.addGear(gear);
  }

  linkGear(gear: Gear) {
    gearLinkStore.addGear(gear);
  }

  render() {
    return (
      <GearComponent
        gear={this.props.gear}
        viewFilter={this.props.viewFilter}
        toggleTrash={(gear: Gear) => this.toggleTrash(gear)}
        toggleStar={(gear: Gear) => this.toggleStar(gear)}
        editGear={(gear: Gear) => this.editGear(gear)}
        deleteGear={(gear: Gear) => this.removeGear(gear)}
        linkGear={(gear: Gear) => this.linkGear(gear)}
      />
    );
  }
}
