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
  yesNoStore,
  viewAttributesStore,
  viewTalentsStore,
  buildStore,
} from '../store/NameIdStore';

import { getDefaultHeaders, restURL } from './RestServiceConfig';

export const fetchWeaponVariants = (cookies = {'csrftoken':''}) => {
  fetch(restURL + '/weapon/variants/', {
    method: 'GET',
    headers: getDefaultHeaders(cookies),
  }).then(response => {
    weaponVariantStore.clear();
    response.json().then(data => {
      weaponVariantStore.addNameId(data);
    });
  });
};

export const fetchWeaponActiveTalents = (cookies = {'csrftoken':''}) => {
  fetch(restURL + '/weapon/activetalents/', {
    method: 'GET',
    headers: getDefaultHeaders(cookies),
  }).then(response => {
    weaponActiveTalentStore.clear();
    response.json().then(data => {
      weaponActiveTalentStore.addNameId(data);
    });
  });
};

export const fetchWeaponPassiveTalents = (cookies = {'csrftoken':''}) => {
  fetch(restURL + '/weapon/passivetalents/', {
    method: 'GET',
    headers: getDefaultHeaders(cookies),
  }).then(response => {
    weaponPassiveTalentStore.clear();
    response.json().then(data => {
      weaponPassiveTalentStore.addNameId(data);
    });
  });
};

export const fetchGearTypes = (cookies = {'csrftoken':''}) => {
  fetch(restURL + '/gear/types/', {
    method: 'GET',
    headers: getDefaultHeaders(cookies),
  }).then(response => {
    gearTypeStore.clear();
    response.json().then(data => {
      gearTypeStore.addNameId(data);
    });
  });
};

export const fetchGearFamilies = (cookies = {'csrftoken':''}) => {
  fetch(restURL + '/gear/families/', {
    method: 'GET',
    headers: getDefaultHeaders(cookies),
  }).then(response => {
    gearFamilyStore.clear();
    response.json().then(data => {
      gearFamilyStore.addNameId(data);
    });
  });
};

export const fetchGearActiveTalents = (cookies = {'csrftoken':''}) => {
  fetch(restURL + '/gear/activetalents/', {
    method: 'GET',
    headers: getDefaultHeaders(cookies),
  }).then(response => {
    gearActiveTalentStore.clear();
    response.json().then(data => {
      gearActiveTalentStore.addNameId(data);
    });
  });
};

export const fetchGearPassiveTalents = (cookies = {'csrftoken':''}) => {
  fetch(restURL + '/gear/passivetalents/', {
    method: 'GET',
    headers: getDefaultHeaders(cookies),
  }).then(response => {
    gearPassiveTalentStore.clear();
    response.json().then(data => {
      gearPassiveTalentStore.addNameId(data);
    });
  });
};

export const fetchGearAttributes = (cookies = {'csrftoken':''}) => {
  fetch(restURL + '/gear/attributes/', {
    method: 'GET',
    headers: getDefaultHeaders(cookies),
  }).then(response => {
    gearAttributeStore.clear();
    response.json().then(data => {
      gearAttributeStore.addNameId(data);
    });
  });
};

export const fetchGearAttributeTypes = (cookies = {'csrftoken':''}) => {
  fetch(restURL + '/gear/attributetypes/', {
    method: 'GET',
    headers: getDefaultHeaders(cookies),
  }).then(response => {
    gearAttributeTypeStore.clear();
    response.json().then(data => {
      gearAttributeTypeStore.addNameId(data);
    });
  });
};

export const fetchBuilds = (cookies = {'csrftoken':''}) => {
  fetch(restURL + '/builds/', {
    method: 'GET',
    headers: getDefaultHeaders(cookies),
  }).then(response => {
    buildStore.clear();
    response.json().then(data => {
      buildStore.addNameId(data);
    });
  });
};

export const setYesNoStore = () => {
  yesNoStore.clear();
  yesNoStore.addNameId({ id: 0, name: 'Yes' });
  yesNoStore.addNameId({ id: 1, name: 'No' });
};

export const setFilters = () => {
  viewAttributesStore.clear();
  viewAttributesStore.addNameId({ id: 0, name: 'Yes' });
  viewTalentsStore.clear();
  viewTalentsStore.addNameId({ id: 0, name: 'Yes' });
};
