/*
 * Initialize a new group of validation functions
 * for a schema property.
 *
 * @param validatorsArray
 */
function ValidationGroup(validatorsArray) {
  var validationErrors;
  
  /*
   * Iterates through the supplied validators,
   * appending error messages to validationErrors
   * if the validator returns false.
   *
   * @param value
   */
  function validator(value) {
    validationErrors = '';
    var isValid = true;
    
    validatorsArray.forEach(function(validator) {
      if(!validator.validator(value)) {
        // Append delimiter
        if(validationErrors.length !== 0)
          validationErrors += ' // ';

        // Append message
        validationErrors += validator.msg;

        isValid = false;
      }
    });
    return isValid;
  }
  
  /* 
   * Simple object to retrieve the list of
   * validation errors.
   *
   * Mongoose expects a string message,
   * but to return a dynamic error message,
   * we need to pass a function that retrieves it.
   */
  function ValidationErrorRetriever() {}

  /*
   * Injects the validation errors when Mongoose
   * first calls Replace on the error message.
   * Retains Mongoose functionality.
   *
   * @param regexp
   * @param newSubStr
   */
  ValidationErrorRetriever.prototype.replace = function(regexp, newSubStr) {
    return validationErrors.replace(regexp, newSubStr);
  };
  
  /* 
   * For a single validation method, Mongoose expects
   * an array containing the validation method and
   * error message respectively.
   */
  return [
    validator,
    new ValidationErrorRetriever()
  ];
}

module.exports = ValidationGroup;