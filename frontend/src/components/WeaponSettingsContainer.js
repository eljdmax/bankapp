// @flow

import React, { Component } from 'react';
import * as R from 'ramda';

import type { NameId } from '../domain/NameId';

import { WeaponSettingsComponent } from './WeaponSettingsComponent';
import { Modal } from '../styles/Body';

import { SettingsWrap } from '../styles/Settings';

import {
  yesNoStore,
  settingsViewStore,
  viewTalentsStore,
  trashFilterStore,
  orderByStore,
  thenOrderByStore,
} from '../store/NameIdStore';

type Props = {};

export class WeaponSettingsContainer extends Component<Props> {
  subscriber: Function;
  yesNoSubscriber: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      visible: false,
      activeRow: 0,
      isTrashList: yesNoStore.getState(),
      viewSection: {
        talents: true,
      },
      filterSection: {
        variantType: '',
        trash: '',
      },
      orderSection: {
        by: '',
        thenBy: '',
      },
    };

    this.subscriber = settingsViewStore.subscribe((nameIds: NameId[]) => {
      if (!this.state.visible) this.setState(R.assocPath(['visible'], true));
    });

    this.yesNoSubscriber = yesNoStore.subscribe((nameIds: NameId[]) => {
      this.setState(R.assocPath(['isTrashList'], nameIds));
    });

  }

  clearModal() {}

  closeModal() {
    this.setState(R.assocPath(['visible'], false));
  }

  expandRow(v: number) {
    if (this.state.activeRow !== v)
      this.setState(R.assocPath(['activeRow'], v));
  }


  toggleViewTalents(event: Event) {
    let isChecked = event.target.checked;
    if (isChecked) {
      viewTalentsStore.addNameId({ id: 0, name: 'Yes' });
    } else {
      viewTalentsStore.clear();
    }
    this.setState(R.assocPath(['viewSection', 'talents'], isChecked));
  }


  changeFilterTrash(event: Event) {
    let val = R.path(['target', 'value'], event);
    if (val !== this.state.filterSection.trash) {
      if (val !== '') {
        trashFilterStore.replaceNameId({ id: val, name: 'any' });
      } else {
        trashFilterStore.clear();
      }

      this.setState(R.assocPath(['filterSection', 'trash'], val));
    }
  }

  changeOrderBy(event: Event) {
    let val = R.path(['target', 'value'], event);
    if (val !== this.state.orderSection.by) {
      if (val !== '') {
        orderByStore.replaceNameId({ id: val, name: 'any' });
      } else {
        orderByStore.clear();
      }

      this.setState(R.assocPath(['orderSection', 'by'], val));
    }
  }

  changeOrderThenBy(event: Event) {
    let val = R.path(['target', 'value'], event);
    if (val !== this.state.orderSection.thenBy) {
      if (val !== '') {
        thenOrderByStore.replaceNameId({ id: val, name: 'any' });
      } else {
        thenOrderByStore.clear();
      }

      this.setState(R.assocPath(['orderSection', 'thenBy'], val));
    }
  }

  componentWillUnmount() {
    settingsViewStore.unsubscribe(this.subscriber);
    yesNoStore.unsubscribe(this.yesNoSubscriber);
  }

  render() {
    if (!this.state.visible) {
      return null;
    }

    return (
      <Modal>
        <SettingsWrap>
          <WeaponSettingsComponent
            data={this.state}
            clearModal={() => this.clearModal()}
            closeModal={() => this.closeModal()}
            expandRow={v => this.expandRow(v)}
            toggleViewTalents={event => this.toggleViewTalents(event)}
            changeFilterTrash={event => this.changeFilterTrash(event)}
            changeOrderBy={event => this.changeOrderBy(event)}
            changeOrderThenBy={event => this.changeOrderThenBy(event)}
          />
        </SettingsWrap>
      </Modal>
    );
  }
}
