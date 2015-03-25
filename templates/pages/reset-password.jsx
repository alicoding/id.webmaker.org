var React = require('react');

var Form = require('../components/form.jsx');
var Header = require('../components/header.jsx');

var fieldValues = [
  {
    'username': {
      'placeholder': 'Username',
      'type': 'text',
      'validator': 'username',
      'errorMessage': 'Invalid username'
    }
  }
];
console.log(fieldValues)
var validators = require('../lib/validatorset');
var fieldValidators = validators.getValidatorSet(fieldValues);

// This wraps every view
var ResetPassword = React.createClass({
  getInitialState: function() {
    return {
      submitForm: false
    };
  },
  render: function() {
    // FIXME: totally not localized yet!
    var resetButton = "Reset Password";
    var saveButton = "Save";

    var resetForm = (
      <div>
        <Form ref="userform" fields={fieldValues} validators={fieldValidators} />
        <button onClick={this.processFormData} className="btn btn-awsm">{resetButton}</button>
      </div>
    );
    var requestForm = (
      <div>
        <Form ref="userform" fields={fieldValues} validators={fieldValidators} />
        <button onClick={this.processFormData} className="btn btn-awsm">{saveButton}</button>
      </div>
    );
    var checkEmail = (
      <div>
        <Form ref="userform" fields={fieldValues} validators={fieldValidators} />
        <button onClick={this.processFormData} className="btn btn-awsm">{saveButton}</button>
      </div>
    );

    var firstForm = true;
    return (
      <div>
        <Header redirectText="Need an account?" redirectLabel="Sign up" redirectPage="signup" />

        <div className="formContainer centerDiv resetPassword">
        {this.state.submitForm}
          <div className="innerForm">
            {!this.state.submitForm ? resetForm : requestForm}
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
      submitForm: data
    })
  }
});

module.exports = ResetPassword;
