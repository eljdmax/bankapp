// @flow

import React from 'react';

import type { Gear } from '../domain/Gear';
import * as gearUiService from '../services/GearUiService';

type Props = {
  gear: Gear,
  toggleTrash: Function,
  editGear: Function,
  deleteGear: Function,
};

export const GearComponent = (props: Props) => {
  const { gear, toggleTrash, editGear, deleteGear } = props;

  return (
    <div>
      <h3>{gear.score}</h3>
      <p>{gear.id}</p>
      <p>{gear.score}</p>
      <p>{gear.type.name}</p>
      <p>{gear.family.name}</p>
      <p>{gearUiService.displayActiveTalent(gear.activeTalent)}</p>

      {gear.passiveTalents.length > 0 && (
        <ul>
          {gear.passiveTalents.map((talent, index) => (
            <li key={index}> {talent.name} </li>
          ))}
        </ul>
      )}
      {gear.passiveTalents.length === 0 && <p> No passive talents! </p>}

      <p>{gearUiService.displayTrash(gear.trash)}</p>
      <button type="button" onClick={() => editGear(gear)}>
        Edit
      </button>
      <button type="button" onClick={() => toggleTrash(gear)}>
        Toggle trash
      </button>
      <button type="button" onClick={() => deleteGear(gear)}>
        Delete
      </button>
    </div>
  );
};
