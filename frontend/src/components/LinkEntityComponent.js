// @flow

import React from 'react';

import type { NameId } from '../domain/NameId';

import * as st from '../styles/Settings';

type Props = {
  data: any,
  closeModal: Function,
  clearModal: Function,
  expandRow: Function,
  changeBuilds: Function,
  submitForm: Function,
};

export const LinkEntityComponent = (props: Props) => {
  const {
    data,
    closeModal,
    clearModal,
    expandRow,
    changeBuilds,
    submitForm,
  } = props;

  const onSubmit = submitHandler => event => {
    event.preventDefault();
    submitHandler(event);
  };

  return (
    <div>
      <form noValidate onSubmit={onSubmit(submitForm)}>
        <st.ToolsRow>
          <st.DeleteBtn onClick={() => closeModal()} />
        </st.ToolsRow>
        <st.CategoryRow
          expanded={data.activeRow === 0}
          onClick={() => expandRow(0)}
        >
          <st.Title>
            <st.StatusText> Builds </st.StatusText>
            {data.activeRow !== 0 && (
              <st.ExpandBtn onClick={() => expandRow(0)} />
            )}
          </st.Title>
          {data.activeRow === 0 && (
            <st.Content>
              <st.Line />
              <st.FormRow>
                <label htmlFor="builds">Builds</label>
                <select
                  multiple={true}
                  size="3"
                  type="text"
                  id="builds"
                  name="builds"
                  autoComplete="off"
                  value={data.builds.value}
                  onChange={changeBuilds}
                >
                  {data.buildList.map((nameId: NameId, index) => (
                    <option key={index} value={nameId.id}>
                      {nameId.name}
                    </option>
                  ))}
                </select>
              </st.FormRow>
            </st.Content>
          )}
        </st.CategoryRow>
        <st.ButtonsRow>
          <st.ButtonsSection>
            <st.TickBtn
              type="submit"
              title={
                (data.gear && data.gear.id) || (data.weapon && data.weapon.id)
                  ? 'Add'
                  : 'Update'
              }
            />
          </st.ButtonsSection>
        </st.ButtonsRow>
      </form>
    </div>
  );
};
