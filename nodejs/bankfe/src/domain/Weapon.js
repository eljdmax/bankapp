// @flow
export type Weapon = {
  +id: number;
  +score: number;
  +dmg: number;
  +trash: boolean;
  +variant: string;
}

export type WeaponFormData = {
  +score: number;
  +dmg: number;
  +variant: number;
}