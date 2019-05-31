// @flow
import type { NameId } from '../domain/NameId';
import type { NameIdState } from './NameIdState';

export type NameIdStore = {
  addNameId(nameId: NameId): void,
  clear(): void,
  subscribe(subscriber: Function): Function,
  unsubscribe(subscriber: Function): void,
};

export const addNameId = (nameIdState: NameIdState, nameId: NameId) =>
  nameIdState.concat(nameId);

export const clear = (nameIdState: NameIdState) => {
  return Object.freeze([]);
};

export const subscribe = (subscribers: Function[], subscriber: Function) =>
  subscribers.concat(subscriber);

export const unsubscribe = (subscribers: Function[], subscriber: Function) =>
  subscribers.filter((s: Function) => s !== subscriber);

export const notify = (nameIdState: NameIdState, subscribers: Function[]) =>
  subscribers.forEach((s: Function) => s(nameIdState));

export const NameIdStoreFactory = () => {
  let nameIdState: NameIdState = Object.freeze([]);
  let subscribers: Function[] = Object.freeze([]);

  return {
    addNameId: (nameId: NameId) => {
      nameIdState = addNameId(nameIdState, nameId);
      notify(nameIdState, subscribers);
    },
    clear: () => {
      nameIdState = clear(nameIdState);
      notify(nameIdState, subscribers);
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

//Weapon
export const weaponVariantStore = NameIdStoreFactory();
export const weaponActiveTalentStore = NameIdStoreFactory();
export const weaponPassiveTalentStore = NameIdStoreFactory();

//Gear
export const gearTypeStore = NameIdStoreFactory();
export const gearFamilyStore = NameIdStoreFactory();
export const gearActiveTalentStore = NameIdStoreFactory();
export const gearPassiveTalentStore = NameIdStoreFactory();

//Attribute
export const gearAttributeStore = NameIdStoreFactory();

//Attribute Type
export const gearAttributeTypeStore = NameIdStoreFactory();
