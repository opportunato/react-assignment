var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');

var store = global.localStorage;

var CHANGE_EVENT = 'change';

var _users = [];

function getData() {
  data = store.getItem('users');

  if (data === null) {
    data = require('../seed/users');
    store.setItem('users', JSON.stringify(data));
  } else {
    data = JSON.parse(data);
  }

  return data;
}

_users = getData();

/**
 * Create a user.
 * @param  {object} values The params of the User
 */
function create(values) {
  var id = Date.now();
  _users.push({
    id: values["id"],
    firstName: values["firstName"],
    secondName: values["secondName"],
    email: values["email"],
    phone: values["phone"]
  });
}

var UserStore = merge(EventEmitter.prototype, {

  /**
   * Get the entire collection of users.
   * @return {object}
   */
  getAll: function() {
    return _users;
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

module.exports = UserStore;