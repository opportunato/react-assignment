/** @jsx React.DOM */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserActions = require('../actions/UserActions');
var FormActions = require('../actions/FormActions');

var cx = require('react/lib/cx');

var TableRow = React.createClass({

  propTypes: {
    item: ReactPropTypes.object.isRequired,
    className: ReactPropTypes.string
  },

  /**
   * @return {object}
   */
  render: function() {
    var item = this.props.item;

    return (
      <tr className={this.props.className}>
        <td>{item.firstName}</td>
        <td>{item.lastName}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td><button className="edit" onClick={this._onEditClick}>Edit</button></td>
        <td><button className="destroy" onClick={this._onDestroyClick}>Destroy</button></td>
      </tr>
    );
  },

  _onEditClick: function() {
    FormActions.openForEditing(this.props.item.id);
  },

  _onDestroyClick: function() {
    UserActions.destroy(this.props.item.id);
  }

});

module.exports = TableRow;
