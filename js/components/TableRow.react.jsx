var React = require('react');
var ReactPropTypes = React.PropTypes;

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
      </tr>
    );
  }

});

module.exports = TableRow;
