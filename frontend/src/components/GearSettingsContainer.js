// @flow

import React, { Component } from 'react';
import * as R from 'ramda';

import type { NameId } from '../domain/NameId';

import { GearSettingsComponent } from './GearSettingsComponent';
import { Modal } from '../styles/Body';

import { SettingsWrap } from '../styles/Settings';

import {
  yesNoStore,
  gearFamilyStore,
  settingsViewStore,
  gearAttributeStore,
  viewAttributesStore,
  viewTalentsStore,
  familyFilterStore,
  trashFilterStore,
  starFilterStore,
  buildFilterStore,
  orderByStore,
  thenOrderByStore,
  buildStore,
} from '../store/NameIdStore';

type Props = {};

export class GearSettingsContainer extends Component<Props> {
  subscriber: Function;
  familySubscriber: Function;
  yesNoSubscriber: Function;
  attributeSubscriber: Function;
  buildSubscriber: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      visible: false,
      activeRow: 0,
      gearFamilyList: gearFamilyStore.getState(),
      gearAttributeList: gearAttributeStore.getState(),
      isTrashList: yesNoStore.getState(),
      buildList: buildStore.getState(),
      viewSection: {
        talents: true,
        attributes: true,
      },
      filterSection: {
        family: '',
        trash: '',
        star: '',
        build: '',
      },
      orderSection: {
        by: '',
        thenBy: '',
      },
    };

    this.subscriber = settingsViewStore.subscribe((nameIds: NameId[]) => {
      if (!this.state.visible) this.setState(R.assocPath(['visible'], true));
    });

    this.familySubscriber = gearFamilyStore.subscribe((nameIds: NameId[]) => {
      this.setState(R.assocPath(['gearFamilyList'], nameIds));
    });

    this.yesNoSubscriber = yesNoStore.subscribe((nameIds: NameId[]) => {
      this.setState(R.assocPath(['isTrashList'], nameIds));
    });

    this.attributeSubscriber = gearAttributeStore.subscribe(
      (nameIds: NameId[]) => {
        this.setState(R.assocPath(['gearAttributeList'], nameIds));
      },
    );

    this.buildSubscriber = buildStore.subscribe((nameIds: NameId[]) => {
      this.setState(R.assocPath(['buildList'], nameIds));
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

  toggleViewAttributes(event: Event) {
    let isChecked = event.target.checked;
    if (isChecked) {
      viewAttributesStore.addNameId({ id: 0, name: 'Yes' });
    } else {
      viewAttributesStore.clear();
    }
    this.setState(R.assocPath(['viewSection', 'attributes'], isChecked));
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

  changeFilterFamily(event: Event) {
    let val = R.path(['target', 'value'], event);
    if (val !== this.state.filterSection.family) {
      if (val !== '') {
        familyFilterStore.replaceNameId({ id: val, name: 'any' });
      } else {
        familyFilterStore.clear();
      }

      this.setState(R.assocPath(['filterSection', 'family'], val));
    }
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

  changeFilterStar(event: Event) {
    let val = R.path(['target', 'value'], event);
    if (val !== this.state.filterSection.star) {
      if (val !== '') {
        starFilterStore.replaceNameId({ id: val, name: 'any' });
      } else {
        starFilterStore.clear();
      }

      this.setState(R.assocPath(['filterSection', 'star'], val));
    }
  }

  changeFilterBuild(event: Event) {
    let val = R.path(['target', 'value'], event);
    if (val !== this.state.filterSection.build) {
      if (val !== '') {
        buildFilterStore.replaceNameId({ id: val, name: 'any' });
      } else {
        buildFilterStore.clear();
      }

      this.setState(R.assocPath(['filterSection', 'build'], val));
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
    gearFamilyStore.unsubscribe(this.familySubscriber);
    yesNoStore.unsubscribe(this.yesNoSubscriber);
    gearAttributeStore.unsubscribe(this.attributeSubscriber);
    buildStore.unsubscribe(this.buildSubscriber);
  }

  render() {
    if (!this.state.visible) {
      return null;
    }

    return (
      <Modal>
        <SettingsWrap>
          <GearSettingsComponent
            data={this.state}
            clearModal={() => this.clearModal()}
            closeModal={() => this.closeModal()}
            expandRow={v => this.expandRow(v)}
            toggleViewAttributes={event => this.toggleViewAttributes(event)}
            toggleViewTalents={event => this.toggleViewTalents(event)}
            changeFilterFamily={event => this.changeFilterFamily(event)}
            changeFilterTrash={event => this.changeFilterTrash(event)}
            changeFilterBuild={event => this.changeFilterBuild(event)}
            changeFilterStar={event => this.changeFilterStar(event)}
            changeOrderBy={event => this.changeOrderBy(event)}
            changeOrderThenBy={event => this.changeOrderThenBy(event)}
          />
        </SettingsWrap>
      </Modal>
    );
  }
}
