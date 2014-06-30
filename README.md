Mongoose, run all my validation methods!
=====================

MongooseValidateAll (MVA) does a full sweep and runs all your custom validation methods, even if one fails.

**What's wrong?** Mongoose lets you define multiple custom validation methods, but when the first fails, the subsequent methods are ignored and validation is terminated.  This means that if your username is too long *and* has invalid characters, it'll take two validation sequences to resolve both issues.  With MVA, you see both issues immediately.


Installation
------------
Will add to npm soon.  In the meantime feel free to fork the repository.


Limitations
-----------
In-built validators (such as *min* and *max*) are **not run**  are not run by this function because there is no obvious way to access them.  They are still run by Mongoose after this validation method is run.


Usage
-------
### Importing the module
    var ValidationGroup = require('mongoose-validate-all');
    
### Defining your validation methods
Your array of validation methods should follow this Mongoose standard:

    var fieldValidators = [
      {
         validator: function() {..},
         msg: 'Error Message 1'
      },
      {
         validator: function() {..},
         msg: 'Error Message 2'
      }
    ];

### Using the module
Set the validate property of the Schema to an instance of the module, passing in your validation array as the only parameter:

    var User = new Schema({
        username: { 
          type: String, 
          validate: new ValidationGroup(fieldValidators) 
        }
    });
