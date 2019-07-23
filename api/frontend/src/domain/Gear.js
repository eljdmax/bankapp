// @flow

import type { AttributeType } from './AttributeType';
import type { Attribute } from './Attribute';

export type GearMod = {
  +id: number,
  +name: string,
  +fitted: boolean,
};

export type GearAttribute = {
  +attribute: Attribute,
  +value: number,
};

export type GearFamily = {
  +id: number,
  +name: string,
};

export type GearType = {
  +id: number,
  +name: string,
};

export type ActiveGearTalent = {
  +id: number,
  +name: string,
};

export type PassiveGearTalent = {
  +id: number,
  +name: string,
};

export type Gear = {
  +id: number,
  +score: number,
  +armor: number,
  +trash: boolean,
  +type: GearType,
  +family: GearFamily,
  +activeTalent: ActiveGearTalent,
  +passiveTalents: PassiveGearTalent[],
  +gearAttributes: GearAttribute[],
  +gearMods: GearMod[],
};

export type AttributeFormData = {
  +id: number,
  +value: number,
};

export type GearFormData = {
  +score: number,
  +armor: number,
  +type: number,
  +trash: boolean,
  +family: number,
  +activeTalent: number,
  +passiveTalents: number[],
  +gearMods: number[],
  +gearAttributes: AttributeFormData[],
};
