import { combineReducers } from 'redux';
import PingReducer from './ping_reducer';
import LocationReducer from './location_reducer'

const rootReducer = (asyncReducers) => {
  return combineReducers({
    ping: PingReducer,
    location: LocationReducer,
    ...asyncReducers
  })
 }

 export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default rootReducer;
