// @flow

import type { GearFormData, Gear } from '../domain/Gear';
import { gearStore } from '../store/GearStore';
import { gearService } from '../domain/GearService';
import { getDefaultHeaders, restURL } from './RestServiceConfig';

export const gearRestToObj = (data: any) => {
  return {
    id: Number(data.id),
    score: Number(data.score),
    armor: Number(data.armor),
    type: data.type,
    family: data.family,
    activeTalent: data.activeTalent,
    passiveTalents: data.passiveTalents,
    gearAttributes: data.gearAttributes,
    gearMods: data.gearMods,
    trash: data.trash,
    star: data.star,
    builds: data.builds,
  };
};

export const fetchAllGears = (
  cookies = { csrftoken: '' },
  updateLoadedResource: Function,
) => {
  fetch(restURL + '/gears/', {
    method: 'GET',
    //body: JSON.stringify(userData),
    headers: getDefaultHeaders(cookies),
  }).then(response => {
    gearStore.clear();
    response.json().then(data => {
      let newGears = data.map((gearRaw, index) => {
        const newGear = gearService.createGear(gearRestToObj(gearRaw));
        if (!newGear) {
          console.log('failed to instantiate a new Gear!');
        }
        return newGear;
      });
      gearStore.addGears(newGears);
      if (updateLoadedResource) updateLoadedResource('allGears');
    });
  });

  return true;
};

export const fetchGear = (
  cookies = { csrftoken: '' },
  id: number,
  update: boolean,
) => {
  fetch(restURL + '/gear/' + id + '/', {
    method: 'GET',
    //body: JSON.stringify(userData),
    headers: getDefaultHeaders(cookies),
  }).then(response => {
    response.json().then(data => {
      const newGear = gearService.createGear(gearRestToObj(data));
      if (newGear) {
        console.log('Update? ', update);
        if (update) {
          gearStore.updateGear(newGear);
        } else {
          gearStore.addGear(newGear);
        }
      } else {
        return false;
      }
    });
  });

  return true;
};

export const postUpdateGear = (
  cookies = { csrftoken: '' },
  id: number,
  gearFormData: GearFormData,
  onSuccess: Function,
  onFailure: Function,
) => {
  let url = restURL + '/gear/';
  let method = 'POST';
  if (id > 0) {
    url = url + id + '/';
    method = 'PUT';
  }

  fetch(url, {
    method: method,
    body: JSON.stringify(gearFormData),
    headers: getDefaultHeaders(cookies),
  })
    .catch(ex => {
      if (onFailure) onFailure(ex.toString());
    })
    .then(response => {
      if (response.ok) {
        response.json().then(data => {
          fetchGear(cookies, data.id, id > 0);
        });
        if (onSuccess) onSuccess();
      } else {
        if (onFailure) onFailure(response.statusText);
      }
    });
};

export const deleteGear = (cookies = { csrftoken: '' }, gear: Gear) => {
  fetch(restURL + '/gear/' + gear.id + '/', {
    method: 'DELETE',
    headers: getDefaultHeaders(cookies),
  }).then(response => {
    if (response.status === 204) {
      gearStore.removeGear(gear);
    }
  });
};
