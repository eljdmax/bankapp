// @flow

import type { GearFormData, Gear } from '../domain/Gear';
import { gearStore } from '../store/GearStore';
import { gearService } from '../domain/GearService';
import { restURL } from './RestServiceConfig';

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

export const fetchAllGears = () => {
  fetch(restURL + '/gears/', {
    method: 'GET',
    //body: JSON.stringify(userData),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  }).then(response => {
    response.json().then(data => {
      let newGears = data.map((gearRaw, index) => {
        const newGear = gearService.createGear(gearRestToObj(gearRaw));
        if (!newGear) {
          console.log('failed to instantiate a new Gear!');
        }
        return newGear;
      });
      gearStore.addGears(newGears);
    });
  });

  return true;
};

export const fetchGear = (id: number, update: boolean) => {
  fetch(restURL + '/gear/' + id + '/', {
    method: 'GET',
    //body: JSON.stringify(userData),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
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

export const postUpdateGear = (id: number, gearFormData: GearFormData) => {
  let ret = { success: true, msg: '' };

  let url = restURL + '/gear/';
  let method = 'POST';
  if (id > 0) {
    url = url + id + '/';
    method = 'PUT';
  }

  fetch(url, {
    method: method,
    body: JSON.stringify(gearFormData),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  }).then(response => {
    response.json().then(data => {
      fetchGear(data.id, id > 0);
    });
  });

  return ret;
};

export const deleteGear = (gear: Gear) => {
  fetch(restURL + '/gear/' + gear.id + '/', {
    method: 'DELETE',
    //body: JSON.stringify(gearFormData),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  }).then(response => {
    console.log('response ', response);
    if (response.status === 204) {
      gearStore.removeGear(gear);
    }
  });
};
