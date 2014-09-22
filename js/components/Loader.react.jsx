/** @jsx React.DOM */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var Spinner = require('react-spinner');

var Loader = React.createClass({

  /**
   * @return {object}
   */
  render: function() {

    return (
      <Spinner />
    );
  }

});

module.exports = Loader;
