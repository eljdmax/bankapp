// @flow

import {
  weaponVariantStore,
  weaponActiveTalentStore,
  weaponPassiveTalentStore,
  gearTypeStore,
  gearFamilyStore,
  gearActiveTalentStore,
  gearPassiveTalentStore,
  gearAttributeStore,
  gearAttributeTypeStore,
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

export const fetchGearTypes = () => {
  fetch(restURL + '/gear/types/', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  }).then(response => {
    response.json().then(data => {
      gearTypeStore.addNameId(data);
    });
  });
};

export const fetchGearFamilies = () => {
  fetch(restURL + '/gear/families/', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  }).then(response => {
    response.json().then(data => {
      gearFamilyStore.addNameId(data);
    });
  });
};

export const fetchGearActiveTalents = () => {
  fetch(restURL + '/gear/activetalents/', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  }).then(response => {
    response.json().then(data => {
      gearActiveTalentStore.addNameId(data);
    });
  });
};

export const fetchGearPassiveTalents = () => {
  fetch(restURL + '/gear/passivetalents/', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  }).then(response => {
    response.json().then(data => {
      gearPassiveTalentStore.addNameId(data);
    });
  });
};

export const fetchGearAttributes = () => {
  fetch(restURL + '/gear/attributes/', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  }).then(response => {
    response.json().then(data => {
      gearAttributeStore.addNameId(data);
    });
  });
};

export const fetchGearAttributeTypes = () => {
  fetch(restURL + '/gear/attributetypes/', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  }).then(response => {
    response.json().then(data => {
      gearAttributeTypeStore.addNameId(data);
    });
  });
};
