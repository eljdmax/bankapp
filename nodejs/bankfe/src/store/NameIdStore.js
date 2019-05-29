// @flow
import type {NameId} from "../domain/NameId";
import type {NameIdState} from "./NameIdState";

export type NameIdStore = {
  addNameId(nameId: NameId): void;
  clear(): void;
  subscribe(subscriber: Function): Function;
  unsubscribe(subscriber: Function): void;
}

export const addNameId = (nameIdState: NameIdState, nameId: NameId) => nameIdState.concat(nameId);


export const clear = (nameIdState: NameIdState) => {
  return Object.freeze([]);
};


export const subscribe = (subscribers: Function[], subscriber: Function) =>
  subscribers.concat(subscriber);

export const unsubscribe = (subscribers: Function[], subscriber: Function) =>
  subscribers.filter((s: Function) => s !== subscriber);

export const notify = (weaponState: WeaponState, subscribers: Function[]) =>
  subscribers.forEach((s: Function) => s(weaponState));

export const NameIdStoreFactory = (() => {
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
    }
  }
});


export const weaponVariantStore = NameIdStoreFactory();
export const weaponActiveTalentStore = NameIdStoreFactory();