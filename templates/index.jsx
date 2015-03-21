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
          <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
            </div>
            <div className="col-md-6 col-md-offset-3">
              <div className="mainContainer">
                  <div className="formContainer">
                    <Form
                      fields={
                        [
                          { 'username': {
                              'placeholder': 'Enter username',
                              'type': 'text'
                            }
                          },
                          { 'password': {
                              'placeholder': 'Enter password',
                              'type': 'password'
                            }
                          }
                        ]
                      }
                      btnTxt={"Log In"}
                    />

                  </div>
              </div>
                </div>
              </div>
        </div>
      </div>
    );
  }
});

React.render( <App/>, document.body);
