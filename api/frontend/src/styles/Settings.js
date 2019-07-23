// @flow

import styled, { css } from 'styled-components';

import deletePng from '../images/delete.png';
import arrowMinPng from '../images/arrow-minimise.png';

export const SettingsWrap = styled.div`
  position: absolute;
  width: 457px;
  min-height: 340px;
  left: calc(50% - 457px / 2 + 38px);
  top: calc(50% - 450px / 2 + 36px);
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

export const DeleteBtn = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  right: 10px;

  cursor: pointer;

  background: url(${deletePng});
`;

export const CategoryRow = styled.div`
  min-height: 40px;
  position: relative;

  display: flex;
  flex-direction: column;

  background: #e5fffd;

  margin: 5px;
  cursor: pointer;

  border: 2px solid #005e04;
  box-sizing: border-box;

  ${props =>
    props.expanded &&
    css`
      min-height: 200px;
      background: #d4f2ff;
      cursor: default;
    `}
`;

export const Title = styled.div`
  min-height: 35px;
  width: 100%;
  position: relative;

  display: flex;
  align-items: center
  justify-content: center;

  border: 2px solid #005e04;
  box-sizing: border-box;
`;

export const Content = styled.div`
  min-height: 35px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border: 2px solid #005e04;
  box-sizing: border-box;
`;

export const Line = styled.div`
  min-height: 0px;
  width: 90%;
  position: relative;

  border: 1px solid #000000;
  transform: matrix(1, 0, 0, 1, 0, 0);
`;

export const FormRow = styled.div`
  min-height: 40px;
  position: relative;
  width: 100%;
  display: flex;
  align-items: center

  border: 2px solid #005e04;
  box-sizing: border-box;
`;

export const ExpandBtn = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  right: 5px;

  cursor: pointer;

  background: url(${arrowMinPng});
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

export const StatusText = styled.div`
  font-size: 18px;
  line-height: auto;

  display: flex;
  align-items: center;

  color: #000000;
`;
