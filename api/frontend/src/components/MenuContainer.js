// @flow

import React, { Component } from 'react';
import * as R from 'ramda';

import { MenuComponent } from './MenuComponent';

type Props = {
  visibleMenu: Number,
};

export class MenuContainer extends Component<Props> {
  constructor(props: Props) {
    super(props);

    this.state = {
      visibleMenu: props.visibleMenu ? props.visibleMenu : 1,
    };
  }

  selectMenu(v: number) {
    if (this.state.visibleMenu !== v)
      this.setState(R.assocPath(['visibleMenu'], v));
  }

  render() {
    return (
      <MenuComponent data={this.state} selectMenu={v => this.selectMenu(v)} />
    );
  }
}
