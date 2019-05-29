// @flow

import React, { Component } from 'react';
import * as R from 'ramda';

import type {Weapon} from "../domain/Weapon";
import type {NameId} from "../domain/NameId";
import type {WeaponService} from "../domain/WeaponService";
import type {WeaponStore} from "../store/WeaponStore";
import {weaponService} from "../domain/WeaponService";
import {weaponStore, weaponEditStore} from "../store/WeaponStore";
import {weaponVariantStore, weaponActiveTalentStore} from "../store/NameIdStore";

import {WeaponFormComponent} from "./WeaponFormComponent";
import * as weaponRestService from "../services/WeaponRestService";


type Props = {};

type FormStringField = {
  value: string;
  valid: boolean;
}

type FormNumberField = {
  value: number;
  valid: boolean;
}

type FormNameIdField = {
  value: NameId;
  valid: boolean;
}


export type FormData = {
  weaponId: number;
  weaponVariantList: NameId[];
  weaponActiveTalentList: NameId[];
  weaponScore: FormNumberField;
  weaponDmg: FormNumberField;
  weaponVariant: FormNumberField;
  weaponActiveTalent: FormNumberField;
};


export class WeaponFormContainer extends Component<Props, FormData> {
  weaponStore: WeaponStore;
  weaponService: WeaponService;
  subscriber: Function;
  variantSubscriber: Function;
  activeTalentSubscriber: Function;
  
  constructor(props: Props) {
    super(props);
	
    this.state = {
      weaponId:  0,
	  weaponVariantList: [],
	  weaponActiveTalentList: [],
      weaponScore: {
        value: 0,
        valid: true
      },
      weaponDmg: {
        value: 0,
        valid: true
      },
      weaponVariant: {
        value: '',
        valid: true
      },
      weaponActiveTalent: {
        value: '',
        valid: true
      },
    };

    this.subscriber = weaponEditStore.subscribe((weapons: Weapon[]) => {
		if (weapons.length > 0 ) {

				let activeTalent = weapons[0].activeTalent ? weapons[0].activeTalent.id : '';
		
				this.setState((state) => {
				  return R.pipe(
					R.assocPath(['weaponId'], weapons[0].id),
					R.assocPath(['weaponScore', 'value'], weapons[0].score),
					R.assocPath(['weaponScore', 'valid'], true),
					R.assocPath(['weaponDmg', 'value'], weapons[0].dmg),
					R.assocPath(['weaponDmg', 'valid'], true),
					R.assocPath(['weaponVariant', 'value', ], weapons[0].variant.id),
					R.assocPath(['weaponVariant', 'valid'], true),
					R.assocPath(['weaponActiveTalent', 'value', ], activeTalent),
					R.assocPath(['weaponActiveTalent', 'valid'], true)
				  )(state);
				});
			
		}
	}) 
	
	this.variantSubscriber= weaponVariantStore.subscribe((nameIds: NameId[]) => {
		this.setState(
		  R.assocPath(
			['weaponVariantList'],
			nameIds
		  )
		);
	});
	
	this.activeTalentSubscriber= weaponActiveTalentStore.subscribe((nameIds: NameId[]) => {
		this.setState(
		  R.assocPath(
			['weaponActiveTalentList'],
			nameIds
		  )
		);
	});
	
    this.weaponStore = weaponStore;
    this.weaponService = weaponService;
  }
  
  changeWeaponScore(event: Event) {
    this.setState(
      R.assocPath(
        ['weaponScore', 'value'],
        R.path(['target', 'value'], event)
      )
    );
  }
  
  changeWeaponDmg(event: Event) {
    this.setState(
      R.assocPath(
        ['weaponDmg', 'value'],
        R.path(['target', 'value'], event)
      )
    );
  }
  
  changeWeaponVariant(event: Event) {
    this.setState(
      R.assocPath(
        ['weaponVariant', 'value'],
        R.path(['target', 'value'], event)
      )
    );
  }

  changeWeaponActiveTalent(event: Event) {
    this.setState(
      R.assocPath(
        ['weaponActiveTalent', 'value'],
        R.path(['target', 'value'], event)
      )
    );
  }
  
  
  
  submitForm(event: Event) {
    const weaponScore = Number( R.path(['target', 'weaponScore', 'value'], event) );
    const weaponDmg = Number( R.path(['target', 'weaponDmg', 'value'], event) );
    const weaponVariant = Number(R.path(['target', 'weaponVariant', 'value'], event) );
    const weaponActiveTalent = R.path(['target', 'weaponActiveTalent', 'value'], event);

    const isScoreValid = this.weaponService.isScoreValid(weaponScore);
    const isDmgValid = this.weaponService.isDmgValid(weaponDmg);
    const isVariantValid = this.weaponService.isVariantValid(weaponVariant);

    if (isScoreValid && isDmgValid && isVariantValid) {
		
		let submitStatus = weaponRestService.postUpdateWeapon(this.state.weaponId, {score: weaponScore, dmg: weaponDmg, variant: weaponVariant, activeTalent: weaponActiveTalent});
		
		if ( submitStatus.success)  {
			this.clearForm();
		} else {
			alert('An error occured!');
		}
		
    } else {
      this.markInvalid(isScoreValid, isDmgValid, isVariantValid);
    }
  };
  
  clearForm() {
	  if (this.state.weaponId > 0) {
		weaponEditStore.clear();
	  }
	
	this.setState((state) => {
      return R.pipe(
        R.assocPath(['weaponId'], 0),
        R.assocPath(['weaponScore', 'value'], 0),
        R.assocPath(['weaponScore', 'valid'], true),
        R.assocPath(['weaponDmg', 'value'], 0),
        R.assocPath(['weaponDmg', 'valid'], true),
        R.assocPath(['weaponVariant', 'value'], ''),
        R.assocPath(['weaponVariant', 'valid'], true),
		R.assocPath(['weaponActiveTalent', 'value', ], ''),
		R.assocPath(['weaponActiveTalent', 'valid'], true)
      )(state);
    });
	
	 
  }

  markInvalid(isScoreValid: boolean, isDmgValid: boolean, isVariantValid: boolean) {
    this.setState((state) => {
      return R.pipe(
        R.assocPath(['weaponScore', 'valid'], isScoreValid),
        R.assocPath(['weaponDmg', 'valid'], isDmgValid),
        R.assocPath(['weaponVariant', 'valid'], isVariantValid)
      )(state);
    });
  }
  
  componentWillUnmount() {
    weaponEditStore.unsubscribe(this.subscriber);
	weaponVariantStore.unsubscribe(this.variantSubscriber);
	
  }

  render() {
    return (
      <WeaponFormComponent
        formData={this.state}
        submitForm={this.submitForm.bind(this)}
		clearForm={() => this.clearForm()}
        changeWeaponScore={(event) => this.changeWeaponScore(event)}
        changeWeaponDmg={(event) => this.changeWeaponDmg(event)}
        changeWeaponVariant={(event) => this.changeWeaponVariant(event)}
		changeWeaponActiveTalent={(event) => this.changeWeaponActiveTalent(event)}
      />
    )
  }
}
  