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
    isSaving: UserStore.isSaving(),
    users: UserStore.getAll(),
    sortField: UserStore.getSortField(),
    sortOrder: UserStore.getSortOrder(),
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
    return (
      <div id="main">
        <Loader isLoading={this.state.isLoading}>
          <EditPanel validators={this.state.validators} />
          <div className="save-loader">
            <Loader className="save-loader" isLoading={this.state.isSaving}/>
          </div>
          <Table
            data={this.state.users}
            selectedItemId={this.state.selectedUserId}
            sortField={this.state.sortField}
            sortOrder={this.state.sortOrder}
          />
        </Loader>
      </div>
    );
  },

  _onUsersChange: function() {
    this.setState(getState());
  },

  _onFormChange: function() {
    this.setState(getState());
  }

});

module.exports = UserApp;
