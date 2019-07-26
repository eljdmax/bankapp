// @flow

import React, { Component } from 'react';
import * as R from 'ramda';

import type { NameId } from '../domain/NameId';
import type { Gear } from '../domain/Gear';

import { LinkEntityComponent } from './LinkEntityComponent';
import { Modal } from '../styles/Body';

import { SettingsWrap } from '../styles/Settings';

import { buildStore } from '../store/NameIdStore';

import { gearLinkStore } from '../store/GearStore';
import * as gearRestService from '../services/GearRestService';

type Props = {};

export class LinkEntityContainer extends Component<Props> {
  subscriber: Function;
  buildSubscriber: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      visible: false,
      activeRow: 0,
      gear: {},
      buildList: buildStore.getState(),
      builds: {
        valid: false,
        value: [],
      },
    };

    this.subscriber = gearLinkStore.subscribe((gears: Gear[]) => {
      let visible = false;
      if (gears.length > 0) {
        this.setState(R.assocPath(['gear'], gears[0]));

        let buildIds = [];
        if (gears[0].builds.length > 0) {
          buildIds = gears[0].builds.map(build => {
            return build.id;
          });
        }

        this.setState(R.assocPath(['builds', 'value'], buildIds));

        visible = true;
      }
      this.setState(R.assocPath(['visible'], visible));
    });

    this.buildSubscriber = buildStore.subscribe((nameIds: NameId[]) => {
      this.setState(R.assocPath(['buildList'], nameIds));
    });
  }

  clearModal() {}

  closeModal() {
    //this.setState(R.assocPath(['visible'], false));
    this.state.builds.value = [];
    gearLinkStore.clear();
  }

  expandRow(v: number) {
    if (this.state.activeRow !== v)
      this.setState(R.assocPath(['activeRow'], v));
  }

  changeBuilds(event: Event) {
    this.setState(
      R.assocPath(
        ['builds', 'value'],
        Array.from(event.target.selectedOptions, item => item.value),
      ),
    );
  }

  submitForm(event: Event) {
    const buildIds = Array.from(
      event.target.builds.selectedOptions,
      item => item.value,
    );

    const gearScore = this.state.gear.score;
    const gearArmor = this.state.gear.armor;
    const gearType = this.state.gear.type.id;
    const gearFamily = this.state.gear.family.id;

    const submitStatus = gearRestService.postUpdateGear(this.state.gear.id, {
      score: gearScore,
      armor: gearArmor,
      type: gearType,
      family: gearFamily,
      buildIds: buildIds,
    });

    if (submitStatus.success) {
      this.closeModal();
    } else {
      alert('An error occured!');
    }
  }

  componentWillUnmount() {
    gearLinkStore.unsubscribe(this.subscriber);
    buildStore.unsubscribe(this.buildSubscriber);
  }

  render() {
    if (!this.state.visible) {
      return null;
    }

    return (
      <Modal>
        <SettingsWrap>
          <LinkEntityComponent
            data={this.state}
            clearModal={() => this.clearModal()}
            closeModal={() => this.closeModal()}
            expandRow={v => this.expandRow(v)}
            changeBuilds={event => this.changeBuilds(event)}
            submitForm={this.submitForm.bind(this)}
          />
        </SettingsWrap>
      </Modal>
    );
  }
}
