// @flow

import type { AttributeType } from './AttributeType';

export type Mod = {
  +attribute: AttributeType,
  +fitted: boolean,
};

export type Attribute = {
  +attribute: AttributeType,
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
  +attributes: Attribute[],
  +mods: Mod[],
};

export type AttributeFormData = {
  +id: number,
  +value: number,
};

export type GearFormData = {
  +score: number,
  +armor: number,
  +type: number,
  +family: number,
  +activeTalent: number,
  +passiveTalents: number[],
  +mods: number[],
  +attributes: AttributeFormData[],
};
