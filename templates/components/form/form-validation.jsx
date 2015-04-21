var regex = require('../../lib/regex/regex.js');
var WebmakerActions = require('../../lib/webmaker-actions.jsx');

var MIN_PASSWORD_LEN = 8;
var MAX_PASSWORD_LEN = 128;

var MIN_USERNAME_LEN = 1;
var MAX_USERNAME_LEN = 20;

module.exports = {
  handleValidation: function(id, callback) {
    return (evt) => {
      switch (id) {
        case "username":
          this.validateUsername(this.state[id], callback);
          break;
        case "email":
          this.validateEmail(this.state[id], callback);
          break;
        case "password":
          this.validatePassword(this.state[id], callback);
          break;
        case "feedback":
          this.validateFeedback(this.state[id], callback);
          break;
      }
    }
  },
  validate: function(callback) {
    return callback(false);
  },
  isValid: function(id) {
    return true;
  },
  validateUsername: function(username, callback) {
    var tooShort = username.length < MIN_USERNAME_LEN,
        tooLong = username.length > MAX_USERNAME_LEN,
        caseValid = !! username.match(regex.username);

    if(!username) {
      WebmakerActions.displayError({'field': 'username', 'message': 'Please specify a username.'});
      return callback({'field': 'username', 'message': 'Please specify a username.'});
    }
    if (tooShort) {
      WebmakerActions.displayError({'field': 'username', 'message': 'Username must be at least one character long.'});
      return callback({'field': 'username', 'message': 'Username must be at least one character long.'});
    }
    if (!caseValid) {
      WebmakerActions.displayError({'field': 'username', 'message': 'Invalid username. a-zA-Z or 0-9 only'});
      return callback({'field': 'username', 'message': 'Invalid username. a-zA-Z or 0-9 only'});
    }
    if(tooLong) {
      WebmakerActions.displayError({'field': 'username', 'message': 'Username cannot be more than 20 characters long.'});
      return callback({'field': 'username', 'message': 'Username cannot be more than 20 characters long.'});
    }
    if(caseValid && !tooShort && !tooLong) {
      this.setFormState({field: 'username'});
      callback(null);
    }
  },
  validatePassword: function(password, callback) {
    if(!callback) {
      callback = function(){};
    }
    var containsBothCases = regex.password.bothCases,
        containsDigit = regex.password.digit;

    var username = this.state.username || this.getQuery().uid || this.getQuery().username;

    var tooShort = password.length < MIN_PASSWORD_LEN,
        tooLong = password.length > MAX_PASSWORD_LEN,
        caseValid = !! password.match(containsBothCases),
        digitValid = !! password.match(containsDigit);

    if(!password) {
      WebmakerActions.displayError({'field': 'password', 'message': 'Please specify a password.'});
      return callback({'field': 'password', 'message': 'Please specify a password.'});
    }
    if (tooShort) {
      WebmakerActions.displayError({'field': 'password', 'message': 'Password must be at least eight characters long.'});
      return callback({'field': 'password', 'message': 'Password must be at least eight characters long.'});
    }
    if (!caseValid) {
      WebmakerActions.displayError({'field': 'password', 'message': 'Password must contain at least one uppercase and lowercase letter.'});
      return callback({'field': 'password', 'message': 'Password must contain at least one uppercase and lowercase letter.'});
    }
    if (!digitValid) {
      WebmakerActions.displayError({'field': 'password', 'message': 'Password must contain at least one number.'});
      return callback({'field': 'password', 'message': 'Password must contain at least one number.'});
    }
    if(tooLong) {
      WebmakerActions.displayError({'field': 'password', 'message': 'Password cannot be more than 128 characters long.'});
      return callback({'field': 'password', 'message': 'Password cannot be more than 128 characters long.'});
    }
    if (username) {
      var containUserValid = !password.match(username, 'i');
      if(!containUserValid) {
        WebmakerActions.displayError({'field': 'password', 'message': 'Password cannot contain your username.'});
        return callback({'field': 'password', 'message': 'Password cannot contain your username.'});
      }
    } else if (!username) {
      WebmakerActions.displayError({'field': 'username', 'message': 'Please specify a username.'});
      return callback({'field': 'username', 'message': 'Please specify a username.'});
    }
    if(caseValid && digitValid && containUserValid && !tooShort && !tooLong) {
      this.setFormState({field: 'password'});
      callback(null);
    }
  },
  validateEmail: function(email, callback) {
    if(!email) {
      WebmakerActions.displayError({'field': 'email', 'message': 'Email cannot be empty.'});
      return;
    }
    if (!email.match(regex.email)) {
      WebmakerActions.displayError({'field': 'email', 'message': 'Please use a valid email address.'});
      return
    }
    this.setFormState({field: 'email'});
    callback(null);
  },
  validateFeedback: function(checkbox, callback) {
    return callback(null);
  }
};
