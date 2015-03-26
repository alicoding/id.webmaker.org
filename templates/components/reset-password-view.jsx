var React = require('react');
var validators = require('../lib/validatorset');
var Form = require('./form.jsx');

var fields = [
  {
    'username': {
      'placeholder': 'Username',
      'type': 'text',
      'validator': 'username',
      'errorMessage': 'Invalid username',
      'disabled': true,
      'username': 'ali',
      'checked': true
    }
  }, {
    'password': {
      'placeholder': 'Type your new password',
      'type': 'password',
      'validator': 'password',
      'errorMessage': 'Invalid password',
      'focus': true
    }
  }
];

var fieldsValidators = validators.getValidatorSet(fields);

var ResetPassword = React.createClass({
  componentWillMount: function() {
    // var form = this.refs.userform;
    // form.processFormData(this.props.submitForm);
  },
  render: function() {
    return (
      <div className="formContainer resetPassword innerForm centerDiv">
        <Form ref="userform" fields={fields} validators={fieldsValidators} />
        <button onClick={this.processFormData} className="btn btn-awsm">Save</button>
      </div>
    );
  },
  processFormData: function() {
    var form = this.refs.userform;
    console.log(form)
    form.processFormData(this.props.submitForm);
  }
});

module.exports = ResetPassword;
