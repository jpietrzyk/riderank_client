import CoreLayout from '../layouts/CoreLayout'
import Home from './Home/'
import SignInRoute from './SignIn/'
import SignUpRoute from './SignUp/'

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Home,
  childRoutes : [
    SignInRoute(store),
    SignUpRoute(store)
  ]
})

export default createRoutes
