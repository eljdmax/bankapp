// @flow
import { update } from 'ramda';

import type { InternalGearMod } from '../domain/InternalGearMod';
import type { InternalGearModState } from './InternalGearModState';

export type InternalGearModStore = {
  addInternalGearMod(internalGearMod: InternalGearMod): void,
  removeInternalGearMod(internalGearMod: InternalGearMod): void,
  updateInternalGearMod(internalGearMod: InternalGearMod): void,
  clear(): void,
  subscribe(subscriber: Function): Function,
  unsubscribe(subscriber: Function): void,
};

export const addInternalGearMod = (
  internalGearModState: InternalGearModState,
  internalGearMod: InternalGearMod,
) => internalGearModState.concat(internalGearMod);

export const removeInternalGearMod = (
  internalGearModState: InternalGearModState,
  internalGearMod: InternalGearMod,
) =>
  internalGearModState.filter(
    (a: InternalGearMod) => a.iid !== internalGearMod.iid,
  );

export const clear = (internalGearModState: InternalGearModState) => {
  return Object.freeze([]);
};

export const updateInternalGearMod = (
  internalGearModState: InternalGearModState,
  internalGearMod: InternalGearMod,
) => {
  const index = internalGearModState.findIndex(
    (a: InternalGearMod) => a.iid === internalGearMod.iid,
  );
  return update(index, internalGearMod, internalGearModState);
};

export const subscribe = (subscribers: Function[], subscriber: Function) =>
  subscribers.concat(subscriber);

export const unsubscribe = (subscribers: Function[], subscriber: Function) =>
  subscribers.filter((s: Function) => s !== subscriber);

export const notify = (
  internalGearModState: InternalGearModState,
  subscribers: Function[],
) => subscribers.forEach((s: Function) => s(internalGearModState));

export const InternalGearModStoreFactory = () => {
  let internalGearModState: InternalGearModState = Object.freeze([]);
  let subscribers: Function[] = Object.freeze([]);

  return {
    addInternalGearMod: (internalGearMod: InternalGearMod) => {
      internalGearModState = addInternalGearMod(
        internalGearModState,
        internalGearMod,
      );
      notify(internalGearModState, subscribers);
    },
    removeInternalGearMod: (internalGearMod: InternalGearMod) => {
      internalGearModState = removeInternalGearMod(
        internalGearModState,
        internalGearMod,
      );
      notify(internalGearModState, subscribers);
    },
    clear: () => {
      internalGearModState = clear(internalGearModState);
      notify(internalGearModState, subscribers);
    },
    updateInternalGearMod: (internalGearMod: InternalGearMod) => {
      internalGearModState = updateInternalGearMod(
        internalGearModState,
        internalGearMod,
      );
      notify(internalGearModState, subscribers);
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

export const internalGearModStore = InternalGearModStoreFactory();
