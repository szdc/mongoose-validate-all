function ValidationGroup(validatorsArray) {
  var validationErrors;
  
  /* 
   * Mongoose expects a string message,
   * but to return a dynamic error message,
   * we need to pass a function that retrieves it.
   * 
   * Creating a replace prototype method allows us
   * to inject our dynamic error message when Mongoose
   * thinks it is calling String.Replace on the message.
   */
  function ValidationErrorRetriever() {}
  ValidationErrorRetriever.prototype.replace = function() {
    return validationErrors;
  };
  
  /* 
   * For a single validation method, Mongoose expects
   * an array containing the validation method and
   * error message respectively.
   *
   * The validation method here iterates through the 
   * supplied validators, and appends the associated message
   * to the validationErrors string if the validator returns
   * false.
   */
  return [
    function(value) {
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
    },
    new ValidationErrorRetriever()
  ];
}

module.exports = ValidationGroup;