/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the UserStore and passes the new data to its children.
 */

var React = require('react');
var UserStore = require('../stores/UserStore');
var Table = require('./Table.react.jsx');
var EditPanel = require('./EditPanel.react.jsx')

/**
 * Retrieve the current data from the UserStore
 */
function getUsersState() {
  return {
    users: UserStore.getAll()
  };
}

var UserApp = React.createClass({

  getInitialState: function() {
    return getUsersState();
  },

  componentDidMount: function() {
    UserStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div>
        <EditPanel />
        <Table data={this.state.users} />
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the UserStore
   */
  _onChange: function() {
    this.setState(getUsersState());
  }

});

module.exports = UserApp;
