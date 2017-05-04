import axios from 'axios';
import { SubmissionError } from 'redux-form';

// ------------------------------------
// Constants
// ------------------------------------
export const SIGNIN_USER = 'SIGNIN_USER'
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

export const signInUser = (values) => {
  values['grant_type'] = 'password';
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      ax.post(`${api.server_url}/oauth/token`, values)
      .then(function(result){
        dispatch({
          type    : SIGNIN_USER_SUCCESS,
          payload : result
        })
      }).catch(function(error){
        dispatch({
          type    : SIGNIN_USER_FAILURE,
          payload : error
        })
      })
    })
    resolve()
  }
}

export const actions = {
  signInUser
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SIGNIN_USER] : (state, action) => action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function signInReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
