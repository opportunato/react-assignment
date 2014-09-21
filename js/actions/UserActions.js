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
  },


  /**
   * @param  {string} id
   * @param  {object} values
   */

  update: function(id, values) {
    AppDispatcher.handleViewAction({
      actionType: UserConstants.USER_UPDATE,
      id: id,
      values: values
    });
  },

  /**
   * @param  {string} field
   */

  sort: function(field) {
    AppDispatcher.handleViewAction({
      actionType: UserConstants.SORT,
      field: field
    });
  }

};

module.exports = UserActions;
