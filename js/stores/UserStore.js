var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var UserConstants = require('../constants/UserConstants');
var merge = require('react/lib/merge');
var _ = require('underscore');

var store = global.localStorage;

var CHANGE_EVENT = 'change';

var _users = {};
var isLoading = false;
var isSaving = false;

/*
  Данные о валидации хранятся непосредственно в самом UserStore — мне показалось логичным выбрать именно его.
  В дальнейшем, в реальном проекте сам механизм валидации в формах был бы вынесен в отдельный миксин
  и позволял бы выбирать Store для получения данных о валидации и существующих пользователях.
*/

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

/*
  Для асинхронности выбрал простой таймаут со случайным интервалом 500-1000.
  После того, как запись в localStorage произошла, UserStore отправляет action Dispatcher'у.
  Обратите внимание, что само изменение в массиве _users происходит мгновенно, чтобы не мешать пользователю.
  Само собой, в рельном проекте вместо одного общего action'a LOADED было бы по два action на каждое сохранение данных.
  Первый бы обозначал SUCCESS и мог бы дополнительно менять данные за счет обновлений с сервера.
  Второй бы обозначал ERROR и приводил к отмене последних изменений в интерфейсе пользователя и возможному выводу сообщения об ошибке.
*/

function async(callback) {
  var time = 500 + Math.ceil(Math.random() * 500);

  setTimeout(function() {
    callback();

    AppDispatcher.handleRequestAction({
      actionType: UserConstants.LOADED
    });
  }, time);  
}

function async_load(callback) {
  isLoading = true;
  
  async(function() {
    callback();
    isLoading = false;
  });
}

function async_save(callback) {
  isSaving = true;
  
  async(function() {
    callback();
    isSaving = false;
  });
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
  store.setItem('users', JSON.stringify(_users));
}

async_load(readData);

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

  async_save(saveData);
}

function update(id, values) {
  _users[id] = {
    id: id,
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    phone: values.phone
  };

  async_save(saveData);
}

/**
 * Delete a TODO item.
 * @param  {string} id
 */
function destroy(id) {
  delete _users[id];

  async_save(saveData);
}

/*
  Здесь использовалась Flux-архитектура, аналогичная архитектуре примеров на сайте React.
*/

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

  isSaving: function() {
    return isSaving;
  },

  getSortField: function() {
    return sortField;
  },

  getSortOrder: function() {
    return sortOrder;
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

    case UserConstants.LOADED:
      break;

    default:
      return true;
  }

  UserStore.emitChange();

  return true;
});

module.exports = UserStore;