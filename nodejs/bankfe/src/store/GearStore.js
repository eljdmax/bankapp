// @flow
import { update } from 'ramda';

import type { Gear } from '../domain/Gear';
import type { GearState } from './GearState';

export type GearStore = {
  addGear(gear: Gear): void,
  removeGear(gear: Gear): void,
  updateGear(gear: Gear): void,
  clear(): void,
  subscribe(subscriber: Function): Function,
  unsubscribe(subscriber: Function): void,
};

export const addGear = (gearState: GearState, gear: Gear) =>
  gearState.concat(gear);

export const removeGear = (gearState: GearState, gear: Gear) =>
  gearState.filter((a: Gear) => a.id !== gear.id);

export const clear = (gearState: GearState) => {
  return Object.freeze([]);
};

export const updateGear = (gearState: GearState, gear: Gear) => {
  const index = gearState.findIndex((a: Gear) => a.id === gear.id);
  return update(index, gear, gearState);
};

export const subscribe = (subscribers: Function[], subscriber: Function) =>
  subscribers.concat(subscriber);

export const unsubscribe = (subscribers: Function[], subscriber: Function) =>
  subscribers.filter((s: Function) => s !== subscriber);

export const notify = (gearState: GearState, subscribers: Function[]) =>
  subscribers.forEach((s: Function) => s(gearState));

export const GearStoreFactory = () => {
  let gearState: GearState = Object.freeze([]);
  let subscribers: Function[] = Object.freeze([]);

  return {
    addGear: (gear: Gear) => {
      gearState = addGear(gearState, gear);
      notify(gearState, subscribers);
    },
    removeGear: (gear: Gear) => {
      gearState = removeGear(gearState, gear);
      notify(gearState, subscribers);
    },
    clear: () => {
      gearState = clear(gearState);
      notify(gearState, subscribers);
    },
    updateGear: (gear: Gear) => {
      gearState = updateGear(gearState, gear);
      notify(gearState, subscribers);
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

export const gearStore = GearStoreFactory();

export const gearEditStore = GearStoreFactory();
