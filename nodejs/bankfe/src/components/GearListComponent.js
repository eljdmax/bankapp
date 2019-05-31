// @flow

import React from 'react';

import type { Gear } from '../domain/Gear';
import { GearContainer } from './GearContainer';
import * as gearUiService from '../services/GearUiService';

type Props = {
  gears: Gear[],
};

export const GearListComponent = (props: Props) => {
  const { gears } = props;

  //gears.sort( gearUiService.compareGearBy(['id'],true) );
  gears.sort(gearUiService.compareGearBy());

  return (
    <div>
      {gears.map((gear: Gear, index) => (
        <GearContainer gear={gear} key={index} />
      ))}
    </div>
  );
};
