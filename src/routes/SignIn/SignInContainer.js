import { connect } from 'react-redux'
import { signInUser } from './sign_in_module.js'

import SignIn from './SignInComponent'

const mapDispatchToProps = {
  signInUser
}

const mapStateToProps = (state) => ({
  signIn : state.signIn
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
