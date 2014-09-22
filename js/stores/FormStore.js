var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FormConstants = require('../constants/FormConstants');
var merge = require('react/lib/merge');
var UserStore = require('../stores/UserStore');
var Validator = require('../helpers/Validator');
var _ = require('underscore');

var status = FormConstants.HIDDEN;
var selectedUser = null;
var formData = {
  firstName: '', 
  lastName: '',
  email: '',
  phone: ''
};

var validationData = {
  firstName: {
    showErrors: false,
    isValid: true,
    errorMessages: []
  },
  lastName: {
    showErrors: false,
    isValid: true,
    errorMessages: []
  },
  email: {
    showErrors: false,
    isValid: true,
    errorMessages: []
  },
  phone: {
    showErrors: false,
    isValid: true,
    errorMessages: []
  }
}

var validators = UserStore.getValidators();

function clearFormData() {
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  };
}

function setFormDataForSelectedUser() {
  formData = {
    firstName: selectedUser.firstName,
    lastName: selectedUser.lastName,
    email: selectedUser.email,
    phone: selectedUser.phone
  };
}

function validateAll() {
  for (var field in formData) {
    validateField(field);
  }
}

function validateField(field) {
  validationData[field].isValid = true;
  validationData[field].errorMessages = [];

  for (var validator in validators[field]) {
    if (!Validator.validate(formData[field], validator, validators[field][validator])) {
      validationData[field].isValid = false;
      validationData[field].errorMessages.push(Validator.errorMessages[validator]);
    }
  }

  if (validationData[field].isValid === true) {
    validationData[field].showErrors = false;
  }
}

function hideValidation(field) {
  if (field === undefined) {
    for (var field in validationData) {
      validationData[field].showErrors = false;
    }
  } else {
    validationData[field].showErrors = false;
  }
}

function showValidation(field) {
  if (field === undefined) {
    for (var field in validationData) {
      validationData[field].showErrors = true;
    }
  } else {
    validationData[field].showErrors = true;
  }
}

var validators = UserStore.getValidators();

var CHANGE_EVENT = 'change';
var VALIDATION_EVENT = 'validate';

var FormStore = merge(EventEmitter.prototype, {

  /**
   * Get the entire collection of users.
   * @return {object}
   */
  getStatus: function() {
    return status;
  },

  getSelectedUser: function() {
    return selectedUser;
  },

  isFormValid: function() {
    return _.every(_.pluck(_.toArray(validationData), 'isValid'), _.identity);
  },

  getFormData: function() {
    return formData;
  },

  getValidationData: function() {
    return validationData;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  emitValidation: function() {
    this.emit(VALIDATION_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {

    case FormConstants.HIDE:
      status = FormConstants.HIDDEN;
      selectedUser = null;
      clearFormData();
      hideValidation();

      break;

    case FormConstants.OPEN_FOR_CREATION:
      status = FormConstants.CREATION;
      selectedUser = null;
      clearFormData();
      hideValidation();

      validateAll();
      break;

    case FormConstants.OPEN_FOR_EDITING:
      status = FormConstants.EDITING;
      selectedUser = UserStore.getUser(action.id);
      setFormDataForSelectedUser();
      hideValidation();

      validateAll();
      break;

    case FormConstants.CHANGE_FIELD:
      formData[action.field] = action.value;
      validateField(action.field);
      break;

    case FormConstants.VALIDATE_FIELD:
      showValidation(action.field);
      break;      

    case FormConstants.VALIDATE_ALL:
      showValidation();
      break;

    default:
      return true;
  }

  FormStore.emitChange();

  return true;
});

module.exports = FormStore;