// @flow

import React from 'react';
import {
  LeftMenu,
  ARMenu,
  LMGMenu,
  SMGMenu,
  ShotgunMenu,
  MarksmanMenu,
  RifleMenu,
  PistolMenu,
  MenuSelected,
} from '../styles/LeftMenu';

type Props = {
  data: any,
  selectMenu: Function,
};

export const WeaponLeftMenuComponent = (props: Props) => {
  const { data, selectMenu } = props;

  return (
    <LeftMenu>
      <ARMenu title='Assault Rifle' onClick={() => selectMenu(0)}>
        {data.visibleMenu === 0 && <MenuSelected />}
      </ARMenu>
      <LMGMenu title='Light Machine Gun' onClick={() => selectMenu(4)}>
        {data.visibleMenu === 4 && <MenuSelected />}
      </LMGMenu>
      <SMGMenu title='Sub Machine Gun' onClick={() => selectMenu(3)}>
        {data.visibleMenu === 3 && <MenuSelected />}
      </SMGMenu>
      <ShotgunMenu title='Shotgun' onClick={() => selectMenu(5)}>
        {data.visibleMenu === 5 && <MenuSelected />}
      </ShotgunMenu>
      <MarksmanMenu title='Marskman Rifle' onClick={() => selectMenu(2)}>
        {data.visibleMenu === 2 && <MenuSelected />}
      </MarksmanMenu>
      <RifleMenu title='Rifle' onClick={() => selectMenu(1)}>
        {data.visibleMenu === 1 && <MenuSelected />}
      </RifleMenu>
      <PistolMenu title='Pistol' onClick={() => selectMenu(6)}>
        {data.visibleMenu === 6 && <MenuSelected />}
      </PistolMenu>
    </LeftMenu>
  );
};
