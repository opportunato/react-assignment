/** @jsx React.DOM */

var React = require('react');
var ReactPropTypes = React.PropTypes;

var UserTextInput = React.createClass({

  propTypes: {
    id: ReactPropTypes.string.isRequired,
    type: ReactPropTypes.string,
    placeholder: ReactPropTypes.string,
    onChange: ReactPropTypes.func.isRequired,
    value: ReactPropTypes.string
  },

  getDefaultProps: function() {
    return {
      placeholder: '',
      type: 'text'
    }
  },

  getInitialState: function() {
    return {
      value: this.props.value || ''
    };
  },

  /**
   * @return {object}
   */
  render: function() /*object*/ {
    return (
      <div>
        <input
          id={this.props.id}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this._onChange}
        />
      </div>
    );
  },

  _onChange: function(event) {
    this.props.onChange(event.target.value);
  }

});

module.exports = UserTextInput;
