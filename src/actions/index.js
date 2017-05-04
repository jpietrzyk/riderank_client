'use-strict';

import axios from 'axios';
import { PING_ACTION } from './types';

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
