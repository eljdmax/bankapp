// @flow

import type {WeaponFormData, Weapon} from "../domain/Weapon"
import {weaponStore, weaponEditStore} from "../store/WeaponStore";
import {weaponService} from "../domain/WeaponService";
import {restURL} from "./RestServiceConfig";

export const fetchAllWeapons = () => {
  
  fetch(restURL+'/weapons/', {
    method: "GET",
    //body: JSON.stringify(userData),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*"
    }
  }).then( response => {
      response.json().then(data => {
	  data.map((weaponRaw, index) => {
          const newWeapon = weaponService.createWeapon({
			id: Number(weaponRaw.id),
			score: Number(weaponRaw.score),
			dmg: Number(weaponRaw.dmg),
			variant: weaponRaw.variant.name
		  });
		  if (newWeapon) {
			weaponStore.addWeapon(newWeapon);
		  }else{
			  return false;
		  }
	  })
    })
  });
  
  return true;
  
}


export const postUpdateWeapon = (id:number, weaponFormData: WeaponFormData) => {
	
	let ret = {'success':true, 'msg':''}
	
	let url = restURL+'/weapon/';
	let method = 'POST'
	if ( id > 0) {
	  url = url + id + '/';
	  method = 'PUT'
	}
	
    fetch(url, {
    method: method,
    body: JSON.stringify(weaponFormData),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*"
    }
  }).then( response => {
	  console.log("response ",response)
      response.json().then(data => {
		  console.log("data: ", data)
          const newWeapon = weaponService.createWeapon({
			id: Number(data.id),
			score: Number(weaponFormData.score),
			dmg: Number(weaponFormData.dmg),
			variant: "FAMAS"//weaponFormData.variant
		  });
		  if (newWeapon) {
			if (id>0) { 
				weaponStore.updateWeapon(newWeapon);
                weaponEditStore.clear();
			} else {
				weaponStore.addWeapon(newWeapon);
			}
		  }
	  })
  });
  
  return ret;
	
}


export const deleteWeapon = (weapon: Weapon) => {

  fetch(restURL+'/weapon/'+weapon.id+'/', {
    method: "DELETE",
    //body: JSON.stringify(weaponFormData),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*"
    }
  }).then( response => {
	  console.log("response ",response)
      if (response.status === 204) {
          weaponStore.removeWeapon(weapon);
	  }
  });
	
}