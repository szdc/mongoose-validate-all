'use strict';

var should   = require('should'),
    mongoose = require('mongoose'),
    db       = mongoose.createConnection('localhost', 'validate-all-test'),
    User     = require('../examples/UserModel')(db);

// Globals
var user;

describe('validate-all', function() {
  
  // Clear the database before each test.
  beforeEach(function(done) {
    User.remove({}, function(err) {
      if(err) return done(err);
      
      user = new User({
        username: 'User'
      });
      done();
    });
  });

  it('should return a JSON-encoded array of errors in the message field when multiple errors exist', function(done) {
    user.username = 'InvalidCharacter*TooLong';
    user.validate(function(err) {
      err.errors.username.message.should.be.json;
      
      var usernameErrors = JSON.parse(err.errors.username.message);
      usernameErrors.should.containEql('LengthAboveMax').and.containEql('InvalidCharacters');
      done();
    });
  });
  
  it('should return a JSON-encoded array with a single error when only one error exists', function(done) {
    user.username = 'validCharactersTooLong';
    user.validate(function(err) {
      err.errors.username.message.should.be.json;
      
      var usernameErrors = JSON.parse(err.errors.username.message);
      usernameErrors.should.containEql('LengthAboveMax').and.have.length(1);
      done();
    });
  });
  
  it('should not produce an error when no errors exist', function(done) {
    user.username = 'User';
    user.validate(function(err) {
      should.not.exist(err);
      done();
    });
  });
});