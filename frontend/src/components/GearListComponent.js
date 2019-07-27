// @flow

import React from 'react';

import type { Gear } from '../domain/Gear';
import { GearContainer } from './GearContainer';
import * as gearUiService from '../services/GearUiService';

import { MainMenu, MainRow } from '../styles/MainMenu';

import * as R from 'ramda';

type Props = {
  gears: Gear[],
  gearType: number,
  viewFilter: any,
  extraFilter: any,
  orderFilter: any,
  cookies: any,
};

export const GearListComponent = (props: Props) => {
  const { gears, gearType, viewFilter, extraFilter, orderFilter, cookies } = props;

  //gears.sort( gearUiService.compareGearBy(['id'],true) );
  let filteredGears = gears.filter(gearUiService.filterGearBy(gearType.id));

  if (extraFilter.familyId !== '') {
    filteredGears = filteredGears.filter(
      gearUiService.filterGearBy(extraFilter.familyId, ['family', 'id']),
    );
  }

  if (extraFilter.trash !== '') {
    filteredGears = filteredGears.filter(
      gearUiService.filterGearBy(extraFilter.trash, ['trash']),
    );
  }

  if (extraFilter.star !== '') {
    filteredGears = filteredGears.filter(
      gearUiService.filterGearBy(extraFilter.star, ['star']),
    );
  }

  if (extraFilter.build !== '') {
    filteredGears = filteredGears.filter(
      gearUiService.filterGearArrayBy(extraFilter.build),
    );
  }

  let orderArray = [];
  if (orderFilter.by !== '') {
    orderArray.push(orderFilter.by);
  }
  if (orderFilter.thenBy !== '') {
    orderArray.push(orderFilter.thenBy);
  }

  if (orderArray.push.length > 0) {
    filteredGears.sort(gearUiService.compareGearAttributes(orderArray));
  } else {
    filteredGears.sort(gearUiService.compareGearBy());
  }

  return (
    <MainMenu>
      {filteredGears.map((gear: Gear, index) => (
        <MainRow key={index} keyIndex={index}>
          <GearContainer gear={gear} key={index} viewFilter={viewFilter} cookies={cookies} />
        </MainRow>
      ))}
    </MainMenu>
  );
};
