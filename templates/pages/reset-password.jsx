var React = require('react');

var Form = require('../components/form.jsx');
var Header = require('../components/header.jsx');

var fieldValuesResetForm = [
  {
    'username': {
      'placeholder': 'Username',
      'type': 'text',
      'validator': 'username',
      'errorMessage': 'Invalid username'
    }
  }
];

var fieldValuesSetPassForm = [
  {
    'username': {
      'placeholder': 'Username',
      'type': 'text',
      'validator': 'username',
      'errorMessage': 'Invalid username',
      'readyonly': true
    }
  }, {
    'password': {
      'placeholder': 'Type your new password',
      'type': 'password',
      'validator': 'password',
      'errorMessage': 'Invalid password'
    }
  }
];

var validators = require('../lib/validatorset');
var fieldResetPassValidators = validators.getValidatorSet(fieldValuesResetForm);
var fieldSetPassValidators = validators.getValidatorSet(fieldValuesSetPassForm);

// This wraps every view
var ResetPassword = React.createClass({
  getInitialState: function() {
    return {
      submitForm: false,
      email: false
    };
  },
  render: function() {
    // FIXME: totally not localized yet!
    var resetButton = "Reset Password";
    var saveButton = "Save";
    var checkYourEmail = "Save";
    var currentFormfields = !this.state.submitForm && !this.state.email ? fieldValuesResetForm : fieldValuesSetPassForm;
    var currentFormValidators = !this.state.submitForm && !this.state.email ? fieldResetPassValidators : fieldSetPassValidators;
    var currentBtnLabel = !this.state.submitForm && !this.state.email ? resetButton : saveButton;

    var content = (
      <div>
        <Form ref="userform" fields={currentFormfields} validators={currentFormValidators} />
        <button onClick={this.processFormData} className="btn btn-awsm">{currentBtnLabel}</button>
      </div>
    );
    if(this.state.submitForm && !this.state.email) {
      content = (
        <div>
        <span className="fa fa-envelope-o"></span>
          <h2>Check Your email.</h2>
          <p>We&#39;ve emailed you instructions for creating a new password.</p>
        </div>
      );
    }

    return (
      <div>
        <Header redirectText="Need an account?" redirectLabel="Sign up" redirectPage="signup" />

        <div className="formContainer centerDiv resetPassword">
          <div className="innerForm">
            {content}
          </div>
        </div>
      </div>
    );
  },
  processFormData: function() {
    var form = this.refs.userform;
    form.processFormData(this.handleFormData);
  },
  handleFormData: function(error, data) {
    console.log("inside App we see:", error, data);
    this.setState({
      submitForm: !error
    })
  }
});

module.exports = ResetPassword;
