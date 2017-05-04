import axios from 'axios';
import { SubmissionError } from 'redux-form';

// ------------------------------------
// Constants
// ------------------------------------
export const SIGNUP_USER = 'SIGNUP_USER'
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS'
export const SIGNUP_USER_FAILURE = 'SIGNUP_USER_FAILURE'

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

export const signUpUser = (values) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      ax.post(`${api.server_url}/users`, values)
      .then(function(result){
        dispatch({
          type    : SIGNUP_USER_SUCCESS,
          payload : result
        })
      }).catch(function(error){
        dispatch({
          type    : SIGNUP_USER_FAILURE,
          payload : error
        })
      })
    })
    resolve()
  }
}

export const actions = {
  signUpUser
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SIGNUP_USER] : (state, action) => action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function signInReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
