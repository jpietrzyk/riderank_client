import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router';
import { reduxForm, SubmissionError, propTypes, Field } from 'redux-form';
import renderField from '../../components/renderField';

//Client side validation
function validate(values) {
  var errors = {};
  var hasErrors = false;
  if (!values.username || values.username.trim() === '') {
    errors.username = 'Enter username';
    hasErrors = true;
  }
  if (!values.password || values.password.trim() === '') {
    errors.password = 'Enter password';
    hasErrors = true;
  }
  return hasErrors && errors;
}

var SignIn = (props) => {
  const {asyncValidating, handleSubmit, submitting} = props;
  return (
    <div className="container">
      <form onSubmit={ handleSubmit(props.signInUser) }>
        <Field
               name="username"
               type="text"
               component={ renderField }
               label="@username*" />
        <Field
               name="password"
               type="password"
               component={ renderField }
               label="Password*" />
        <div>
          <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={ submitting }>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

SignIn = reduxForm({
  form: 'SignIn'
})(SignIn);

export default SignIn;
