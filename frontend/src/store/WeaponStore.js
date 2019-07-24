// @flow
import { update } from 'ramda';

import type { Weapon } from '../domain/Weapon';
import type { WeaponState } from './WeaponState';

export type WeaponStore = {
  getState(): WeaponState,
  addWeapon(weapon: Weapon): void,
  addWeapons(weapons: Weapon[]): void,
  removeWeapon(weapon: Weapon): void,
  updateWeapon(weapon: Weapon): void,
  clear(): void,
  toggleVisibility(): void,
  subscribe(subscriber: Function): Function,
  unsubscribe(subscriber: Function): void,
};

export const addWeapon = (weaponState: WeaponState, weapon: Weapon) =>
  weaponState.concat(weapon);

export const removeWeapon = (weaponState: WeaponState, weapon: Weapon) =>
  weaponState.filter((a: Weapon) => a.id !== weapon.id);

export const clear = (weaponState: WeaponState) => {
  return Object.freeze([]);
};

export const updateWeapon = (weaponState: WeaponState, weapon: Weapon) => {
  const index = weaponState.findIndex((a: Weapon) => a.id === weapon.id);
  return update(index, weapon, weaponState);
};

export const subscribe = (subscribers: Function[], subscriber: Function) =>
  subscribers.concat(subscriber);

export const unsubscribe = (subscribers: Function[], subscriber: Function) =>
  subscribers.filter((s: Function) => s !== subscriber);

export const notify = (weaponState: WeaponState, subscribers: Function[]) =>
  subscribers.forEach((s: Function) => s(weaponState));

export const WeaponStoreFactory = () => {
  let weaponState: WeaponState = Object.freeze([]);
  let subscribers: Function[] = Object.freeze([]);

  return {
    getState: () => {
      return weaponState;
    },
    addWeapon: (weapon: Weapon) => {
      weaponState = addWeapon(weaponState, weapon);
      notify(weaponState, subscribers);
    },
    addWeapons: (weapons: Weapon[]) => {
      weapons.forEach((weapon, index) => {
        weaponState = addWeapon(weaponState, weapon);
      });
      notify(weaponState, subscribers);
    },
    removeWeapon: (weapon: Weapon) => {
      weaponState = removeWeapon(weaponState, weapon);
      notify(weaponState, subscribers);
    },
    clear: () => {
      weaponState = clear(weaponState);
      notify(weaponState, subscribers);
    },
    updateWeapon: (weapon: Weapon) => {
      weaponState = updateWeapon(weaponState, weapon);
      notify(weaponState, subscribers);
    },
    toggleVisibility: () => {
      notify(weaponState, subscribers);
    },
    subscribe: (subscriber: Function) => {
      subscribers = subscribe(subscribers, subscriber);
      return subscriber;
    },
    unsubscribe: (subscriber: Function) => {
      subscribers = unsubscribe(subscribers, subscriber);
    },
  };
};

export const weaponStore = WeaponStoreFactory();

export const weaponEditStore = WeaponStoreFactory();
