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
  }

};

module.exports = FormActions;
