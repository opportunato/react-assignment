var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserActions = require('../actions/UserActions');

var cx = require('react/lib/cx');

var TableRow = React.createClass({

  propTypes: {
    item: ReactPropTypes.object.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    var item = this.props.item;

    return (
      <tr>
        <td>{item.firstName}</td>
        <td>{item.lastName}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td><button className="edit">Edit</button></td>
        <td><button className="destroy" onClick={this._onDestroyClick}>Destroy</button></td>
      </tr>
    );
  },

  _onDestroyClick: function() {
    UserActions.destroy(this.props.item.id);
  }

});

module.exports = TableRow;
