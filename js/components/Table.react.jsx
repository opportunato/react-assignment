var React = require('react');
var ReactPropTypes = React.PropTypes;
var TableRow = require('./TableRow.react.jsx');

var Table = React.createClass({

  propTypes: {
    data: ReactPropTypes.array.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    var data = this.props.data;
    var rows = [];

    data.forEach(function(item) {
      rows.push(<TableRow item={item} />);
    });

    return (
      <section id="table">
        <table id="todo-list">
        <tr>
          <td>First Name</td>
          <td>Last Name</td>
          <td>Email</td>
          <td>Phone</td>
        </tr>
          {rows}
        </table>
      </section>
    );
  }

});

module.exports = Table;
