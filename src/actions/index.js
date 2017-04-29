'use-strict';

import axios from 'axios';
import { PING_ACTION } from './types';
import { AUTH_ACTION } from './types';

let api = require('api');

export function pingAction() {
  return function(dispatch) {
    axios.get(`${api.server_url}/ping`)
    .then(response => {
      dispatch({
        type: PING_ACTION,
        payload: response.data
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }
}

export function authAction() {
  return function(dispatch) {
    axios.post(`${api.server_url}/oauth/token`, {
      grant_type: 'password',
      username: 'test',
      password: '12345678',
      client_id: api.app_key,
      client_secret: api.app_secret
    })
    .then(response => {
      dispatch({
        type: PING_ACTION,
        payload: response.data
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }
}
