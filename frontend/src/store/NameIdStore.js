// @flow
import type { NameId } from '../domain/NameId';
import type { NameIdState } from './NameIdState';

export type NameIdStore = {
  getState(): NameIdState,
  addNameId(nameId: NameId): void,
  addNameIds(nameIds: NameId[]): void,
  replaceNameId(nameId: NameId): void,
  toggleVisibility(): void,
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
    getState: () => {
      return nameIdState;
    },
    addNameId: (nameId: NameId) => {
      nameIdState = addNameId(nameIdState, nameId);
      notify(nameIdState, subscribers);
    },
    addNameIds: (nameIds: NameId[]) => {
      nameIds.forEach((nameId, index) => {
        nameIdState = addNameId(nameIdState, nameId);
      });
      notify(nameIdState, subscribers);
    },
    replaceNameId: (nameId: NameId) => {
      nameIdState = clear(nameIdState);
      nameIdState = addNameId(nameIdState, nameId);
      notify(nameIdState, subscribers);
    },
    toggleVisibility: () => {
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

//Left Menu Filter
export const leftMenuFilterStore = NameIdStoreFactory();

//View Settings
export const settingsViewStore = NameIdStoreFactory();

//Yes, No list
export const yesNoStore = NameIdStoreFactory();

//Filters
export const viewAttributesStore = NameIdStoreFactory();
export const viewTalentsStore = NameIdStoreFactory();

export const familyFilterStore = NameIdStoreFactory();
export const trashFilterStore = NameIdStoreFactory();
export const buildFilterStore = NameIdStoreFactory();
export const starFilterStore = NameIdStoreFactory();

export const orderByStore = NameIdStoreFactory();
export const thenOrderByStore = NameIdStoreFactory();

export const variantTypeFilterStore = NameIdStoreFactory();

//Builds
export const buildStore = NameIdStoreFactory();
