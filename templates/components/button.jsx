var React = require('react');

var Button = React.createClass({
  propTypes: {
    text: React.PropTypes.string.isRequired,
    className: React.PropTypes.string
  },
  render: function() {
    return (
      <button className={this.props.className}>{this.props.text}</button>
    );
  }
});

module.exports = Button;
