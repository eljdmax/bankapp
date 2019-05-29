// @flow

import React, { Component } from 'react';
import * as R from 'ramda';

import type {Weapon} from "../domain/Weapon";
import type {WeaponService} from "../domain/WeaponService";
import type {WeaponStore} from "../store/WeaponStore";
import {weaponService} from "../domain/WeaponService";
import {weaponStore} from "../store/WeaponStore";
import {weaponEditStore} from "../store/WeaponStore";

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


export type FormData = {
  weaponId: number;
  weaponScore: FormNumberField;
  weaponDmg: FormNumberField;
  weaponVariant: FormStringField;
};


export class WeaponFormContainer extends Component<Props, FormData> {
  weaponStore: WeaponStore;
  weaponService: WeaponService;
  subscriber: Function;
  
  constructor(props: Props) {
    super(props);
	
    this.state = {
      weaponId:  0,
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
    };

    this.subscriber = weaponEditStore.subscribe((weapons: Weapon[]) => {
		if (weapons.length > 0 ) {
			this.setState({
			  weaponId:  weapons[0].id,
			  weaponScore: {
				value: weapons[0].score,
				valid: true
			  },
			  weaponDmg: {
				value: weapons[0].dmg,
				valid: true
			  },
			  weaponVariant: {
				value: weapons[0].variant,
				valid: true
			  },
			});
		}
	}) 
	
	
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
  
  submitForm(event: Event) {
    const weaponScore = Number( R.path(['target', 'weaponScore', 'value'], event) );
    const weaponDmg = Number( R.path(['target', 'weaponDmg', 'value'], event) );
    const weaponVariant = R.path(['target', 'weaponVariant', 'value'], event);

    const isScoreValid = this.weaponService.isScoreValid(weaponScore);
    const isDmgValid = this.weaponService.isDmgValid(weaponDmg);
    const isVariantValid = this.weaponService.isVariantValid(weaponVariant);

    if (isScoreValid && isDmgValid && isVariantValid) {
		
		let submitStatus = weaponRestService.postUpdateWeapon(this.state.weaponId, {score: weaponScore, dmg: weaponDmg, variant: weaponVariant});
		
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
			this.setState({
		  weaponId:  0,
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
      />
    )
  }
}
  