// @flow

import React from 'react';

import type { NameId } from '../domain/NameId';

import * as st from '../styles/Settings';

type Props = {
  data: any,
  closeModal: Function,
  clearModal: Function,
  expandRow: Function,
  toggleViewTalents: Function,
  changeFilterTrash: Function,
  changeOrderBy: Function,
  changeOrderThenBy: Function,
};

export const WeaponSettingsComponent = (props: Props) => {
  const {
    data,
    closeModal,
    clearModal,
    expandRow,
    toggleViewTalents,
    changeFilterTrash,
    changeOrderBy,
    changeOrderThenBy,
  } = props;

  return (
    <div>
      <st.ToolsRow>
        <st.DeleteBtn onClick={() => closeModal()} />
      </st.ToolsRow>
      <st.CategoryRow
        expanded={data.activeRow === 0}
        onClick={() => expandRow(0)}
      >
        <st.Title>
          <st.StatusText> View </st.StatusText>
          {data.activeRow !== 0 && (
            <st.ExpandBtn onClick={() => expandRow(0)} />
          )}
        </st.Title>
        {data.activeRow === 0 && (
          <st.Content>
            <st.Line />
            <st.FormRow>
              <label htmlFor="view-talents">Talents</label>
              <input
                type="checkbox"
                id="view-talents"
                name="viewTalents"
                autoComplete="off"
                checked={data.viewSection.talents}
                onChange={toggleViewTalents}
              />
            </st.FormRow>
          </st.Content>
        )}
      </st.CategoryRow>
      <st.CategoryRow
        expanded={data.activeRow === 1}
        onClick={() => expandRow(1)}
      >
        <st.Title>
          <st.StatusText> Filter </st.StatusText>
          {data.activeRow !== 1 && (
            <st.ExpandBtn onClick={() => expandRow(1)} />
          )}
        </st.Title>
        {data.activeRow === 1 && (
          <st.Content>
            <st.Line />
            <st.FormRow>
              <label htmlFor="weapon-trash">Trash</label>
              <select
                type="text"
                id="weapon-trash"
                name="weaponTrash"
                autoComplete="off"
                value={data.filterSection.trash}
                onChange={changeFilterTrash}
              >
                <option value=""> -- All -- </option>
                {data.isTrashList.map((nameId: NameId, index) => (
                  <option key={index} value={nameId.id}>
                    {nameId.name}
                  </option>
                ))}
              </select>
            </st.FormRow>
          </st.Content>
        )}
      </st.CategoryRow>
      <st.CategoryRow
        expanded={data.activeRow === 2}
        onClick={() => expandRow(2)}
      >
        <st.Title>
          <st.StatusText> Order By </st.StatusText>
          {data.activeRow !== 2 && (
            <st.ExpandBtn onClick={() => expandRow(2)} />
          )}
        </st.Title>
        {data.activeRow === 2 && (
          <st.Content>
            <st.Line />
            <st.FormRow>
              <label htmlFor="order-by">By</label>
              <select
                type="text"
                id="order-by"
                name="orderBy"
                autoComplete="off"
                value={data.orderSection.by}
                onChange={changeOrderBy}
              >
                <option value=""> -- select an attribute -- </option>
                {[{id:0, name:'dps'}].map((nameId: NameId, index) => (
                  <option key={index} value={nameId.id}>
                    {nameId.name}
                  </option>
                ))}
              </select>
            </st.FormRow>
            <st.FormRow>
              <label htmlFor="order-then-by">Then by</label>
              <select
                type="text"
                id="order-then-by"
                name="orderThenBy"
                autoComplete="off"
                value={data.orderSection.Thenby}
                onChange={changeOrderThenBy}
              >
                <option value=""> -- select an attribute -- </option>
                {[{id:0, name:'dps'}].map((nameId: NameId, index) => (
                  <option key={index} value={nameId.id}>
                    {nameId.name}
                  </option>
                ))}
              </select>
            </st.FormRow>
          </st.Content>
        )}
      </st.CategoryRow>
    </div>
  );
};
