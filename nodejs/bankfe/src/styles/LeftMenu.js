// @flow

import styled from 'styled-components';

import maskPng from '../images/mask.png';
import backpackPng from '../images/backpack.png';
import vestPng from '../images/vest.png';
import glovesPng from '../images/gloves.png';
import holsterPng from '../images/holster.png';
import kneepadsPng from '../images/kneepads.png';

import ARPng from '../images/AR.png';
import LMGPng from '../images/LMG.png';
import SMGPng from '../images/SMG.png';
import shotgunPng from '../images/shotgun.png';
import marksmanPng from '../images/marksman.png';
import riflePng from '../images/rifle.png';
import pistolPng from '../images/pistol.png';

import verSelectedBar from '../images/verSelectedBar.png';

export const LeftMenu = styled.div`
  position: fixed;
  width: 56px;
  height: 426px;
  left: 0px;
  top: 129px;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  background: #c4c4c4;
  z-index: 1;
`;

export const MenuSelected = styled.div`
  position: absolute;
  width: 10px;
  height: 56px;
  left: 56px;
  top: -3px;
  cursor: pointer;
  background: url(${verSelectedBar});
`;

export const MaskMenu = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  cursor: pointer;
  background: url(${maskPng});
`;

export const BackPackMenu = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  cursor: pointer;
  background: url(${backpackPng});
`;

export const VestMenu = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  cursor: pointer;
  background: url(${vestPng});
`;

export const GlovesMenu = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  cursor: pointer;
  background: url(${glovesPng});
`;

export const HolsterMenu = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  cursor: pointer;
  background: url(${holsterPng});
`;

export const KneepadsMenu = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  cursor: pointer;
  background: url(${kneepadsPng});
`;

export const ARMenu = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  cursor: pointer;
  background: url(${ARPng});
`;

export const LMGMenu = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  cursor: pointer;
  background: url(${LMGPng});
`;

export const SMGMenu = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  cursor: pointer;
  background: url(${SMGPng});
`;

export const ShotgunMenu = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  cursor: pointer;
  background: url(${shotgunPng});
`;

export const MarksmanMenu = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  cursor: pointer;
  background: url(${marksmanPng});
`;

export const RifleMenu = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  cursor: pointer;
  background: url(${riflePng});
`;

export const PistolMenu = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  cursor: pointer;
  background: url(${pistolPng});
`;
