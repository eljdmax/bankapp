// @flow

import React from 'react';
import { SubMenu, Content, AddButton, SettingsButton } from '../styles/SubMenu';

type Props = {
  data: Number,
  editToggleVisibility: Function,
  settingsToggleVisibility: Function,
};

export const SubMenuComponent = (props: Props) => {
  const { data, editToggleVisibility, settingsToggleVisibility } = props;

  return (
    <SubMenu>
      <Content>
        <AddButton onClick={editToggleVisibility} />
        <SettingsButton onClick={settingsToggleVisibility} />
      </Content>
    </SubMenu>
  );
};
