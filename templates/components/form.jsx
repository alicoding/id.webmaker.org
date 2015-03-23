var React = require('react/addons');
var ValidationMixin = require('react-validation-mixin');
var Joi = require('joi');

var Signup = React.createClass({
  propTypes: {
    fields: React.PropTypes.array.isRequired,
    btnTxt: React.PropTypes.string.isRequired
  },
  statics: {
      'phoneLabels': {
        'username': 'phone-label-username',
        'password': 'phone-label-password',
        'email': 'phone-label-email'
      }
  },
  mixins: [ValidationMixin, React.addons.LinkedStateMixin],
  validatorTypes:  {
    firstName: Joi.string().required().label('First Name'),
    lastName: Joi.string().allow(null).label('Last Name'),
    email: Joi.string().email().label('Email Address'),
    username:  Joi.string().alphanum().min(3).max(30).required().label('Username'),
    password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).label('Password'),
    verifyPassword: Joi.any().valid(Joi.ref('password')).required().label('Password Confirmation')
  },
  getInitialState: function() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      username: null,
      password: null,
      verifyPassword: null,
      feedback: null
    };
  },
  render: function() {
     var that = this;
     var fields = Object.keys(this.props.fields).map(function(key,i) {
       var id = Object.keys(that.props.fields[i]);
       var placeholder = that.props.fields[i][id].placeholder;
       var type = that.props.fields[i][id].type;

       return (
            <label className={that.getIconClass(id)}>
              <input key={id} type={type} id={id} placeholder={placeholder}
                valueLink={that.linkState(id)} onBlur={that.handleValidation(id)}
                className={that.getClasses(id)}
              />
              {that.getValidationMessages(id).map(that.renderHelpText)}
            </label>
       );
     });
     return (
       <form role="form">
          {fields}
          <button type='submit' onClick={this.handleSubmit} className="btn btn-awsm">{this.props.btnTxt}</button>
       </form>
     );
  },
  renderHelpText: function(message) {
    return (
      <span className="help-block">{message}</span>
    );
  },
  getClasses: function(field) {
    return React.addons.classSet({
      'form-control': true,
      'has-error': !this.isValid(field)
    });
  },
  getIconClass: function(field) {
    var labels = this.constructor.phoneLabels;
    return labels[field];
  },
  handleReset: function(event) {
    event.preventDefault();
    this.clearValidations();
    this.setState(this.getInitialState());
  },
  handleSubmit: function(event) {
    event.preventDefault();
    onValidate = function(error, validationErrors) {
      if (error) {
        this.setState({
          feedback: 'Form is invalid do not submit'
        });
      } else {
        this.setState({
          feedback: 'Form is valid send to action creator'
        });
      }
    }.bind(this);
    this.validate(onValidate);
  }
});

module.exports = Signup;
