Mongoose, run all my validators
=====================

Allows you to have all your validator functions executed and evaluated, rather than having Mongoose terminate at the first error.


Installation
------------
Will add to npm soon.  In the meantime feel free to fork the repository.


Limitations
-----------
Other validators defined in the schema (such as min and max) are not run by this function because there is no obvious way to access them.  They are still run by Mongoose after this validation method is run.


Roadmap
-------
* Add support for a custom delimiter
* More documentation + example
