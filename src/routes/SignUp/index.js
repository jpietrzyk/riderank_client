import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'sign-up',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const SignUp = require('./SignUpContainer').default
      const reducer = require('./sign_up_module').default

      injectReducer(store, { key: 'signUp', reducer })

      /*  Return getComponent   */
      cb(null, SignUp)

    /* Webpack named bundle   */
  }, 'signUp')
  }
})
