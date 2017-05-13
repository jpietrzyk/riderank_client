import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import LocationReducer from './location';

const rootReducer = (asyncReducers) => {
  return combineReducers({
    location: LocationReducer,
    form: formReducer,
    ...asyncReducers
  })
 }

 export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(rootReducer(store.asyncReducers))
}

export default rootReducer;
