import { injectReducer } from '../../store/reducers'
export default (store) => ({
  path : 'sign-in',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const SignIn = require('./SignInContainer').default
      const reducer = require('./sign_in_module').default

      injectReducer(store, { key: 'signIn', reducer })

      /*  Return getComponent   */
      cb(null, SignIn)

    /* Webpack named bundle   */
  }, 'signIn')
  }
})
