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

export const fetchWeaponVariants = (
  cookies = { csrftoken: '' },
  updateLoadedResource: Function,
) => {
  fetch(restURL + '/weapon/variants/', {
    method: 'GET',
    headers: getDefaultHeaders(cookies),
  }).then(response => {
    weaponVariantStore.clear();
    response.json().then(data => {
      weaponVariantStore.addNameId(data);
    });
    if (updateLoadedResource) updateLoadedResource('weaponVariants');
  });
};

export const fetchWeaponActiveTalents = (
  cookies = { csrftoken: '' },
  updateLoadedResource: Function,
) => {
  fetch(restURL + '/weapon/activetalents/', {
    method: 'GET',
    headers: getDefaultHeaders(cookies),
  }).then(response => {
    weaponActiveTalentStore.clear();
    response.json().then(data => {
      weaponActiveTalentStore.addNameId(data);
    });
    if (updateLoadedResource) updateLoadedResource('weaponActiveTalents');
  });
};

export const fetchWeaponPassiveTalents = (
  cookies = { csrftoken: '' },
  updateLoadedResource: Function,
) => {
  fetch(restURL + '/weapon/passivetalents/', {
    method: 'GET',
    headers: getDefaultHeaders(cookies),
  }).then(response => {
    weaponPassiveTalentStore.clear();
    response.json().then(data => {
      weaponPassiveTalentStore.addNameId(data);
    });
    if (updateLoadedResource) updateLoadedResource('weaponPassiveTalents');
  });
};

export const fetchGearTypes = (
  cookies = { csrftoken: '' },
  updateLoadedResource: Function,
) => {
  fetch(restURL + '/gear/types/', {
    method: 'GET',
    headers: getDefaultHeaders(cookies),
  }).then(response => {
    gearTypeStore.clear();
    response.json().then(data => {
      gearTypeStore.addNameId(data);
    });
    if (updateLoadedResource) updateLoadedResource('gearTypes');
  });
};

export const fetchGearFamilies = (
  cookies = { csrftoken: '' },
  updateLoadedResource: Function,
) => {
  fetch(restURL + '/gear/families/', {
    method: 'GET',
    headers: getDefaultHeaders(cookies),
  }).then(response => {
    gearFamilyStore.clear();
    response.json().then(data => {
      gearFamilyStore.addNameId(data);
    });
    if (updateLoadedResource) updateLoadedResource('gearFamilies');
  });
};

export const fetchGearActiveTalents = (
  cookies = { csrftoken: '' },
  updateLoadedResource: Function,
) => {
  fetch(restURL + '/gear/activetalents/', {
    method: 'GET',
    headers: getDefaultHeaders(cookies),
  }).then(response => {
    gearActiveTalentStore.clear();
    response.json().then(data => {
      gearActiveTalentStore.addNameId(data);
    });
    if (updateLoadedResource) updateLoadedResource('gearActiveTalents');
  });
};

export const fetchGearPassiveTalents = (
  cookies = { csrftoken: '' },
  updateLoadedResource: Function,
) => {
  fetch(restURL + '/gear/passivetalents/', {
    method: 'GET',
    headers: getDefaultHeaders(cookies),
  }).then(response => {
    gearPassiveTalentStore.clear();
    response.json().then(data => {
      gearPassiveTalentStore.addNameId(data);
    });
    if (updateLoadedResource) updateLoadedResource('gearPassiveTalents');
  });
};

export const fetchGearAttributes = (
  cookies = { csrftoken: '' },
  updateLoadedResource: Function,
) => {
  fetch(restURL + '/gear/attributes/', {
    method: 'GET',
    headers: getDefaultHeaders(cookies),
  }).then(response => {
    gearAttributeStore.clear();
    response.json().then(data => {
      gearAttributeStore.addNameId(data);
    });
    if (updateLoadedResource) updateLoadedResource('gearAttributes');
  });
};

export const fetchGearAttributeTypes = (
  cookies = { csrftoken: '' },
  updateLoadedResource: Function,
) => {
  fetch(restURL + '/gear/attributetypes/', {
    method: 'GET',
    headers: getDefaultHeaders(cookies),
  }).then(response => {
    gearAttributeTypeStore.clear();
    response.json().then(data => {
      gearAttributeTypeStore.addNameId(data);
    });
    if (updateLoadedResource) updateLoadedResource('gearAttributeTypes');
  });
};

export const fetchBuilds = (
  cookies = { csrftoken: '' },
  updateLoadedResource: Function,
) => {
  fetch(restURL + '/builds/', {
    method: 'GET',
    headers: getDefaultHeaders(cookies),
  }).then(response => {
    buildStore.clear();
    response.json().then(data => {
      buildStore.addNameId(data);
    });
    if (updateLoadedResource) updateLoadedResource('builds');
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
