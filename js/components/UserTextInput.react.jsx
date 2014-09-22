/** @jsx React.DOM */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var FormStore = require('../stores/FormStore');
var FormActions = require('../actions/FormActions');

var UserTextInput = React.createClass({

  propTypes: {
    id: ReactPropTypes.string.isRequired,
    name: ReactPropTypes.string.isRequired,
    type: ReactPropTypes.string,
    placeholder: ReactPropTypes.string,
    value: ReactPropTypes.string,
    isValid: ReactPropTypes.bool,
    showErrors: ReactPropTypes.bool,
    errorMessages: ReactPropTypes.array
  },

  getDefaultProps: function() {
    return {
      placeholder: '',
      type: 'text',
      value: '',
      showErrors: false,
      isValid: true,
      errorMessages: []
    }
  },

  /**
   * @return {object}
   */
  render: function() /*object*/ {

    if (this.props.showErrors && !this.props.isValid) {
      var errorMessages = [];

      this.props.errorMessages.forEach(function(errorMessage) {
        errorMessages.push(errorMessage);
      });

      if (errorMessages.length > 0) {
        errorMessages = (
          <span className="error-message">{errorMessages.join('')}</span>
        );
      }
    }

    return (
      <div>
        <input
          id={this.props.id}
          className={!this.props.isValid && this.props.showErrors ? 'error' : ''}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this._onChange}
          onBlur={this._validate}
        />
        {errorMessages}
      </div>
    );
  },

  _validate: function() {
    FormActions.validateField(this.props.name);
  },

  _onChange: function(event) {
    FormActions.changeField(this.props.name, event.target.value);
  }
});

module.exports = UserTextInput;
