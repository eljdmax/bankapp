// @flow

import styled, { css } from 'styled-components';

import toolsBorder from '../images/tools_border.png';
import ejectBtnPng from '../images/weather-snow.png';
import starBtnPng from '../images/star-outline.png';
import penBtnPng from '../images/pen.png';
import trashBtnPng from '../images/trash.png';
import linkBtnPng from '../images/link-outline.png';

export const MainMenu = styled.div`
  position: absolute;
  left: 0px;
  right: 0px;
  top: 129px;
`;
export const MainRow = styled.div`
  left: 0px;
  right: 0px;
  top: 0px;

  background: #e5fffd;

  margin: 10px 0px;

  ${props =>
    props.keyIndex % 2 === 1 &&
    css`
      background: #d4f2ff;
    `}
`;

export const TopRow = styled.div`
  height: 30px;
  position: relative;
`;

export const ToolsSection = styled.div`
  position: absolute;
  width: 126px;
  height: 25px;
  right: 7px;
  top: 4px;

  display: flex;
  align-items: center;
  justify-content: space-evenly;

  border: 2px solid #fd5e04;
  box-sizing: border-box;
`;

export const PenBtn = styled.div`
  position: relative;
  width: 19px;
  height: 20px;
  cursor: pointer;

  background: url(${penBtnPng});
`;

export const EjectBtn = styled.div`
  position: relative;
  width: 19px;
  height: 20px;
  cursor: pointer;

  background: url(${ejectBtnPng});
`;

export const StarBtn = styled.div`
  position: relative;
  width: 19px;
  height: 20px;
  cursor: pointer;

  background: url(${starBtnPng});
`;

export const TrashBtn = styled.div`
  position: relative;
  width: 19px;
  height: 20px;
  cursor: pointer;

  background: url(${trashBtnPng});
`;

export const LinkBtn = styled.div`
  position: relative;
  width: 19px;
  height: 20px;
  cursor: pointer;

  background: url(${linkBtnPng});
`;

export const StatusSection = styled.div`
  position: absolute;
  height: 25px;
  left: 82px;
  right: 141px;
  top: 4px;

  background: none;

  border: 2px solid #fd5e04;
  box-sizing: border-box;

  ${props => {
    if (!props.status) {
      return;
    }

    if (props.status === 'trash') {
      return css`
        background: #555555;
      `;
    }

    if (props.status === 'star') {
      return css`
        background: #339933;
      `;
    }
  }}
`;

export const StatusText = styled.div`
  font-size: 16px;
  line-height: auto;

  display: flex;
  align-items: center;

  color: #000000;
`;

export const AttribWrapRow = styled.div`
  position: relative;
  height: 100px;
  display: flex;
  align-items: center;
`;

export const AttribRow = styled.div`
  position: absolute;
  height: 96%;
  left: 82px;
  right: 7px;
`;

export const AttributesSection = styled.div`
  position: absolute;
  height: 100%;
  left: 0%;
  right: 34.43%;
  top: 0px;

  display: flex;
  align-items: center;

  border: 2px solid #fd5e04;
  box-sizing: border-box;
`;

export const ModsSection = styled.div`
  position: absolute;
  height: 100%;
  left: 68.5%;
  right: 0%;
  top: 0px;

  display: flex;
  align-items: center;

  border: 2px solid #fd5e04;
  box-sizing: border-box;
`;

export const AttribText = styled.div`
  font-size: 12px;
  line-height: auto;

  display: flex;
  align-items: center;

  color: #000000;
`;

export const TalentRowWrap = styled.div`
  position: relative;
  height: 60px;
`;

export const TalentRow = styled.div`
  position: absolute;
  height: 96%;
  left: 82px;
  right: 7px;
`;

export const PassiveTSection = styled.div`
  position: absolute;
  height: 100%;
  left: 0%;
  right: 34.43%;
  top: 0px;

  display: flex;
  align-items: center;

  border: 2px solid #fd5e04;
  box-sizing: border-box;
`;

export const ActiveTSection = styled.div`
  position: absolute;
  height: 100%;
  left: 68.5%;
  right: 0%;
  top: 0px;

  display: flex;
  align-items: center;

  border: 2px solid #fd5e04;
  box-sizing: border-box;
`;

export const TalentText = styled.div`
  font-size: 14px;
  line-height: auto;

  display: flex;
  align-items: center;

  color: #000000;
`;
