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
      rows.push(<TableRow key={item.id} item={item} />);
    });

    return (
      <section id="table">
        <table id="todo-list">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
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
  }

});

module.exports = Table;
