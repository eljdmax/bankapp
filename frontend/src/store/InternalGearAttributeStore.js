// @flow
import { update } from 'ramda';

import type { InternalGearAttribute } from '../domain/InternalGearAttribute';
import type { InternalGearAttributeState } from './InternalGearAttributeState';

export type InternalGearAttributeStore = {
  addInternalGearAttribute(internalGearAttribute: InternalGearAttribute): void,
  removeInternalGearAttribute(
    internalGearAttribute: InternalGearAttribute,
  ): void,
  updateInternalGearAttribute(
    internalGearAttribute: InternalGearAttribute,
  ): void,
  clear(): void,
  subscribe(subscriber: Function): Function,
  unsubscribe(subscriber: Function): void,
};

export const addInternalGearAttribute = (
  internalGearAttributeState: InternalGearAttributeState,
  internalGearAttribute: InternalGearAttribute,
) => internalGearAttributeState.concat(internalGearAttribute);

export const removeInternalGearAttribute = (
  internalGearAttributeState: InternalGearAttributeState,
  internalGearAttribute: InternalGearAttribute,
) =>
  internalGearAttributeState.filter(
    (a: InternalGearAttribute) => a.iid !== internalGearAttribute.iid,
  );

export const clear = (
  internalGearAttributeState: InternalGearAttributeState,
) => {
  return Object.freeze([]);
};

export const updateInternalGearAttribute = (
  internalGearAttributeState: InternalGearAttributeState,
  internalGearAttribute: InternalGearAttribute,
) => {
  const index = internalGearAttributeState.findIndex(
    (a: InternalGearAttribute) => a.iid === internalGearAttribute.iid,
  );
  return update(index, internalGearAttribute, internalGearAttributeState);
};

export const subscribe = (subscribers: Function[], subscriber: Function) =>
  subscribers.concat(subscriber);

export const unsubscribe = (subscribers: Function[], subscriber: Function) =>
  subscribers.filter((s: Function) => s !== subscriber);

export const notify = (
  internalGearAttributeState: InternalGearAttributeState,
  subscribers: Function[],
) => subscribers.forEach((s: Function) => s(internalGearAttributeState));

export const InternalGearAttributeStoreFactory = () => {
  let internalGearAttributeState: InternalGearAttributeState = Object.freeze(
    [],
  );
  let subscribers: Function[] = Object.freeze([]);

  return {
    addInternalGearAttribute: (
      internalGearAttribute: InternalGearAttribute,
    ) => {
      internalGearAttributeState = addInternalGearAttribute(
        internalGearAttributeState,
        internalGearAttribute,
      );
      notify(internalGearAttributeState, subscribers);
    },
    removeInternalGearAttribute: (
      internalGearAttribute: InternalGearAttribute,
    ) => {
      internalGearAttributeState = removeInternalGearAttribute(
        internalGearAttributeState,
        internalGearAttribute,
      );
      notify(internalGearAttributeState, subscribers);
    },
    clear: () => {
      internalGearAttributeState = clear(internalGearAttributeState);
      notify(internalGearAttributeState, subscribers);
    },
    updateInternalGearAttribute: (
      internalGearAttribute: InternalGearAttribute,
    ) => {
      internalGearAttributeState = updateInternalGearAttribute(
        internalGearAttributeState,
        internalGearAttribute,
      );
      notify(internalGearAttributeState, subscribers);
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

export const internalGearAttributeStore = InternalGearAttributeStoreFactory();
