// @flow

import type { WeaponFormData, Weapon } from '../domain/Weapon';
import { weaponStore, weaponEditStore } from '../store/WeaponStore';
import { weaponService } from '../domain/WeaponService';
import { restURL } from './RestServiceConfig';

export const weaponRestToObj = (data: any) => {
  return {
    id: Number(data.id),
    score: Number(data.score),
    dmg: Number(data.dmg),
    variant: data.variant,
    activeTalent: data.activeTalent,
    passiveTalents: data.passiveTalents,
  };
};

export const fetchAllWeapons = () => {
  fetch(restURL + '/weapons/', {
    method: 'GET',
    //body: JSON.stringify(userData),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  }).then(response => {
    response.json().then(data => {
      data.map((weaponRaw, index) => {
        const newWeapon = weaponService.createWeapon(
          weaponRestToObj(weaponRaw),
        );
        if (newWeapon) {
          weaponStore.addWeapon(newWeapon);
        } else {
          console.log('failed!');
          return false;
        }
      });
    });
  });

  return true;
};

export const fetchWeapon = (id: number, update: boolean) => {
  fetch(restURL + '/weapon/' + id + '/', {
    method: 'GET',
    //body: JSON.stringify(userData),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  }).then(response => {
    response.json().then(data => {
      const newWeapon = weaponService.createWeapon(weaponRestToObj(data));
      if (newWeapon) {
        console.log('Update? ', update);
        if (update) {
          weaponStore.updateWeapon(newWeapon);
        } else {
          weaponStore.addWeapon(newWeapon);
        }
      } else {
        return false;
      }
    });
  });

  return true;
};

export const postUpdateWeapon = (
  id: number,
  weaponFormData: WeaponFormData,
) => {
  let ret = { success: true, msg: '' };

  let url = restURL + '/weapon/';
  let method = 'POST';
  if (id > 0) {
    url = url + id + '/';
    method = 'PUT';
  }

  if (!weaponFormData.passiveTalentids)
    fetch(url, {
      method: method,
      body: JSON.stringify(weaponFormData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }).then(response => {
      response.json().then(data => {
        fetchWeapon(data.id, id > 0);
      });
    });

  return ret;
};

export const deleteWeapon = (weapon: Weapon) => {
  fetch(restURL + '/weapon/' + weapon.id + '/', {
    method: 'DELETE',
    //body: JSON.stringify(weaponFormData),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  }).then(response => {
    console.log('response ', response);
    if (response.status === 204) {
      weaponStore.removeWeapon(weapon);
    }
  });
};
