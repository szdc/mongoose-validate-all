'use strict';

var Schema = require('mongoose').Schema,
    ValidationGroup = require('../lib/mongoose-validate-all');

module.exports = function(db) {
  return db.model('User', UserSchema());
};

// Schema
function UserSchema() {
  var User = new Schema({
    username: { type: String, validate: new ValidationGroup(validators.username) }
  });

  return User;
}

// Validation methods
var validators = {
  username: [
    {
      validator: function(username) {
        return /^\w+$/.test(username);
      },
      msg: 'InvalidCharacters'
    },
    {
      validator: function(username) {
        return ( username.length <= 16 );
      },
      msg: 'LengthBelowMin'
    }
  ]
};