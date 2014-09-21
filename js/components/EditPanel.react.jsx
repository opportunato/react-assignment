var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserActions = require('../actions/UserActions');
var UserTextInput = require('./UserTextInput.react.jsx');

var cx = require('react/lib/cx');

var TableRow = React.createClass({

  getInitialState: function() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    };
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
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
        <button onClick={this._create}>Create</button>
      </div>
    );
  },

  _create: function() {
    UserActions.create({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone
    });

    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    })
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

module.exports = TableRow;
