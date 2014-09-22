/** @jsx React.DOM */

var React = require('react');
var UserStore = require('../stores/UserStore');
var FormStore = require('../stores/FormStore');
var Table = require('./Table.react.jsx');
var EditPanel = require('./EditPanel.react.jsx');
var Loader = require('./Loader.react.jsx');

function getState() {
  var selectedUser = FormStore.getSelectedUser() || {};

  return {
    isLoading: UserStore.isLoading(),
    users: UserStore.getAll(),
    selectedUserId: selectedUser.id
  }
}

var UserApp = React.createClass({

  getInitialState: function() {
    return getState();
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
    if (!this.state.isLoading) {
      return (
        <div>
          <EditPanel validators={this.state.validators} />
          <Table data={this.state.users} selectedItemId={this.state.selectedUserId} />
        </div>
      );
    } else {
      return (
        <div>
          <Loader />
        </div>
      );
    }
  },

  _onUsersChange: function() {
    this.setState(getState());
  },

  _onFormChange: function() {
    this.setState(getState());
  }

});

module.exports = UserApp;
