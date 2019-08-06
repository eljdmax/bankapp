// @flow

import React, { Component } from 'react';
import * as R from 'ramda';

import type { Weapon } from '../domain/Weapon';
import type { NameId } from '../domain/NameId';
import type {
  FormNumberField,
  FormNumberArrayField,
} from '../domain/FormField';
import type { WeaponService } from '../domain/WeaponService';
import type { WeaponStore } from '../store/WeaponStore';
import { weaponService } from '../domain/WeaponService';
import { weaponStore, weaponEditStore } from '../store/WeaponStore';
import {
  weaponVariantStore,
  weaponActiveTalentStore,
  weaponPassiveTalentStore,
  leftMenuFilterStore,
} from '../store/NameIdStore';

import { WeaponFormComponent } from './WeaponFormComponent';
import * as weaponRestService from '../services/WeaponRestService';

import { GenericFormWrap } from '../styles/GenericForm';
import { Modal, Loading } from '../styles/Body';

type Props = {};

export type FormData = {
  weaponId: number,
  weaponVariantList: NameId[],
  weaponActiveTalentList: NameId[],
  weaponPassiveTalentList: NameId[],
  weaponScore: FormNumberField,
  weaponDmg: FormNumberField,
  weaponVariant: FormNumberField,
  weaponActiveTalent: FormNumberField,
  weaponPassiveTalents: FormNumberArrayField,
};

export class WeaponFormContainer extends Component<Props, FormData> {
  weaponStore: WeaponStore;
  weaponService: WeaponService;
  subscriber: Function;
  familyFilterSubscriber: Function;
  variantSubscriber: Function;
  activeTalentSubscriber: Function;
  passiveTalentSubscriber: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      visible: false,
      loading: false,
      weaponId: 0,
      weaponVariantList: weaponVariantStore.getState(),
      weaponActiveTalentList: weaponActiveTalentStore.getState(),
      weaponPassiveTalentList: weaponPassiveTalentStore.getState(),

