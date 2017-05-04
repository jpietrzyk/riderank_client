import CoreLayout from '../layouts/CoreLayout'
import Home from '../components/Home/'
import SignInRoute from '../components/SignIn/'
import SignUpRoute from '../components/SignUp/'

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
