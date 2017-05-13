import { connect } from 'react-redux'
import { signInUser } from './sign_in_module.js'

import SignIn from './SignInComponent'

const mapDispatchToProps = {
  signInUser
}

const mapStateToProps = (state) => ({
  signedIn : state.signedIn,
  userName : state.userName
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
