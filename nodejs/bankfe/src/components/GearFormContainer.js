// @flow

import React, { Component } from 'react';
import * as R from 'ramda';

import type { Gear } from '../domain/Gear';
import type { NameId } from '../domain/NameId';
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
  gearFamilyStore
  gearActiveTalentStore,
  gearPassiveTalentStore,
  gearAttributeStore,
  gearAttributeTypeStore
} from '../store/NameIdStore';

import { GearFormComponent } from './GearFormComponent';
import * as gearRestService from '../services/GearRestService';

type Props = {};

export type FormData = {
  gearId: number,
  gearTypeList: NameId[],
  gearFamilyList: NameId[],
  gearActiveTalentList: NameId[],
  gearPassiveTalentList: NameId[],
  gearAttributeList: NameId[],
  gearAttributeTypeList: NameId[],
  
  gearScore: FormNumberField,
  gearArmor: FormNumberField,
  gearType: FormNumberField,
  gearFamily: FormNumberField,
  gearActiveTalent: FormNumberField,
  gearPassiveTalents: FormNumberArrayField,
  gearAttributes: FormNumberArrayField,
  gearMods: FormNumberArrayField,
};

export class GearFormContainer extends Component<Props, FormData> {
  gearStore: GearStore;
  gearService: GearService;
  subscriber: Function;
  typeSubscriber: Function;
  familySubscriber: Function;
  activeTalentSubscriber: Function;
  passiveTalentSubscriber: Function;
  attributeTypeSubscriber: Function;
  attributeSubscriber: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      gearId: 0,
      gearTypeList: [],
      gearFamilyList: [],
      gearActiveTalentList: [],
      gearPassiveTalentList: [],
      gearAttributeList: [],
      gearAttributeTypeList: [],

      gearScore: {
        value: 0,
        valid: true,
      },
      gearArmor: {
        value: 0,
        valid: true,
      },
      gearType: {
        value: '',
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
      gearAttributes: {
        value: [],
        valid: true,
      },
      gearMods: {
        value: [],
        valid: true,
      },
    };

    this.subscriber = gearEditStore.subscribe((gears: Gear[]) => {
      if (gears.length > 0) {

        let activeTalent = gears[0].activeTalent
          ? gears[0].activeTalent.id
          : '';

        let passiveTalents = [];
        if (gears[0].passiveTalents.length > 0) {
          gears[0].passiveTalents.map(talent => {
            passiveTalents.push(talent.id);
          });
        }


        this.setState(state => {
          return R.pipe(
            R.assocPath(['gearId'], gears[0].id),
            R.assocPath(['gearScore', 'value'], gears[0].score),
            R.assocPath(['gearScore', 'valid'], true),
            R.assocPath(['gearArmor', 'value'], gears[0].dmg),
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

    this.typeSubscriber = gearTypeStore.subscribe(
      (nameIds: NameId[]) => {
        this.setState(R.assocPath(['gearTypeList'], nameIds));
      },
    );

    this.familySubscriber = gearFamilyStore.subscribe(
      (nameIds: NameId[]) => {
        this.setState(R.assocPath(['gearFamilyList'], nameIds));
      },
    ); 

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
      R.assocPath(
        ['gearType', 'value'],
        R.path(['target', 'value'], event),
      ),
    );
  }

  changeGearFamily(event: Event) {
    this.setState(
      R.assocPath(
        ['gearFamily', 'value'],
        R.path(['target', 'value'], event),
      ),
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

  changeGearAttributes(event: Event) {
    this.setState(
      R.assocPath(
        ['gearAttributes', 'value'],
        Array.from(event.target.selectedOptions, item => item.value),
      ),
    );
  }

  changeGearMods(event: Event) {
    this.setState(
      R.assocPath(
        ['gearMods', 'value'],
        Array.from(event.target.selectedOptions, item => item.value),
      ),
    );
  }

  submitForm(event: Event) {
    const gearScore = Number(
      R.path(['target', 'gearScore', 'value'], event),
    );
    const gearArmor = Number(R.path(['target', 'gearArmor', 'value'], event));
    const gearType = Number(
      R.path(['target', 'gearType', 'value'], event),
    );
    const gearActiveTalent = R.path(
      ['target', 'gearActiveTalent', 'value'],
      event,
    );
    const gearPassiveTalents = Array.from(
      event.target.gearPassiveTalents.selectedOptions,
      item => item.value,
    );

    const isScoreValid = this.gearService.isScoreValid(gearScore);
    const isArmorValid = this.gearService.isArmorValid(gearArmor);
    const isTypeValid = this.gearService.isTypeValid(gearType);
    const isFamilyValid = this.gearService.isFamilyValid(gearFamily)

    if (isScoreValid && isDmgValid && isVariantValid && isFamilyValid) {
      let submitStatus = gearRestService.postUpdateGear(
        this.state.gearId,
        {
          score: gearScore,
          dmg: gearArmor,
          variant: gearType,
          activeTalent: gearActiveTalent,
          passiveTalentIds: gearPassiveTalents,
        },
      );

      if (submitStatus.success) {
        this.clearForm();
      } else {
        alert('An error occured!');
      }
    } else {
      this.markInvalid(isScoreValid, isDmgValid, isVariantValid, isFamilyValid);
    }
  }

  clearForm() {
    if (this.state.gearId > 0) {
      gearEditStore.clear();
    }

    this.setState(state => {
      return R.pipe(
        R.assocPath(['gearId'], 0),
        R.assocPath(['gearScore', 'value'], 0),
        R.assocPath(['gearScore', 'valid'], true),
        R.assocPath(['gearArmor', 'value'], 0),
        R.assocPath(['gearArmor', 'valid'], true),
        R.assocPath(['gearType', 'value'], ''),
        R.assocPath(['gearType', 'valid'], true),
        R.assocPath(['gearFamily', 'value'], ''),
        R.assocPath(['gearFamily', 'valid'], true),
        R.assocPath(['gearActiveTalent', 'value'], ''),
        R.assocPath(['gearActiveTalent', 'valid'], true),
        R.assocPath(['gearPassiveTalents', 'value'], []),
        R.assocPath(['gearPassiveTalents', 'valid'], true),
        R.assocPath(['gearAttributes', 'value'], []),
        R.assocPath(['gearAttributes', 'valid'], true),
        R.assocPath(['gearMods', 'value'], []),
        R.assocPath(['gearMods', 'valid'], true),
      )(state);
    });
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
  }

  render() {
    return (
      <GearFormComponent
        formData={this.state}
        submitForm={this.submitForm.bind(this)}
        clearForm={() => this.clearForm()}
        changeGearScore={event => this.changeGearScore(event)}
        changeGearArmor={event => this.changeGearArmor(event)}
        changeGearType={event => this.changeGearType(event)}
        changeGearFamily={event => this.changeGearType(event)}
        changeGearActiveTalent={event => this.changeGearActiveTalent(event)}
        changeGearPassiveTalents={event =>
          this.changeGearPassiveTalents(event)
        }
        changeGearAttributes={event =>
          this.changeGearAttributes(event)
        }
        changeGearMods={event =>
          this.changeGearMods(event)
        }
      />
    );
  }
}
