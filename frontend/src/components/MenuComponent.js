// @flow

import React from 'react';
import {
  Menu,
  DashboardMenu,
  GearMenu,
  WeaponMenu,
  MenuSelected,
} from '../styles/Menu';

import { Link } from 'react-router-dom';

type Props = {
  data: any,
  selectMenu: Function,
};

export const MenuComponent = (props: Props) => {
  const { data, selectMenu } = props;

  return (
    <Menu>
      <Link to="/">
        <DashboardMenu>
          {data.visibleMenu === 0 && <MenuSelected />}
        </DashboardMenu>
      </Link>
      <Link to="/gear/">
        <GearMenu>{data.visibleMenu === 1 && <MenuSelected />}</GearMenu>
      </Link>
      <Link to="/weapon/">
        <WeaponMenu>{data.visibleMenu === 2 && <MenuSelected />}</WeaponMenu>
      </Link>
    </Menu>
  );
};
