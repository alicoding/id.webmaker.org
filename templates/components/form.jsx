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
        'error':    'icon-label-error'
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
      email: null
    };
  },
  buildFormElement: function(key, i) {
    // we always expect this.props.fields[i] to be one object with one property.
    var id = Object.keys(this.props.fields[i])[0];
    var placeholder = this.props.fields[i][id].placeholder;
    var type = this.props.fields[i][id].type;
    var label = this.props.fields[i][id].label;
    var labelPosition = this.props.fields[i][id].labelPosition;
    var errorMessage = this.props.fields[i][id].errorMessage;

    var input = (
      <input type={type}
             id={id}
             placeholder={placeholder}
             valueLink={this.linkState(id)}
             onBlur={this.handleValidation(id)}
             className={this.getInputClasses(id)} />
    );

    var errorTooltip = (
      <span className="warning">{errorMessage}</span>
    );

    if (type === 'checkbox') {
      input = (<span>{input}<span/></span>);
    }

    return (
     <label className={this.getInLabelClasses(id)} key={id} htmlFor={id}>
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
  getInputClasses: function(field) {
    return React.addons.classSet({
      'form-control': true,
      'has-error': !this.isValid(field)
    });
  },
  getInLabelClasses: function(field) {
    var classes = {};
    classes[this.getIconClass(field)] = true;
    classes[this.getIconClass('error')] = !this.isValid(field);
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
