// @flow

import React from 'react';

import type { NameId } from '../domain/NameId';
import type { FormData } from './GearFormContainer';
import type { InternalGearMod } from '../domain/InternalGearMod';
import type { InternalGearAttribute } from '../domain/InternalGearAttribute';

import * as st from '../styles/GenericForm';

type Props = {
  formData: FormData,
  submitForm: Function,
  closeForm: Function,
  clearForm: Function,
  changeGearScore: Function,
  changeGearArmor: Function,
  changeGearType: Function,
  changeGearFamily: Function,
  changeGearActiveTalent: Function,
  changeGearPassiveTalents: Function,
  changeGearAttributes: Function,
  removeAttribute: Function,
  updateAttribute: Function,
  changeGearMods: Function,
  removeMod: Function,
};

export const GearFormComponent = (props: Props) => {
  const {
    formData,
    clearForm,
    closeForm,
    submitForm,
    changeGearScore,
    changeGearArmor,
    changeGearType,
    changeGearFamily,
    changeGearActiveTalent,
    changeGearPassiveTalents,
    changeGearAttributes,
    removeAttribute,
    updateAttribute,
    changeGearMods,
    removeMod,
  } = props;

  const onSubmit = submitHandler => event => {
    event.preventDefault();
    submitHandler(event);
  };

  return (
    <div>
      <st.ToolsRow>
        <st.DeleteBtn onClick={() => closeForm()} />
      </st.ToolsRow>
      <form noValidate onSubmit={onSubmit(submitForm)}>
        <st.FormRow>
          <label htmlFor="gear-score">Score</label>
          <input
            type="text"
            id="gear-score"
            name="gearScore"
            autoComplete="off"
            value={formData.gearScore.value}
            onChange={changeGearScore}
          />
          {!formData.gearScore.valid && <p>Please fill in the gear score</p>}
        </st.FormRow>
        <st.FormRow>
          <label htmlFor="gear-armor">Armor</label>
          <input
            type="text"
            id="gear-amor"
            name="gearArmor"
            autoComplete="off"
            value={formData.gearArmor.value}
            onChange={changeGearArmor}
          />
          {!formData.gearArmor.valid && <p>Please fill in the gear armor</p>}
        </st.FormRow>
        <st.FormRow>
          <label htmlFor="gear-type">Type</label>
          <select
            type="text"
            id="gear-type"
            name="gearType"
            autoComplete="off"
            value={formData.gearType.value}
            onChange={changeGearType}
          >
            <option value=""> -- select a type -- </option>
            {formData.gearTypeList.map((nameId: NameId, index) => (
              <option key={index} value={nameId.id}>
                {nameId.name}
              </option>
            ))}
          </select>
          {!formData.gearType.valid && <p>Please fill in the gear type</p>}
        </st.FormRow>
        <st.FormRow>
          <label htmlFor="gear-family">Family</label>
          <select
            type="text"
            id="gear-family"
            name="gearFamily"
            autoComplete="off"
            value={formData.gearFamily.value}
            onChange={changeGearFamily}
          >
            <option value=""> -- select a family -- </option>
            {formData.gearFamilyList.map((nameId: NameId, index) => (
              <option key={index} value={nameId.id}>
                {nameId.name}
              </option>
            ))}
          </select>
          {!formData.gearFamily.valid && <p>Please fill in the gear family</p>}
        </st.FormRow>
        <st.FormRow>
          <label htmlFor="gear-activetalent">Active Talent</label>
          <select
            type="text"
            id="gear-activetalent"
            name="gearActiveTalent"
            autoComplete="off"
            value={formData.gearActiveTalent.value}
            onChange={changeGearActiveTalent}
          >
            <option value=""> -- select a talent -- </option>
            {formData.gearActiveTalentList.map((nameId: NameId, index) => (
              <option key={index} value={nameId.id}>
                {nameId.name}
              </option>
            ))}
          </select>
        </st.FormRow>
        <st.FormRow>
          <label htmlFor="gear-passivetalents">Passive Talents</label>
          <select
            multiple={true}
            size="3"
            type="text"
            id="gear-passivetalents"
            name="gearPassiveTalents"
            autoComplete="off"
            value={formData.gearPassiveTalents.value}
            onChange={changeGearPassiveTalents}
          >
            {formData.gearPassiveTalentList.map((nameId: NameId, index) => (
              <option key={index} value={nameId.id}>
                {nameId.name}
              </option>
            ))}
          </select>
        </st.FormRow>
        <st.FormRow>
          <label htmlFor="gear-mods">Mods</label>
          <select
            type="text"
            id="gear-mods"
            name="gearMods"
            autoComplete="off"
            value=""
            onChange={changeGearMods}
          >
            <option value=""> -- select an attribute -- </option>
            {formData.gearAttributeTypeList.map((nameId: NameId, index) => (
              <option key={index} value={nameId.id}>
                {nameId.name}
              </option>
            ))}
          </select>
          <div>
            {formData.internalGearModList.map(
              (internalGearMod: InternalGearMod, index) => (
                <div key={index}>
                  <label>{internalGearMod.mod.name}</label>
                  <button
                    type="button"
                    onClick={() => removeMod(internalGearMod)}
                  >
                    Remove
                  </button>
                </div>
              ),
            )}
          </div>
        </st.FormRow>
        <st.FormRow>
          <label htmlFor="gear-attributes">Attributes</label>
          <select
            type="text"
            id="gear-attributes"
            name="gearAttributes"
            autoComplete="off"
            value=""
            onChange={changeGearAttributes}
          >
            <option value=""> -- select an attribute -- </option>
            {formData.gearAttributeList.map((nameId: NameId, index) => (
              <option key={index} value={nameId.id}>
                {nameId.name}
              </option>
            ))}
          </select>
          <st.FormScrolledVal>
            {formData.internalGearAttributeList.map(
              (internalGearAttribute: InternalGearAttribute, index) => (
                <div key={index}>
                  <label htmlFor={'gear-internal-ga-' + index}>
                    {internalGearAttribute.ga.attribute.name}
                  </label>
                  <input
                    type="text"
                    id={'gear-internal-ga-' + index}
                    name={'gearInternalGA' + index}
                    autoComplete="off"
                    value={internalGearAttribute.ga.value}
                    onChange={event =>
                      updateAttribute(event, internalGearAttribute)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => removeAttribute(internalGearAttribute)}
                  >
                    Remove
                  </button>
                </div>
              ),
            )}
          </st.FormScrolledVal>
        </st.FormRow>
        <st.ButtonsRow>
          <st.ButtonsSection>
            <st.TickBtn
              type="submit"
              title={formData.gearId === 0 ? 'Add gear' : 'Update gear'}
            />
            <st.CancelBtn title="Clear Form" onClick={() => clearForm()} />
          </st.ButtonsSection>
        </st.ButtonsRow>
      </form>
    </div>
  );
};
