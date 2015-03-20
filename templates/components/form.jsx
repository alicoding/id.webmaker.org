var React = require('react');

var InputTypeInstance = React.createClass({
  render: function() {
    return (
      <form role="form">
        <div className="form-group">
          <input type="text" className="form-control" id="username" placeholder="Enter username" required/>
        </div>
        <div className="form-group">
          <input type="password" className="form-control" id="pwd" placeholder="Enter password" required/>
        </div>
      </form>
    );
  }
});

module.exports = InputTypeInstance;
