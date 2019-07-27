// @flow

import React, { Component } from 'react';
import * as R from 'ramda';

import type { Gear } from '../domain/Gear';
import type { NameId } from '../domain/nameId';
import type { GearStore } from '../store/GearStore';
import { gearStore } from '../store/GearStore';
import { GearListComponent } from './GearListComponent';
import {
  viewAttributesStore,
  viewTalentsStore,
  leftMenuFilterStore,
  familyFilterStore,
  trashFilterStore,
  starFilterStore,
  buildFilterStore,
  orderByStore,
  thenOrderByStore,
} from '../store/NameIdStore';

type State = {
  gears: Gear[],
};

type Props = {};

export class GearListContainer extends Component<Props, State> {
  subscriber: Function;
  filterSubscriber: Function;
  viewAttributesSubscriber: Function;
  viewTalentsSubscriber: Function;
  familyFilterSubscriber: Function;
  trashFilterSubscriber: Function;
  starFilterSubscriber: Function;
  buildFilterSubscriber: Function;
  orderBySubscriber: Function;
  thenOrderBySubscriber: Function;

  gearStore: GearStore;
  gearType: NameId;

  constructor(props: Props) {
    super(props);

    this.gearStore = gearStore;
    this.state = {
      gears: gearStore.getState(),
      gearType: { id: 1 },
      viewFilter: {
        attributes: true,
        talents: true,
      },
      extraFilter: {
        familyId: '',
        trash: '',
        star: '',
        build: '',
      },
      orderFilter: {
        by: '',
        thenBy: '',
      },
    };
    this.subscriber = this.gearStore.subscribe((gears: Gear[]) => {
      this.setState({ gears });
    });

    this.filterSubscriber = leftMenuFilterStore.subscribe(
      (nameIds: NameId[]) => {
        if (nameIds.length > 0) {
          this.setState(R.assocPath(['gearType'], nameIds[0]));
        }
      },
    );

    this.viewAttributesSubscriber = viewAttributesStore.subscribe(
      (nameIds: NameId[]) => {
        this.setState(
          R.assocPath(['viewFilter', 'attributes'], nameIds.length > 0),
        );
      },
    );

    this.viewTalentsSubscriber = viewTalentsStore.subscribe(
      (nameIds: NameId[]) => {
        this.setState(
          R.assocPath(['viewFilter', 'talents'], nameIds.length > 0),
        );
      },
    );

    this.familyFilterSubscriber = familyFilterStore.subscribe(
      (nameIds: NameId[]) => {
        let val = '';
        if (nameIds.length > 0) {
          val = Number(nameIds[0].id);
        }

        this.setState(R.assocPath(['extraFilter', 'familyId'], val));
      },
    );

    this.trashFilterSubscriber = trashFilterStore.subscribe(
      (nameIds: NameId[]) => {
        let val = '';
        if (nameIds.length > 0) {
          val = Number(nameIds[0].id) === 0;
        }
        this.setState(R.assocPath(['extraFilter', 'trash'], val));
      },
    );

    this.starFilterSubscriber = starFilterStore.subscribe(
      (nameIds: NameId[]) => {
        let val = '';
        if (nameIds.length > 0) {
          val = Number(nameIds[0].id) === 0;
        }
        this.setState(R.assocPath(['extraFilter', 'star'], val));
      },
    );

    this.buildFilterSubscriber = buildFilterStore.subscribe(
      (nameIds: NameId[]) => {
        let val = '';
        if (nameIds.length > 0) {
          val = Number(nameIds[0].id);
        }
        this.setState(R.assocPath(['extraFilter', 'build'], val));
      },
    );

    this.orderBySubscriber = orderByStore.subscribe((nameIds: NameId[]) => {
      let val = '';
      if (nameIds.length > 0) {
        val = Number(nameIds[0].id);
      }

      this.setState(R.assocPath(['orderFilter', 'by'], val));
    });

    this.thenOrderBySubscriber = thenOrderByStore.subscribe(
      (nameIds: NameId[]) => {
        let val = '';
        if (nameIds.length > 0) {
          val = Number(nameIds[0].id);
        }

        this.setState(R.assocPath(['orderFilter', 'thenBy'], val));
      },
    );
  }

  componentWillUnmount() {
    this.gearStore.unsubscribe(this.subscriber);
    leftMenuFilterStore.unsubscribe(this.filterSubscriber);
    viewAttributesStore.unsubscribe(this.viewAttributesSubscriber);
    viewTalentsStore.unsubscribe(this.viewTalentsSubscriber);
    familyFilterStore.unsubscribe(this.familyFilterSubscriber);
    trashFilterStore.unsubscribe(this.trashFilterSubscriber);
    starFilterStore.unsubscribe(this.starFilterSubscriber);
    buildFilterStore.unsubscribe(this.buildFilterSubscriber);
    orderByStore.unsubscribe(this.orderBySubscriber);
    thenOrderByStore.unsubscribe(this.thenOrderBySubscriber);
  }

  render() {
    return <GearListComponent {...this.state} cookies={this.props.cookies} />;
  }
}
