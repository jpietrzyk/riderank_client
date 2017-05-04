import cx from 'classnames'
import React from 'react';
import PropTypes from 'prop-types'
import reformed from 'react-reformed';
import compose from 'react-reformed/lib/compose';
import syncWith from 'react-reformed/lib/syncWith';
import validateSchema from 'react-reformed/lib/validateSchema';
import { reduxForm, SubmissionError, propTypes } from 'redux-form';

const contains = (x, xs) => xs && !!~xs.indexOf(x);

const SignInForm = ({ bindInput, bindToChangeEvent, model, onSubmit, setProperty, schema }) => {
  const submitHandler = (e) => {
    e.preventDefault()
    onSubmit(model)
  }
  const isUsernameValid = schema.fields.username.isValid
  const isPasswordValid = schema.fields.password.isValid

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
        Sign in
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
  syncWith(
    'signInForm',
    (key) => JSON.parse(localStorage.getItem(key)),
    (key, value) => localStorage.setItem(key, JSON.stringify(value))
  ),
)

const displayFormState = (WrappedComponent) => {
  return (props) => {
    return (
      <div>
        {React.createElement(WrappedComponent, props)}
        <hr />
        <h4>Sign up</h4>
        <pre>{JSON.stringify(props.model, null, 2)}</pre>
        <hr />
        <h4>Schema Validation</h4>
        <pre>{JSON.stringify(props.schema, null, 2)}</pre>
      </div>
    )
  }
}

const SignInFormContainer = compose(
  createFormContainer,
  displayFormState
)(SignInForm)

var SignIn = (props) => {
  const { handleSubmit } = props
  const propTypes = {
    ...propTypes,
    signInUser : PropTypes.func.isRequired
  }
  return (
    <div className='container' style={{ marginTop: '2rem' }}>
      <div className='row'>
        <div className='col-sm-8 col-sm-offset-2'>
          <h1>Sign in</h1>
          <SignInFormContainer
            onSubmit={ props.signInUser }
          />
        </div>
      </div>
    </div>
  )
}

SignIn = reduxForm({
  form: 'SignIn'
})(SignIn);

export default SignIn;
