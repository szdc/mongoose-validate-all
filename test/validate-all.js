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

  it('should return a delimited list of errors in the message field when multiple errors exist', function(done) {
    user.username = 'InvalidCharacter*TooLong';
    user.validate(function(err) {
      err.errors.username.message.should.containEql('LengthAboveMax') &&
        err.errors.username.message.should.containEql('InvalidCharacters');
      done();
    });
  });
  
  it('should return a single error when one error exists', function(done) {
    user.username = 'validCharactersTooLong';
    user.validate(function(err) {
      err.errors.username.message.should.eql('LengthAboveMax');
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