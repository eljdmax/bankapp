// @flow

import React from 'react';

import type { Weapon } from '../domain/Weapon';
import * as weaponUiService from '../services/WeaponUiService';
import * as st from '../styles/MainMenu';
import { RelativeDiv } from '../styles/Body';

type Props = {
  weapon: Weapon,
  viewFilter: any,
  toggleTrash: Function,
  toggleStar: Function,
  editWeapon: Function,
  deleteWeapon: Function,
  linkWeapon: Function,
};

export const WeaponComponent = (props: Props) => {
  const {
    weapon,
    viewFilter,
    toggleTrash,
    toggleStar,
    editWeapon,
    deleteWeapon,
    linkWeapon,
  } = props;

  return (
    <RelativeDiv>
      <st.TopRow>
        <st.ToolsSection>
          <st.PenBtn title="Edit" onClick={() => editWeapon(weapon)} />
          <st.LinkBtn
            title="Link to Builds"
            onClick={() => linkWeapon(weapon)}
          />
          <st.StarBtn
            title={weapon.star === true ? 'Unmark star' : 'Mark as star'}
            onClick={() => toggleStar(weapon)}
          />
          <st.EjectBtn
            title={weapon.trash === true ? 'Unmark trash' : 'Mark as trash'}
            onClick={() => toggleTrash(weapon)}
          />
          <st.TrashBtn
            title="Delete"
            onClick={() => {
              if (
                window.confirm('Are you sure you wish to delete this weapon?')
              )
                deleteWeapon(weapon);
            }}
          />
        </st.ToolsSection>
        <st.StatusSection status={weaponUiService.getStatus(weapon)}>
          <st.StatusText>{weaponUiService.displayStatus(weapon)}</st.StatusText>
        </st.StatusSection>
      </st.TopRow>

      {viewFilter.talents === true && (
        <st.TalentRowWrap>
          <st.TalentRow>
            <st.PassiveTSection>
              {weapon.passiveTalents.length > 0 && (
                <div>
                  {weapon.passiveTalents.map((talent, index) => (
                    <st.AttribText key={index}> {talent.name} </st.AttribText>
                  ))}
                </div>
              )}
              {weapon.passiveTalents.length === 0 && (
                <div> No passive talents! </div>
              )}
            </st.PassiveTSection>
            <st.ActiveTSection>
              <st.AttribText>
                {weaponUiService.displayActiveTalent(weapon.activeTalent)}
              </st.AttribText>
            </st.ActiveTSection>
          </st.TalentRow>
        </st.TalentRowWrap>
      )}
    </RelativeDiv>
  );
};
