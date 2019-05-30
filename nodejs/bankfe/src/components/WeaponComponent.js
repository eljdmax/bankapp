// @flow

import React from 'react';

import type { Weapon } from '../domain/Weapon';
import * as weaponUiService from '../services/WeaponUiService';

type Props = {
  weapon: Weapon,
  toggleTrash: Function,
  editWeapon: Function,
  deleteWeapon: Function,
};

export const WeaponComponent = (props: Props) => {
  const { weapon, toggleTrash, editWeapon, deleteWeapon } = props;

  return (
    <div>
      <h3>{weapon.score}</h3>
      <p>{weapon.id}</p>
      <p>{weapon.dmg}</p>
      <p>{weapon.variant.name}</p>
      <p>{weaponUiService.displayActiveTalent(weapon.activeTalent)}</p>

      {weapon.passiveTalents.length > 0 && (
        <ul>
          {weapon.passiveTalents.map((talent, index) => (
            <li key={index}> {talent.name} </li>
          ))}
        </ul>
      )}
      {weapon.passiveTalents.length === 0 && <p> No passive talents! </p>}

      <p>{weaponUiService.displayTrash(weapon.trash)}</p>
      <button type="button" onClick={() => editWeapon(weapon)}>
        Edit
      </button>
      <button type="button" onClick={() => toggleTrash(weapon)}>
        Toggle trash
      </button>
      <button type="button" onClick={() => deleteWeapon(weapon)}>
        Delete
      </button>
    </div>
  );
};
