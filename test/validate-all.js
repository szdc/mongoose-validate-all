'use strict';

var should   = require('should'),
    mongoose = require('mongoose'),
    db       = mongoose.createConnection('localhost', 'validate-all-test');

// Globals
var userSchema = new mongoose.Schema({ username: 'string' });
var User = db.model('User', userSchema);
var user;

describe('validate-all', function() {
  beforeEach(function(done) {
    User.remove({}, function(err) {
      if(err) return done(err);
      
      user = new User({
        username: 'User',
      });
      done();
    });
  });

  it('should return a list of errors for a field when multiple exist', function(done) {
    user.save(function(err) {
      should.exist(err) &&
        err.errors.username.message.length.should.be.above(0);
      done();
    });
  });
});