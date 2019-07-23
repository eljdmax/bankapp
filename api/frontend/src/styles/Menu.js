// @flow

import styled from 'styled-components';

import dashboardPng from '../images/dashboard.png';
import weaponPng from '../images/weapon.png';
import gearPng from '../images/gear.png';

import horSelectedBar from '../images/horSelectedBar.svg';

export const Menu = styled.div`
  position: fixed;
  height: 57px;
  left: 0px;
  right: 0px;
  top: 51px;
  z-index: 1;
  background: #c4c4c4;
`;

export const DashboardMenu = styled.div`
  position: absolute;
  width: 65px;
  height: 57px;
  left: calc(50% - 65px / 2 - 107px);
  cursor: pointer;
  background: url(${dashboardPng});
`;

export const MenuSelected = styled.div`
  position: absolute;
  width: 65px;
  height: 10px;
  left: calc(50% - 65px / 2);
  top: 57px;
  cursor: pointer;
  background: url(${horSelectedBar});
`;

export const GearMenu = styled.div`
  position: absolute;
  width: 65px;
  height: 57px;
  left: calc(50% - 65px / 2 - 7px);
  cursor: pointer;
  background: url(${gearPng});
`;

export const WeaponMenu = styled.div`
  position: absolute;
  width: 65px;
  height: 57px;
  left: calc(50% - 65px / 2 + 93px);
  cursor: pointer;
  background: url(${weaponPng});
`;
