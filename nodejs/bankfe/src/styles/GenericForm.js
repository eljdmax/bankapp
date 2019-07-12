// @flow

import styled from 'styled-components';

import deletePng from '../images/delete.png';
import tickPng from '../images/tick.png';
import cancelPng from '../images/cancel.png';

export const GenericFormWrap = styled.div`
  position: absolute;
  width: 457px;
  min-height: 250px;
  left: calc(50% - 457px / 2 + 38px);
  top: calc(50% - 340px / 2 + 36px);
  background: #c4c4c4;
  border-radius: 8px;
`;

export const ToolsRow = styled.div`
    margin-top: 5px;
  height: 30px;
  position: relative;

  display: flex;
  align-items: center

  border: 2px solid #005e04;
  box-sizing: border-box;
`;

export const FormRow = styled.div`
  min-height: 40px;
  position: relative;

  display: flex;
  align-items: center

  border: 2px solid #005e04;
  box-sizing: border-box;
`;

export const ButtonsRow = styled.div`
  height: 30px;
  position: relative;
  margin-bottom: 5px;
  border: 2px solid #005e04;
  box-sizing: border-box;
`;

export const DeleteBtn = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  right: 10px;

  cursor: pointer;

  background: url(${deletePng});
`;

export const ButtonsSection = styled.div`
  height: 24;
  position: absolute;

  display: flex;
  justify-content: space-between;
  width: 60px;
  right: 10px;

  border: 2px solid #005e04;
  box-sizing: border-box;
`;

export const TickBtn = styled.button`
  width: 24px;
  height: 24px;

  border: none;
  padding: 0;
  margin: 0;
  text-decoration: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  cursor: pointer;

  background: url(${tickPng});
`;

export const CancelBtn = styled.button`
  width: 24px;
  height: 24px;

  border: none;
  padding: 0;
  margin: 0;
  text-decoration: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  cursor: pointer;

  background: url(${cancelPng});
`;
