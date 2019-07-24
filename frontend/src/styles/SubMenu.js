// @flow

import styled from 'styled-components';

import subMenuBg from '../images/subMenu.svg';
import addButtonPng from '../images/document-add.png';
import settingsButtonPng from '../images/cog-outline.png';

export const SubMenu = styled.div`
  position: fixed;
  width: 80px;
  height: 36px;
  right: 0px;
  top: 103px;

  z-index: 4;

  background: url(${subMenuBg});
`;
export const Content = styled.div`
  position: absolute;
  width: 54.22px;
  height: 22.15px;
  left: 15.11px;
  top: 6.46px;
`;

export const AddButton = styled.div`
  position: absolute;
  left: 0%;
  right: 60.66%;
  top: 0%;
  bottom: 0%;
  cursor: pointer;
  background: url(${addButtonPng});
`;

export const SettingsButton = styled.div`
  position: absolute;
  left: 60.66%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  cursor: pointer;
  background: url(${settingsButtonPng});
`;
