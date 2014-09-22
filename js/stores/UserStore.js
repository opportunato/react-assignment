var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var UserConstants = require('../constants/UserConstants');
var merge = require('react/lib/merge');
var _ = require('underscore');

var store = global.localStorage;

var CHANGE_EVENT = 'change';

var _users = {};
var isLoading = false;

var _validators = {
  firstName: {
    required: true,
    maxLength: 30
  },
  lastName: {
    required: true,
    maxLength: 30
  },
  email: {
    required: true,
    email: true,
    maxLength: 30
  },
  phone: {
    required: true,
    maxLength: 30
  }
};

var sortField = null;
var sortOrder = null;

function async(callback) {
  isLoading = true;
  var time = 500 + Math.ceil(Math.random() * 500);

  setTimeout(function() {
    isLoading = false;
    callback();

    UserStore.emit(CHANGE_EVENT)
  }, time);
}

function readData() {
  data = store.getItem('users');

  if (data === null) {
    data = require('../seed/users');
    store.setItem('users', JSON.stringify(data));
  } else {
    data = JSON.parse(data);
  }

  _users = data;
}

function saveData() {
  store.setItem('users', JSON.stringify(data));
}

async(readData);

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

  async(saveData);
}

function update(id, values) {
  _users[id] = {
    id: id,
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    phone: values.phone
  };

  async(saveData);
}

/**
 * Delete a TODO item.
 * @param  {string} id
 */
function destroy(id) {
  delete _users[id];

  async(saveData);
}

var UserStore = merge(EventEmitter.prototype, {

  /**
   * Get the entire collection of users.
   * @return {object}
   */
  getAll: function() {
    var users = _.toArray(_users);

    if (sortField !== null && sortOrder !== null) {
      users = _.sortBy(users, sortField)

      if (sortOrder === UserConstants.DESC) {
        users.reverse();
      }
    }

    return users;
  },

  isLoading: function() {
    return isLoading;
  },

  getUser: function(id) {
    return _users[id];
  },

  getValidators: function() {
    return _validators;
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

    case UserConstants.USER_UPDATE:
      update(action.id, action.values);
      break;

    case UserConstants.SORT:
      if (sortField === action.field && sortOrder === UserConstants.ASC) {
        sortOrder = UserConstants.DESC;
      } else {
        sortOrder = UserConstants.ASC;
      }

      sortField = action.field;
      break;

    default:
      return true;
  }

  UserStore.emitChange();

  return true;
});

module.exports = UserStore;