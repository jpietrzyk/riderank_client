import cx from 'classnames'
import React from 'react';
import PropTypes from 'prop-types'
import reformed from 'react-reformed';
import compose from 'react-reformed/lib/compose';
import syncWith from 'react-reformed/lib/syncWith';
import validateSchema from 'react-reformed/lib/validateSchema';
import { reduxForm, SubmissionError, propTypes } from 'redux-form';

const contains = (x, xs) => xs && !!~xs.indexOf(x);

const SignUpForm = ({ bindInput, bindToChangeEvent, model, onSubmit, setProperty, schema }) => {
  const submitHandler = (e) => {
    e.preventDefault()
    onSubmit(model)
  }
  const isUsernameValid = schema.fields.username.isValid
  const isPasswordValid = schema.fields.password.isValid
  const isEmailValid = schema.fields.email.isValid

  return (
    <form onSubmit={ submitHandler }>
      <fieldset className={cx('form-group', { 'has-danger': !isUsernameValid })}>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          className='form-control'
          placeholder='Username'
          {...bindInput('username')}
        />
      </fieldset>
      <fieldset className={cx('form-group', { 'has-danger': !isEmailValid})}>
        <label htmlFor='email'>Email</label>
        <input
          type='text'
          className='form-control'
          placeholder='Password'
          {...bindInput('email')}
        />
      </fieldset>
      <fieldset className={cx('form-group', { 'has-danger': !isPasswordValid })}>
        <label htmlFor='password'>Password</label>
        <input
          type='text'
          className='form-control'
          placeholder='Password'
          {...bindInput('password')}
        />
      </fieldset>
      <button type='submit' className='btn btn-primary' disabled={!schema.isValid}>
        Sign up
      </button>
    </form>
  )
}

const createFormContainer = compose(
  reformed(),
  validateSchema({
    username: {
      required: true,
      maxLength: 8,
    },
    email: {
      test: (value, fail) => {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          return fail("You have entered an invalid email address!")
        }
      }
    },
    password: {
      test: (value, fail) => {
        if (!value || value.length < 5) {
          return fail('Password must be at least 5 characters')
        } else if (value.length > 12) {
          return fail('Password must be no longer than 12 characters')
        }
      }
    },
  }),
)

const SignUpFormContainer = compose(
  createFormContainer
)(SignUpForm)

var SignUp = (props) => {
  const { handleSubmit } = props
  const propTypes = {
    ...propTypes,
    signUpUser : PropTypes.func.isRequired
  }
  return (
    <div className='container' style={{ marginTop: '2rem' }}>
      <div className='row'>
        <div className='col-sm-8 col-sm-offset-2'>
          <h1>Sign up</h1>
          <SignUpFormContainer
            onSubmit={ props.signUpUser }
          />
        </div>
      </div>
    </div>
  )
}

SignUp = reduxForm({
  form: 'SignUp'
})(SignUp);

export default SignUp;
