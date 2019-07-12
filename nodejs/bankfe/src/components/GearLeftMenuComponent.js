// @flow

import React from 'react';
import {
  LeftMenu,
  MaskMenu,
  BackPackMenu,
  VestMenu,
  GlovesMenu,
  HolsterMenu,
  KneepadsMenu,
  MenuSelected,
} from '../styles/LeftMenu';

type Props = {
  data: any,
  selectMenu: Function,
};

export const GearLeftMenuComponent = (props: Props) => {
  const { data, selectMenu } = props;

  return (
    <LeftMenu>
      <MaskMenu title="Mask" onClick={() => selectMenu(0)}>
        {data.visibleMenu === 0 && <MenuSelected />}
      </MaskMenu>
      <BackPackMenu title="Back Pack" onClick={() => selectMenu(1)}>
        {data.visibleMenu === 1 && <MenuSelected />}
      </BackPackMenu>
      <VestMenu title="Vest" onClick={() => selectMenu(2)}>
        {data.visibleMenu === 2 && <MenuSelected />}
      </VestMenu>
      <GlovesMenu title="Gloves" onClick={() => selectMenu(3)}>
        {data.visibleMenu === 3 && <MenuSelected />}
      </GlovesMenu>
      <HolsterMenu title="Holster" onClick={() => selectMenu(4)}>
        {data.visibleMenu === 4 && <MenuSelected />}
      </HolsterMenu>
      <KneepadsMenu title="Kneepads" onClick={() => selectMenu(5)}>
        {data.visibleMenu === 5 && <MenuSelected />}
      </KneepadsMenu>
    </LeftMenu>
  );
};
