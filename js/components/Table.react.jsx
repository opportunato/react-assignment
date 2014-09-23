/** @jsx React.DOM */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var TableRow = require('./TableRow.react.jsx');
var UserActions = require('../actions/UserActions');
var UserConstants = require('../constants/UserConstants');

var cx = require('react/lib/cx');

var Table = React.createClass({

  propTypes: {
    data: ReactPropTypes.array.isRequired,
    selectedItemId: ReactPropTypes.string,
    sortField: ReactPropTypes.string,
    sortOrder: ReactPropTypes.string
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
          className={item.id === selectedItemId ? 'active' : ''} 
          key={item.id}
          item={item} />
      );
    });

    /*
      Как видно, код, использующийся для объявления хэдеров,
      повторяется, и его при желании можно вынести в отдельный метод.
    */

    return (
      <section id="table">
        <table id="todo-list" className="table table-hover">
          <thead>
            <tr>
              <th 
                onClick={this.sort}
                className={cx({
                  'sortable': true,
                  'sortedDesc': this._sortedDesc("firstName"),
                  'sortedAsc': this._sortedAsc("firstName")
                })}
                data-field="firstName">First Name</th>
              <th
                onClick={this.sort}
                className={cx({
                  'sortable': true,
                  'sortedDesc': this._sortedDesc("lastName"),
                  'sortedAsc': this._sortedAsc("lastName")
                })}
                data-field="lastName">Last Name</th>
              <th
                onClick={this.sort}
                className={cx({
                  'sortable': true,
                  'sortedDesc': this._sortedDesc("email"),
                  'sortedAsc': this._sortedAsc("email")
                })}
                data-field="email">Email</th>
              <th
                onClick={this.sort}
                className={cx({
                  'sortable': true,
                  'sortedDesc': this._sortedDesc("phone"),
                  'sortedAsc': this._sortedAsc("phone")
                })}
                data-field="phone">Phone</th>
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
  },

  _sortedDesc: function(field) {
    return this.props.sortField === field && this.props.sortOrder === UserConstants.DESC;
  },

  _sortedAsc: function(field) {
    return this.props.sortField === field && this.props.sortOrder === UserConstants.ASC;
  }

});

module.exports = Table;
