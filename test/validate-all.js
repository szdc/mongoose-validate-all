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
        username: 'invalid*character*and*too*long'
      });
      done();
    });
  });

  it('should return a list of error types in the message field when multiple errors exist', function(done) {
    user.save(function(err) {
      err.errors.username.message.should.containEql('LengthBelowMin') &&
        err.errors.username.message.should.containEql('InvalidCharacters');
      done();
    });
  });
});