Validator = {
  required: function(value) {
    return value.length > 0 ? true : false;
  },

  maxLength: function(value, length) {
    return value.length <= length ? true : false;
  },

  email: function(value) {
    return /^[\w-\.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value) ? true : false;
  },

  errorMessages: {
    required: "The field cannot be empty.",
    maxLength: "The field cannot be that long.",
    email: "You should enter a valid email."
  },

  validate: function(value, type, param) {
    return this[type](value, param);
  }
}

module.exports = Validator;