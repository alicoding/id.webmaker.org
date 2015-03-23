var React = require('react');

var Form = require('./components/form.jsx');
var Header = require('./components/header.jsx');

// This wraps every view
var App = React.createClass({
  submitForm: function(e) {
    console.log(e);
  },
  render: function() {
    return (
      <div>
        <Header/>
          <div className="formContainer centerDiv">
            <Form
              fields={
                [
                  { 'username': {
                      'placeholder': 'Username',
                      'type': 'text'
                    }
                  },
                  { 'password': {
                      'placeholder': 'Password',
                      'type': 'password'
                    }
                  }
                ]
              }
              btnTxt={"Log In"}
            />
          </div>
        </div>
    );
  }
});

React.render( <App/>, document.body);
