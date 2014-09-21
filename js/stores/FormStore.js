var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FormConstants = require('../constants/FormConstants');
var merge = require('react/lib/merge');
var UserStore = require('../stores/UserStore');

var status = FormConstants.HIDDEN;
var selectedUser = null;

var CHANGE_EVENT = 'change';

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

  emitChange: function() {
    this.emit(CHANGE_EVENT);
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
      break;

    case FormConstants.OPEN_FOR_CREATION:
      status = FormConstants.CREATION;
      selectedUser = null;
      break;

    case FormConstants.OPEN_FOR_EDITING:
      status = FormConstants.EDITING;
      selectedUser = UserStore.getUser(action.id);
      break;

    default:
      return true;
  }

  FormStore.emitChange();

  return true;
});

module.exports = FormStore;