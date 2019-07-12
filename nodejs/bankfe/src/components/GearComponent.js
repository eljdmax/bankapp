// @flow

import React from 'react';

import type { Gear } from '../domain/Gear';
import * as gearUiService from '../services/GearUiService';
import * as st from '../styles/MainMenu';
import { RelativeDiv } from '../styles/Body';

type Props = {
  gear: Gear,
  viewFilter: any,
  toggleTrash: Function,
  editGear: Function,
  deleteGear: Function,
};

export const GearComponent = (props: Props) => {
  const { gear, viewFilter, toggleTrash, editGear, deleteGear } = props;

  return (
    <RelativeDiv>
      <st.TopRow>
        <st.ToolsSection>
          <st.PenBtn title="Edit" onClick={() => editGear(gear)} />
          <st.EjectBtn
            title={gear.trash === true ? 'Unmark trash' : 'Mark as trash'}
            onClick={() => toggleTrash(gear)}
          />
          <st.TrashBtn title="Delete" onClick={() => deleteGear(gear)} />
        </st.ToolsSection>
        <st.StatusSection isTrash={gear.trash === true}>
          <st.StatusText>
            {gear.type.name} {gear.family.name} {gear.score} {gear.armor}
          </st.StatusText>
        </st.StatusSection>
      </st.TopRow>

      {viewFilter.attributes === true && (
        <st.AttribWrapRow>
          <st.AttribRow>
            <st.AttributesSection>
              {gear.gearAttributes.length > 0 && (
                <div>
                  {gear.gearAttributes.map((ga, index) => (
                    <st.AttribText key={index}>
                      {ga.value} {ga.attribute.name}
                    </st.AttribText>
                  ))}
                </div>
              )}
            </st.AttributesSection>
            <st.ModsSection>
              {gear.gearMods.length > 0 && (
                <div>
                  {gear.gearMods.map((mod, index) => (
                    <st.AttribText key={index}>{mod.name}</st.AttribText>
                  ))}
                </div>
              )}
            </st.ModsSection>
          </st.AttribRow>
        </st.AttribWrapRow>
      )}

      {viewFilter.talents === true && (
        <st.TalentRowWrap>
          <st.TalentRow>
            <st.PassiveTSection>
              {gear.passiveTalents.length > 0 && (
                <div>
                  {gear.passiveTalents.map((talent, index) => (
                    <st.AttribText key={index}> {talent.name} </st.AttribText>
                  ))}
                </div>
              )}
            </st.PassiveTSection>
            <st.ActiveTSection>
              <st.AttribText>
                {gearUiService.displayActiveTalent(gear.activeTalent)}
              </st.AttribText>
            </st.ActiveTSection>
          </st.TalentRow>
        </st.TalentRowWrap>
      )}
    </RelativeDiv>
  );
};
