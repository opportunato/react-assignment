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
  }

};

module.exports = UserActions;
