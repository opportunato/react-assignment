/** @jsx React.DOM */

/*
  В этом классе, как я уже писал в FormStore, нужно до конца избавится от объектов конфигурации (в первую очередь от EditPanel.fields),
  и любой связанности с FormStore и FormActions. 

  После этого к нему можно будет подключать самые разные store'ы с соответствующими action'ами — мы получим базовый расширяемый компонент формы.
*/

var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserActions = require('../actions/UserActions');
var FormActions = require('../actions/FormActions');
var FormStore = require('../stores/FormStore');
var FormConstants = require('../constants/FormConstants');
var UserTextInput = require('./UserTextInput.react.jsx');

function getStatus() {
  return FormStore.getStatus();
}

function getSelectedUser() {
  return FormStore.getSelectedUser();
}

function getFormState() {
  selectedUser = getSelectedUser() || {};

  return {
    status: getStatus(),
    id: selectedUser.id,
    formData: FormStore.getFormData(),
    isValid: FormStore.isFormValid(),
    validationData: FormStore.getValidationData()
  };  
}

var EditPanel = React.createClass({

  getInitialState: function() {
    return getFormState();
  },

  fields: [
    {
      name: "firstName",
      id: "user-first-name",
      placeholder: "First Name",
      type: "text"
    }, 
    {
      name: "lastName",
      id: "user-last-name",
      placeholder: "Last Name",
      type: "text"       
    },
    {
      name: "email",
      id: "user-email",
      placeholder: "Email",
      type: "email"
    },
    {
      name: "phone",
      id: "user-phone",
      placeholder: "Phone",
      type: "tel"
    }
  ],

  /**
   * @return {object}
   */
  render: function() {
    var form = '';
    var button = '';
    var createButton = '';

    switch(this.state.status) {
      case FormConstants.EDITING:
      case FormConstants.CREATION:
          var formFields = [];
          var self = this;

          this.fields.forEach(function(field) {
            formFields.push(
              (
                <UserTextInput
                  id={field.id}
                  key={field.id}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={self.state.formData[field.name]}
                  isValid={self.state.validationData[field.name].isValid}
                  showErrors={self.state.validationData[field.name].showErrors}
                  errorMessages={self.state.validationData[field.name].errorMessages}
                   />
              )
            );
          });

        form = (
          <div className="edit-form">
            {formFields}
          </div>
        );
        break;
    };

    switch(this.state.status) {
      case FormConstants.CREATION:
        button = (
          <div className="form-buttons">
            <button className="btn btn-success" onClick={this._create}>Create</button>
            <button className="btn btn-danger" onClick={this._hide}>Cancel</button>
          </div>
        );
        break;
      case FormConstants.EDITING:
        button = (
          <div className="form-buttons">
            <button className="btn btn-success" onClick={this._update}>Update</button>
            <button className="btn btn-danger" onClick={this._hide}>Cancel</button>
          </div>
        );
        break;
    };

    switch(this.state.status) {
      case FormConstants.HIDDEN:
      case FormConstants.EDITING:
        createButton = (
          <button className="btn btn-primary" onClick={this._openForCreation}>Create New User</button>
        );
        break;
    };

    return (
      <div className="edit-panel">
        <div>
          {createButton}
        </div>
        <div>
          {form}
          {button}
        </div>
      </div>
    );
  },

  componentDidMount: function() {
    FormStore.addChangeListener(this._onFormChange);
  },

  componentWillUnmount: function() {
    FormStore.removeChangeListener(this._onFormChange);
  },

  _onFormChange: function() {
    this.setState(getFormState());
  },

  _update: function() {
    if (this.state.isValid) {
      UserActions.update(this.state.id, this.state.formData);

      FormActions.hide();
    } else {
      FormActions.validateAll();
    }
  },

  _create: function() {
    if (this.state.isValid) {
      UserActions.create(this.state.formData);

      FormActions.hide();
    } else {
      FormActions.validateAll();
    }
  },

  _hide: function() {
    FormActions.hide();
  },

  _openForCreation: function() {
    FormActions.openForCreation();
  }
});

module.exports = EditPanel;
