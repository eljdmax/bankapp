// @flow

import React, { Component } from 'react';
import * as R from 'ramda';

import type { NameId } from '../domain/NameId';
import type { Weapon } from '../domain/Weapon';

import { LinkEntityComponent } from './LinkEntityComponent';
import { Modal } from '../styles/Body';

import { SettingsWrap } from '../styles/Settings';

import { buildStore } from '../store/NameIdStore';

import { weaponLinkStore } from '../store/WeaponStore';
import * as weaponRestService from '../services/WeaponRestService';

type Props = {};

export class LinkWeaponContainer extends Component<Props> {
  subscriber: Function;
  buildSubscriber: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      visible: false,
      activeRow: 0,
      weapon: {},
      buildList: buildStore.getState(),
      builds: {
        valid: false,
        value: [],
      },
    };

    this.subscriber = weaponLinkStore.subscribe((weapons: Weapon[]) => {
      let visible = false;
      if (weapons.length > 0) {
        this.setState(R.assocPath(['weapon'], weapons[0]));

        let buildIds = [];
        if (weapons[0].builds.length > 0) {
          buildIds = weapons[0].builds.map(build => {
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
    weaponLinkStore.clear();
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

    const weaponScore = this.state.weapon.score;
    const weaponDmg = this.state.weapon.dmg;
    const weaponVariant = this.state.weapon.variant.id;

    weaponRestService.postUpdateWeapon(
      this.props.cookies.cookies,
      this.state.weapon.id,
      {
        score: weaponScore,
        dmg: weaponDmg,
        variant: weaponVariant,
        buildIds: buildIds,
      },
    );

    this.closeModal();
  }

  componentWillUnmount() {
    weaponLinkStore.unsubscribe(this.subscriber);
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
