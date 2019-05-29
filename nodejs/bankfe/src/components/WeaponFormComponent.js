// @flow

import React, { Component } from 'react';

import type {FormData} from "./WeaponFormContainer";


type Props = {
  formData: FormData;
  submitForm: Function;
  clearForm: Function;
  changeWeaponScore:Function;
  changeWeaponDmg:Function;
  changeWeaponVariant:Function;
};

export const WeaponFormComponent = (props: Props) => {
  const {
    formData,
	clearForm,
    submitForm,
    changeWeaponScore,
    changeWeaponDmg,
    changeWeaponVariant
  } = props;

  const onSubmit = (submitHandler) => (event) => {
    event.preventDefault();
    submitHandler(event);
  };
  

  return (
    <form
      noValidate
      onSubmit={onSubmit(submitForm)}
    >
      <div>
        <label htmlFor="weapon-score">Score</label>
        <input
          type="text"
          id="weapon-score"
          name="weaponScore"
          autoComplete="off"
          value={formData.weaponScore.value}
          onChange={changeWeaponScore}
        />
        {!formData.weaponScore.valid && (<p>Please fill in the weapon score</p>)}
      </div>
      <div>
        <label htmlFor="weapon-dmg">Damage</label>
        <input
          type="text"
          id="weapon-dmg"
          name="weaponDmg"
          autoComplete="off"
          value={formData.weaponDmg.value}
          onChange={changeWeaponDmg}
        />
        {!formData.weaponDmg.valid && (<p>Please fill in the weapon damage</p>)}
      </div>
      <div>
        <label htmlFor="weapon-variant">Variant</label>
        <input
          type="text"
          id="weapon-variant"
          name="weaponVariant"
          autoComplete="off"
          value={formData.weaponVariant.value}
          onChange={changeWeaponVariant}
        />
        {!formData.weaponVariant.valid && (<p>Please fill in the weapon variant</p>)}
      </div>
      <button
        type="submit"
        value="Submit"
      >
	  { (formData.weaponId === 0 ) ? 'Add weapon' : 'Update weapon' }
      </button>
	  <button
        type="button"
        onClick={() => clearForm()}
      >
	  Clear
      </button>
    </form>
  )
};
  