var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var UserConstants = require('../constants/UserConstants');
var merge = require('react/lib/merge');
var _ = require('underscore');

var store = global.localStorage;

var CHANGE_EVENT = 'change';

var _users = {};

function readData() {
  data = store.getItem('users');

  if (data === null) {
    data = require('../seed/users');
    store.setItem('users', JSON.stringify(data));
  } else {
    data = JSON.parse(data);
  }

  return data;
}

function saveData() {
  store.setItem('users', JSON.stringify(data));
}

_users = readData();

/**
 * Create a user.
 * @param  {object} values The params of the User
 */
function create(values) {
  var id = Date.now().toString();

  _users[id] = {
    id: id,
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    phone: values.phone
  };

  saveData();
}

/**
 * Delete a TODO item.
 * @param  {string} id
 */
function destroy(id) {
  delete _users[id];
  saveData();
}

var UserStore = merge(EventEmitter.prototype, {

  /**
   * Get the entire collection of users.
   * @return {object}
   */
  getAll: function() {
    return _.toArray(_users);
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

    case UserConstants.USER_DESTROY:
      destroy(action.id);
      break;

    case UserConstants.USER_CREATE:
      create(action.values);
      break;

    default:
      return true;
  }

  UserStore.emitChange();

  return true;
});

module.exports = UserStore;