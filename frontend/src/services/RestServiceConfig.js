// @flow

export const restURL = 'https://divizia.herokuapp.com/api/v1';

export const getDefaultHeaders = cookies => {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': cookies.csrftoken,
    'Access-Control-Allow-Origin': '*',
  }
};
