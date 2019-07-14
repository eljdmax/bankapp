// @flow

import React, { Component } from 'react';
import * as R from 'ramda';

import type { Gear } from '../domain/Gear';
import type { NameId } from '../domain/NameId';
import type { InternalGearMod } from '../domain/InternalGearMod';
import type { InternalGearAttribute } from '../domain/InternalGearAttribute';
import type {
  FormNumberField,
  FormNumberArrayField,
} from '../domain/FormField';

import type { GearService } from '../domain/GearService';
import type { GearStore } from '../store/GearStore';

import { gearService } from '../domain/GearService';
import { gearStore, gearEditStore } from '../store/GearStore';
import {
  gearTypeStore,
  gearFamilyStore,
  gearActiveTalentStore,
  gearPassiveTalentStore,
  gearAttributeStore,
  gearAttributeTypeStore,
  leftMenuFilterStore,
} from '../store/NameIdStore';
import { internalGearModStore } from '../store/InternalGearModStore';
import { internalGearAttributeStore } from '../store/InternalGearAttributeStore';

import { GearFormComponent } from './GearFormComponent';
import * as gearRestService from '../services/GearRestService';

import { internalGearModService } from '../domain/InternalGearModService';
import { internalGearAttributeService } from '../domain/InternalGearAttributeService';

import { GenericFormWrap } from '../styles/GenericForm';
import { Modal } from '../styles/Body';

type Props = {};

export type FormData = {
  gearId: number,
  gearTypeList: NameId[],
  gearFamilyList: NameId[],
  gearActiveTalentList: NameId[],
  gearPassiveTalentList: NameId[],
  gearAttributeList: NameId[],
  gearAttributeTypeList: NameId[],
  internalGearModList: InternalGearMod[],
  internalGearAttributeList: InternalGearAttribute[],

  gearScore: FormNumberField,
  gearArmor: FormNumberField,
  gearType: FormNumberField,
  gearFamily: FormNumberField,
  gearActiveTalent: FormNumberField,
  gearPassiveTalents: FormNumberArrayField,
};

export class GearFormContainer extends Component<Props, FormData> {
  gearStore: GearStore;
  gearService: GearService;
  subscriber: Function;
  typeFilterSubscriber: Function;
  typeSubscriber: Function;
  familySubscriber: Function;
  activeTalentSubscriber: Function;
  passiveTalentSubscriber: Function;
  attributeTypeSubscriber: Function;
  attributeSubscriber: Function;

  internalGearModSuscriber: Function;
  internalGearAttributeSuscriber: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      visible: false,
      gearId: 0,
      gearTypeList: gearTypeStore.getState(),
      gearFamilyList: gearFamilyStore.getState(),
      gearActiveTalentList: gearActiveTalentStore.getState(),
      gearPassiveTalentList: gearPassiveTalentStore.getState(),
      gearAttributeList: gearAttributeStore.getState(),
      gearAttributeTypeList: gearAttributeTypeStore.getState(),
      internalGearModList: [],
      internalGearAttributeList: [],

