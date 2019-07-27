// @flow

export const restURL = "http://127.0.0.1:8000/api/v1";

export const getDefaultHeaders = (cookies) => {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': cookies.csrftoken,
    'Access-Control-Allow-Origin': '*',
  }
};