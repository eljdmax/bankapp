// @flow

import {
  weaponVariantStore,
  weaponActiveTalentStore,
  weaponPassiveTalentStore,
} from '../store/NameIdStore';
import { restURL } from './RestServiceConfig';

export const fetchWeaponVariants = () => {
  fetch(restURL + '/weapon/variants/', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  }).then(response => {
    response.json().then(data => {
      weaponVariantStore.addNameId(data);
    });
  });
};

export const fetchWeaponActiveTalents = () => {
  fetch(restURL + '/weapon/activetalents/', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  }).then(response => {
    response.json().then(data => {
      weaponActiveTalentStore.addNameId(data);
    });
  });
};

export const fetchWeaponPassiveTalents = () => {
  fetch(restURL + '/weapon/passivetalents/', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  }).then(response => {
    response.json().then(data => {
      weaponPassiveTalentStore.addNameId(data);
    });
  });
};
