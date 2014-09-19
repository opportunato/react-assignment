var React = require('react');
var UserApp = require('./components/UserApp.react.jsx');

React.renderComponent(
  <UserApp />,
  document.getElementById('user-manager')
);
