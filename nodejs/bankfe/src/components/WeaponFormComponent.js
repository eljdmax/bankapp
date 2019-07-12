// @flow

import React from 'react';

import type { NameId } from '../domain/NameId';
import type { FormData } from './WeaponFormContainer';

import * as weaponUiService from '../services/WeaponUiService';

import * as st from '../styles/GenericForm';

type Props = {
  formData: FormData,
  submitForm: Function,
  clearForm: Function,
  changeWeaponScore: Function,
  changeWeaponDmg: Function,
  changeWeaponVariant: Function,
  changeWeaponActiveTalent: Function,
  changeWeaponPassiveTalents: Function,
};

export const WeaponFormComponent = (props: Props) => {
  const {
    formData,
    clearForm,
    closeForm,
    submitForm,
    changeWeaponScore,
    changeWeaponDmg,
    changeWeaponVariant,
    changeWeaponActiveTalent,
    changeWeaponPassiveTalents,
  } = props;

  const onSubmit = submitHandler => event => {
    event.preventDefault();
    submitHandler(event);
  };

  const filteredVariantList = formData.weaponVariantList.filter(
    weaponUiService.filterWeaponBy(formData.weaponFamilyFilter.id, [
      'family',
      'id',
    ]),
  );

  return (
    <div>
      <st.ToolsRow>
        <st.DeleteBtn onClick={() => closeForm()} />
      </st.ToolsRow>
      <form noValidate onSubmit={onSubmit(submitForm)}>
        <st.FormRow>
          <label htmlFor="weapon-score">Score</label>
          <input
            type="text"
            id="weapon-score"
            name="weaponScore"
            autoComplete="off"
            value={formData.weaponScore.value}
            onChange={changeWeaponScore}
          />
          {!formData.weaponScore.valid && (
            <p>Please fill in the weapon score</p>
          )}
        </st.FormRow>
        <st.FormRow>
          <label htmlFor="weapon-dmg">Damage</label>
          <input
            type="text"
            id="weapon-dmg"
            name="weaponDmg"
            autoComplete="off"
            value={formData.weaponDmg.value}
            onChange={changeWeaponDmg}
          />
          {!formData.weaponDmg.valid && <p>Please fill in the weapon damage</p>}
        </st.FormRow>
        <st.FormRow>
          <label htmlFor="weapon-variant">Variant</label>
          <select
            type="text"
            id="weapon-variant"
            name="weaponVariant"
            autoComplete="off"
            value={formData.weaponVariant.value}
            onChange={changeWeaponVariant}
          >
            <option value=""> -- select a variant -- </option>
            {filteredVariantList.map((nameId: NameId, index) => (
              <option key={index} value={nameId.id}>
                {nameId.name}
              </option>
            ))}
          </select>
          {!formData.weaponVariant.valid && (
            <p>Please fill in the weapon variant</p>
          )}
        </st.FormRow>
        <st.FormRow>
          <label htmlFor="weapon-activetalent">Active Talent</label>
          <select
            type="text"
            id="weapon-activetalent"
            name="weaponActiveTalent"
            autoComplete="off"
            value={formData.weaponActiveTalent.value}
            onChange={changeWeaponActiveTalent}
          >
            <option value=""> -- select a talent -- </option>
            {formData.weaponActiveTalentList.map((nameId: NameId, index) => (
              <option key={index} value={nameId.id}>
                {nameId.name}
              </option>
            ))}
          </select>
        </st.FormRow>
        <st.FormRow>
          <label htmlFor="weapon-passivetalents">Passive Talents</label>
          <select
            multiple={true}
            size="3"
            type="text"
            id="weapon-passivetalents"
            name="weaponPassiveTalents"
            autoComplete="off"
            value={formData.weaponPassiveTalents.value}
            onChange={changeWeaponPassiveTalents}
          >
            {formData.weaponPassiveTalentList.map((nameId: NameId, index) => (
              <option key={index} value={nameId.id}>
                {nameId.name}
              </option>
            ))}
          </select>
        </st.FormRow>
        <st.ButtonsRow>
          <st.ButtonsSection>
            <st.TickBtn
              type="submit"
              title={formData.weaponId === 0 ? 'Add weapon' : 'Update weapon'}
            />

            <st.CancelBtn
              title="Clear Form"
              type="button"
              onClick={() => clearForm()}
            />
          </st.ButtonsSection>
        </st.ButtonsRow>
      </form>
    </div>
  );
};
