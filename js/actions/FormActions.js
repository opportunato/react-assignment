var AppDispatcher = require('../dispatcher/AppDispatcher');
var FormConstants = require('../constants/FormConstants');

var FormActions = {

  hide: function() {
    AppDispatcher.handleViewAction({
      actionType: FormConstants.HIDE
    });
  },

  openForCreation: function(values) {
    AppDispatcher.handleViewAction({
      actionType: FormConstants.OPEN_FOR_CREATION
    });
  },

  openForEditing: function(id) {
    AppDispatcher.handleViewAction({
      actionType: FormConstants.OPEN_FOR_EDITING,
      id: id
    });
  },

  changeField: function(field, value) {
    AppDispatcher.handleViewAction({
      actionType: FormConstants.CHANGE_FIELD,
      field: field,
      value: value
    });    
  },

  validateAll: function() {
    AppDispatcher.handleViewAction({
      actionType: FormConstants.VALIDATE_ALL
    });
  },

  validateField: function(field) {
    AppDispatcher.handleViewAction({
      actionType: FormConstants.VALIDATE_FIELD,
      field: field
    });    
  }

};

module.exports = FormActions;
