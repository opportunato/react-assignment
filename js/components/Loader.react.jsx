/** @jsx React.DOM */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var Spinner = require('spin.js');

var Loader = React.createClass({
  propTypes: {
    isLoading: React.PropTypes.bool
  },

  getInitialState: function() {
    return { isLoading: false };
  },

  componentDidMount: function() {
    this.updateState(this.props);
  },

  componentWillReceiveProps: function(nextProps) {
    this.updateState(nextProps);
  },

  componentWillUpdate: function(nextProps) {
    if (this.refs.loader && !nextProps.isLoading) {
      var target = this.refs.loader.getDOMNode();
      target.innerHTML = '';
    }
  },

  updateState: function(props) {
    this.setState({
      isLoading: props.isLoading
    }, this.spin);
  },

  spin: function() {
    if (this.isMounted() && this.state.isLoading) {
      var spinner = new Spinner(this.state.options);
      var target = this.refs.loader.getDOMNode();
      target.innerHTML = '';

      spinner.spin(target);
    }
  },

  render: function() {
    if (!this.state.isLoading) {
      return ( <div>{this.props.children}</div> );
    } else {
      return ( <div ref="loader" className="loader"></div> );
    }
  }
});

module.exports = Loader;
