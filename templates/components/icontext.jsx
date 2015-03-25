var React = require('react');

var IconText = React.createClass({
	render: function() {
		var className = "icontext" + (this.props.className ? " " + this.props.className : "");
		var iconClass = "icon" + (this.props.iconClass ? " " + this.props.iconClass : "");
		var textClass = "text" + (this.props.textClass ? " " + this.props.textClass : "");
		return (
			<div className={className}>
			  <div className={iconClass}></div>
			  <div className={textClass}>
			    {this.props.header ? <h1>{this.props.header}</h1> : false}
			    {this.props.children}
			  </div>
			</div>
		);
	}
});

module.exports = IconText;
