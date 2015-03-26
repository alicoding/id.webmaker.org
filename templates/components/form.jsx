var React = require('react/addons');
var ValidationMixin = require('react-validation-mixin');

var Form = React.createClass({
  propTypes: {
    fields: React.PropTypes.array.isRequired
  },
  statics: {
      'iconLabels': {
        'username': 'icon-label-username',
        'password': 'icon-label-password',
        'email':    'icon-label-email',
        'error':    'icon-label-error',
        'valid':    'icon-label-valid'
      }
  },
  mixins: [
    ValidationMixin,
    React.addons.LinkedStateMixin
  ],
  validatorTypes: false,
  componentWillMount: function() {
    this.validatorTypes = this.props.validators;
  },
  getInitialState: function() {
    return {
      username: null,
      password: null,
      email: null,
      checked: false
    };
  },
  buildFormElement: function(key, i) {
    // we always expect this.props.fields[i] to be one object with one property.
    var self = this;
    var id = Object.keys(this.props.fields[i])[0];
    var placeholder = this.props.fields[i][id].placeholder;
    var type = this.props.fields[i][id].type;
    var label = this.props.fields[i][id].label;
    var labelPosition = this.props.fields[i][id].labelPosition;
    var errorMessage = this.props.fields[i][id].errorMessage;
    var isDisabled = this.props.fields[i][id].disabled;
    var focus = this.props.fields[i][id].focus;
    var username = this.props.fields[i][id].username;
    this.passChecked = this.props.fields[i][id].checked;
    var dirty = false;
    var dirty = function () {console.log('here')
      dirty = true
      self.handleValidation(id, self.formSuccess);
      console.log('after', dirty)
    }
    var input = (
      <input type={type}
             id={id}
             ref={id+'Input'}
             placeholder={placeholder}
             valueLink={this.linkState(id)}
             onBlur={dirty=true && self.handleValidation(id, self.formSuccess)}
             className={this.getInputClasses(id, dirty)}
             defaultValue={username}
             disabled={isDisabled ? "disabled" : false}
             autoFocus={focus ? true : false}
      />
    );

    var errorTooltip = (
      <span className="warning">{errorMessage}</span>
    );

    if (type === 'checkbox') {
      input = (<span>{input}<span/></span>);
    }

    return (
     <label ref={id+'Label'} className={this.getInLabelClasses(id)} key={id} htmlFor={id}>
        {!this.isValid(id) ? errorTooltip : ''}
        {label && labelPosition==='before' ? label : false}
        {input}
        {label && labelPosition==='after' ? label : false}
     </label>
    );
  },
  render: function() {
     var fields = Object.keys(this.props.fields).map(this.buildFormElement);
     return <div role="form">{fields}</div>;
  },
  formSuccess: function(err, valid) {
    // console.log(this.refs.label)
  },
  getInputClasses: function(field, dirty) {console.log(this.refs)
    return React.addons.classSet({
      'form-control': true,
      'has-error': !this.isValid(field),
      'is-valid': this.isValid(field),
      'valid': dirty && this.isValid(field)
    });
  },
  getInLabelClasses: function(field) {console.log(this.refs)
    var classes = {};
    // console.log(this.refs)
    classes[this.getIconClass(field)] = true;
    classes[this.getIconClass('error')] = !this.isValid(field);
    // classes[this.getIconClass('valid')] = (this.isValid(field))|| this.passChecked;
    return React.addons.classSet(classes);
  },
  getIconClass: function(field) {
    return Form.iconLabels[field];
  },
  handleReset: function(event) {
    this.clearValidations();
    this.setState(this.getInitialState());
  },
  /**
   * "owner" components call form.processFormData on us
   */
  processFormData: function(callback) {
    var self = this;
    this.validate(function(error, data) {
      console.log("inside Form, we see:", error, data);
      self.onValidate(callback, error, data);
    });
  },
  onValidate: function(callback, error, data) {
    callback(error, !!error? false : JSON.parse(JSON.stringify(this.state)));
  }
});

module.exports = Form;
