var React = require('react');

var Form = require('./components/form.jsx');
var Button = require('./components/button.jsx');

// This wraps every view
var App = React.createClass({
  submitForm: function(e) {
    console.log('asdasd');
  },
  render: function() {
    return (
        <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <img src="/templates/img/logo.png" alt="logo" className="logo" />
          </div>
          <div className="col-md-6 col-md-offset-3">
            <div className="title">
              <h1>Build the web. Learn new skills.</h1>
              <h2>Free and open source - forever.</h2>
            </div>
            <div className="mainContainer">
                <div className="formContainer">
                  <Form/>
                </div>
                <Button text={"Sign in"} className="btn btn-awsm" onClick={this.submitForm}/>
            </div>
              </div>
            </div>
      </div>
    );
  }
});

React.render( <App/>, document.body);
