/** @jsx React.DOM */

var React = require('react');
var UserStore = require('../stores/UserStore');
var FormStore = require('../stores/FormStore');
var Table = require('./Table.react.jsx');
var EditPanel = require('./EditPanel.react.jsx');

/**
 * Retrieve the current data from the UserStore
 */
function getUsers() {
  return UserStore.getAll();
}

function getSelectedUser() {
  return FormStore.getSelectedUser();
}

var UserApp = React.createClass({

  getInitialState: function() {
    var selectedUser = getSelectedUser() || {};

    return {
      users: getUsers(),
      selectedUserId: selectedUser.id
    };
  },

  componentDidMount: function() {
    UserStore.addChangeListener(this._onUsersChange);
    FormStore.addChangeListener(this._onFormChange);
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onUsersChange);
    FormStore.addChangeListener(this._onFormChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div>
        <EditPanel validators={this.state.validators} />
        <Table data={this.state.users} selectedItemId={this.state.selectedUserId} />
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the UserStore
   */
  _onUsersChange: function() {
    this.setState({
      users: getUsers()
    });
  },

  _onFormChange: function() {
    var selectedUser = getSelectedUser() || {};

    this.setState({
      selectedUserId: selectedUser.id
    });
  }

});

module.exports = UserApp;