      weaponFamilyFilter: { id: 1 },
      weaponScore: {
        value: 0,
        valid: true,
      },
      weaponDmg: {
        value: 0,
        valid: true,
      },
      weaponVariant: {
        value: '',
        valid: true,
      },
      weaponActiveTalent: {
        value: '',
        valid: true,
      },
      weaponPassiveTalents: {
        value: [],
        valid: true,
      },
    };

    this.subscriber = weaponEditStore.subscribe((weapons: Weapon[]) => {
      if (!this.state.visible) this.setState(R.assocPath(['visible'], true));

      if (weapons.length > 0) {
        let activeTalent = weapons[0].activeTalent
          ? weapons[0].activeTalent.id
          : '';

        let passiveTalents = [];
        if (weapons[0].passiveTalents.length > 0) {
          passiveTalents = weapons[0].passiveTalents.map(talent => {
            return talent.id;
          });
        }

        this.setState(state => {
          return R.pipe(
            R.assocPath(['weaponId'], weapons[0].id),
            R.assocPath(['weaponScore', 'value'], weapons[0].score),
            R.assocPath(['weaponScore', 'valid'], true),
            R.assocPath(['weaponDmg', 'value'], weapons[0].dmg),
            R.assocPath(['weaponDmg', 'valid'], true),
            R.assocPath(['weaponVariant', 'value'], weapons[0].variant.id),
            R.assocPath(['weaponVariant', 'valid'], true),
            R.assocPath(['weaponActiveTalent', 'value'], activeTalent),
            R.assocPath(['weaponActiveTalent', 'valid'], true),
            R.assocPath(['weaponPassiveTalents', 'value'], passiveTalents),
            R.assocPath(['weaponPassiveTalents', 'valid'], true),
          )(state);
        });
      }
    });

    this.familyFilterSubscriber = leftMenuFilterStore.subscribe(
      (nameIds: NameId[]) => {
        if (nameIds.length > 0) {
          this.setState(R.assocPath(['weaponFamilyFilter'], nameIds[0]));
        }
      },
    );

    this.variantSubscriber = weaponVariantStore.subscribe(
      (nameIds: NameId[]) => {
        this.setState(R.assocPath(['weaponVariantList'], nameIds));
      },
    );

    this.activeTalentSubscriber = weaponActiveTalentStore.subscribe(
      (nameIds: NameId[]) => {
        this.setState(R.assocPath(['weaponActiveTalentList'], nameIds));
      },
    );

    this.passiveTalentSubscriber = weaponPassiveTalentStore.subscribe(
      (nameIds: NameId[]) => {
        this.setState(R.assocPath(['weaponPassiveTalentList'], nameIds));
      },
    );

    this.weaponStore = weaponStore;
    this.weaponService = weaponService;
  }

  changeWeaponScore(event: Event) {
    this.setState(
      R.assocPath(['weaponScore', 'value'], R.path(['target', 'value'], event)),
    );
  }

  changeWeaponDmg(event: Event) {
    this.setState(
      R.assocPath(['weaponDmg', 'value'], R.path(['target', 'value'], event)),
    );
  }

  changeWeaponVariant(event: Event) {
    this.setState(
      R.assocPath(
        ['weaponVariant', 'value'],
        R.path(['target', 'value'], event),
      ),
    );
  }

  changeWeaponActiveTalent(event: Event) {
    this.setState(
      R.assocPath(
        ['weaponActiveTalent', 'value'],
        R.path(['target', 'value'], event),
      ),
    );
  }

  changeWeaponPassiveTalents(event: Event) {
    this.setState(
      R.assocPath(
        ['weaponPassiveTalents', 'value'],
        Array.from(event.target.selectedOptions, item => item.value),
      ),
    );
  }

  submitForm(event: Event) {
    const weaponScore = Number(
      R.path(['target', 'weaponScore', 'value'], event),
    );
    const weaponDmg = Number(R.path(['target', 'weaponDmg', 'value'], event));
    const weaponVariant = Number(
      R.path(['target', 'weaponVariant', 'value'], event),
    );
    const weaponActiveTalent = R.path(
      ['target', 'weaponActiveTalent', 'value'],
      event,
    );
    const weaponPassiveTalents = Array.from(
      event.target.weaponPassiveTalents.selectedOptions,
      item => item.value,
    );

    const isScoreValid = this.weaponService.isScoreValid(weaponScore);
    const isDmgValid = this.weaponService.isDmgValid(weaponDmg);
    const isVariantValid = this.weaponService.isVariantValid(weaponVariant);

    if (isScoreValid && isDmgValid && isVariantValid) {
      weaponRestService.postUpdateWeapon(
        this.props.cookies.cookies,
        this.state.weaponId,
        {
          score: weaponScore,
          dmg: weaponDmg,
          variant: weaponVariant,
          activeTalent: weaponActiveTalent,
          passiveTalentIds: weaponPassiveTalents,
        },
        () => this.onSubmitSuccess(),
        msg => this.onSubmitFailure(msg),
      );

      //loading gif
      this.setState(R.assocPath(['loading'], true));
    } else {
      this.markInvalid(isScoreValid, isDmgValid, isVariantValid);
    }
  }

  onSubmitSuccess() {
    this.setState(R.assocPath(['loading'], false));
    alert(
      'Weapon successfully ' + (this.state.weaponId ? 'updated!' : 'added!'),
    );
    this.closeForm();
  }

  onSubmitFailure(msg: String) {
    this.setState(R.assocPath(['loading'], false));
    alert('An error occured: ' + msg);
  }

  clearForm() {
    if (this.state.weaponId > 0) {
      weaponEditStore.clear();
    }

    this.setState(state => {
      return R.pipe(
        R.assocPath(['weaponId'], 0),
        R.assocPath(['weaponScore', 'value'], 0),
        R.assocPath(['weaponScore', 'valid'], true),
        R.assocPath(['weaponDmg', 'value'], 0),
        R.assocPath(['weaponDmg', 'valid'], true),
        R.assocPath(['weaponVariant', 'value'], ''),
        R.assocPath(['weaponVariant', 'valid'], true),
        R.assocPath(['weaponActiveTalent', 'value'], ''),
        R.assocPath(['weaponActiveTalent', 'valid'], true),
        R.assocPath(['weaponPassiveTalents', 'value'], []),
        R.assocPath(['weaponPassiveTalents', 'valid'], true),
      )(state);
    });
  }

  closeForm() {
    this.clearForm();
    this.setState(R.assocPath(['visible'], false));
  }

  markInvalid(
    isScoreValid: boolean,
    isDmgValid: boolean,
    isVariantValid: boolean,
  ) {
    this.setState(state => {
      return R.pipe(
        R.assocPath(['weaponScore', 'valid'], isScoreValid),
        R.assocPath(['weaponDmg', 'valid'], isDmgValid),
        R.assocPath(['weaponVariant', 'valid'], isVariantValid),
      )(state);
    });
  }

  componentWillUnmount() {
    weaponEditStore.unsubscribe(this.subscriber);
    weaponVariantStore.unsubscribe(this.variantSubscriber);
    weaponActiveTalentStore.unsubscribe(this.activeTalentSubscriber);
    weaponPassiveTalentStore.unsubscribe(this.passiveTalentSubscriber);
    leftMenuFilterStore.unsubscribe(this.familyFilterSubscriber);
  }

  render() {
    if (!this.state.visible) {
      return null;
    }
    return (
      <Modal>
        <GenericFormWrap>
          {this.state.loading && <Loading />}
          <WeaponFormComponent
            formData={this.state}
            submitForm={this.submitForm.bind(this)}
            clearForm={() => this.clearForm()}
            closeForm={() => this.closeForm()}
            changeWeaponScore={event => this.changeWeaponScore(event)}
            changeWeaponDmg={event => this.changeWeaponDmg(event)}
            changeWeaponVariant={event => this.changeWeaponVariant(event)}
            changeWeaponActiveTalent={event =>
              this.changeWeaponActiveTalent(event)
            }
            changeWeaponPassiveTalents={event =>
              this.changeWeaponPassiveTalents(event)
            }
          />
        </GenericFormWrap>
      </Modal>
    );
  }
}