      gearTypeFilter: { id: 1 },
      gearScore: {
        value: 0,
        valid: true,
      },
      gearArmor: {
        value: 0,
        valid: true,
      },
      gearType: {
        value: 1,
        valid: true,
      },
      gearFamily: {
        value: '',
        valid: true,
      },
      gearActiveTalent: {
        value: '',
        valid: true,
      },
      gearPassiveTalents: {
        value: [],
        valid: true,
      },
    };

    this.subscriber = gearEditStore.subscribe((gears: Gear[]) => {
      if (!this.state.visible) this.setState(R.assocPath(['visible'], true));

      if (gears.length > 0) {
        let activeTalent = gears[0].activeTalent
          ? gears[0].activeTalent.id
          : '';

        let passiveTalents = [];
        if (gears[0].passiveTalents.length > 0) {
          passiveTalents = gears[0].passiveTalents.map(talent => {
            return talent.id;
          });
        }

        if (gears[0].gearMods.length > 0) {
          gears[0].gearMods.forEach(mod => {
            internalGearModStore.addInternalGearMod(
              internalGearModService.createInternalGearMod(mod),
            );
          });
        }

        if (gears[0].gearAttributes.length > 0) {
          gears[0].gearAttributes.forEach(attribute => {
            internalGearAttributeStore.addInternalGearAttribute(
              internalGearAttributeService.createInternalGearAttribute(
                attribute,
              ),
            );
          });
        }

        this.setState(state => {
          return R.pipe(
            R.assocPath(['gearId'], gears[0].id),
            R.assocPath(['gearScore', 'value'], gears[0].score),
            R.assocPath(['gearScore', 'valid'], true),
            R.assocPath(['gearArmor', 'value'], gears[0].armor),
            R.assocPath(['gearArmor', 'valid'], true),
            R.assocPath(['gearType', 'value'], gears[0].type.id),
            R.assocPath(['gearType', 'valid'], true),
            R.assocPath(['gearFamily', 'value'], gears[0].family.id),
            R.assocPath(['gearFamily', 'valid'], true),
            R.assocPath(['gearActiveTalent', 'value'], activeTalent),
            R.assocPath(['gearActiveTalent', 'valid'], true),
            R.assocPath(['gearPassiveTalents', 'value'], passiveTalents),
            R.assocPath(['gearPassiveTalents', 'valid'], true),
          )(state);
        });
      }
    });

    this.typeFilterSubscriber = leftMenuFilterStore.subscribe(
      (nameIds: NameId[]) => {
        if (nameIds.length > 0) {
          this.setState(R.assocPath(['gearTypeFilter'], nameIds[0]));
          this.setState(R.assocPath(['gearType', 'value'], nameIds[0].id));
        }
      },
    );

    this.typeSubscriber = gearTypeStore.subscribe((nameIds: NameId[]) => {
      this.setState(R.assocPath(['gearTypeList'], nameIds));
    });

    this.familySubscriber = gearFamilyStore.subscribe((nameIds: NameId[]) => {
      this.setState(R.assocPath(['gearFamilyList'], nameIds));
    });

    this.activeTalentSubscriber = gearActiveTalentStore.subscribe(
      (nameIds: NameId[]) => {
        this.setState(R.assocPath(['gearActiveTalentList'], nameIds));
      },
    );

    this.passiveTalentSubscriber = gearPassiveTalentStore.subscribe(
      (nameIds: NameId[]) => {
        this.setState(R.assocPath(['gearPassiveTalentList'], nameIds));
      },
    );

    this.attributeTypeSubscriber = gearAttributeTypeStore.subscribe(
      (nameIds: NameId[]) => {
        this.setState(R.assocPath(['gearAttributeTypeList'], nameIds));
      },
    );

    this.attributeSubscriber = gearAttributeStore.subscribe(
      (nameIds: NameId[]) => {
        this.setState(R.assocPath(['gearAttributeList'], nameIds));
      },
    );

    this.internalGearModSuscriber = internalGearModStore.subscribe(
      (internalGearMods: InternalGearMod[]) => {
        this.setState(R.assocPath(['internalGearModList'], internalGearMods));
      },
    );

    this.internalGearAttributeSuscriber = internalGearAttributeStore.subscribe(
      (internalGearAttributes: InternalGearAttribute[]) => {
        this.setState(
          R.assocPath(['internalGearAttributeList'], internalGearAttributes),
        );
      },
    );

    this.gearStore = gearStore;
    this.gearService = gearService;
  }

  changeGearScore(event: Event) {
    this.setState(
      R.assocPath(['gearScore', 'value'], R.path(['target', 'value'], event)),
    );
  }

  changeGearArmor(event: Event) {
    this.setState(
      R.assocPath(['gearArmor', 'value'], R.path(['target', 'value'], event)),
    );
  }

  changeGearType(event: Event) {
    this.setState(
      R.assocPath(['gearType', 'value'], R.path(['target', 'value'], event)),
    );
  }

  changeGearFamily(event: Event) {
    this.setState(
      R.assocPath(['gearFamily', 'value'], R.path(['target', 'value'], event)),
    );
  }

  changeGearActiveTalent(event: Event) {
    this.setState(
      R.assocPath(
        ['gearActiveTalent', 'value'],
        R.path(['target', 'value'], event),
      ),
    );
  }

  changeGearPassiveTalents(event: Event) {
    this.setState(
      R.assocPath(
        ['gearPassiveTalents', 'value'],
        Array.from(event.target.selectedOptions, item => item.value),
      ),
    );
  }

  changeGearMods(event: Event) {
    internalGearModStore.addInternalGearMod(
      internalGearModService.createInternalGearMod({
        id: Number(event.target.selectedOptions[0].value),
        name: event.target.selectedOptions[0].text,
        fitted: false,
      }),
    );
  }

  removeMod(internalGearMod: InternalGearMod) {
    internalGearModStore.removeInternalGearMod(internalGearMod);
  }

  changeGearAttributes(event: Event) {
    internalGearAttributeStore.addInternalGearAttribute(
      internalGearAttributeService.createInternalGearAttribute({
        attribute: {
          id: Number(event.target.selectedOptions[0].value),
          name: event.target.selectedOptions[0].text,
        },
        value: '0',
      }),
    );
  }

  removeAttribute(internalGearAttribute: InternalGearAttribute) {
    internalGearAttributeStore.removeInternalGearAttribute(
      internalGearAttribute,
    );
  }

  updateAttribute(event: Event, internalGearAttribute: InternalGearAttribute) {
    let newGA = internalGearAttributeService.updateValue(
      internalGearAttribute,
      event.target.value,
    );
    internalGearAttributeStore.updateInternalGearAttribute(newGA);
  }

  submitForm(event: Event) {
    const gearScore = Number(R.path(['target', 'gearScore', 'value'], event));
    const gearArmor = Number(R.path(['target', 'gearArmor', 'value'], event));
    const gearType = Number(R.path(['target', 'gearType', 'value'], event));
    const gearFamily = Number(R.path(['target', 'gearFamily', 'value'], event));
    const gearActiveTalent = R.path(
      ['target', 'gearActiveTalent', 'value'],
      event,
    );
    const gearPassiveTalents = Array.from(
      event.target.gearPassiveTalents.selectedOptions,
      item => item.value,
    );
    const gearMods = Array.from(
      this.state.internalGearModList,
      item => item.mod.id,
    );
    const gearAttributes = Array.from(
      this.state.internalGearAttributeList,
      (item, index) => {
        let id = item.ga.attribute.id;

        let value = Number(
          R.path(['target', 'gearInternalGA' + index, 'value'], event),
        );
        return { id: id, value: value };
      },
    );


    const isScoreValid = this.gearService.isScoreValid(gearScore);
    const isArmorValid = this.gearService.isArmorValid(gearArmor);
    const isTypeValid = this.gearService.isTypeValid(gearType);
    const isFamilyValid = this.gearService.isFamilyValid(gearFamily);

    if (isScoreValid && isArmorValid && isTypeValid && isFamilyValid) {
      let submitStatus = gearRestService.postUpdateGear(this.state.gearId, {
        score: gearScore,
        armor: gearArmor,
        type: gearType,
        family: gearFamily,
        activeTalent: gearActiveTalent,
        passiveTalentIds: gearPassiveTalents,
        modIds: gearMods,
        attributeIds: gearAttributes,
      });

      if (submitStatus.success) {
        this.closeForm();
      } else {
        alert('An error occured!');
      }
    } else {
      this.markInvalid(isScoreValid, isArmorValid, isTypeValid, isFamilyValid);
    }
  }

  clearForm() {
    if (this.state.gearId > 0) {
      gearEditStore.clear();
    }

    internalGearModStore.clear();
    internalGearAttributeStore.clear();

    this.setState(state => {
      return R.pipe(
        R.assocPath(['gearId'], 0),
        R.assocPath(['gearScore', 'value'], 0),
        R.assocPath(['gearScore', 'valid'], true),
        R.assocPath(['gearArmor', 'value'], 0),
        R.assocPath(['gearArmor', 'valid'], true),
        R.assocPath(['gearType', 'value'], this.state.gearTypeFilter.id),
        R.assocPath(['gearType', 'valid'], true),
        R.assocPath(['gearFamily', 'value'], ''),
        R.assocPath(['gearFamily', 'valid'], true),
        R.assocPath(['gearActiveTalent', 'value'], ''),
        R.assocPath(['gearActiveTalent', 'valid'], true),
        R.assocPath(['gearPassiveTalents', 'value'], []),
        R.assocPath(['gearPassiveTalents', 'valid'], true),
      )(state);
    });
  }

  closeForm() {
    this.clearForm();
    this.setState(R.assocPath(['visible'], false));
  }

  markInvalid(
    isScoreValid: boolean,
    isArmorValid: boolean,
    isTypeValid: boolean,
    isFamilyValid: boolean,
  ) {
    this.setState(state => {
      return R.pipe(
        R.assocPath(['gearScore', 'valid'], isScoreValid),
        R.assocPath(['gearArmor', 'valid'], isArmorValid),
        R.assocPath(['gearType', 'valid'], isTypeValid),
        R.assocPath(['gearFamily', 'valid'], isFamilyValid),
      )(state);
    });
  }

  componentWillUnmount() {
    gearEditStore.unsubscribe(this.subscriber);
    gearTypeStore.unsubscribe(this.typeSubscriber);
    gearFamilyStore.unsubscribe(this.familySubscriber);
    gearActiveTalentStore.unsubscribe(this.activeTalentSubscriber);
    gearPassiveTalentStore.unsubscribe(this.passiveTalentSubscriber);
    gearAttributeTypeStore.unsubscribe(this.attributeTypeSubscriber);
    gearAttributeStore.unsubscribe(this.attributeSubscriber);
    internalGearModStore.unsubscribe(this.internalGearModSuscriber);
    internalGearAttributeStore.unsubscribe(this.internalGearAttributeSuscriber);
    leftMenuFilterStore.unsubscribe(this.typeFilterSubscriber);
  }

  render() {
    if (!this.state.visible) {
      return null;
    }

    return (
      <Modal>
        <GenericFormWrap>
          <GearFormComponent
            formData={this.state}
            submitForm={this.submitForm.bind(this)}
            clearForm={() => this.clearForm()}
            closeForm={() => this.closeForm()}
            changeGearScore={event => this.changeGearScore(event)}
            changeGearArmor={event => this.changeGearArmor(event)}
            changeGearType={event => this.changeGearType(event)}
            changeGearFamily={event => this.changeGearFamily(event)}
            changeGearActiveTalent={event => this.changeGearActiveTalent(event)}
            changeGearPassiveTalents={event =>
              this.changeGearPassiveTalents(event)
            }
            changeGearAttributes={event => this.changeGearAttributes(event)}
            removeAttribute={(internalGearAttribute: InternalGearAttribute) =>
              this.removeAttribute(internalGearAttribute)
            }
            changeGearMods={event => this.changeGearMods(event)}
            removeMod={(internalGearMod: InternalGearMod) =>
              this.removeMod(internalGearMod)
            }
            updateAttribute={(
              event,
              internalGearAttribute: InternalGearAttribute,
            ) => this.updateAttribute(event, internalGearAttribute)}
          />
        </GenericFormWrap>
      </Modal>
    );
  }
}
