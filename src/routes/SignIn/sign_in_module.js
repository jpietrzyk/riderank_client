import { checkHttpStatus, parseJSON } from '../../utils';
import axios from 'axios';
import { browserHistory, Router } from 'react-router'

// ------------------------------------
// Constants
// ------------------------------------
export const SIGNIN_USER_REQUEST = 'SIGNIN_USER_REQUEST'
export const SIGNIN_USER_SUCCESS = 'SIGNIN_USER_SUCCESS'
export const SIGNIN_USER_FAILURE = 'SIGNIN_USER_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

let api = require('api');

var ax = axios.create({
  data: {}
});

ax.defaults.data['client_id'] = api.app_key;

export const signInUserSuccess = (dispatch, token) => {
  localStorage.setItem('token', token);
  browserHistory.push('/');
  return {
    type: SIGNIN_USER_SUCCESS,
    payload: {
      userName: 'jacek',
      token: token,
      signedIn: true
    }
  }
}

export const signInUserFailure = (error) => {
  localStorage.removeItem('token');
  return {
    type: SIGNIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

export const signInUserRequest = () => {
  return {
    type: SIGNIN_USER_REQUEST,
    payload: {}
  }
}

export const signInUser = (values) => {
  values['grant_type'] = 'password';
  return (dispatch, getState) => {
    dispatch(signInUserRequest());
    return(
      ax.post(`${api.server_url}/oauth/token`, values)
      .then(function(result){
        try {
            dispatch(signInUserSuccess(result.data.access_token));
        } catch (e) {
            dispatch(signInUserFailure({
              response: {
                status: 403,
                statusText: e
              }
            }));
        }
      })
      .catch(e => {
         dispatch(signInUserFailure(e));
       })
    );
  }
}

export const actions = {
  signInUser
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SIGNIN_USER_REQUEST] : (state, action) => action.payload,
  [SIGNIN_USER_SUCCESS] : (state, action) => action.payload,
  [SIGNIN_USER_FAILURE] : (state, action) => action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {user: null, token: null, signedIn: false};
export default function signInReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
