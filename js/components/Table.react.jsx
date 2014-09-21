/** @jsx React.DOM */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var TableRow = require('./TableRow.react.jsx');
var UserActions = require('../actions/UserActions')

var Table = React.createClass({

  propTypes: {
    data: ReactPropTypes.array.isRequired,
    selectedItemId: ReactPropTypes.string
  },

  /**
   * @return {object}
   */
  render: function() {
    var data = this.props.data;
    var rows = [];
    var selectedItemId = this.props.selectedItemId;
    var itemClass = '';

    data.forEach(function(item) {
      rows.push(
        <TableRow 
          className={item.id === selectedItemId ? 'selected' : ''} 
          key={item.id}
          item={item} />
      );
    });

    return (
      <section id="table">
        <table id="todo-list">
          <thead>
            <tr>
              <th onClick={this.sort} data-field="firstName">First Name</th>
              <th onClick={this.sort} data-field="lastName">Last Name</th>
              <th onClick={this.sort} data-field="email">Email</th>
              <th onClick={this.sort} data-field="phone">Phone</th>
              <th>Edit</th>
              <th>Destroy</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </section>
    );
  },

  sort: function(event) {
    UserActions.sort(event.target.dataset.field);
  }

});

module.exports = Table;
