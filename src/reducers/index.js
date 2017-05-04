import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import LocationReducer from './location_reducer';
// import PingReducer from './ping_reducer';
// import UserReducer from './user_reducer';

const rootReducer = (asyncReducers) => {
  return combineReducers({
    location: LocationReducer,
    ...asyncReducers
  })
 }

 export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(rootReducer(store.asyncReducers))
}

export default rootReducer;
