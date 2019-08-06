// @flow

import type { WeaponFormData, Weapon } from '../domain/Weapon';
import { weaponStore } from '../store/WeaponStore';
import { weaponService } from '../domain/WeaponService';
import { getDefaultHeaders, restURL } from './RestServiceConfig';

export const weaponRestToObj = (data: any) => {
  return {
    id: Number(data.id),
    score: Number(data.score),
    dmg: Number(data.dmg),
    trash: data.trash,
    variant: data.variant,
    activeTalent: data.activeTalent,
    passiveTalents: data.passiveTalents,
    star: data.star,
    builds: data.builds,
  };
};

export const fetchAllWeapons = (
  cookies = { csrftoken: '' },
  updateLoadedResource: Function,
) => {
  fetch(restURL + '/weapons/', {
    method: 'GET',
    //body: JSON.stringify(userData),
    headers: getDefaultHeaders(cookies),
  }).then(response => {
    weaponStore.clear();
    response.json().then(data => {
      let newWeapons = [];
      newWeapons = data.map((weaponRaw, index) => {
        const newWeapon = weaponService.createWeapon(
          weaponRestToObj(weaponRaw),
        );
        if (!newWeapon) {
          console.log('failed to instantiate a weapon!');
        }
        return newWeapon;
      });
      weaponStore.addWeapons(newWeapons);
      if (updateLoadedResource) updateLoadedResource('allWeapons');
    });
  });

  return true;
};

export const fetchWeapon = (
  cookies = { csrftoken: '' },
  id: number,
  update: boolean,
) => {
  fetch(restURL + '/weapon/' + id + '/', {
    method: 'GET',
    //body: JSON.stringify(userData),
    headers: getDefaultHeaders(cookies),
  }).then(response => {
    response.json().then(data => {
      const newWeapon = weaponService.createWeapon(weaponRestToObj(data));
      if (newWeapon) {
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
  cookies = { csrftoken: '' },
  id: number,
  weaponFormData: WeaponFormData,
  onSuccess: Function,
  onFailure: Function,
) => {
  let url = restURL + '/weapon/';
  let method = 'POST';
  if (id > 0) {
    url = url + id + '/';
    method = 'PUT';
  }

  fetch(url, {
    method: method,
    body: JSON.stringify(weaponFormData),
    headers: getDefaultHeaders(cookies),
  })
    .catch(ex => {
      if (onFailure) onFailure(ex.toString());
    })
    .then(response => {
      if (response.ok) {
        response.json().then(data => {
          fetchWeapon(cookies, data.id, id > 0);
        });
        if (onSuccess) onSuccess();
      } else {
        if (onFailure) onFailure(response.statusText);
      }
    });
};

export const deleteWeapon = (cookies = { csrftoken: '' }, weapon: Weapon) => {
  fetch(restURL + '/weapon/' + weapon.id + '/', {
    method: 'DELETE',
    headers: getDefaultHeaders(cookies),
  }).then(response => {
    if (response.status === 204) {
      weaponStore.removeWeapon(weapon);
    }
  });
};
