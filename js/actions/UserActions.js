var AppDispatcher = require('../dispatcher/AppDispatcher');
var UserConstants = require('../constants/UserConstants');

var UserActions = {

  /**
   * @param  {string} id
   */
  destroy: function(id) {
    AppDispatcher.handleViewAction({
      actionType: UserConstants.USER_DESTROY,
      id: id
    });
  },

  /**
   * @param  {object} values
   */
  create: function(values) {
    AppDispatcher.handleViewAction({
      actionType: UserConstants.USER_CREATE,
      values: values
    });
  }

};

module.exports = UserActions;
