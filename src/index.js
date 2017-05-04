/**
 * import dependencies
 */
 import React from 'react'
 import ReactDOM from 'react-dom'
 import createStore from './store/createStore'
 import AppContainer from './containers/AppContainer'

const initialState = window.__INITIAL_STATE__
const store = createStore(initialState)

/**
 * import stylesheets
 */
require('./assets/stylesheets/base.scss');
require('./assets/stylesheets/lemonade.scss');
require('./assets/stylesheets/navigation.scss');

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('app')

let render = () => {
  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <AppContainer store={store} routes={routes} />,
    MOUNT_NODE
  )
}

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        console.error(error)
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('./routes/index', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

render()
