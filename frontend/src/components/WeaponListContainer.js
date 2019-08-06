// @flow

import React from 'react';
import * as R from 'ramda';

import type { Weapon } from '../domain/Weapon';
import type { NameId } from '../domain/nameId';
import type { WeaponStore } from '../store/WeaponStore';
import { weaponStore } from '../store/WeaponStore';
import { WeaponListComponent } from './WeaponListComponent';
import {
  viewTalentsStore,
  leftMenuFilterStore,
  variantTypeFilterStore,
  trashFilterStore,
  orderByStore,
  thenOrderByStore,
} from '../store/NameIdStore';

type State = {
  weapons: Weapon[],
};

type Props = {};

export class WeaponListContainer extends React.Component<Props, State> {
  subscriber: Function;
  filterSubscriber: Function;
  viewTalentsSubscriber: Function;
  variantTypeFilterSubscriber: Function;
  trashFilterSubscriber: Function;
  orderBySubscriber: Function;
  thenOrderSubscriber: Function;

  weaponStore: WeaponStore;
  weaponFamily: NameId;

  constructor(props: Props) {
    super(props);
    this.weaponStore = weaponStore;
    this.state = {
      weapons: weaponStore.getState(),
      weaponFamily: { id: 1 },
      viewFilter: {
        talents: true,
      },
      extraFilter: {
        variantType: '',
        trash: '',
      },
      orderFilter: {
        by: '',
        tthenBy: '',
      },
    };
    this.subscriber = this.weaponStore.subscribe((weapons: Weapon[]) => {
      this.setState({ weapons });
    });

    this.filterSubscriber = leftMenuFilterStore.subscribe(
      (nameIds: NameId[]) => {
        if (nameIds.length > 0) {
          this.setState(R.assocPath(['weaponFamily'], nameIds[0]));
        }
      },
    );

    this.viewTalentsSubscriber = viewTalentsStore.subscribe(
      (nameIds: NameId[]) => {
        this.setState(
          R.assocPath(['viewFilter', 'talents'], nameIds.length > 0),
        );
      },
    );

    this.variantTypeFilterSubscriber = variantTypeFilterStore.subscribe(
      (nameIds: NameId[]) => {
        let val = '';
        if (nameIds.length > 0) {
          val = Number(nameIds[0].id);
        }

        this.setState(R.assocPath(['extraFilter', 'variantType'], val));
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
    this.weaponStore.unsubscribe(this.subscriber);
    leftMenuFilterStore.unsubscribe(this.filterSubscriber);
    viewTalentsStore.unsubscribe(this.viewTalentsSubscriber);
    variantTypeFilterStore.unsubscribe(this.variantTypeFilterSubscriber);
    trashFilterStore.unsubscribe(this.trashFilterSubscriber);
    orderByStore.unsubscribe(this.orderBySubscriber);
    thenOrderByStore.unsubscribe(this.thenOrderBySubscriber);
  }

  render() {
    return <WeaponListComponent {...this.state} cookies={this.props.cookies} />;
  }
}
