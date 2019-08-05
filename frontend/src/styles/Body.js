// @flow

import styled from 'styled-components';

import loaderGif from '../images/loader.gif';

export const RelativeDiv = styled.div`
  position: relative;
`;

export const WrapDiv = styled.div`
  border: 2px solid #005e04;
  box-sizing: border-box;
`;

export const WrapP = styled.div`
  margin: 0;
  padding: 0;
`;

export const Modal = styled.div`
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

export const Loading = styled.div`
  z-index: 11;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: url(${loaderGif}) no-repeat center center;
`;
