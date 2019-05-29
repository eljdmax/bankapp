// @flow

export type Variant = {
  +id: number,
  +name: string,
  +best: boolean,
  +family: number
}

export type ActiveWeaponTalent = {
  +id: number,
  +name: string
}

export type PassiveWeaponTalent = {
  +id: number,
  +name: string
}

export type Weapon = {
  +id: number;
  +score: number;
  +dmg: number;
  +trash: boolean;
  +variant: Variant;
  +activeTalent: ActiveWeaponTalent;
  +passiveTalents: PassiveWeaponTalents[];
}

export type WeaponFormData = {
  +score: number;
  +dmg: number;
  +variant: number;
  +activeTalent: number;
  +passiveTalents: number[];
}