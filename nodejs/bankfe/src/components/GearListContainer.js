// @flow

import React from 'react';

import type { Gear } from '../domain/Gear';
import type { GearStore } from '../store/GearStore';
import { gearStore } from '../store/GearStore';
import { GearListComponent } from './GearListComponent';

type State = {
  gears: Gear[],
};

type Props = {};

export class GearListContainer extends React.Component<Props, State> {
  subscriber: Function;
  gearStore: GearStore;

  constructor(props: Props) {
    super(props);
    this.gearStore = gearStore;
    this.state = {
      gears: [],
    };
    this.subscriber = this.gearStore.subscribe((gears: Gear[]) => {
      this.setState({ gears });
    });
  }

  componentWillUnmount() {
    this.gearStore.unsubscribe(this.subscriber);
  }

  render() {
    return <GearListComponent {...this.state} />;
  }
}
