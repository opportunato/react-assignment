/** @jsx React.DOM */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserActions = require('../actions/UserActions');
var FormActions = require('../actions/FormActions');
var FormStore = require('../stores/FormStore');
var FormConstants = require('../constants/FormConstants');
var UserTextInput = require('./UserTextInput.react.jsx');

function getStatus() {
  return FormStore.getStatus();
}

function getSelectedUser() {
  return FormStore.getSelectedUser();
}

function getFormState() {
  selectedUser = getSelectedUser() || {};

  return {
    status: getStatus(),
    id: selectedUser.id,
    firstName: selectedUser.firstName,
    lastName: selectedUser.lastName,
    email: selectedUser.phone,
    phone: selectedUser.email,
  };  
}

var EditPanel = React.createClass({

  getInitialState: function() {
    return getFormState();
  },

  /**
   * @return {object}
   */
  render: function() {
    var form = '';
    var button = '';
    var createButton = '';

    switch(this.state.status) {
      case FormConstants.EDITING:
      case FormConstants.CREATION:
        form = (
          <div>
            <UserTextInput
              id="first-name"
              type="text"
              placeholder="First Name"
              onChange={this.onFirstNameChange}
              value={this.state.firstName}
               />
            <UserTextInput
              id="last-name"
              type="text"
              placeholder="Last Name"
              onChange={this.onLastNameChange}
              value={this.state.lastName}
               />
            <UserTextInput
              id="email"
              type="email"
              placeholder="Email"
              onChange={this.onEmailChange}
              value={this.state.email}
               />
            <UserTextInput
              id="phone"
              type="tel"
              placeholder="Phone"
              onChange={this.onPhoneChange}
              value={this.state.phone}
               />
          </div>
        );
        break;
    };

    switch(this.state.status) {
      case FormConstants.CREATION:
        button = (
          <div>
            <button onClick={this._create}>Create</button>
            <button onClick={this._hide}>Cancel</button>
          </div>
        );
        break;
      case FormConstants.EDITING:
        button = (
          <div>
            <button onClick={this._update}>Update</button>
            <button onClick={this._hide}>Cancel</button>
          </div>
        );
        break;
    };

    switch(this.state.status) {
      case FormConstants.HIDDEN:
      case FormConstants.EDITING:
        createButton = (
          <button onClick={this._openForCreation}>Create New User</button>
        );
        break;
    };

    return (
      <div>
        <div>
          {createButton}
        </div>
        <div>
          {form}
          {button}
        </div>
      </div>
    );
  },

  componentDidMount: function() {
    FormStore.addChangeListener(this._onFormChange);
  },

  componentWillUnmount: function() {
    FormStore.addChangeListener(this._onFormChange);
  },

  _onFormChange: function() {
    this.setState(getFormState());
  },

  _update: function() {
    UserActions.update(this.state.id, {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone
    });

    FormActions.hide();    
  },

  _create: function() {
    UserActions.create({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone
    });

    FormActions.hide();
  },

  _hide: function() {
    FormActions.hide();
  },

  _openForCreation: function() {
    FormActions.openForCreation();
  },

  onFirstNameChange: function(firstName) {
    this.setState({
      firstName: firstName
    });
  },

  onLastNameChange: function(lastName) {
    this.setState({
      lastName: lastName
    });
  },

  onEmailChange: function(email) {
    this.setState({
      email: email
    });
  },

  onPhoneChange: function(phone) {
    this.setState({
      phone: phone
    });
  }

});

module.exports = EditPanel;
